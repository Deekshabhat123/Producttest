import { Movie, MovieDetails, MovieCredits, MoviesResponse, SearchMoviesResponse } from '@/types/movie';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'c45a857c193f6302f2b5061c3b85e743';
const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

class TMDBApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'TMDBApiError';
  }
}

async function apiRequest<T>(endpoint: string): Promise<T> {
  const url = `${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}&language=en-US`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new TMDBApiError(
        `TMDB API request failed: ${response.statusText}`,
        response.status
      );
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TMDBApiError) {
      throw error;
    }
    throw new TMDBApiError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export const tmdbApi = {
  // Get popular movies
  getPopularMovies: async (page: number = 1): Promise<MoviesResponse> => {
    return apiRequest<MoviesResponse>(`/movie/popular?page=${page}`);
  },

  // Get top rated movies
  getTopRatedMovies: async (page: number = 1): Promise<MoviesResponse> => {
    return apiRequest<MoviesResponse>(`/movie/top_rated?page=${page}`);
  },

  // Get upcoming movies
  getUpcomingMovies: async (page: number = 1): Promise<MoviesResponse> => {
    return apiRequest<MoviesResponse>(`/movie/upcoming?page=${page}`);
  },

  // Get movie details
  getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
    return apiRequest<MovieDetails>(`/movie/${movieId}`);
  },

  // Get movie credits (cast and crew)
  getMovieCredits: async (movieId: number): Promise<MovieCredits> => {
    return apiRequest<MovieCredits>(`/movie/${movieId}/credits`);
  },

  // Search movies
  searchMovies: async (query: string, page: number = 1): Promise<SearchMoviesResponse> => {
    return apiRequest<SearchMoviesResponse>(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`);
  },
};

export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return '/placeholder-movie.jpg';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
