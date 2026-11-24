import { InstagramLogoIcon } from '@phosphor-icons/react/ssr';
import Link from 'next/link';

import { profile, socialLinks } from '~/content/yaqub.mjs';
import PortraitSrc from '~/public/home/yaqub.png';
import { ArrowRightIcon, GithubIcon, LinkedinIcon, TwitterIcon } from '~/src/components/icons';
import Button from '~/src/components/ui/Button';
import Image from '~/src/components/ui/Image';
import TextLink from '~/src/components/ui/TextLink';

import Card from './Card';

import './cards.css';

const social = [
  {
    url: socialLinks.x,
    Icon: TwitterIcon,
    attrs: { 'aria-label': 'Go to X' },
  },
  {
    url: socialLinks.github,
    Icon: GithubIcon,
    attrs: { 'aria-label': 'Go to GitHub' },
  },
  {
    url: socialLinks.linkedin,
    Icon: LinkedinIcon,
    attrs: { 'aria-label': 'Go to LinkedIn' },
  },
  {
    url: socialLinks.instagram,
    Icon: InstagramLogoIcon,
    attrs: { 'aria-label': 'Go to Instagram' },
  },
];

export default function BioCard() {
  return (
    <Card className="bg-panel-background flex flex-1 flex-col gap-4">
      <div className="relative shrink-0" style={{ aspectRatio: '2494 / 1569' }}>
        <Image
          alt={profile.name}
          src={PortraitSrc}
          placeholder="blur"
          fill
          className="rounded-md object-cover object-[center_35%]"
          loading="eager"
          sizes="(max-width: 768px) 100vw, 768px"
          priority
        />
        <div className="bg-panel-overlay absolute top-0 left-0 h-full w-full rounded-md transition-colors duration-200" />
      </div>

      <p className="panel text-text-primary text-sm leading-6">
        I&apos;m a software engineer based in Lagos, Nigeria. Higly dedicated and motivated to solve
        real world problems. A first-class Computer science graduate with 3+ years of experience in software
        engineering. I&apos;m passionate about building scalable and maintainable software.
        Outside of backend work, I&apos;m interested in frontend development, design, AI, big data and geospatial
        technology. You can find my code on{' '}
        <TextLink
          className="hover:text-theme-1 font-semibold underline decoration-from-font underline-offset-2"
          href={socialLinks.github}
        >
          GitHub
        </TextLink>
        .
      </p>
      <div className="text-text-primary mt-4 flex flex-col items-start justify-between md:flex-row md:items-center">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm">See what I&apos;ve been doing on</span>
          <div className="flex gap-2">
            {social.map(({ url, Icon, attrs }) => (
              <a
                target="_blank"
                rel="noreferrer noopener"
                key={url}
                href={`${url}`}
                className="hover text-theme-2 hover:text-theme-1 cursor-pointer rounded-full transition-all duration-200"
                {...attrs}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
        <Button className="mt-10 md:mt-0" iconRight={<ArrowRightIcon />} asChild>
          <Link href="/contact">Let&apos;s talk</Link>
        </Button>
      </div>
    </Card>
  );
}
