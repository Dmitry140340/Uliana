import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const MoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const movie = useAppSelector((state) =>
    state.movies.items.find((m) => m.id === id)
  );

  if (!movie) {
    return <div className="container">Фильм не найден! <Link to="/">На главную</Link></div>;
  }

  return (
    <div className="container">
      <Link to="/" className="btn btn-outline" style={{ display: 'inline-block', marginBottom: '2rem' }}>&larr; Назад к списку</Link>
      <div className="movie-details-container">
        <img src={movie.poster} alt={movie.title} className="details-poster" />
        <div className="details-content">
          <h1>{movie.title}</h1>
          <div className="meta-info">
            <p><strong>Дата выхода:</strong> {movie.releaseDate}</p>
            <p><strong>Рейтинг:</strong> <span style={{ color: '#ffd700' }}>★ {movie.rating}/10</span></p>
          </div>
          <div className="description">
            <p>{movie.description}</p>
          </div>
          {movie.isFavorite && <p style={{ color: '#e50914', fontWeight: 'bold' }}>❤️ В избранном</p>}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
