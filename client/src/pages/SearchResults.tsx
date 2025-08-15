import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'wouter';
import { RootState, AppDispatch } from '../store/store';
import { searchMovies } from '../store/slices/moviesSlice';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';

export default function SearchResults() {
  const [location] = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { movies, currentPage, totalPages, query, loading, error } = useSelector(
    (state: RootState) => state.movies.search
  );

  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const urlQuery = urlParams.get('q') || '';

  useEffect(() => {
    if (urlQuery && urlQuery !== query) {
      dispatch(searchMovies({ query: urlQuery, page: 1 }));
    }
  }, [dispatch, urlQuery, query]);

  const handlePageChange = (page: number) => {
    if (urlQuery) {
      dispatch(searchMovies({ query: urlQuery, page }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!urlQuery) {
    return (
      <div className="min-h-screen bg-cinema-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Search Movies</h1>
            <p className="text-gray-400">Enter a search term to find movies</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cinema-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Error Searching Movies</h2>
            <p className="text-gray-300">{error}</p>
            <button
              onClick={() => dispatch(searchMovies({ query: urlQuery, page: currentPage }))}
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" data-testid="search-results-title">
            Search Results
          </h1>
          <p className="text-gray-400" data-testid="search-query">
            Showing results for "{urlQuery}"
          </p>
          {!loading && movies.length > 0 && (
            <p className="text-gray-400 mt-2">
              Found {movies.length} movies (Page {currentPage} of {totalPages})
            </p>
          )}
        </div>

        {loading ? (
          <LoadingSpinner message="Searching movies..." />
        ) : (
          <>
            {movies.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-12">
                  {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  loading={loading}
                />
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No movies found</h3>
                <p className="text-gray-400">
                  Try adjusting your search terms or check the spelling.
                </p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}