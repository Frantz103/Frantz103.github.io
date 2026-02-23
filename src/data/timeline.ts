export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  links?: { label: string; href: string }[];
}

export const timelineEvents: TimelineEvent[] = [
  {
    year: '2015',
    title: 'First MNIST Experiment',
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
    year: '2024',
    title: '100 Days of ML & FastAI',
    description:
      'Began structured ML study. Trained first image classifiers using FastAI and deployed to HuggingFace Spaces.',
  },
  {
    year: '2024',
    title: 'Cat/Dogs Classifier',
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
    year: '2024',
    title: 'Dog/Cat Multi-Classifier',
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
    year: '2024',
    title: 'CaptionQuest',
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
    year: '2024',
    title: 'Image Captioning for Accessibility',
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
    year: '2024',
    title: 'YT Audio Transcription',
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
    description:
      'Developed an architectural framework for AI agents grounded in explicit conceptual reasoning.',
  },
  {
    year: '2025',
    title: 'Qwen3-VL MoE Computational Aesthetics',
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
    description:
      'Systematic evaluation of Qwen3-0.6B, Phi-3, and Gemma on structured reasoning tasks.',
  },
];
