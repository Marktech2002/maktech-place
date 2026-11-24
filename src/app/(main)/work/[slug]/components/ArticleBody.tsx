import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import Image from 'next/image';
import type { ReactNode } from 'react';

import mile12 from '~/public/articles/mile-12/pedestrian-bridge.png';
import canal from '~/public/articles/obalende/canal.png';
import ebuka from '~/public/articles/obalende/ebuka.png';
import justNyki from '~/public/articles/obalende/just-nyki.png';
import ojota from '~/public/articles/obalende/ojota.png';
import marketDrain from '~/public/articles/waste-collection/lagos-market-drain.jpg';
import lawma from '~/public/articles/waste-collection/lawma.png';

import ArticleImagePreview from './ArticleImagePreview';
import Paragraph from './Paragraph';

const photoFrame = 'aspect-[712/401] w-full rounded-lg object-cover';

const posts = [
  { image: justNyki, alt: '@Just_Nyki describes foul-smelling gutters near a Lagos hotel.' },
  { image: ebuka, alt: '@ebukaundisputed describes strong smells while passing through Lagos.' },
  { image: ojota, alt: '@Omo_olodun and a reply describe the smell along a route through Ojota.' },
];

const articlePhotos = new Map([
  [
    'Photo · Obalende Canal, 23 November',
    {
      image: canal,
      alt: 'Refuse fills Obalende Canal beneath the elevated road.',
      caption: 'Obalende Canal, Lagos · 23 November 2026 · Photo by Eniola Daniel',
    },
  ],
  [
    'Photo · Mile 12 Ilele, Kosofe',
    {
      image: mile12,
      alt: 'A pile of refuse beside pedestrians and a parked car at Mile 12.',
      caption:
        'Refuse remaining under the pedestrian bridge at Mile 12 · Photo by Sodeeq Atanda/FIJ',
    },
  ],
  [
    'Photo · Waste collection',
    {
      image: lawma,
      alt: 'Workers load waste into a collection truck beside two bins.',
      caption: 'LAWMA Special Waste Collection Intervention · Daily Public Update',
    },
  ],
  [
    'Photo · A possible route of exposure',
    {
      image: marketDrain,
      alt: 'Waste and green water in an open roadside drain at a Lagos market.',
      caption: (
        <>
          An open roadside drain at a Lagos market, 28 April 2023 ·{' '}
          <a
            className="underline"
            href="https://commons.wikimedia.org/wiki/File:Polluted_Drainage_System.jpg"
          >
            Photo by Frankincense Diala
          </a>
          {' · '}
          <a className="underline" href="https://creativecommons.org/licenses/by-sa/4.0/">
            CC BY-SA 4.0
          </a>
        </>
      ),
    },
  ],
]);

function ObalendeCollage() {
  const canalAlt = 'Refuse fills Obalende Canal beneath the elevated roadway.';
  return (
    <section aria-label="Obalende Canal and accounts from X">
      <figure id="obalende-canal-photo" className="scroll-mt-24 space-y-3">
        <ArticleImagePreview image={canal} alt={canalAlt} className="w-full rounded-lg">
          <Image
            src={canal}
            alt={canalAlt}
            sizes="(min-width: 616px) 576px, calc(100vw - 40px)"
            className={photoFrame}
          />
        </ArticleImagePreview>
        <figcaption className="text-xs">
          Obalende Canal, Lagos · <time dateTime="2026-11-23">23 November 2026</time>
          <span> · Photo by Eniola Daniel</span>
        </figcaption>
      </figure>
      <div
        role="group"
        aria-label="Screenshots of posts on X"
        aria-describedby="obalende-posts-caption"
        className="mt-8 flex flex-col gap-3 sm:flex-row"
      >
        {posts.map(({ image, alt }) => (
          <ArticleImagePreview
            image={image}
            alt={alt}
            key={image.src}
            style={{ flexGrow: image.width / image.height }}
            className="ring-panel-border relative block min-w-0 rounded-lg ring-1 sm:basis-0"
          >
            <Image
              src={image}
              alt={alt}
              sizes="(min-width: 640px) 224px, calc(100vw - 40px)"
              className="block h-auto w-full rounded-lg"
            />
          </ArticleImagePreview>
        ))}
      </div>
      <p id="obalende-posts-caption" className="mt-3 text-xs">
        Posts on X describe smells in different parts of Lagos, including Ojota. Select a screenshot
        to enlarge it.
      </p>
    </section>
  );
}

function inline(text: string, links: Map<string, string>): ReactNode[] {
  return text.split(/(\[[^\]]+\]\[[^\]]+\]|\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, index) => {
    const reference = /^\[([^\]]+)\]\[([^\]]+)\]$/.exec(part);
    if (reference) {
      const href = links.get(reference[2]);
      return href ? (
        <a key={index} href={href} className="text-text-primary underline underline-offset-2">
          {inline(reference[1], links)}
        </a>
      ) : (
        reference[1]
      );
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

export default async function ArticleBody({ slug }: { slug: string }) {
  const source = await readFile(
    join(process.cwd(), `content/${slug}.md`),
    'utf8',
  );
  const links = new Map<string, string>();
  const prose = source.replace(
    /^\[([^\]]+)\]: (https:\/\/\S+|#[a-z][\w-]*|\/work\/[a-z0-9-]+(?:\?from=articles)?)$/gm,
    (_, key: string, url: string) => {
      links.set(key, url);
      return '';
    },
  );
  const [, , ...blocks] = prose.trim().split(/\r?\n\r?\n/);

  return (
    <article className="text-text-secondary max-w-xl space-y-6 text-left text-sm leading-relaxed text-pretty md:space-y-7">
      {blocks.map((block, index) => {
        const media = /^> \*\*((?:Photo|X screenshot \d+) · .+?)\*\*/.exec(block);
        if (media) {
          const [, caption] = media;
          if (caption === 'Photo · Obalende') return <ObalendeCollage key={index} />;
          if (caption.startsWith('X screenshot 1 ·') || caption.startsWith('X screenshot 2 ·'))
            return null;
          const photo = articlePhotos.get(caption);
          if (photo) {
            const { image, alt } = photo;
            return (
              <figure key={index} className="space-y-3">
                <ArticleImagePreview image={image} alt={alt} className="w-full rounded-lg">
                  <Image
                    src={image}
                    alt={alt}
                    sizes="(min-width: 616px) 576px, calc(100vw - 40px)"
                    className={photoFrame}
                  />
                </ArticleImagePreview>
                <figcaption className="text-xs">{photo.caption}</figcaption>
              </figure>
            );
          }
          const isPhoto = caption.startsWith('Photo');
          return (
            <figure key={index} className="space-y-3 py-2">
              <div
                aria-hidden="true"
                className={
                  isPhoto
                    ? 'border-panel-border bg-panel-background aspect-[712/401] rounded-lg border border-dashed'
                    : 'border-panel-border bg-panel-background min-h-28 rounded-lg border border-dashed'
                }
              />
              <figcaption className="text-text-secondary text-xs">{caption}</figcaption>
            </figure>
          );
        }
        if (block === '## References') {
          return (
            <div key={index} className="space-y-8">
              <aside
                aria-labelledby="next-article"
                className="border-panel-border bg-panel-background rounded-lg border p-5"
              >
                <p className="text-text-secondary font-mono text-xs tracking-wider uppercase">
                  Next in the series
                </p>
                <h2 id="next-article" className="text-text-primary mt-2 text-base font-medium">
                  Mapping where waste piles up in Lagos
                </h2>
                <p className="mt-2">
                  In part two, I’ll look at what a map of dated observations can reveal about where
                  waste returns, when a spot is clear, and what to ask the people who collect it.
                </p>
              </aside>
              <h2 className="text-text-primary border-panel-border border-t pt-5 text-base font-medium">
                References
              </h2>
            </div>
          );
        }
        if (block.startsWith('### ')) {
          return (
            <h3 key={index} className="text-text-primary pt-2 font-medium">
              {block.slice(4)}
            </h3>
          );
        }
        if (block.startsWith('## ')) {
          return (
            <h2
              key={index}
              className="text-text-primary border-panel-border border-t pt-5 text-base font-medium"
            >
              {block.slice(3)}
            </h2>
          );
        }
        if (block.startsWith('- ')) {
          return (
            <ul key={index} className="list-disc space-y-2 pl-5">
              {block.split(/\r?\n/).map((line) => (
                <li key={line}>{inline(line.slice(2), links)}</li>
              ))}
            </ul>
          );
        }
        return <Paragraph key={index}>{inline(block, links)}</Paragraph>;
      })}
    </article>
  );
}
