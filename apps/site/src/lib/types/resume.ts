export type ResumeExperience = {
  role: string;
  company: string;
  timeframe: string;
  location?: string;
  icon?: string;
  highlights?: string[];
};

export type ResumeEducation = {
  title: string;
  institution: string;
};

export type ResumeCertification = {
  title: string;
  issuer: string;
};

export type ResumeProjectLink = {
  label: string;
  url: string;
};

export type ResumeProject = {
  name: string;
  description: string;
  category?: string;
  tags?: string[];
  cover?: string;
  links?: ResumeProjectLink[];
};

export type ResumeReference = {
  name: string;
  contact: string;
};

export type ResumeSkillCategory = {
  name: string;
  tools: string[];
  intensity?: number;
};

export type ResumeBlogPost = {
  title: string;
  summary: string;
  href: string;
};

export type Resume = {
  tagline?: string;
  summary: string;
  skills: ResumeSkillCategory[];
  experience: ResumeExperience[];
  education: ResumeEducation[];
  certifications: ResumeCertification[];
  projects: ResumeProject[];
  references: ResumeReference[];
  blog?: ResumeBlogPost[];
};
