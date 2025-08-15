import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { fetchTopRatedMovies } from '@/store/slices/moviesSlice';
import MovieCard from '@/components/MovieCard';
import Pagination from '@/components/Pagination';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function TopRated() {
  const dispatch = useDispatch<AppDispatch>();
  const { movies, currentPage, totalPages, loading, error } = useSelector(
    (state: RootState) => state.movies.topRated
  );

  useEffect(() => {
    if (movies.length === 0) {
      dispatch(fetchTopRatedMovies(1));
    }
  }, [dispatch, movies.length]);

  const handlePageChange = (page: number) => {
    dispatch(fetchTopRatedMovies(page));
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
              onClick={() => dispatch(fetchTopRatedMovies(currentPage))}
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="top-rated-title">
            Top Rated Movies
          </h1>
          <p className="text-xl text-gray-300">The highest rated movies of all time</p>
        </div>

        {loading ? (
          <LoadingSpinner message="Loading top rated movies..." />
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-12">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {movies.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No top rated movies found.</p>
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
