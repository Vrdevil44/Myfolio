import type { ResumeProject } from '$lib/types/resume';

export const filterProjects = (
  projects: ResumeProject[],
  selectedFilter: string
): ResumeProject[] => {
  const normalizedFilter = selectedFilter?.trim();

  if (!normalizedFilter || normalizedFilter === 'All') {
    return projects;
  }

  return projects.filter((project) =>
    (project.tags ?? []).includes(normalizedFilter)
  );
};
