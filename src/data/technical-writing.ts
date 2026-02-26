export interface TechnicalWritingEntry {
  title: string;
  description: string;
  status: 'published' | 'forthcoming';
  href?: string;
}

export const technicalWriting: TechnicalWritingEntry[] = [
  {
    title: 'Concept-Driven Architecture for AI Agents',
    description:
      'An architectural framework for building AI agents grounded in explicit conceptual reasoning.',
    status: 'published',
  },
  {
    title: 'Notes on NeurIPS 2025',
    description:
      'A summary of the biggest themes from the NeurIPS 2025 conference — what researchers are focused on and where the field is heading.',
    status: 'forthcoming',
  },
  {
    title: 'Bitter Evolution: From Scale to Structure in AI',
    description:
      'An essay tracing how AI research shifted from brute-force scaling to more structured, concept-driven approaches — and why that matters.',
    status: 'forthcoming',
  },
  {
    title: 'How Representation Shapes What Models Can Learn',
    description:
      'An exploration of how the way data is represented determines what AI models can learn, reason about, and get wrong.',
    status: 'forthcoming',
  },
  {
    title: 'Small Models, Structured Tasks',
    description:
      'Testing what small, locally-run AI models can actually handle — where they work, where they break, and what that tells us.',
    status: 'forthcoming',
  },
];
