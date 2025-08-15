import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute } from 'wouter';
import { RootState, AppDispatch } from '@/store/store';
import { fetchMovieDetails, clearMovieDetail } from '@/store/slices/moviesSlice';
import { getImageUrl } from '@/services/tmdbApi';
import CastCard from '@/components/CastCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Star, Play, Plus, ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';

export default function MovieDetail() {
  const [, params] = useRoute('/movie/:id');
  const [, setLocation] = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { movie, credits, loading, error } = useSelector(
    (state: RootState) => state.movies.movieDetail
  );

  const movieId = params?.id ? parseInt(params.id) : null;

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieDetails(movieId));
    }
    
    return () => {
      dispatch(clearMovieDetail());
    };
  }, [dispatch, movieId]);

  const formatRuntime = (minutes: number | null) => {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatReleaseDate = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cinema-dark text-white">
        <LoadingSpinner message="Loading movie details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cinema-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Movie</h2>
            <p className="text-gray-300">{error}</p>
            <div className="flex gap-4 justify-center mt-6">
              <button
                onClick={() => setLocation('/')}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                data-testid="back-home-button"
              >
                <ArrowLeft className="w-4 h-4 mr-2 inline" />
                Back to Home
              </button>
              {movieId && (
                <button
                  onClick={() => dispatch(fetchMovieDetails(movieId))}
                  className="px-6 py-2 bg-cinema-blue hover:bg-blue-600 rounded-lg transition-colors"
                  data-testid="retry-button"
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-cinema-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Movie Not Found</h2>
            <button
              onClick={() => setLocation('/')}
              className="px-6 py-2 bg-cinema-blue hover:bg-blue-600 rounded-lg transition-colors"
              data-testid="back-home-button"
            >
              <ArrowLeft className="w-4 h-4 mr-2 inline" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cinema-dark text-white">
      {/* Movie Detail Hero Section */}
      <div className="relative">
        <div 
          className="relative h-screen bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.4)), url('${getImageUrl(movie.backdrop_path, 'original')}')`
          }}
        >
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                {/* Movie Poster */}
                <div className="lg:col-span-1">
                  <img 
                    src={getImageUrl(movie.poster_path, 'w500')} 
                    alt={movie.title}
                    className="w-full max-w-sm mx-auto rounded-xl shadow-2xl"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/400x600/1e293b/ffffff?text=No+Image';
                    }}
                    data-testid="movie-poster"
                  />
                </div>

                {/* Movie Details */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="movie-title">
                      {movie.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-lg text-gray-300 mb-6">
                      <span data-testid="movie-year">
                        {formatReleaseDate(movie.release_date)}
                      </span>
                      <span>•</span>
                      <span data-testid="movie-runtime">
                        {formatRuntime(movie.runtime)}
                      </span>
                      <span>•</span>
                      <div className="flex items-center bg-cinema-gold text-black px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        <span className="font-semibold" data-testid="movie-rating">
                          {movie.vote_average.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Genres */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {movie.genres.map((genre) => (
                      <span 
                        key={genre.id}
                        className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                        data-testid={`genre-${genre.id}`}
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>

                  {/* Overview */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Overview</h3>
                    <p className="text-gray-300 text-lg leading-relaxed" data-testid="movie-overview">
                      {movie.overview || 'No overview available.'}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 pt-4">
                    <button className="bg-cinema-blue hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors" data-testid="watch-trailer-button">
                      <Play className="w-5 h-5 mr-2 inline fill-current" />
                      Watch Trailer
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors" data-testid="add-watchlist-button">
                      <Plus className="w-5 h-5 mr-2 inline" />
                      Add to Watchlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        <section className="bg-cinema-gray py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8" data-testid="cast-section-title">Cast</h2>
            
            {credits && credits.cast.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
                {credits.cast.slice(0, 16).map((castMember) => (
                  <CastCard key={castMember.id} castMember={castMember} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">No cast information available.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
