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

  // Experiments
  {
    title: 'Dog/Cat Multi-Classifier',
    date: '2024',
    oneLiner: 'Custom ResNet50 on Oxford-IIIT Pets dataset',
    description:
      'A multi-class image classifier built on ResNet50 architecture, trained on the Oxford-IIIT Pets dataset to distinguish between 37 breeds of cats and dogs.',
    status: 'completed',
    stack: ['Python', 'PyTorch', 'ResNet50', 'HuggingFace Spaces'],
    url: 'https://huggingface.co/spaces/Frantz103/Dog_Cat_multi_classifier',
    tier: 'experiment',
  },
  {
    title: 'YT Audio Transcription',
    date: '2024',
    oneLiner: 'Whisper-based audio transcription pipeline',
    description:
      'A Whisper-powered pipeline for transcribing audio from YouTube videos, built as an experiment in speech-to-text workflows.',
    status: 'completed',
    stack: ['Python', 'Whisper', 'Gradio', 'HuggingFace Spaces'],
    url: 'https://huggingface.co/spaces/Frantz103/YT_Audio_Transcription',
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
