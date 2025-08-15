export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  video: boolean;
}

export interface MovieDetails extends Movie {
  runtime: number | null;
  genres: Genre[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string | null;
  budget: number;
  revenue: number;
  homepage: string | null;
  imdb_id: string | null;
  belongs_to_collection: Collection | null;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Collection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
  cast_id: number;
  credit_id: string;
  adult: boolean;
  gender: number | null;
  known_for_department: string;
  original_name: string;
  popularity: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
  credit_id: string;
  adult: boolean;
  gender: number | null;
  known_for_department: string;
  original_name: string;
  popularity: number;
}

export interface Credits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface MovieState {
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
    query: string;
    currentPage: number;
    totalPages: number;
    loading: boolean;
    error: string | null;
  };
  movieDetail: {
    movie: MovieDetails | null;
    credits: Credits | null;
    loading: boolean;
    error: string | null;
  };
}