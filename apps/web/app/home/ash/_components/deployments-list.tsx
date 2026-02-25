'use client';

/**
 * Deployments list — shows saved compose configurations.
 * For the Lite first pass, this is a placeholder that will be
 * connected to Supabase once the project is deployed.
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@kit/ui/card';
import { Button } from '@kit/ui/button';
import Link from 'next/link';

export function DeploymentsList() {
  // TODO: Fetch from Supabase compose_configs table
  // const supabase = useSupabaseClient();
  // const { data } = await supabase.from('compose_configs').select('*').order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>No Deployments Yet</CardTitle>
          <CardDescription>
            Generate your first Docker Compose stack from the app catalog.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/home/ash/catalog">
            <Button>Browse Catalog →</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
