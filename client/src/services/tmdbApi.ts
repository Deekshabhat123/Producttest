import { Movie, MovieDetails, Credits, TMDBResponse } from '../types/movie';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Using a demo API key - in production, this would come from environment variables
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'demo_key_placeholder';

if (API_KEY === 'demo_key_placeholder') {
  console.warn('TMDB API key not found. Please set VITE_TMDB_API_KEY environment variable.');
}

class TMDBApiService {
  private async makeRequest<T>(endpoint: string, params: Record<string, string | number> = {}): Promise<T> {
    const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
    url.searchParams.append('api_key', API_KEY);
    
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your TMDB API key.');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  async getPopularMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
    return this.makeRequest<TMDBResponse<Movie>>('/movie/popular', { page });
  }

  async getTopRatedMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
    return this.makeRequest<TMDBResponse<Movie>>('/movie/top_rated', { page });
  }

  async getUpcomingMovies(page: number = 1): Promise<TMDBResponse<Movie>> {
    return this.makeRequest<TMDBResponse<Movie>>('/movie/upcoming', { page });
  }

  async searchMovies(query: string, page: number = 1): Promise<TMDBResponse<Movie>> {
    return this.makeRequest<TMDBResponse<Movie>>('/search/movie', { query, page });
  }

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    return this.makeRequest<MovieDetails>(`/movie/${movieId}`);
  }

  async getMovieCredits(movieId: number): Promise<Credits> {
    return this.makeRequest<Credits>(`/movie/${movieId}/credits`);
  }
}

export const tmdbApi = new TMDBApiService();

export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) {
    return 'https://via.placeholder.com/500x750/1e293b/ffffff?text=No+Image';
  }
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};