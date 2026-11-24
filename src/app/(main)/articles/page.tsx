import Link from 'next/link';

import { writing } from '~/content/yaqub.mjs';
import { ArrowRightIcon } from '~/src/components/icons';
import Button from '~/src/components/ui/Button';
import Heading from '~/src/components/ui/Heading';
import { portfolioMetadata } from '~/src/lib/portfolioMetadata';

import Header from '../components/Header';
import DraggableStickers from '../shop/components/DraggableStickers';
import ShopLensControls from '../shop/components/LensClone/ShopLensControls';
import ProjectsList from '../work/components/ProjectsList';
import { portfolio } from '../work/portfolio';

const articles = portfolio.filter((entry) => entry.filters.includes('writing'));

export const metadata = portfolioMetadata({
  title: 'Articles | Yaqub Tawab Olamilekan',
  description:
    'Read my articles on Lagos, including Beyond the Piles of Refuse, a series exploring waste collection and what mapping can reveal.',
  path: '/articles',
});

export default async function Articles({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const tableView = (await searchParams).view === 'table';

  return (
    <>
      <Header />
      <main className="flex w-full flex-1 flex-col px-5 pt-8 pb-28 sm:px-11" data-lens-root>
        <div className="relative mb-8 flex flex-col items-center gap-2 md:mt-[calc(var(--vh,1vh)*10)]">
          <Heading className="text-center text-[clamp(2.25rem,2vw+2.5rem,4rem)] leading-none">
            Articles
          </Heading>
          <div className="mt-2 flex gap-2" aria-label="Article views" role="group">
            <Button size="sm" asChild>
              <Link href="/articles" aria-current={tableView ? undefined : 'page'} scroll={false}>
                Explore
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link
                href="/articles?view=table"
                aria-current={tableView ? 'page' : undefined}
                scroll={false}
              >
                Table
              </Link>
            </Button>
          </div>
          {!tableView && (
            <p className="mt-2 text-center">
              Click to read or drag an article&nbsp;
              <span className="inline-block animate-bounce" aria-hidden="true">
                <ArrowRightIcon className="inline h-4 w-4 rotate-90" />
              </span>
            </p>
          )}
        </div>
        {tableView ? (
          <ProjectsList projects={articles} mode="articles" />
        ) : (
          <DraggableStickers
            articles={writing.map((article) => ({
              title: article.stickerTitle,
              context: article.stickerContext,
              href: `/work/${article.slug}?from=articles`,
            }))}
          />
        )}
      </main>
      {!tableView && <ShopLensControls />}
    </>
  );
}
