
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  tools: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  skills: string[];
  socials: {
    github?: string;
    linkedin?: string;
    LiveDemo?: string;
  };
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  tags: string[];
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}
