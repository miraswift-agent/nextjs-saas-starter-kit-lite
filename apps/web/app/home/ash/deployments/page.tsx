import { PageBody, PageHeader } from '@kit/ui/page';

import { DeploymentsList } from '../_components/deployments-list';

export const metadata = {
  title: 'My Deployments — AutoSelfHost',
};

export default function DeploymentsPage() {
  return (
    <>
      <PageHeader
        title="My Deployments"
        description="Your saved Docker Compose configurations."
      />
      <PageBody>
        <DeploymentsList />
      </PageBody>
    </>
  );
}
