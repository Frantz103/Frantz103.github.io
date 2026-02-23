import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavLink {
  href: string;
  label: string;
}

interface Props {
  navLinks: NavLink[];
  currentPath: string;
}

export default function NavIsland({ navLinks, currentPath }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = currentPath === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return currentPath === '/';
    return currentPath.startsWith(href);
  };

  const opaque = scrolled || !isHome;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
        opaque
          ? 'bg-white/80 backdrop-blur-md border-b border-neutral-100 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <a
          href="/"
          className={`text-xl tracking-tight font-serif font-bold transition-colors ${
            opaque ? 'text-neutral-900' : 'text-white'
          }`}
        >
          Frantz Augustin
        </a>

        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide transition-colors duration-300 hover:opacity-70 ${
                isActive(link.href) ? 'opacity-100 font-medium' : 'opacity-80'
              } ${
                opaque
                  ? 'text-neutral-600 hover:text-indigo-600'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className={`md:hidden p-2 ${opaque ? 'text-neutral-900' : 'text-white'}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-neutral-100 md:hidden flex flex-col p-6 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-left py-3 text-neutral-600 hover:text-indigo-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
