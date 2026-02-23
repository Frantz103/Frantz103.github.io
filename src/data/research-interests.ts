export interface ResearchInterest {
  title: string;
  icon: 'brain' | 'eye' | 'cpu';
  iconColor: string;
  points: string[];
}

export const researchInterests: ResearchInterest[] = [
  {
    title: 'AI & Cognitive Systems',
    icon: 'brain',
    iconColor: 'text-indigo-500',
    points: [
      'Local AI deployment and personal fine-tuning workflows',
      'AI writing tools and human-AI collaboration',
      'Machine learning systems that learn from individual users',
    ],
  },
  {
    title: 'Machine Perception',
    icon: 'eye',
    iconColor: 'text-purple-500',
    points: [
      'Computer vision applications for web accessibility',
      'Machine understanding of visual and textual content',
      'Computational approaches to human perception',
    ],
  },
  {
    title: 'Experimental Research',
    icon: 'cpu',
    iconColor: 'text-pink-500',
    points: [
      'Classical AI methods and symbolic systems',
      'LLMs as simulation engines for behavioral modeling',
      'Cognitive science experiments using computational tools',
    ],
  },
];
