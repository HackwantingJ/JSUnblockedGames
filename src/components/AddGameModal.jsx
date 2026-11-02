import React, { useState } from 'react';
import { X, Plus, AlertCircle } from 'lucide-react';

export const AddGameModal = ({
  isOpen,
  onClose,
  onAddGame,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Arcade');
  const [description, setDescription] = useState('');
  const [embedInput, setEmbedInput] = useState('');
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Please provide a title for the game.');
      return;
    }

    if (!embedInput.trim()) {
      setError('Please provide an iframe embed tag or a game URL.');
      return;
    }

    // Extract src from iframe if user pasted an entire iframe tag
    let src = embedInput.trim();
    let iframeCode = embedInput.trim();

    if (embedInput.includes('<iframe')) {
      const match = embedInput.match(/src=["']([^"']+)["']/i);
      if (match && match[1]) {
        src = match[1];
      } else {
        setError('Could not parse src attribute from the iframe snippet.');
        return;
      }
    } else {
      // User passed a direct URL, generate the iframe code
      iframeCode = `<iframe src="${src}" width="100%" height="100%" frameborder="0" allow="fullscreen; autoplay" allowfullscreen></iframe>`;
    }

    const id = `custom-${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now().toString(36)}`;

    const newGame = {
      id,
      title: title.trim(),
      category,
      tags: [category, 'Custom', 'Web'],
      description: description.trim() || 'Custom game loaded via user-defined iframe configuration.',
      iframeCode,
      iframeSrc: src,
      rating: 5.0,
      plays: 1,
      isCustom: true,
      accentColor: 'indigo',
      controls: [
        { key: 'Mouse / Keyboard', action: 'Standard game controls' }
      ]
    };

    onAddGame(newGame);
    setTitle('');
    setDescription('');
    setEmbedInput('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Add Game to JSON Database</h3>
              <p className="text-xs text-slate-400">Store a game as an iframe definition</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg flex items-center gap-2 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Game Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Astro Dash 3D"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500 transition-colors"
            >
              <option value="Arcade">Arcade</option>
              <option value="Puzzle">Puzzle</option>
              <option value="Action">Action</option>
              <option value="Strategy">Strategy</option>
              <option value="Classic">Classic</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Iframe Embed Code OR Direct URL
            </label>
            <textarea
              rows={3}
              value={embedInput}
              onChange={(e) => setEmbedInput(e.target.value)}
              placeholder='<iframe src="https://example.com/game" width="100%" height="100%" ...></iframe> or https://example.com/game'
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-sky-300 placeholder-slate-600 focus:outline-none focus:border-sky-500 transition-colors"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Paste the entire &lt;iframe&gt; HTML code or raw URL. It will be stored in the JSON catalog.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Description (Optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary of gameplay rules..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold rounded-lg shadow-sm shadow-sky-500/20 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Save Game to JSON</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
