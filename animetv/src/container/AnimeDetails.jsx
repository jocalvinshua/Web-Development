import { Star, Calendar } from 'lucide-react';

export default function AnimeDetails({ anime }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-8">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={anime.image}
          alt={anime.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-black/70 rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-white text-sm font-medium">{anime.score}</span>
        </div>
      </div>
      <div className="p-4">
        <h2 className="font-semibold text-xl text-gray-900 mb-2">
          {anime.title}
        </h2>
        <div className="flex items-center gap-1 mb-4 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{anime.year}</span>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed">{anime.synopsis}</p>
      </div>
    </div>
  );
}
