export type ResumeExperience = {
  role: string;
  company: string;
  timeframe: string;
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

export type ResumeProject = {
  name: string;
  description: string;
};

export type ResumeReference = {
  name: string;
  contact: string;
};

export type Resume = {
  summary: string;
  skills: string[];
  experience: ResumeExperience[];
  education: ResumeEducation[];
  certifications: ResumeCertification[];
  projects: ResumeProject[];
  references: ResumeReference[];
};
