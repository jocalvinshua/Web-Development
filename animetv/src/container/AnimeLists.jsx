import { Star, Calendar } from 'lucide-react';

export default function AnimeLists({ animesData, searchQuery, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {animesData.length === 0 ? (
        <p className="text-center col-span-2 py-12 text-gray-500 text-lg">
          No results found for "{searchQuery}"
        </p>
      ) : (
        animesData.map((anime) => (
          <div
            key={anime.mal_id}
            onClick={() => onSelect(anime)}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={anime.image}
                alt={anime.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-black/70 rounded-full px-2 py-1 flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-white text-sm font-medium">
                  {anime.score}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-lg text-gray-900">
                {anime.title}
              </h2>
              <div className="flex items-center gap-1 mt-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{anime.year}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}