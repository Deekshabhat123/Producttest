import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Movie, MovieDetails, Credits, MovieState, TMDBResponse } from '../types/movie';
import { tmdbApi } from '../services/tmdbApi';

const initialState: MovieState = {
  popular: {
    movies: [],
    currentPage: 1,
    totalPages: 1,
    loading: false,
    error: null,
  },
  topRated: {
    movies: [],
    currentPage: 1,
    totalPages: 1,
    loading: false,
    error: null,
  },
  upcoming: {
    movies: [],
    currentPage: 1,
    totalPages: 1,
    loading: false,
    error: null,
  },
  search: {
    movies: [],
    query: '',
    currentPage: 1,
    totalPages: 1,
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

// Async thunks for API calls
export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopular',
  async (page: number) => {
    const response = await tmdbApi.getPopularMovies(page);
    return response;
  }
);

export const fetchTopRatedMovies = createAsyncThunk(
  'movies/fetchTopRated',
  async (page: number) => {
    const response = await tmdbApi.getTopRatedMovies(page);
    return response;
  }
);

export const fetchUpcomingMovies = createAsyncThunk(
  'movies/fetchUpcoming',
  async (page: number) => {
    const response = await tmdbApi.getUpcomingMovies(page);
    return response;
  }
);

export const searchMovies = createAsyncThunk(
  'movies/search',
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
    return { movie: movieDetails, credits };
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.search = {
        movies: [],
        query: '',
        currentPage: 1,
        totalPages: 1,
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
      .addCase(fetchPopularMovies.fulfilled, (state, action: PayloadAction<TMDBResponse<Movie>>) => {
        state.popular.loading = false;
        state.popular.movies = action.payload.results;
        state.popular.currentPage = action.payload.page;
        state.popular.totalPages = Math.min(action.payload.total_pages, 500); // TMDB API limit
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.popular.loading = false;
        state.popular.error = action.error.message || 'Failed to fetch popular movies';
      });

    // Top rated movies
    builder
      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.topRated.loading = true;
        state.topRated.error = null;
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action: PayloadAction<TMDBResponse<Movie>>) => {
        state.topRated.loading = false;
        state.topRated.movies = action.payload.results;
        state.topRated.currentPage = action.payload.page;
        state.topRated.totalPages = Math.min(action.payload.total_pages, 500);
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.topRated.loading = false;
        state.topRated.error = action.error.message || 'Failed to fetch top rated movies';
      });

    // Upcoming movies
    builder
      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.upcoming.loading = true;
        state.upcoming.error = null;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action: PayloadAction<TMDBResponse<Movie>>) => {
        state.upcoming.loading = false;
        state.upcoming.movies = action.payload.results;
        state.upcoming.currentPage = action.payload.page;
        state.upcoming.totalPages = Math.min(action.payload.total_pages, 500);
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.upcoming.loading = false;
        state.upcoming.error = action.error.message || 'Failed to fetch upcoming movies';
      });

    // Search movies
    builder
      .addCase(searchMovies.pending, (state) => {
        state.search.loading = true;
        state.search.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action: PayloadAction<TMDBResponse<Movie> & { query: string }>) => {
        state.search.loading = false;
        state.search.movies = action.payload.results;
        state.search.currentPage = action.payload.page;
        state.search.totalPages = Math.min(action.payload.total_pages, 500);
        state.search.query = action.payload.query;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.search.loading = false;
        state.search.error = action.error.message || 'Failed to search movies';
      });

    // Movie details
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.movieDetail.loading = true;
        state.movieDetail.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action: PayloadAction<{ movie: MovieDetails; credits: Credits }>) => {
        state.movieDetail.loading = false;
        state.movieDetail.movie = action.payload.movie;
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