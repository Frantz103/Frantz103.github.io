export interface SocialLink {
  icon: 'linkedin' | 'github' | 'camera' | 'at-sign' | 'book-open' | 'link-2' | 'huggingface' | 'pen-line';
  label: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/frantz103/' },
  { icon: 'github', label: 'GitHub', href: 'https://github.com/Frantz103' },
  { icon: 'huggingface', label: 'HuggingFace', href: 'https://huggingface.co/Frantz103' },
  { icon: 'pen-line', label: 'Medium', href: 'https://medium.com/@AugustinCaz' },
  { icon: 'camera', label: 'Photography', href: 'https://frantzphotography.com' },
  { icon: 'at-sign', label: 'Threads', href: 'https://www.threads.com/@augustincaz' },
  { icon: 'book-open', label: 'Substack', href: 'https://substack.com/@franzcode' },
  { icon: 'link-2', label: 'Personal Site', href: 'https://monlink.me/frantz' },
];
