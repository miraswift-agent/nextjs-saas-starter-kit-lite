/*
 * -- Major change: ASH product tables
 * AutoSelfHost SaaS — app catalog + compose generation + deployment history
 * Lite kit uses account_id (personal accounts) instead of organization_id
 */

-- App template catalog (built-in + future community templates)
CREATE TABLE IF NOT EXISTS public.app_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  emoji TEXT,
  tags TEXT[] DEFAULT '{}',
  resources JSONB, -- {minRam, minDisk, recommendedRam}
  ports JSONB, -- [{container, description}]
  fields JSONB NOT NULL, -- [{id, label, type, required, placeholder, default}]
  volumes JSONB, -- [{name, path}]
  compose_hints TEXT, -- prompt context for AI generation
  links JSONB, -- {docs, image}
  is_built_in BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User's generated compose configurations
CREATE TABLE IF NOT EXISTS public.compose_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES public.accounts(id),
  app_template_id UUID NOT NULL REFERENCES public.app_templates(id),
  name TEXT NOT NULL,
  config_values JSONB NOT NULL, -- user's field values
  generated_compose TEXT, -- the AI-generated YAML
  generation_model TEXT, -- which AI model was used
  generation_tokens INTEGER, -- cost tracking
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'generated', 'exported')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for common access patterns
CREATE INDEX IF NOT EXISTS idx_app_templates_category ON public.app_templates(category);
CREATE INDEX IF NOT EXISTS idx_app_templates_slug ON public.app_templates(slug);
CREATE INDEX IF NOT EXISTS idx_compose_configs_account ON public.compose_configs(account_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_compose_configs_template ON public.compose_configs(app_template_id);

/*
 * -- Major change: RLS policies for ASH tables
 */

-- App templates: readable by all authenticated users, writable only by service role
ALTER TABLE public.app_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "app_templates_select" ON public.app_templates
  FOR SELECT TO authenticated
  USING (true);

-- Compose configs: users can only access their own
ALTER TABLE public.compose_configs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "compose_configs_select" ON public.compose_configs
  FOR SELECT TO authenticated
  USING (account_id = auth.uid());

CREATE POLICY "compose_configs_insert" ON public.compose_configs
  FOR INSERT TO authenticated
  WITH CHECK (account_id = auth.uid());

CREATE POLICY "compose_configs_update" ON public.compose_configs
  FOR UPDATE TO authenticated
  USING (account_id = auth.uid());

CREATE POLICY "compose_configs_delete" ON public.compose_configs
  FOR DELETE TO authenticated
  USING (account_id = auth.uid());

-- Grant table access to authenticated role
GRANT SELECT ON public.app_templates TO authenticated;
GRANT ALL ON public.compose_configs TO authenticated;
-- Service role for seed data and admin operations
GRANT ALL ON public.app_templates TO service_role;
GRANT ALL ON public.compose_configs TO service_role;
