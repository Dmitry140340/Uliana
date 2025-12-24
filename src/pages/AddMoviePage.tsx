import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { addMovie } from '../features/movies/moviesSlice';
import type { NewMovie } from '../types';

const AddMoviePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<NewMovie>({
    title: '',
    description: '',
    poster: '',
    rating: 0,
    releaseDate: '',
    isFavorite: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(addMovie(formData));
    navigate('/');
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Добавить новый фильм</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Название</label>
            <input
              className="form-input"
              name="title"
              placeholder="Введите название фильма"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Описание</label>
            <textarea
              className="form-textarea"
              name="description"
              placeholder="Введите описание сюжета"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Ссылка на постер (URL)</label>
            <input
              className="form-input"
              name="poster"
              placeholder="https://example.com/poster.jpg"
              value={formData.poster}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Рейтинг (0-10)</label>
            <input
              className="form-input"
              name="rating"
              type="number"
              step="0.1"
              min="0"
              max="10"
              placeholder="8.5"
              value={formData.rating}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Дата выхода</label>
            <input
              className="form-input"
              name="releaseDate"
              type="date"
              value={formData.releaseDate}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Добавить фильм
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMoviePage;
