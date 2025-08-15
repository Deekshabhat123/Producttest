import { Movie } from '@/types/movie';
import { getImageUrl } from '@/services/tmdbApi';
import { useLocation } from 'wouter';
import { Star } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [, setLocation] = useLocation();

  const handleClick = () => {
    setLocation(`/movie/${movie.id}`);
  };

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : '';

  return (
    <div 
      className="movie-card group cursor-pointer transform transition-all duration-300 hover:scale-105"
      onClick={handleClick}
      data-testid={`movie-card-${movie.id}`}
    >
      <div className="relative overflow-hidden rounded-lg shadow-xl">
        <img 
          src={getImageUrl(movie.poster_path)} 
          alt={movie.title}
          className="w-full h-80 object-cover group-hover:opacity-80 transition-opacity"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/300x450/1e293b/ffffff?text=No+Image';
          }}
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 rounded-full px-2 py-1">
          <div className="flex items-center">
            <Star className="w-3 h-3 text-cinema-gold fill-current mr-1" />
            <span className="text-xs font-medium">{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="font-semibold text-sm truncate" data-testid={`movie-title-${movie.id}`}>
          {movie.title}
        </h3>
        <p className="text-gray-400 text-xs mt-1" data-testid={`movie-year-${movie.id}`}>
          {releaseYear}
        </p>
      </div>
    </div>
  );
}
