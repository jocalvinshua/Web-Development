import { useState, useEffect } from "react";
import './style.css';
import animesData from './container/Anime.jsx'


export default function App() {
  const [search, setSearch] = useState('');
  const [selectedAnime, setSelectedAnime] = useState(null);

  const filteredAnimes = animesData.filter((anime) =>
    anime.title.toLowerCase().includes(search.toLowerCase())
  );

  
  useEffect(() => {
    setSelectedAnime(animesData[0]);
  }, []);

  const handleSearch = (anime) => setSearch(anime);

  const handleSelectAnime = (anime) => setSelectedAnime(anime)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar animeQuery={handleSearch} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimeLists
              animesData={filteredAnimes}
              searchQuery={search}
              onSelect={handleSelectAnime}
            />
          </div>
          <div className="lg:col-span-1">
            {selectedAnime && <AnimeDetails anime={selectedAnime} />}
          </div>
        </div>
      </div>
    </div>
  );
}