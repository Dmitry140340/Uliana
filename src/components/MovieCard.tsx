import React from 'react';
import { Link } from 'react-router-dom';
import type { Movie } from '../types';
import { useAppDispatch } from '../store/hooks';
import { toggleFavorite, deleteMovie } from '../features/movies/moviesSlice';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const dispatch = useAppDispatch();

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleFavorite(movie));
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm('Вы уверены, что хотите удалить этот фильм?')) {
      dispatch(deleteMovie(movie.id));
    }
  };

  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} className="movie-poster" />
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-rating">★ {movie.rating}</div>
        <div className="card-actions">
          <Link to={`/movie/${movie.id}`} className="btn btn-primary">Подробнее</Link>
          <button onClick={handleFavorite} className="btn btn-icon" title={movie.isFavorite ? "Убрать из избранного" : "В избранное"}>
            {movie.isFavorite ? '❤️' : '🤍'}
          </button>
          <button onClick={handleDelete} className="btn btn-danger" title="Удалить">🗑️</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
