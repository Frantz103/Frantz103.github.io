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
      'I developed the Concept-Driven Agent Architecture (CDAA), a framework for building AI agents grounded in explicit conceptual reasoning rather than purely reactive behavior. My work evaluates local models like Qwen3-0.6B for structured tasks and explores how human-AI collaboration can extend individual cognition without replacing it.',
  },
  {
    title: 'Machine Perception',
    icon: 'eye',
    iconColor: 'text-purple-500',
    description:
      'My CaptionQuest app on HuggingFace compares how different captioning models describe the same image, revealing systematic differences in machine perception. I study how multimodal models can serve accessibility applications — evaluating AI-generated captions against POUR principles to understand where they help and where they fall short.',
  },
  {
    title: 'Experimental Research',
    icon: 'cpu',
    iconColor: 'text-pink-500',
    description:
      'I treat LLMs as simulation engines for behavioral modeling and run comparative evaluations across model families. My experiments include a custom ResNet50 classifier trained on Oxford-IIIT Pets, explorations of HuggingGPT-style orchestration, and systematic studies of how local models handle structured reasoning tasks.',
  },
];
