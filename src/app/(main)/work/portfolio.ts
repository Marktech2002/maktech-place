import { jobs, projects, writing } from '~/content/yaqub.mjs';

import type { StaticProject } from './constants';

function slug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-$/, '');
}

export const portfolio: StaticProject[] = [
  ...projects.map(([title, description, link]): StaticProject => ({
    type: 'project',
    title,
    slug: slug(title),
    description,
    link,
    filters: ['digital'],
  })),
  ...jobs.map(([company, role, achievements]): StaticProject => ({
    type: 'project',
    title: company,
    slug: slug(company),
    description: [role, ...achievements],
    filters: ['experience'],
  })),
  ...writing.map((article): StaticProject => ({
    type: 'project',
    title: article.title,
    slug: article.slug,
    description: article.description,
    filters: ['writing'],
  })),
];
