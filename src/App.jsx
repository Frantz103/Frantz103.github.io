import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ArrowRight,
  Mail,
  Linkedin,
  Github,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Camera,
  Brain,
  Eye,
  Cpu,
  AtSign,
  Link2,
  Share2,
} from 'lucide-react';

const HERO_IMAGE = `${import.meta.env.BASE_URL}homepage.jpg`;
const PORTRAIT_PLACEHOLDER = HERO_IMAGE;
const ROUTE_PATHS = {
  home: '/',
  writing: '/writing',
  creative: '/creative',
  now: '/field-notes',
  about: '/about',
  contact: '/contact',
};

const normalizePath = (path) => {
  if (!path) return '/';
  const trimmed = path.trim();
  if (trimmed === '/') return '/';
  return trimmed.replace(/\/+$/, '') || '/';
};

const parseRouteFromPath = (pathname) => {
  const normalized = normalizePath(pathname);
  if (normalized.startsWith('/writing/')) {
    const slug = normalized.slice('/writing/'.length);
    return { tab: 'writing', essaySlug: slug || null };
  }
  if (normalized === '/writing') {
    return { tab: 'writing', essaySlug: null };
  }
  const match = Object.entries(ROUTE_PATHS).find(([, routePath]) => routePath === normalized);
  return { tab: match ? match[0] : 'home', essaySlug: null };
};

const buildPathFromRoute = (tab, slug = null) => {
  if (tab === 'writing' && slug) {
    return `/writing/${slug}`;
  }
  return ROUTE_PATHS[tab] || '/';
};

const App = () => {
  const getInitialRoute = () => {
    if (typeof window === 'undefined') {
      return { tab: 'home', essaySlug: null };
    }
    return parseRouteFromPath(window.location.pathname);
  };

  const [initialRoute] = useState(getInitialRoute);
  const [activeTab, setActiveTabState] = useState(initialRoute.tab);
  const [activeEssaySlug, setActiveEssaySlug] = useState(initialRoute.essaySlug);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'writing', label: 'Writing' },
    { id: 'creative', label: 'Creative' },
    { id: 'now', label: 'Field Notes' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavigate = (tab, slug = null, options = {}) => {
    setActiveTabState(tab);
    setActiveEssaySlug(tab === 'writing' ? slug : null);

    if (typeof window !== 'undefined') {
      const newPath = buildPathFromRoute(tab, slug);
      if (window.location.pathname !== newPath) {
        const historyMethod = options.replace ? 'replaceState' : 'pushState';
        window.history[historyMethod](null, '', newPath);
      }
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      if (typeof window === 'undefined') return;
      const { tab, essaySlug } = parseRouteFromPath(window.location.pathname);
      setActiveTabState(tab);
      setActiveEssaySlug(essaySlug);
      setIsMenuOpen(false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeSection onNavigate={handleNavigate} />;
      case 'writing':
        return <WritingSection activeEssaySlug={activeEssaySlug} onNavigate={handleNavigate} />;
      case 'creative':
        return <CreativeSection />;
      case 'now':
        return <NowSection />;
      case 'about':
        return <AboutSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return <HomeSection onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
          scrolled || activeTab !== 'home' ? 'bg-white/80 backdrop-blur-md border-b border-neutral-100 py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <button
            onClick={() => handleNavigate('home')}
            className={`text-xl tracking-tight font-serif font-bold transition-colors ${
              scrolled || activeTab !== 'home' ? 'text-neutral-900' : 'text-white'
            }`}
          >
            Frantz Augustin
          </button>

          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigate(link.id)}
                className={`text-sm tracking-wide transition-colors duration-300 hover:opacity-70 ${
                  activeTab === link.id ? 'opacity-100 font-medium' : 'opacity-80'
                } ${
                  scrolled || activeTab !== 'home' ? 'text-neutral-600 hover:text-indigo-600' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <button
            className={`md:hidden p-2 ${scrolled || activeTab !== 'home' ? 'text-neutral-900' : 'text-white'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-neutral-100 md:hidden flex flex-col p-6 shadow-xl">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  handleNavigate(link.id);
                  setIsMenuOpen(false);
                }}
                className="text-left py-3 text-neutral-600 hover:text-indigo-600 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="animate-fade-in">{renderContent()}</main>

      <footer className="bg-neutral-50 border-t border-neutral-200 py-12 mt-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-neutral-500">
          <div className="flex space-x-6">
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Photography
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Chez Frantz
            </a>
            <a href="#" className="hover:text-indigo-600 transition-colors">
              Frantz Studio
            </a>
          </div>
          <p>&copy; {new Date().getFullYear()} Frantz Augustin. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Golos+Text:wght@400;500;600;700&display=swap');

        body {
          font-family: 'Golos Text', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        h1, h2, h3, h4, h5, h6, .font-serif {
          font-family: 'Playfair Display', serif;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-up {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.8s ease-out forwards;
        }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const HomeSection = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" style={{ filter: 'saturate(85%)' }} />
      </div>

      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto mt-16">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight">Frantz Augustin</h1>
        <p className="text-base md:text-lg tracking-[0.3em] uppercase text-white/90 mb-12">
          Independent Researcher & Creative Technologist
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => onNavigate('writing')}
            className="group px-8 py-3 bg-white text-neutral-900 rounded-sm hover:bg-neutral-100 transition-all duration-300 font-medium tracking-wide flex items-center gap-2"
          >
            Explore Research
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => onNavigate('creative')}
            className="px-8 py-3 bg-transparent border border-white/40 text-white rounded-sm hover:bg-white/10 transition-all duration-300 font-medium tracking-wide"
          >
            See My Creative Work
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/70 hidden md:block">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
      </div>
    </div>
  );
};

const WritingSection = ({ activeEssaySlug, onNavigate }) => {
  const [shareStatus, setShareStatus] = useState({ message: '', slug: '' });

  const researchInterests = [
    {
      title: 'AI & Cognitive Systems',
      icon: <Brain className="w-6 h-6 text-indigo-500" />,
      points: [
        'Local AI deployment and personal fine-tuning workflows',
        'AI writing tools and human-AI collaboration',
        'Machine learning systems that learn from individual users',
      ],
    },
    {
      title: 'Machine Perception',
      icon: <Eye className="w-6 h-6 text-purple-500" />,
      points: [
        'Computer vision applications for web accessibility',
        'Machine understanding of visual and textual content',
        'Computational approaches to human perception',
      ],
    },
    {
      title: 'Experimental Research',
      icon: <Cpu className="w-6 h-6 text-pink-500" />,
      points: [
        'Classical AI methods and symbolic systems',
        'LLMs as simulation engines for behavioral modeling',
        'Cognitive science experiments using computational tools',
      ],
    },
  ];

  const essays = [
    {
      date: 'Dec 2025',
      title: 'Move 37',
      excerpt:
        'I think thirty-seven is three sets of ten and one set of seven. Why is a number not a letter? Or are letters and numbers just strings in computer programs, symbols in the real world? An unusual thirty-seventh move played by Google\'s AI in the game of Go made me wonder about unity, perfection, and the hand of God in my life.',
      slug: 'move-37',
      content: `I think thirty-seven is
three sets of ten...
and one set of seven.

I think thirty-seven is written
with the number three...
and the number seven.

Why is a number not a letter?
Or are letters and numbers
just strings in computer programs,
symbols in the real world?

...I like symbol.

What does the symbol thirty-seven
symbolize... to me?

I saw it on the news, back in 2016.
Machine learning making progress,
an unusual thirty-seventh move
played by Google's AI
in the game of Go...
in the name of Go.

Thirty-seven itself is unusual
for a Jesus follower like me:
the twelfth prime number,
written with prime number three... and seven.

Three -- a set of three ones.
Seven -- a set of seven ones.
One is unity.
The other... perfection.

Oh, symbol,
or is it my brain
creating strange patterns
where there are none?

An empty set.
A set... of nothing.

Is zero... nil?
Emptiness?
Null?
The absence... of everything?

Can nothing be nothing... out of nothing?
Is nothing the same
as the absence of everything?
Does nothing exist...
when nothing exists?

In an empty set,
we see only what's missing,
but that doesn't prove
it isn't there.

Some sets... are not numbers at all.

Like the things we love
but cannot count:
love, joy, patience,
peace, gentleness,
self-control... and faithfulness.

All in one fruit.
A set of one.

Notice what is not in that set:
hate... greed... selfish pleasure,
you know the kind.

And so I return to thirty-seven:
the twelfth prime among primes,
three tens and a seven in a set --
the hand of my God in my life,
the completeness and perfection
of His plan for me.

If The Hitchhiker's Guide to the Galaxy
says the answer to everything is forty-two,
then the answer to my everything
is encoded in the number thirty-seven...
in the hand that gave meaning
to everything.

But what are prime numbers, anyway?
Why aren't all natural numbers prime...
and all prime numbers natural?

We'd have number one as the super number,
the prime as natural number,
and everything else...
the ridiculous number.

And zero?
What about zero?

...I have no proof it exists.
Yet here I am --
existing to write this,
created by a Creator.

Which brings me to the question:
What about the simulation?

If you can think
you might be in a simulation...
is it still a simulation?
Would you even have such a thought...
if it were?

Do cats wonder
if they are in a simulation?

This is why I never say
I know nothing...
or I know everything --
for I am not God,
nor a non-thinking being.

...I know partly.

And in that part
lives the meaning of thirty-seven,
three tens, one seven,
unity and perfection,
the hand of my God
guiding my life
in moves I cannot yet see.`,
    },
  ];

  useEffect(() => {
    if (!shareStatus.message) return;
    const timeout = setTimeout(() => setShareStatus({ message: '', slug: '' }), 3000);
    return () => clearTimeout(timeout);
  }, [shareStatus]);

  const handleShare = async (essay) => {
    if (!essay || typeof window === 'undefined') return;
    const shareUrl = `${window.location.origin}${buildPathFromRoute('writing', essay.slug)}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: essay.title,
          text: essay.excerpt,
          url: shareUrl,
        });
        setShareStatus({ message: 'Shared successfully', slug: essay.slug });
      } catch (error) {
        // user cancelled share; ignore silently
      }
      return;
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShareStatus({ message: 'Link copied to clipboard', slug: essay.slug });
        return;
      } catch (error) {
        setShareStatus({ message: 'Unable to copy link. Please copy manually.', slug: essay.slug });
      }
    }
  };

  const activeEssay = essays.find((essay) => essay.slug === activeEssaySlug);

  if (activeEssay) {
    return (
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <button
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-neutral-500 hover:text-indigo-600 transition-colors"
            onClick={() => onNavigate('writing')}
          >
            <ChevronLeft size={16} /> Back to Essays
          </button>

          <article className="mt-8 bg-white border border-neutral-100 rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="flex flex-col gap-4 p-6 sm:p-8 border-b border-neutral-100">
              <div>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-[0.3em]">{activeEssay.date}</p>
                <h1 className="text-4xl font-serif font-semibold text-neutral-900 mt-4">{activeEssay.title}</h1>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 border border-neutral-200 rounded-full hover:border-indigo-200 hover:text-indigo-600 transition-colors"
                  onClick={() => handleShare(activeEssay)}
                >
                  <Share2 size={16} /> Share
                </button>
                <a
                  href={buildPathFromRoute('writing', activeEssay.slug)}
                  className="inline-flex items-center gap-2 text-sm text-indigo-600 font-medium"
                >
                  Permalink <ChevronRight size={16} />
                </a>
              </div>
              {shareStatus.message && shareStatus.slug === activeEssay.slug && (
                <p className="text-xs text-indigo-600">{shareStatus.message}</p>
              )}
            </div>
            <div className="p-6 sm:p-8 text-neutral-700 leading-relaxed whitespace-pre-line font-light">{activeEssay.content}</div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <div className="mb-20 text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-6">Research & Writing</h2>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          My truest body of work. A curated set of micro-essays, reflections, and technical explorations into the future of cognition.
        </p>
      </div>

      <div className="mb-24">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px bg-neutral-200 flex-grow" />
          <span className="text-sm uppercase tracking-widest text-neutral-400 font-bold">Research Interests</span>
          <div className="h-px bg-neutral-200 flex-grow" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {researchInterests.map((item, idx) => (
            <div
              key={idx}
              className="group p-8 bg-white border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-xl"
            >
              <div className="mb-6 p-3 bg-neutral-50 w-fit rounded-lg group-hover:bg-indigo-50 transition-colors">{item.icon}</div>
              <h3 className="text-xl font-serif font-semibold mb-4 text-neutral-800">{item.title}</h3>
              <ul className="space-y-3">
                {item.points.map((point, pIdx) => (
                  <li key={pIdx} className="text-sm text-neutral-600 leading-relaxed flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-neutral-300 rounded-full flex-shrink-0 group-hover:bg-indigo-400 transition-colors" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px bg-neutral-200 flex-grow" />
          <span className="text-sm uppercase tracking-widest text-neutral-400 font-bold">Selected Essays</span>
          <div className="h-px bg-neutral-200 flex-grow" />
        </div>

        <div className="grid grid-cols-1 gap-12 max-w-3xl mx-auto">
          {essays.map((essay, idx) => (
            <article key={idx} className="group">
              <a
                href={buildPathFromRoute('writing', essay.slug)}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate('writing', essay.slug);
                }}
                className="flex flex-col md:flex-row gap-2 md:gap-8 items-baseline focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1 -m-1"
              >
                <span className="text-sm font-bold text-neutral-400 w-24 flex-shrink-0">{essay.date}</span>
                <div>
                  <h3 className="text-2xl font-serif font-medium text-neutral-900 group-hover:text-indigo-700 transition-colors mb-2">
                    {essay.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">{essay.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-indigo-600 mt-3 group-hover:gap-2 transition-all">
                    Read Essay <ChevronRight size={14} />
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

const CreativeSection = () => {
  const cards = [
    {
      title: 'Frantz Photography',
      description:
        'Editorial fashion, documentary narratives, and visual essays exploring identity through clothing, gesture, and light. This is the emotional side of my work, for visitors drawn to story, beauty, and image making.',
      url: 'https://frantzphotography.com',
      cta: 'Visit Frantz Photography',
      tag: 'Imagery & Emotion',
    },
    {
      title: 'Frantz Studio',
      description:
        'Creative tooling, AI native experiments, design systems, and technical projects that show how tools shape the way we create. This is where engineering meets creative practice.',
      url: 'http://frantzstudio.com/',
      cta: 'Explore Frantz Studio',
      tag: 'Tools & Systems',
    },
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-bold mb-4">Creative Work</p>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-6">Two Doors Into My Practice</h2>
        <p className="text-lg text-neutral-600">
          I like creating images with feeling, and I like experimenting with tools that let me create in new ways.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {cards.map((card) => (
          <a
            key={card.title}
            href={card.url}
            className="group relative border border-neutral-200 rounded-3xl p-8 bg-white shadow-[0_30px_60px_-40px_rgba(0,0,0,0.4)] hover:-translate-y-1 hover:shadow-[0_30px_80px_-50px_rgba(99,102,241,0.6)] transition-all duration-300 flex flex-col"
            target="_blank"
            rel="noreferrer"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">{card.tag}</span>
              <ArrowRight className="text-neutral-400 group-hover:text-indigo-500 transition-colors" size={20} />
            </div>
            <h3 className="text-3xl font-serif font-semibold text-neutral-900 mb-4">{card.title}</h3>
            <p className="text-neutral-600 leading-relaxed flex-grow">{card.description}</p>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 group-hover:gap-3 transition-all">
              {card.cta} <ChevronRight size={16} />
            </span>
          </a>
        ))}
      </div>

      <div className="mt-16 bg-neutral-50 border border-neutral-100 rounded-2xl p-8">
        <p className="text-neutral-600 leading-relaxed">
          You can also support my work and research through Chez Frantz, my small store for stationery and creative goods:
          <a href="https://chezfrantz.com" className="text-indigo-600 font-medium hover:underline ml-1" target="_blank" rel="noreferrer">
            chezfrantz.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

const NowSection = () => {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="w-full max-w-6xl mx-auto fade-up">
        <div className="mb-10 pl-2">
          <div className="flex items-center gap-3 mb-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500" />
            </span>
            <span className="text-indigo-600 font-bold tracking-widest uppercase text-xs">Field Notes</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-neutral-900 tracking-tight">Field Notes</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-neutral-100 overflow-hidden">
          <div className="px-8 pt-8 pb-6 bg-gradient-to-b from-neutral-50/50 to-white border-b border-neutral-50">
            <p className="text-xl font-serif text-neutral-600 italic leading-relaxed">
              "A living snapshot of what I am working on and thinking through."
            </p>
          </div>

          <div className="p-8 md:p-10">
            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Camera size={16} className="text-indigo-500" />
              Current Projects
            </h3>

            <ul className="space-y-6">
              <li className="flex gap-4 group">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-200 group-hover:bg-indigo-500 transition-colors flex-shrink-0" />
                <span className="text-lg text-neutral-700 font-light leading-relaxed">
                  Developing automated fine tuning pipelines using agentic AI coding systems, with a focus on personal model training and local deployment.
                </span>
              </li>
              <li className="flex gap-4 group">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-200 group-hover:bg-indigo-500 transition-colors flex-shrink-0" />
                <span className="text-lg text-neutral-700 font-light leading-relaxed">
                  Building a set of creative and technical tools, including ThreadGems, Monlink, Component Scout, and Photo Codex.
                </span>
              </li>
              <li className="flex gap-4 group">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-200 group-hover:bg-indigo-500 transition-colors flex-shrink-0" />
                <span className="text-lg text-neutral-700 font-light leading-relaxed">
                  Exploring photography as a computational and narrative medium, creating editorial series and digital photobooks such as Finally Fashion, Zoom In Zoom Out, and The Share Holder.
                </span>
              </li>
              <li className="flex gap-4 group">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-200 group-hover:bg-indigo-500 transition-colors flex-shrink-0" />
                <span className="text-lg text-neutral-700 font-light leading-relaxed">
                  Writing essays and poetry that focus on perception, identity, and small moments that shape a life.
                </span>
              </li>
              <li className="flex gap-4 group">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-200 group-hover:bg-indigo-500 transition-colors flex-shrink-0" />
                <span className="text-lg text-neutral-700 font-light leading-relaxed">
                  Preparing for graduate study in areas that connect cognition, design, and intelligent systems.
                </span>
              </li>
            </ul>

            <div className="mt-10 pt-6 border-t border-dashed border-neutral-200 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">Keeping close track of slow practice</span>
              <span className="text-xs font-mono text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">Last updated: December 2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutSection = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div className="order-2 md:order-1 relative">
          <div className="aspect-[3/4] overflow-hidden rounded-sm bg-neutral-100">
            <img
              src={PORTRAIT_PLACEHOLDER}
              alt="Frantz Augustin"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out grayscale hover:grayscale-0"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-50 -z-10 rounded-full blur-2xl" />
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-50 -z-10 rounded-full blur-2xl" />
        </div>

        <div className="order-1 md:order-2 flex flex-col justify-center h-full">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-neutral-900 mb-8">About Frantz.</h2>

          <div className="space-y-6 text-lg text-neutral-600 leading-relaxed font-light">
            <p>
              I am a multidisciplinary creative and independent researcher based in San Diego, with interest in artificial intelligence, cognitive science, and human computer interaction. I study how machines learn, how humans make meaning, and how the two can meet in ways that feel generous rather than extractive.
            </p>
            <p>
              My philosophy is simple. Technology should help humans, not replace them. My independent research focuses on perception, meaning, and the interaction between humans and intelligent systems. These themes guide how I approach my work.
            </p>
            <p>
              Before all of this, my undergraduate work was in marketing, and my favorite subjects were consumer behavior, marketing research, and the way a message becomes the medium until it no longer does. Around the same time, I taught myself to code, and I have been building for the web since 2012. In 2016, while working at a marketing agency, I discovered AI through a single question: can we predict when a tweet might go viral. Later, working in SEO introduced me to information retrieval, and I have been curious ever since, in my own slow and steady way.
            </p>
            <p>
              Beyond research, I work on several personal projects. Frantz Studio is a small AI native consultancy centered on design, analytics, and AI assisted tooling. Chez Frantz is an online store for my imaginative side: fashion, stationery, poems, and storytelling. Frantz Photography is my fashion and documentary practice, where I study how what we wear shapes identity, emotion, and our understanding of each other. These projects support my research by helping me explore how people interact with tools, images, and systems.
            </p>
            <p>
              I am preparing for advanced study in human computer interaction and cognitive systems, with interest in perception and understanding in intelligent systems.
            </p>
          </div>

          <div className="mt-10 pt-10 border-t border-neutral-100">
            <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">Focus Areas</h3>
            <div className="flex flex-wrap gap-3">
              {['Cognitive Science', 'Human Computer Interaction', 'Machine Perception and Understanding', 'Local AI Systems'].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-neutral-50 text-neutral-600 text-sm rounded-full border border-neutral-100 hover:border-indigo-200 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactSection = () => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto min-h-[80vh]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-start">
        <div className="text-left">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-neutral-900 mb-6">Let's Connect.</h2>
          <p className="text-xl text-neutral-600 max-w-2xl">
            Open for academic collaborations, research discussions, or a thoughtful chat about the future of AI and creative research.
          </p>

          <div className="mt-10 space-y-6">
            <div>
              <p className="text-sm uppercase tracking-widest text-neutral-400 mb-4">Socials</p>
              <div className="flex flex-wrap gap-6">
                <SocialLink icon={<Linkedin size={24} />} label="LinkedIn" href="https://www.linkedin.com/in/frantz103/" />
                <SocialLink icon={<Github size={24} />} label="GitHub" href="https://github.com/Frantz103" />
                <SocialLink icon={<Camera size={24} />} label="Photography" href="https://frantzphotography.com" />
                <SocialLink icon={<AtSign size={24} />} label="Threads" href="https://www.threads.com/@augustincaz" />
                <SocialLink icon={<BookOpen size={24} />} label="Substack" href="https://substack.com/@franzcode" />
                <SocialLink icon={<Link2 size={24} />} label="Personal Site" href="https://monlink.me/frantz" />
              </div>
            </div>
          </div>
        </div>

        <form
          name="contact"
          method="POST"
          action="/contact-success"
          data-netlify="true"
          netlify="true"
          data-netlify-honeypot="bot-field"
          className="w-full bg-white/80 border border-neutral-100 rounded-2xl shadow-[0_20px_40px_-20px_rgba(0,0,0,0.2)] p-8 space-y-6"
        >
          <input type="hidden" name="form-name" value="contact" />
          <div className="hidden">
            <label>
              Don't fill this out if you're human <input name="bot-field" />
            </label>
          </div>
          <div className="hidden" aria-hidden="true">
            <label htmlFor="contact-last-name">
              Last Name
              <input id="contact-last-name" name="last-name" type="text" />
            </label>
          </div>
          <div className="hidden">
            <label>
              Don't fill this out if you're human <input name="bot-field" />
            </label>
          </div>
          <div>
            <label htmlFor="contact-name" className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              className="w-full bg-neutral-50 border border-neutral-100 p-3 rounded-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              className="w-full bg-neutral-50 border border-neutral-100 p-3 rounded-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="block text-xs uppercase tracking-widest text-neutral-400 mb-2">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows="6"
              required
              className="w-full bg-neutral-50 border border-neutral-100 p-3 rounded-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 text-sm tracking-[0.3em] uppercase transition-colors bg-neutral-900 text-white hover:bg-indigo-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

const SocialLink = ({ icon, label, href = '#' }) => (
  <a
    href={href}
    className="text-neutral-400 hover:text-neutral-900 hover:scale-110 transition-all duration-300"
    title={label}
    target="_blank"
    rel="noreferrer"
  >
    {icon}
  </a>
);

export default App;
