export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: 'spark' | 'brain' | 'pen' | 'code' | 'lab' | 'eye' | 'mic' | 'blocks' | 'search';
  links?: { label: string; href: string }[];
}

export const timelineEvents: TimelineEvent[] = [
  {
    year: '2015',
    title: 'First MNIST Experiment',
    icon: 'spark',
    description:
      'Wrote a first MNIST classifier — the "hello world" of machine learning. A self-directed leap back into code after years in content marketing, driven by a persistent love of programming and curiosity about deep learning.',
    links: [
      {
        label: 'LinkedIn post',
        href: 'https://www.linkedin.com/posts/frantz103_3-years-ago-i-wrote-my-first-hello-word-activity-6267748647509716992-6D2c',
      },
    ],
  },
  {
    year: '2017',
    title: 'AI Will Make Coding Easy',
    icon: 'brain',
    description:
      'Predicted that AI would soon make coding accessible to everyone — years before GPT or Copilot existed. An early conviction that shaped the direction of everything that followed.',
    links: [
      {
        label: 'LinkedIn post',
        href: 'https://www.linkedin.com/posts/frantz103_coding-is-over-activity-6153270649403031553-x7IK',
      },
    ],
  },
  {
    year: '2017',
    title: 'The Case for AI in SEO',
    icon: 'pen',
    description:
      'Published an early argument for why SEO specialists should make the jump to AI — recognizing that Google was already using machine learning and neural networks to reshape search.',
    links: [
      {
        label: 'LinkedIn post',
        href: 'https://www.linkedin.com/posts/frantz103_machine-learning-neural-networks-the-real-activity-6268074727479218176-nge8',
      },
    ],
  },
  {
    year: '2018',
    title: 'Generative Art Program',
    icon: 'code',
    description:
      'Built a program that creates digital paintings and illustrations autonomously — drawing at random or transforming input images into digital art. Early exploration of computational creativity.',
    links: [
      {
        label: 'LinkedIn post',
        href: 'https://www.linkedin.com/feed/update/urn:li:activity:6459205375498014720/',
      },
    ],
  },
  {
    year: '2019',
    title: 'Traditional SEO is Dying',
    icon: 'pen',
    description:
      'Published a piece on how RankBrain, Google Lens, and voice search were signaling the end of traditional SEO — arguing that machine learning was already reshaping how search worked.',
  },
  {
    year: '2019',
    title: 'Juno iPad Python Notebooks',
    icon: 'code',
    description:
      'Ran Python notebooks on iPad using Juno — web crawling, SEO auditing, and data analysis scripts. An early move toward mobile-first development and portable computing workflows.',
  },
  {
    year: '2020',
    title: 'IAAP CPACC Certification',
    icon: 'spark',
    description:
      'Earned the Certified Professional in Accessibility Core Competencies (CPACC) from IAAP — laying the foundation for all later research on AI-generated captions and POUR accessibility principles.',
  },
  {
    year: '2022',
    title: '100 Days of ML Challenge',
    icon: 'brain',
    description:
      'Launched a structured 100-day ML challenge on Dec 18, 2022. Used ChatGPT from Day 1 for study plans and code guidance — covering GANs, neural style transfer, PyTorch, and ML fundamentals.',
  },
  {
    year: '2023',
    title: 'FastAI Course Completed',
    icon: 'brain',
    description:
      'Completed "Practical Deep Learning for Coders" by FastAI. Built a bird image classifier after the first hour of lecture. Top-down learning paradigm that unlocked rapid prototyping.',
  },
  {
    year: '2023',
    title: 'WikiArt Art Classifier',
    icon: 'lab',
    description:
      'Attempted training an image classifier on 80K+ art images (33GB) to identify genre, style, and artist. Hit compute and memory limits on Google Colab — pivoted to simpler projects but gained hard lessons in large-scale data handling.',
  },
  {
    year: '2023',
    title: 'GPT-4 & LLM API Experiments',
    icon: 'code',
    description:
      'Paused the ML challenge to experiment with GPT-4 API access, ChatGPT Code Interpreter, and early plugin systems from OpenAI, Google (Bard), and Cohere.',
  },
  {
    year: '2023',
    title: 'Cat/Dogs Classifier',
    icon: 'lab',
    description:
      'First binary classifier — a FastAI experiment distinguishing cats from dogs.',
    links: [
      {
        label: 'HF Space',
        href: 'https://huggingface.co/spaces/Frantz103/Cat_Dogs_classifier',
      },
    ],
  },
  {
    year: '2023',
    title: 'Dog/Cat Multi-Classifier',
    icon: 'lab',
    description:
      'Custom ResNet50 trained on Oxford-IIIT Pets dataset for 37-breed classification.',
    links: [
      {
        label: 'HF Space',
        href: 'https://huggingface.co/spaces/Frantz103/Dog_Cat_multi_classifier',
      },
    ],
  },
  {
    year: '2023',
    title: '100 Days of ML — Medium Blog Post',
    icon: 'pen',
    description:
      'Published a detailed account of the entire 100 Days of ML journey on Medium — documenting what worked, what didn\'t, and what changed along the way.',
    links: [
      {
        label: 'Medium',
        href: 'https://medium.com/@AugustinCaz/my-100-days-of-machine-learning-challenge-cd637083d55d',
      },
    ],
  },
  {
    year: '2023',
    title: 'CaptionQuest',
    icon: 'eye',
    description:
      'Built a Gradio app comparing 4 captioning models side-by-side, revealing systematic differences in machine perception.',
    links: [
      {
        label: 'HF Space',
        href: 'https://huggingface.co/spaces/Frantz103/CaptionQuest',
      },
    ],
  },
  {
    year: '2023',
    title: 'Image Captioning for Accessibility',
    icon: 'eye',
    description:
      'Research project evaluating AI captions against POUR principles, replicating experiments from Leotta et al.',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/Frantz103/image-caption-accessibility',
      },
      {
        label: 'Colab: POUR Evaluation',
        href: 'https://colab.research.google.com/drive/1bBIETwRPOSPTuckZ3VLptFPrqGbi9TqK?authuser=1',
      },
      {
        label: 'Colab: Caption Analysis',
        href: 'https://colab.research.google.com/drive/13O9fOQhkIMRFOcKwTFR_JNXY0zKuqkLE?usp=sharing',
      },
    ],
  },
  {
    year: '2023',
    title: 'Synthetic Data Rottweiler Classifier',
    icon: 'lab',
    description:
      'Used Midjourney-generated synthetic images to train a YOLO + ResNet50 ensemble for breed classification. Tackled imbalanced datasets, data augmentation, and weighted loss functions.',
  },
  {
    year: '2024',
    title: 'Memorization-Generalization Spectrum Research',
    icon: 'search',
    description:
      'Designed a novel Four Anchor experimental framework to quantify where any ML model sits on the spectrum between memorization and generalization — using degenerate, underfit, overfit, and collapsed models as reference points to produce a composite positioning metric.',
  },
  {
    year: '2024',
    title: 'YT Audio Transcription',
    icon: 'mic',
    description:
      'Whisper-based pipeline for transcribing YouTube audio.',
    links: [
      {
        label: 'HF Space',
        href: 'https://huggingface.co/spaces/Frantz103/YT_Audio_Transcription',
      },
    ],
  },
  {
    year: '2025',
    title: 'Concept-Driven Agent Architecture (CDAA)',
    icon: 'blocks',
    description:
      'Developed an architectural framework for AI agents grounded in explicit conceptual reasoning.',
  },
  {
    year: '2025',
    title: 'Qwen3-VL MoE Computational Aesthetics',
    icon: 'eye',
    description:
      'Evaluated vision-language MoE models on aesthetic judgment tasks.',
    links: [
      {
        label: 'Colab',
        href: 'https://colab.research.google.com/drive/1_KvVB2HOEKa3zCC3oB_px2-XgnDrM1mE?usp=sharing',
      },
    ],
  },
  {
    year: '2025',
    title: 'Local LLM Comparative Study',
    icon: 'search',
    description:
      'Systematic evaluation of Qwen3-0.6B, Phi-3, and Gemma on structured reasoning tasks.',
  },
  {
    year: '2025',
    title: 'Google Cloud Certificate',
    icon: 'spark',
    description:
      'Earned Google Cloud certification — formalizing cloud infrastructure knowledge for ML deployment and data pipeline work.',
  },
  {
    year: '2025',
    title: 'Thinking Machines Lab & Tinker',
    icon: 'brain',
    description:
      'LLM fine-tuning project for personalized AI. Explored model adaptation, prompt engineering, and data preparation for custom language model behavior.',
  },
  {
    year: '2025',
    title: 'Project Digital Mirror',
    icon: 'search',
    description:
      'Built a personal data indexing and analysis system. 509K+ objects indexed, 6,360 conversations analyzed, 24K-node knowledge graph constructed. NLP annotation pipeline using Gemma for topic modeling and entity extraction.',
  },
  {
    year: '2025',
    title: 'AccessCopilot',
    icon: 'eye',
    description:
      'Designed an AI accessibility agent that audits content against POUR principles. Full MVP spec with Next.js, FastAPI, GPT-4/Claude, and PGVector — bridging years of accessibility research into a product.',
  },
  {
    year: '2026',
    title: 'DATA System',
    icon: 'blocks',
    description:
      'Local-first personal memory system with 1.6TB indexed across 70+ chapter-driven specifications. BM25 search, LLM synthesis, MCP server, SwiftUI menu bar app, PII redaction, and Gemma-powered annotation pipeline — all running offline.',
  },
];
