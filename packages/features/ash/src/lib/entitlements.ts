/**
 * ASH Entitlements
 * -- Major change: new entitlement check module for ASH
 *
 * Checks plan limits for compose_configs and generation rate.
 * Lite kit = personal accounts, so we scope by user_id not org_id.
 */
import { productManifest } from '../manifest';

type PlanKey = keyof typeof productManifest.plans;
type ResourceKey = keyof typeof productManifest.plans.free.limits;

interface EntitlementResult {
  allowed: boolean;
  reason?: string;
  currentUsage: number;
  limit: number;
}

/**
 * Resolve the user's current plan.
 * Lite kit has no billing — default to 'free'.
 * When billing is added, read subscription status here.
 */
export function resolvePlan(_subscription?: {
  status?: string;
  variantId?: string;
}): PlanKey {
  // Lite kit: always free for now
  // When upgrading to Pro kit with Lemon Squeezy:
  // if (sub?.status === 'active' || sub?.status === 'trialing') return 'pro';
  return 'free';
}

/**
 * Check whether the user can perform an action on a resource.
 */
export async function checkEntitlement(
  userId: string,
  resource: ResourceKey,
  currentUsage: number,
  plan?: PlanKey,
): Promise<EntitlementResult> {
  const resolvedPlan = plan ?? resolvePlan();
  const planDef = productManifest.plans[resolvedPlan] ?? productManifest.plans.free;
  const limit = planDef.limits[resource] ?? 0;

  // -1 = unlimited
  if (limit === -1) {
    return { allowed: true, currentUsage, limit: -1 };
  }

  if (currentUsage >= limit) {
    return {
      allowed: false,
      reason: `You've reached the ${resolvedPlan} plan limit of ${limit} ${resource.replace(/_/g, ' ')}. Upgrade to Pro for unlimited access.`,
      currentUsage,
      limit,
    };
  }

  return { allowed: true, currentUsage, limit };
}
