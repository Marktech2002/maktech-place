import { BookOpenIcon } from '@phosphor-icons/react/ssr';

import { projects } from '~/content/yaqub.mjs';
import { LinkIcon } from '~/src/components/icons';
import CardTitle from '~/src/components/ui/CardTitle';

import Card from './Card';

export default function BukaCard() {
  return (
    <Card className="h-full overflow-visible" containerClassName="overflow-visible">
      <div className="flex h-full flex-col justify-between gap-7 overflow-visible">
        <div className="flex justify-between">
          <CardTitle variant="mono" className="border-panel-border">
            Latest side-project
          </CardTitle>
        </div>
        <div className="flex items-center gap-4 overflow-visible">
          <span className="border-theme-2 bg-theme-4 relative isolate flex h-[73px] w-[72px] shrink-0 items-center justify-center overflow-visible rounded-[15px] border">
            <BookOpenIcon
              className="text-theme-1 [&_.ping]:animate-cfntd-pulse-soft h-11 w-11 shrink-0 overflow-visible **:origin-center **:transform-fill"
              aria-hidden
            />
          </span>
          <div className="font-archivo min-w-0 text-3xl md:text-4xl">
            <a
              className="group flex items-center gap-3 rounded-lg"
              href={projects[0][2]}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="min-w-0 [overflow-wrap:anywhere]">{projects[0][0]}</span>
              <LinkIcon className="group-hover:bg-theme-3 h-8 w-8 shrink-0 rounded-full p-1 transition-all duration-150 md:h-12 md:w-12" />
            </a>
          </div>
        </div>
        <p className="text-text-primary text-sm">
          An exam preparation platform I built to help students study and practise.
        </p>
      </div>
    </Card>
  );
}
