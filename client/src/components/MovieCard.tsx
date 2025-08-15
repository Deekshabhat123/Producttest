import { useLocation } from 'wouter';
import { Star, Calendar } from 'lucide-react';
import { Movie } from '../types/movie';
import { getImageUrl } from '../services/tmdbApi';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [, setLocation] = useLocation();

  const handleClick = () => {
    setLocation(`/movie/${movie.id}`);
  };

  const formatReleaseDate = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  return (
    <div 
      className="movie-card cursor-pointer group"
      onClick={handleClick}
      data-testid={`movie-card-${movie.id}`}
    >
      <div className="relative overflow-hidden">
        <img 
          src={getImageUrl(movie.poster_path)} 
          alt={movie.title}
          className="w-full h-72 sm:h-80 md:h-96 object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/500x750/1e293b/ffffff?text=No+Image';
          }}
          data-testid={`movie-poster-${movie.id}`}
        />
        
        {/* Rating badge */}
        <div className="absolute top-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded-full flex items-center">
          <Star className="w-3 h-3 text-cinema-gold fill-current mr-1" />
          <span className="text-white text-xs font-semibold" data-testid={`movie-rating-${movie.id}`}>
            {movie.vote_average.toFixed(1)}
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
          <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button className="bg-cinema-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
              View Details
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 
          className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-cinema-blue transition-colors" 
          data-testid={`movie-title-${movie.id}`}
        >
          {movie.title}
        </h3>
        
        <div className="flex items-center text-gray-400 text-sm">
          <Calendar className="w-4 h-4 mr-1" />
          <span data-testid={`movie-year-${movie.id}`}>
            {formatReleaseDate(movie.release_date)}
          </span>
        </div>
        
        {movie.overview && (
          <p 
            className="text-gray-400 text-sm mt-2 line-clamp-3"
            data-testid={`movie-overview-${movie.id}`}
          >
            {movie.overview}
          </p>
        )}
      </div>
    </div>
  );
}