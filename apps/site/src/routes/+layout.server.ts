import { loadResume } from '$lib/server/resume';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
  const resume = await loadResume();

  return {
    resume
  };
};
