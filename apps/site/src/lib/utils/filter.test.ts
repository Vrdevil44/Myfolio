import { describe, expect, it } from 'vitest';

import type { ResumeProject } from '$lib/types/resume';
import { filterProjects } from './filter';

const projects: ResumeProject[] = [
  {
    name: 'Svelte Playground',
    description: 'UI experiments',
    tags: ['Svelte', 'UI'],
  },
  { name: 'Backend API', description: 'API work', tags: ['API', 'Node'] },
  { name: 'Untagged', description: 'Missing tags' },
];

describe('filterProjects', () => {
  it('returns all projects when filter is All', () => {
    expect(filterProjects(projects, 'All')).toEqual(projects);
  });

  it('returns all projects when filter is empty', () => {
    expect(filterProjects(projects, '')).toEqual(projects);
  });

  it('filters projects by matching tag', () => {
    expect(filterProjects(projects, 'Svelte')).toEqual([projects[0]]);
  });

  it('ignores projects without tags when filtering', () => {
    expect(filterProjects(projects, 'API')).not.toContain(projects[2]);
  });
});
