import { PageBody, PageHeader } from '@kit/ui/page';

import { CatalogGrid } from '../_components/catalog-grid';

export const metadata = {
  title: 'App Catalog — AutoSelfHost',
};

export default function CatalogPage() {
  return (
    <>
      <PageHeader
        title="App Catalog"
        description="Browse self-hosted apps and generate production-ready Docker Compose stacks."
      />
      <PageBody>
        <CatalogGrid />
      </PageBody>
    </>
  );
}
