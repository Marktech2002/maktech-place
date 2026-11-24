import { getImageProps } from 'next/image';
import { Suspense } from 'react';

import { portfolioMetadata } from '~/src/lib/portfolioMetadata';

import Projects from './components/Projects';
import { Filter, isVisibleStaticProject, projectGridPreviewSizes } from './constants';
import { portfolio } from './portfolio';

export const metadata = portfolioMetadata({
  title: 'Work | Yaqub Tawab Olamilekan',
  description:
    'Software projects and engineering experience across payments, messaging, education tools, and backend APIs.',
  path: '/work',
});

export default async function Work({
  searchParams,
}: {
  searchParams: Promise<{ f?: Filter; view?: string }>;
}) {
  const params = await searchParams;
  const filter = params.f;
  const filteredProjects =
    filter && filter !== 'all'
      ? portfolio.filter((project) => project.filters.includes(filter))
      : portfolio;

  const gridPreviewPreloads =
    params?.view === 'grid'
      ? filteredProjects
          .filter(isVisibleStaticProject)
          .filter((project) => project.preview)
          .slice(0, 6)
          .flatMap((project) => {
            if (!project.preview) return [];
            const { props } = getImageProps({
              alt: '',
              src: project.preview,
              unoptimized: project.previewUnoptimized,
              quality: 90,
              sizes: projectGridPreviewSizes,
            });

            return [
              {
                href: props.src,
                imageSizes: props.sizes,
                imageSrcSet: props.srcSet,
                title: project.title,
              },
            ];
          })
      : [];

  return (
    <div className="flex flex-1 flex-col">
      {gridPreviewPreloads.map((preload) => (
        <link
          key={preload.href}
          rel="preload"
          as="image"
          href={preload.href}
          imageSizes={preload.imageSizes}
          imageSrcSet={preload.imageSrcSet}
          data-project-preview={preload.title}
        />
      ))}
      <main className="flex-1">
        <Suspense>
          <Projects projects={filteredProjects} />
        </Suspense>
      </main>
    </div>
  );
}
