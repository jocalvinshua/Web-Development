import { Film, Search } from 'lucide-react';
import { useState } from 'react';

export default function Navbar({ animeQuery }) {
  const [anime, setAnime] = useState('');

  const handleSubmit = () => {
    if (anime.trim() !== '') {
      animeQuery(anime);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Film className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">AnimeHub</h1>
          </div>
          <div className="relative max-w-xl w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search anime..."
              value={anime}
              onChange={(e) => setAnime(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>
        </div>
      </div>
    </header>
  );
}