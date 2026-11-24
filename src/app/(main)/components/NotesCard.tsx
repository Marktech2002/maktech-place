import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { article } from '~/content/yaqub.mjs';
import CardTitle from '~/src/components/ui/CardTitle';

import Card from './Card';

export default function NotesCard() {
  return (
    <Card className="">
      <div className="flex flex-col justify-between gap-5">
        <CardTitle variant="mono">Notes</CardTitle>
        <p className="text-text-primary text-sm leading-5">
          What walking through Lagos made me ask about waste collection.{' '}
          <Link
            href={`/work/${article.slug}`}
            className="group text-text-secondary hover:text-text-primary inline-flex items-center gap-0.5 rounded transition-colors"
          >
            {article.title}
            <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        </p>
      </div>
    </Card>
  );
}
