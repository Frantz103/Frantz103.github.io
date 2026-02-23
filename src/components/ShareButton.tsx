import { useState, useEffect } from 'react';
import { Share2 } from 'lucide-react';

interface Props {
  title: string;
  text: string;
  url: string;
}

export default function ShareButton({ title, text, url }: Props) {
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!status) return;
    const timeout = setTimeout(() => setStatus(''), 3000);
    return () => clearTimeout(timeout);
  }, [status]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        setStatus('Shared successfully');
      } catch {
        // User cancelled
      }
      return;
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        setStatus('Link copied to clipboard');
      } catch {
        setStatus('Unable to copy link. Please copy manually.');
      }
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 border border-neutral-200 rounded-full hover:border-indigo-200 hover:text-indigo-600 transition-colors"
        onClick={handleShare}
      >
        <Share2 size={16} /> Share
      </button>
      {status && <p className="text-xs text-indigo-600">{status}</p>}
    </div>
  );
}
