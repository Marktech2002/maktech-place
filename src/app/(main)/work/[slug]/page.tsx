import { ArrowLeftIcon, ArrowUpRightIcon } from '@phosphor-icons/react/ssr';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { profile, writing } from '~/content/yaqub.mjs';
import DynamicVHVarsSetter from '~/src/components/DynamicVHVarsSetter';
import Image from '~/src/components/ui/Image';
import { portfolioMetadata } from '~/src/lib/portfolioMetadata';

import {
  projects as referenceProjects,
  type ProjectMedia,
  type ProjectMediaItem,
} from '../constants';
import { portfolio } from '../portfolio';
import ArticleBody from './components/ArticleBody';

function hostname(url: string): string {
  const { hostname, pathname } = new URL(url);
  const path = pathname === '/' ? '' : pathname.replace(/\/$/, '');

  return `${hostname}${path}`;
}

function normalizeProjectLink(link: string | { href: string; label: string }): {
  href: string;
  label: string;
} {
  if (typeof link === 'string') {
    return { href: link, label: hostname(link) };
  }

  return link;
}

function getWorkHref(view: string | undefined): string {
  return `/work?view=${view === 'list' ? 'list' : 'grid'}`;
}

function isProjectRow(media: ProjectMedia): media is Extract<ProjectMedia, { type: 'row' }> {
  return typeof media === 'object' && 'type' in media && media.type === 'row';
}

function isProjectVideo(
  media: ProjectMediaItem,
): media is Extract<ProjectMediaItem, { type: 'video' }> {
  return typeof media === 'object' && 'type' in media && media.type === 'video';
}

function isProjectImage(
  media: ProjectMediaItem,
): media is Extract<ProjectMediaItem, { type: 'image' }> {
  return typeof media === 'object' && 'type' in media && media.type === 'image';
}

const mediaSizes =
  '(min-width: 1536px) 1064px, (min-width: 1024px) calc(100vw - 472px), calc(100vw - 40px)';
const rowMediaSizes =
  '(min-width: 1536px) 522px, (min-width: 1024px) calc((100vw - 492px) / 2), (min-width: 640px) calc((100vw - 60px) / 2), calc(100vw - 40px)';

function ProjectMediaFigure({
  item,
  priority = false,
  sizes = mediaSizes,
}: {
  item: ProjectMediaItem;
  priority?: boolean;
  sizes?: string;
}) {
  if (isProjectVideo(item)) {
    return (
      <figure className="flex min-w-0 flex-col gap-2">
        <video
          src={item.src}
          className="max-h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
        {item.caption && (
          <figcaption className="text-text-secondary text-center text-xs text-pretty">
            {item.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  const image = isProjectImage(item) ? item.src : item;
  const caption = isProjectImage(item) ? item.caption : undefined;

  return (
    <figure className="flex min-w-0 flex-col gap-2">
      <Image
        priority={priority}
        src={image}
        alt={caption ?? ''}
        quality={90}
        sizes={sizes}
        placeholder={image.blurDataURL ? 'blur' : 'empty'}
        className="focus-within:outline-theme-1 max-h-full w-full object-cover"
      />
      {caption && (
        <figcaption className="text-text-secondary text-center text-xs text-pretty">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = writing.find((item) => item.slug === slug);
  const entry = portfolio.find((project) => project.slug === slug);
  if (!entry) return { robots: { index: false } };

  const description = Array.isArray(entry.description)
    ? `${entry.description[0]}. ${entry.description[1]}`
    : String(entry.description ?? '');

  return portfolioMetadata({
    title: entry.title,
    description,
    path: `/work/${slug}`,
    ...(article
      ? {
          image: '/articles/obalende/canal.png',
          imageAlt: 'Obalende Canal in Lagos. Photo by Eniola Daniel.',
          publishedTime: article.publishedAt,
        }
      : {}),
  });
}

export default async function Work({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ view?: string; from?: string }>;
}) {
  const { slug } = await params;
  const article = writing.find((item) => item.slug === slug);
  const { view, from } = await searchParams;
  const backHref =
    from === 'articles' && article
      ? view === 'table'
        ? '/articles?view=table'
        : '/articles'
      : getWorkHref(view);

  if (article) {
    const date = new Intl.DateTimeFormat('en-GB', {
      dateStyle: 'long',
      timeZone: 'UTC',
    }).format(new Date(article.publishedAt));

    return (
      <main className="mx-auto w-full max-w-[616px] flex-1 px-5 pt-8 pb-36 sm:pt-12">
        <header className="border-panel-border mb-8 border-b pb-7 sm:mb-10">
          <Link
            href={backHref}
            className="text-text-secondary hover:text-text-primary inline-flex items-center gap-2 rounded-sm text-sm"
          >
            <ArrowLeftIcon className="size-4" />
            {from === 'articles' ? 'Back to articles' : 'Back to work'}
          </Link>
          <h1 className="font-archivo text-text-primary mt-6 text-[clamp(2rem,6vw,3.25rem)] leading-[1.08] tracking-tight text-balance">
            {article.title}
          </h1>
          <p className="text-text-secondary mt-4 text-base leading-relaxed text-pretty">
            {article.description}
          </p>
          <p className="text-text-secondary mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
            <span>{profile.name}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.publishedAt}>{date}</time>
          </p>
        </header>
        <ArticleBody slug={article.slug} />
      </main>
    );
  }

  const referenceProject = referenceProjects.find(
    (entry) =>
      entry.type === 'project' &&
      entry.slug === slug &&
      (process.env.NODE_ENV === 'development' || !entry.hidden),
  );
  const project =
    portfolio.find((entry) => entry.slug === slug) ??
    (referenceProject?.type === 'project' ? referenceProject : undefined);

  if (!project) {
    notFound();
  }

  const media = project.images ?? [];
  const projectLinks = [...(project.link ? [project.link] : []), ...(project.links ?? [])].map(
    normalizeProjectLink,
  );

  return (
    <>
      <DynamicVHVarsSetter />
      <div className="grid flex-1 grid-cols-1 gap-8 px-5 py-10 pb-[200px] lg:grid-cols-[400px_1fr] [html:has(&)_footer>*:not(.nav)]:invisible">
        <div className="top-[100px] flex h-full max-h-[calc(100dvh-200px)] flex-col lg:sticky">
          <div className="flex items-center gap-3">
            <Link href={backHref} aria-label="Go back" className="shrink-0">
              <ArrowLeftIcon className="size-5" />
            </Link>
            <h1 className="text-foreground max-w-xl text-left text-sm font-medium text-pretty">
              {project.title}
            </h1>
          </div>
          <div className="scroll-fade-y scrollbar-thumb-theme-2 mt-1 flex min-h-0 scrollbar-thin scrollbar-track-transparent flex-col gap-3 overflow-x-hidden overflow-y-auto pl-8">
            <div className="text-text-secondary max-w-xl space-y-3 text-left text-sm text-pretty">
              {Array.isArray(project.description)
                ? project.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                : project.description}
            </div>
            {projectLinks.length > 0 && (
              <div className="border-theme-3 divide-theme-3 divide-y border-y">
                {projectLinks.map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group/link hover:bg-theme-4 focus-visible:bg-theme-4 relative z-20 flex w-full items-center justify-between gap-3 py-1.5 pr-2 pl-0 text-sm text-white outline-offset-2 transition-[padding,background-color] duration-150 hover:pl-1 hover:text-white focus-visible:pl-1 focus-visible:text-white focus-visible:outline-none!"
                  >
                    <span className="truncate">{label}</span>
                    <ArrowUpRightIcon className="size-3 shrink-0 translate-x-1 opacity-0 blur-[2px] transition-all duration-150 group-hover/link:translate-x-0 group-hover/link:opacity-100 group-hover/link:blur-none group-focus-visible/link:translate-x-0 group-focus-visible/link:opacity-100 group-focus-visible/link:blur-none" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {media.map((item, i) => {
            if (isProjectRow(item)) {
              return (
                <div key={i} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {item.items.map((rowItem, rowIndex) => (
                    <ProjectMediaFigure key={rowIndex} item={rowItem} sizes={rowMediaSizes} />
                  ))}
                </div>
              );
            }

            return <ProjectMediaFigure key={i} item={item} priority={i === 0} />;
          })}
        </div>
      </div>
    </>
  );
}
