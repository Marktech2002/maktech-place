import { profile, socialLinks } from '~/content/yaqub.mjs';
import CopyToClipboard from '~/src/components/CopyToClipboard';
import Button from '~/src/components/ui/Button';
import { portfolioMetadata } from '~/src/lib/portfolioMetadata';

import Header from '../components/Header';

const links = [
  { label: 'X', href: socialLinks.x },
  { label: 'GitHub', href: socialLinks.github },
  { label: 'Instagram', href: socialLinks.instagram },
  { label: 'LinkedIn', href: socialLinks.linkedin },
];

export const metadata = portfolioMetadata({
  title: 'Contact | Yaqub Tawab Olamilekan',
  description:
    'Connect with Yaqub Tawab Olamilekan, a software engineer in Lagos, on LinkedIn, GitHub, X, or Instagram.',
  path: '/contact',
});

export default function Contact() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col px-11 py-8">
        <div className="text-text-primary flex flex-1 flex-col items-center justify-center">
          <h1>Say hi or talk future projects</h1>
          <div className="mb-[100px] flex flex-col items-center gap-6 text-center md:mb-8 md:flex-row">
            <a
              href={socialLinks.linkedin}
              className="font-archivo rounded-lg text-[clamp(2.25rem,2vw+1rem,3.75rem)]"
            >
              {profile.name}
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-1">
            <CopyToClipboard content={socialLinks.linkedin} label="Copy LinkedIn link" />
            {links.map(({ label, ...rest }) => {
              const linkProps = { ...rest, target: '_blank', rel: 'noopener noreferrer' };
              return (
                <Button key={label} asChild>
                  <a {...linkProps}>{label}</a>
                </Button>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
