
export enum ModuleId {
  Intro = 'intro',
  Workspace = 'workspace',
  Frontend = 'frontend',
  Backend = 'backend',
  Automation = 'automation',
  FinalProject = 'final-project'
}

export type ViewType = 'curriculum' | 'prompts' | 'glossary' | 'cases' | 'graduation';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Lesson {
  title: string;
  conceptTitle: string;
  conceptAnalogy: string;
  conceptDescription: string;
  instructions: string[];
  visualGuideDescription: string;
  imagePrompt: string; // Used for the AI image generator
  videoUrl?: string; // YouTube embed URL
}

export interface ModuleData {
  id: ModuleId;
  title: string;
  description: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
  introVideo?: string;
}

export interface Tool {
  name: string;
  category: string;
  description: string;
  link?: string;
}

export interface PromptTemplate {
  title: string;
  scenario: string;
  template: string;
  category: 'Design' | 'Logic' | 'Debugging';
}

export interface GlossaryItem {
  term: string;
  definition: string;
}

export interface CaseStudy {
  title: string;
  description: string;
  vibe: string;
  outcome: string;
  imagePrompt: string;
}
