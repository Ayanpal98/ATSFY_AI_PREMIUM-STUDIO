export interface Service {
  id: string;
  title: string;
  iconName: string;
  description: string;
  longDescription: string;
  features: string[];
  featuresLabel?: string;
  idealFor?: string[];
  techStack: string[];
  impactMetric: string;
}

export type IndustryType = 'Education' | 'Healthcare' | 'Hiring' | 'Finance' | 'Startup Intelligence' | 'Sustainability';

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  challenge: string;
  solution: string;
  techStack: string[];
  impact: string[];
  clientQuote?: string;
  clientAuthor?: string;
  clientRole?: string;
  metricLabel: string;
  metricValue: string;
  capabilities?: string[];
  imageUrl?: string;
  businessOutcome?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or long-form rich text content
  category: string;
  readTime: string;
  date: string;
  imageUrl?: string;
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
}

export interface AiProposal {
  productName: string;
  executiveSummary: string;
  architecture: string;
  mvpScope: string[];
  estimatedEffort: string;
  responsibleAI: string;
  nextStep: string;
}

export interface Lead {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  company: string;
  idea: string;
  industry: string;
  budget: string;
  timeline: string;
  selectedDate: string;
  selectedTime: string;
  aiProposal: AiProposal | null;
  status: string;
}
