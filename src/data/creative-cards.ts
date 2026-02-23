export interface CreativeCard {
  title: string;
  description: string;
  url: string;
  cta: string;
  tag: string;
}

export const creativeCards: CreativeCard[] = [
  {
    title: 'Frantz Photography',
    description:
      'Editorial fashion, documentary narratives, and visual essays exploring identity through clothing, gesture, and light. The emotional side of my work.',
    url: 'https://frantzphotography.com',
    cta: 'Visit Frantz Photography',
    tag: 'Imagery & Emotion',
  },
  {
    title: 'Frantz Studio',
    description:
      'Creative tooling, AI assisted experiments, design systems, and technical projects developed as part of my creative practice. This is the applied side of my work and research.',
    url: 'https://frantzstudio.com/',
    cta: 'Explore Frantz Studio',
    tag: 'Tools & Systems',
  },
];
