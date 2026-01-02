
export enum ModuleId {
  Intro = 'intro',
  Workspace = 'workspace',
  Frontend = 'frontend',
  Backend = 'backend',
  Automation = 'automation',
  FinalProject = 'final-project'
}

export type ViewType = 'curriculum' | 'prompts' | 'glossary' | 'cases' | 'graduation' | 'sandbox' | 'auditor';

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
  imagePrompt: string;
  videoUrl?: string;
}

export interface ModuleData {
  id: ModuleId;
  title: string;
  description: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
  checklist: string[];
  introVideo?: string;
}

export interface Tool {
  name: string;
  category: 'IDEs' | 'Frontend' | 'Backend' | 'Automation' | 'Models' | 'Research' | 'Deployment' | 'Design' | 'AI Services' | 'Testing' | 'Assets' | 'Communication' | 'Workspace' | 'Orchestration' | 'Planning';
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

export interface VibeManifesto {
  palette: string[];
  fonts: string[];
  vibeDescription: string;
}
