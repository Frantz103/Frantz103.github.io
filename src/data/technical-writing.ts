export interface TechnicalWritingEntry {
  title: string;
  description: string;
  status: 'published' | 'forthcoming';
  href?: string;
}

export const technicalWriting: TechnicalWritingEntry[] = [
  {
    title: 'The CDAA Manifesto: Concept-Driven Agent Architecture',
    description:
      'Foundational document for CDAA — an architectural framework for building AI agents grounded in explicit conceptual reasoning.',
    status: 'published',
  },
  {
    title: 'NeurIPS 2025 Synthesis: Key Themes and Takeaways',
    description:
      'A structured synthesis of major themes from NeurIPS 2025, covering scaling laws, agent architectures, and emerging research directions.',
    status: 'forthcoming',
  },
  {
    title: 'The Bitter Evolution: From Scaling Laws to Conceptual Architecture',
    description:
      'An essay tracing the trajectory from Sutton\'s "Bitter Lesson" through current scaling debates to the case for concept-driven systems.',
    status: 'forthcoming',
  },
  {
    title: 'Representation, Computation, and Inference',
    description:
      'A technical exploration of how representation shapes what models can learn, compute, and infer — bridging cognitive science and ML.',
    status: 'forthcoming',
  },
  {
    title: 'Local LLM Comparative Study: Small Models, Structured Tasks',
    description:
      'Systematic evaluation of local models (Qwen3-0.6B, Phi-3, Gemma) on structured reasoning tasks, with analysis of failure modes and practical thresholds.',
    status: 'forthcoming',
  },
];
