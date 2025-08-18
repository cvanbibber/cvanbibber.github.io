export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  images: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: 'hardware' | 'software' | 'research' | 'cad';
  date: string;
  status: 'completed' | 'in-progress' | 'planned';
}

export interface Skill {
  name: string;
  category: 'programming' | 'hardware' | 'software' | 'analysis';
  icon: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
  achievements: string[];
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'impedance' | 'power' | 'transmission' | 'antenna' | 'general';
  inputs: ToolInput[];
  calculate: (inputs: Record<string, number>) => Record<string, number>;
}

export interface ToolInput {
  id: string;
  label: string;
  unit: string;
  type: 'number';
  min?: number;
  max?: number;
  default?: number;
}
