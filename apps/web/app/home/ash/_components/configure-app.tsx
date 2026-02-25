'use client';

import { useState, useTransition } from 'react';

import type { AppTemplate } from '@kit/ash/catalog';
import { generateCompose } from '@kit/ash/actions/generate-compose';

import { Alert, AlertDescription } from '@kit/ui/alert';
import { Button } from '@kit/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import { Input } from '@kit/ui/input';
import { Label } from '@kit/ui/label';
import { Textarea } from '@kit/ui/textarea';

interface Props {
  template: AppTemplate;
}

export function ConfigureApp({ template }: Props) {
  const [configValues, setConfigValues] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {};
    template.fields.forEach((f) => {
      if (f.default) defaults[f.id] = f.default;
    });
    return defaults;
  });

  const [compose, setCompose] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleFieldChange(fieldId: string, value: string) {
    setConfigValues((prev) => ({ ...prev, [fieldId]: value }));
  }

  function handleGenerate() {
    setError(null);
    startTransition(async () => {
      const result = await generateCompose({
        templateSlug: template.slug,
        templateName: template.name,
        composeHints: template.compose_hints,
        configValues,
      });

      if (result.success && result.compose) {
        setCompose(result.compose);
      } else {
        setError(result.error ?? 'Generation failed.');
      }
    });
  }

  function handleCopy() {
    if (compose) {
      navigator.clipboard.writeText(compose);
    }
  }

  function handleDownload() {
    if (!compose) return;
    const blob = new Blob([compose], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `docker-compose-${template.slug}.yml`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Configuration Form */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {template.fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>
                {field.label}
                {field.required && <span className="text-destructive"> *</span>}
              </Label>
              <Input
                id={field.id}
                type={field.type === 'password' ? 'password' : 'text'}
                placeholder={field.placeholder}
                value={configValues[field.id] ?? ''}
                onChange={(e) => handleFieldChange(field.id, e.target.value)}
              />
            </div>
          ))}

          <Button
            onClick={handleGenerate}
            disabled={isPending}
            className="w-full"
          >
            {isPending ? 'Generating...' : '🚀 Generate Docker Compose'}
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Generated Output */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Generated Compose
            {compose && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  📋 Copy
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  💾 Download
                </Button>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {compose ? (
            <Textarea
              value={compose}
              readOnly
              className="min-h-[400px] font-mono text-sm"
            />
          ) : (
            <div className="flex min-h-[400px] items-center justify-center text-muted-foreground">
              Configure your app and click Generate to create a Docker Compose file.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
