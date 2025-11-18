import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { parse } from 'yaml';

import type { Resume } from '../types/resume';

const resumePath = resolve(process.cwd(), '..', '..', 'content', 'resume.yaml');

export async function loadResume(): Promise<Resume> {
  const file = await readFile(resumePath, 'utf-8');
  const data = parse(file) as Resume;
  return data;
}
