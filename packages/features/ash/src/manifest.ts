/**
 * ASH Product Manifest
 * -- Major change: new product manifest for AutoSelfHost SaaS
 *
 * Defines nav items, entities (DB table names), and plan limits.
 * Lite kit uses personal accounts (no orgs), so entitlements are user-scoped.
 */
export const productManifest = {
  slug: 'ash',
  name: 'AutoSelfHost',
  nav: [
    { label: 'Catalog', path: '/home/ash/catalog', icon: 'Package' },
    { label: 'My Deployments', path: '/home/ash/deployments', icon: 'Layers' },
  ],
  entities: ['app_templates', 'compose_configs'] as const,
  plans: {
    free: {
      limits: {
        compose_configs: 5,
        generations_per_hour: 10,
      },
    },
    pro: {
      limits: {
        compose_configs: -1, // unlimited
        generations_per_hour: -1,
      },
    },
  },
} as const;

export type ProductManifest = typeof productManifest;
