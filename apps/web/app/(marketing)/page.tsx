import Image from 'next/image';
import Link from 'next/link';

import { ArrowRightIcon, LayoutDashboard } from 'lucide-react';

import {
  CtaButton,
  FeatureCard,
  FeatureGrid,
  FeatureShowcase,
  FeatureShowcaseIconContainer,
  Hero,
  Pill,
} from '@kit/ui/marketing';
import { Trans } from '@kit/ui/trans';

import { withI18n } from '~/lib/i18n/with-i18n';

function Home() {
  return (
    <div className={'mt-4 flex flex-col space-y-24 py-14'}>
      <div className={'container mx-auto'}>
        <Hero
          pill={
            <Pill label={'New'}>
              <span>AI-Powered Self-Hosting Made Simple</span>
            </Pill>
          }
          title={
            <>
              <span>Deploy Self-Hosted Apps</span>
              <span>in Minutes, Not Hours</span>
            </>
          }
          subtitle={
            <span>
              AutoSelfHost automates the entire self-hosting setup process. Browse our catalog, 
              configure your stack, and deploy with one click. No Docker expertise required.
            </span>
          }
          cta={<MainCallToActionButton />}
          image={
            <Image
              priority
              className={
                'dark:border-primary/10 rounded-2xl border border-gray-200'
              }
              width={3558}
              height={2222}
              src={`/images/dashboard.webp`}
              alt={`AutoSelfHost Dashboard`}
            />
          }
        />
      </div>

      <div className={'container mx-auto'}>
        <div
          className={'flex flex-col space-y-16 xl:space-y-32 2xl:space-y-36'}
        >
          <FeatureShowcase
            heading={
              <>
                <b className="font-semibold dark:text-white">
                  Self-hosting without the hassle
                </b>
                .{' '}
                <span className="text-muted-foreground font-normal">
                  Deploy 20+ popular self-hosted apps with intelligent Docker Compose generation 
                  and automated Portainer integration.
                </span>
              </>
            }
            icon={
              <FeatureShowcaseIconContainer>
                <LayoutDashboard className="h-5" />
                <span>Powered by AI</span>
              </FeatureShowcaseIconContainer>
            }
          >
            <FeatureGrid>
              <FeatureCard
                className={'relative col-span-2 overflow-hidden'}
                label={'Curated App Catalog'}
                description={`Browse 20+ production-ready self-hosted applications with intelligent configuration templates.`}
              />

              <FeatureCard
                className={
                  'relative col-span-2 w-full overflow-hidden lg:col-span-1'
                }
                label={'One-Click Deployment'}
                description={`Generate optimized Docker Compose stacks and deploy directly to Portainer with a single click.`}
              />

              <FeatureCard
                className={'relative col-span-2 overflow-hidden lg:col-span-1'}
                label={'Smart Configuration'}
                description={`AI-powered configuration assistant helps you set up apps with best practices built-in.`}
              />

              <FeatureCard
                className={'relative col-span-2 overflow-hidden'}
                label={'Deployment Management'}
                description={`Track all your deployments, monitor health, and manage your self-hosted infrastructure from one dashboard.`}
              />
            </FeatureGrid>
          </FeatureShowcase>
        </div>
      </div>
    </div>
  );
}

export default withI18n(Home);

function MainCallToActionButton() {
  return (
    <div className={'flex space-x-4'}>
      <CtaButton>
        <Link href={'/auth/sign-up'}>
          <span className={'flex items-center space-x-0.5'}>
            <span>Get Started</span>

            <ArrowRightIcon
              className={
                'animate-in fade-in slide-in-from-left-8 h-4' +
                ' zoom-in fill-mode-both delay-1000 duration-1000'
              }
            />
          </span>
        </Link>
      </CtaButton>

      <CtaButton variant={'outline'}>
        <Link href={'/auth/sign-in'}>
          Log In
        </Link>
      </CtaButton>
    </div>
  );
}
