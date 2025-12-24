import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect } from 'vitest';
import moviesReducer from '../features/movies/moviesSlice';
import MovieCard from './MovieCard';
import type { Movie } from '../types';

const mockMovie: Movie = {
  id: '1',
  title: 'Test Movie',
  description: 'Test Description',
  poster: 'test.jpg',
  rating: 8.5,
  releaseDate: '2023-01-01',
  isFavorite: false,
};

const renderWithProviders = (component: React.ReactElement) => {
  const store = configureStore({
    reducer: { movies: moviesReducer },
  });
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
};

describe('MovieCard', () => {
  it('renders movie information correctly', () => {
    renderWithProviders(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('★ 8.5')).toBeInTheDocument();
  });

  it('renders favorite button correctly', () => {
    renderWithProviders(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('🤍')).toBeInTheDocument();
  });
});
