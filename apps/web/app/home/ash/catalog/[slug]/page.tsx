import { notFound } from 'next/navigation';

import { PageBody, PageHeader } from '@kit/ui/page';

import { APP_CATALOG } from '@kit/ash/catalog';

import { ConfigureApp } from '../../_components/configure-app';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ConfigurePage({ params }: Props) {
  const { slug } = await params;
  const template = APP_CATALOG.find((a) => a.slug === slug);

  if (!template) {
    notFound();
  }

  return (
    <>
      <PageHeader
        title={`${template.emoji} ${template.name}`}
        description={template.description}
      />
      <PageBody>
        <ConfigureApp template={template} />
      </PageBody>
    </>
  );
}
