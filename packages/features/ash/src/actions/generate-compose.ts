'use server';

/**
 * -- Major change: new server action for AI compose generation
 *
 * Takes user config values + app template, calls OpenAI to generate
 * a production-ready docker-compose.yml.
 */
import { z } from 'zod';

const GenerateComposeSchema = z.object({
  templateSlug: z.string().min(1),
  templateName: z.string().min(1),
  composeHints: z.string().optional(),
  configValues: z.record(z.string(), z.string()),
});

export type GenerateComposeInput = z.infer<typeof GenerateComposeSchema>;

interface GenerateComposeResult {
  success: boolean;
  compose?: string;
  model?: string;
  tokens?: number;
  error?: string;
}

export async function generateCompose(
  input: GenerateComposeInput,
): Promise<GenerateComposeResult> {
  try {
    const parsed = GenerateComposeSchema.parse(input);

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return { success: false, error: 'OpenAI API key not configured.' };
    }

    const configLines = Object.entries(parsed.configValues)
      .map(([k, v]) => `- ${k}: ${v}`)
      .join('\n');

    const prompt = `You are a Docker Compose expert. Generate a production-ready docker-compose.yml for ${parsed.templateName}.

User configuration:
${configLines}

${parsed.composeHints ? `App requirements:\n${parsed.composeHints}\n` : ''}
Rules:
- Use named volumes (not bind mounts) unless the user specified paths
- Include health checks for critical services
- Set restart: unless-stopped on all services
- Use specific image tags, not :latest
- Include comments explaining non-obvious configuration
- Output ONLY valid YAML, no markdown fencing`;

    const model = process.env.ASH_AI_MODEL ?? 'gpt-4.1-mini';

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: 'You are a Docker Compose expert. Output only valid YAML.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.3,
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('[ash:generate-compose] OpenAI error:', err);
      return { success: false, error: 'AI generation failed. Please try again.' };
    }

    const data = await response.json();
    const compose = data.choices?.[0]?.message?.content?.trim() ?? '';
    const tokens = data.usage?.total_tokens ?? 0;

    if (!compose) {
      return { success: false, error: 'AI returned empty response.' };
    }

    // Strip markdown fencing if present
    const cleaned = compose
      .replace(/^```ya?ml\n?/i, '')
      .replace(/\n?```$/i, '')
      .trim();

    return {
      success: true,
      compose: cleaned,
      model,
      tokens,
    };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { success: false, error: err.errors[0]?.message ?? 'Validation failed' };
    }
    console.error('[ash:generate-compose] unexpected error:', String(err));
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
