import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Movie, MovieDetails, MovieCredits, MoviesResponse, SearchMoviesResponse } from '@/types/movie';
import { tmdbApi } from '@/services/tmdbApi';

interface MoviesState {
  popular: {
    movies: Movie[];
    currentPage: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
  };
  topRated: {
    movies: Movie[];
    currentPage: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
  };
  upcoming: {
    movies: Movie[];
    currentPage: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
  };
  search: {
    movies: Movie[];
    currentPage: number;
    totalPages: number;
    query: string;
    loading: boolean;
    error: string | null;
  };
  movieDetail: {
    movie: MovieDetails | null;
    credits: MovieCredits | null;
    loading: boolean;
    error: string | null;
  };
}

const initialState: MoviesState = {
  popular: {
    movies: [],
    currentPage: 1,
    totalPages: 0,
    loading: false,
    error: null,
  },
  topRated: {
    movies: [],
    currentPage: 1,
    totalPages: 0,
    loading: false,
    error: null,
  },
  upcoming: {
    movies: [],
    currentPage: 1,
    totalPages: 0,
    loading: false,
    error: null,
  },
  search: {
    movies: [],
    currentPage: 1,
    totalPages: 0,
    query: '',
    loading: false,
    error: null,
  },
  movieDetail: {
    movie: null,
    credits: null,
    loading: false,
    error: null,
  },
};

// Async thunks
export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopularMovies',
  async (page: number) => {
    const response = await tmdbApi.getPopularMovies(page);
    return response;
  }
);

export const fetchTopRatedMovies = createAsyncThunk(
  'movies/fetchTopRatedMovies',
  async (page: number) => {
    const response = await tmdbApi.getTopRatedMovies(page);
    return response;
  }
);

export const fetchUpcomingMovies = createAsyncThunk(
  'movies/fetchUpcomingMovies',
  async (page: number) => {
    const response = await tmdbApi.getUpcomingMovies(page);
    return response;
  }
);

export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async ({ query, page }: { query: string; page: number }) => {
    const response = await tmdbApi.searchMovies(query, page);
    return { ...response, query };
  }
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (movieId: number) => {
    const [movieDetails, credits] = await Promise.all([
      tmdbApi.getMovieDetails(movieId),
      tmdbApi.getMovieCredits(movieId),
    ]);
    return { movieDetails, credits };
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.search = {
        movies: [],
        currentPage: 1,
        totalPages: 0,
        query: '',
        loading: false,
        error: null,
      };
    },
    clearMovieDetail: (state) => {
      state.movieDetail = {
        movie: null,
        credits: null,
        loading: false,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    // Popular movies
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.popular.loading = true;
        state.popular.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.popular.loading = false;
        state.popular.movies = action.payload.results;
        state.popular.currentPage = action.payload.page;
        state.popular.totalPages = action.payload.total_pages;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.popular.loading = false;
        state.popular.error = action.error.message || 'Failed to fetch popular movies';
      })
      
      // Top rated movies
      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.topRated.loading = true;
        state.topRated.error = null;
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.topRated.loading = false;
        state.topRated.movies = action.payload.results;
        state.topRated.currentPage = action.payload.page;
        state.topRated.totalPages = action.payload.total_pages;
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.topRated.loading = false;
        state.topRated.error = action.error.message || 'Failed to fetch top rated movies';
      })
      
      // Upcoming movies
      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.upcoming.loading = true;
        state.upcoming.error = null;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.upcoming.loading = false;
        state.upcoming.movies = action.payload.results;
        state.upcoming.currentPage = action.payload.page;
        state.upcoming.totalPages = action.payload.total_pages;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.upcoming.loading = false;
        state.upcoming.error = action.error.message || 'Failed to fetch upcoming movies';
      })
      
      // Search movies
      .addCase(searchMovies.pending, (state) => {
        state.search.loading = true;
        state.search.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.search.loading = false;
        state.search.movies = action.payload.results;
        state.search.currentPage = action.payload.page;
        state.search.totalPages = action.payload.total_pages;
        state.search.query = action.payload.query;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.search.loading = false;
        state.search.error = action.error.message || 'Failed to search movies';
      })
      
      // Movie details
      .addCase(fetchMovieDetails.pending, (state) => {
        state.movieDetail.loading = true;
        state.movieDetail.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.movieDetail.loading = false;
        state.movieDetail.movie = action.payload.movieDetails;
        state.movieDetail.credits = action.payload.credits;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.movieDetail.loading = false;
        state.movieDetail.error = action.error.message || 'Failed to fetch movie details';
      });
  },
});

export const { clearSearch, clearMovieDetail } = moviesSlice.actions;
export default moviesSlice.reducer;
