export interface ResearchInterest {
  title: string;
  icon: 'brain' | 'eye' | 'cpu';
  iconColor: string;
  description: string;
}

export const researchInterests: ResearchInterest[] = [
  {
    title: 'AI & Cognitive Systems',
    icon: 'brain',
    iconColor: 'text-indigo-500',
    description:
      'I build frameworks for AI agents that reason through concepts instead of just reacting. I also test small, locally-run models on structured tasks and study how working with AI can extend how we think without replacing it.',
  },
  {
    title: 'Machine Perception',
    icon: 'eye',
    iconColor: 'text-purple-500',
    description:
      'My CaptionQuest app compares how different AI models describe the same image, showing how machines see differently from each other. I study how these models can improve accessibility — testing whether AI-generated captions actually help people who need them.',
  },
  {
    title: 'Experimental Research',
    icon: 'cpu',
    iconColor: 'text-pink-500',
    description:
      'I run hands-on experiments to understand how AI models behave — training image classifiers, comparing models head-to-head, and testing where small models succeed or fail on real tasks.',
  },
];
