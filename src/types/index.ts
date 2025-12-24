export interface Movie {
  id: string;
  title: string;
  description: string;
  poster: string;
  rating: number;
  releaseDate: string;
  isFavorite: boolean;
}

export type NewMovie = Omit<Movie, 'id'>;
