import { Search } from 'lucide-react'
import { useState } from 'react';

export default function Navbar({ query }) {
  const [search, setSearch] = useState('');

  const handleSubmit = () => {
    if (search.trim() !== '') {
      query(search);
      setSearch('');
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-white text-center mb-8">Weather Forecast</h1>
      <form className="mb-8 relative" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <input
          className="w-full px-4 py-3 pr-10 rounded-lg bg-white/20 backdrop-blur-md text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
          type="text"
          placeholder="Masukkan nama kota"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white hover:text-blue-200 transition-colors"
          disabled={!search.trim()}
        >
          <Search size={20} />
        </button>
      </form>

    </div>
  );
}