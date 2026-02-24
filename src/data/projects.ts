export interface Project {
  title: string;
  date: string;
  oneLiner: string;
  description: string;
  status: 'active' | 'completed' | 'paused' | 'in-progress';
  stack: string[];
  url?: string;
  links?: { label: string; href: string }[];
  tier: 'featured' | 'experiment' | 'notebook';
}

export const projects: Project[] = [
  // Featured
  {
    title: 'CaptionQuest',
    date: '2024',
    oneLiner: 'Comparing how AI models describe images',
    description:
      'A Gradio application that runs multiple image captioning models side-by-side on the same input, revealing systematic differences in how machines perceive and describe visual content. Built to support research on machine perception and accessibility.',
    status: 'active',
    stack: ['Python', 'Gradio', 'HuggingFace Spaces', 'Transformers'],
    url: 'https://huggingface.co/spaces/Frantz103/CaptionQuest',
    tier: 'featured',
  },
  {
    title: 'Concept-Driven Agent Architecture (CDAA)',
    date: '2025',
    oneLiner: 'A framework for conceptually grounded AI agents',
    description:
      'CDAA is an architectural framework for building AI agents that reason through explicit conceptual structures rather than purely reactive behavior. It integrates structured knowledge representation with agentic workflows to produce more interpretable and controllable systems.',
    status: 'active',
    stack: ['Python', 'LLM Orchestration', 'Agent Architecture'],
    tier: 'featured',
  },
  {
    title: 'AI Programming Architecture',
    date: '2025',
    oneLiner: 'Plain English as source code, intent separated from execution',
    description:
      'A series of 7 original architecture documents proposing a new approach to building software with AI — where natural language serves as the actual source code, intent is kept strictly separate from execution, and developers define what a system should do while machines handle how. Includes a working proof of concept built on the same principles.',
    status: 'active',
    stack: ['Architecture', 'AI-Assisted Development', 'Natural Language', 'System Design'],
    tier: 'featured',
  },
  {
    title: 'Image Captioning for Accessibility',
    date: '2024',
    oneLiner: 'Evaluating AI captions against POUR accessibility principles',
    description:
      'A research project evaluating AI-generated image captions through the lens of web accessibility — replicating experiments from Leotta et al. on automatic captioning effectiveness. Started with a 4-model baseline on HuggingFace, now expanding to WCAG POUR evaluations across model families.',
    status: 'in-progress',
    stack: ['Python', 'Accessibility', 'WCAG', 'Multimodal AI'],
    url: 'https://github.com/Frantz103/image-caption-accessibility',
    links: [
      { label: 'Colab: POUR Evaluation', href: 'https://colab.research.google.com/drive/1bBIETwRPOSPTuckZ3VLptFPrqGbi9TqK?authuser=1' },
      { label: 'Colab: Caption Analysis', href: 'https://colab.research.google.com/drive/13O9fOQhkIMRFOcKwTFR_JNXY0zKuqkLE?usp=sharing' },
    ],
    tier: 'featured',
  },
  {
    title: 'Memorization-Generalization Spectrum',
    date: '2024',
    oneLiner: 'A Four Anchor framework for quantifying how models learn',
    description:
      'A novel experimental framework that positions any ML model on the spectrum between memorization and generalization. Uses four deliberately constructed anchor models — degenerate, underfit, overfit, and collapsed — to produce a composite metric revealing how a model learns, not just how well. Grounded in work by Arpit, Zhang, Carlini, and Power et al. on grokking.',
    status: 'in-progress',
    stack: ['Python', 'ML Theory', 'PyTorch', 'Experimental Design'],
    tier: 'featured',
  },
  {
    title: 'Digital Mirror',
    date: '2025',
    oneLiner: 'Personal knowledge graph from a decade of data',
    description:
      'A personal data indexing and analysis system that processes 509K+ objects across iCloud, notes, and filesystem exports. Includes 6,360 analyzed conversations, a 24K-node knowledge graph, and a Gemma-powered NLP annotation pipeline for topic modeling and entity extraction.',
    status: 'active',
    stack: ['Python', 'Gemma', 'NLP', 'Knowledge Graphs', 'BM25'],
    tier: 'featured',
  },
  {
    title: 'AccessCopilot',
    date: '2025',
    oneLiner: 'AI accessibility agent auditing against POUR principles',
    description:
      'An AI-powered accessibility agent designed to audit digital content against POUR principles. Full MVP specification with Next.js frontend, FastAPI backend, GPT-4/Claude for analysis, and PGVector for semantic search — bridging years of CPACC certification and accessibility research into a deployable product.',
    status: 'in-progress',
    stack: ['Next.js', 'FastAPI', 'GPT-4', 'Claude', 'PGVector', 'Accessibility'],
    tier: 'featured',
  },

  {
    title: 'Qwen3-VL MoE Computational Aesthetics Evaluation',
    date: '2025',
    oneLiner: 'Evaluating vision-language models on aesthetic judgment',
    description:
      'An experiment using Qwen3-VL mixture-of-experts models to evaluate computational aesthetics — testing whether multimodal models can make meaningful aesthetic judgments about images and how their responses compare to human perception.',
    status: 'completed',
    stack: ['Python', 'Qwen3-VL', 'MoE', 'Computational Aesthetics'],
    url: 'https://colab.research.google.com/drive/1_KvVB2HOEKa3zCC3oB_px2-XgnDrM1mE?usp=sharing',
    tier: 'experiment',
  },

  // Notebooks
  {
    title: 'HuggingFace Profile',
    date: '2024–present',
    oneLiner: 'Full collection of models, spaces, and datasets',
    description:
      'My complete HuggingFace profile with all published models, Spaces, and datasets from ongoing ML experiments.',
    status: 'active',
    stack: ['HuggingFace'],
    url: 'https://huggingface.co/Frantz103',
    tier: 'notebook',
  },
  {
    title: 'GitHub Profile',
    date: '2015–present',
    oneLiner: 'Source code, research repos, and open-source work',
    description:
      'My GitHub profile with source code for research projects, ML experiments, and open-source contributions.',
    status: 'active',
    stack: ['GitHub'],
    url: 'https://github.com/Frantz103',
    tier: 'notebook',
  },
];

export function getProjectsByTier(tier: Project['tier']): Project[] {
  return projects.filter((p) => p.tier === tier);
}
