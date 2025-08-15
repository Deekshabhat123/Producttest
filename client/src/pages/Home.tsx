import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { fetchPopularMovies } from '@/store/slices/moviesSlice';
import MovieCard from '@/components/MovieCard';
import Pagination from '@/components/Pagination';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, currentPage, totalPages, loading, error } = useSelector(
    (state: RootState) => state.movies.popular
  );

  useEffect(() => {
    if (movies.length === 0) {
      dispatch(fetchPopularMovies(1));
    }
  }, [dispatch, movies.length]);

  const handlePageChange = (page: number) => {
    dispatch(fetchPopularMovies(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-cinema-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Movies</h2>
            <p className="text-gray-300">{error}</p>
            <button
              onClick={() => dispatch(fetchPopularMovies(currentPage))}
              className="mt-4 px-6 py-2 bg-cinema-blue hover:bg-blue-600 rounded-lg transition-colors"
              data-testid="retry-button"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cinema-dark text-white">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cinema-dark via-transparent to-cinema-dark z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1489599184928-9f28ea5add6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Movie theater interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">Popular Movies</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover the most popular movies everyone's talking about
            </p>
          </div>
        </div>
      </section>

      {/* Movies Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold" data-testid="popular-movies-title">Popular Now</h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400" data-testid="page-info">
              Page {currentPage} of {totalPages}
            </span>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner message="Loading popular movies..." />
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-12">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {movies.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No popular movies found.</p>
              </div>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              loading={loading}
            />
          </>
        )}
      </section>
    </div>
  );
}
