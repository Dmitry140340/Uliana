import moviesReducer, { addMovie, fetchMovies } from './moviesSlice';
import type { Movie } from '../../types';
import { describe, it, expect } from 'vitest';

describe('moviesSlice', () => {
  const initialState = {
    items: [],
    status: 'idle' as const,
    error: null,
  };

  it('should handle initial state', () => {
    expect(moviesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchMovies.pending', () => {
    const action = { type: fetchMovies.pending.type };
    const state = moviesReducer(initialState, action);
    expect(state.status).toEqual('loading');
  });

  it('should handle fetchMovies.fulfilled', () => {
    const movies: Movie[] = [{ id: '1', title: 'Test Movie', description: '', poster: '', rating: 5, releaseDate: '', isFavorite: false }];
    const action = { type: fetchMovies.fulfilled.type, payload: movies };
    const state = moviesReducer(initialState, action);
    expect(state.status).toEqual('succeeded');
    expect(state.items).toEqual(movies);
  });

  it('should handle addMovie.fulfilled', () => {
    const newMovie: Movie = { id: '2', title: 'New Movie', description: '', poster: '', rating: 5, releaseDate: '', isFavorite: false };
    const action = { type: addMovie.fulfilled.type, payload: newMovie };
    const state = moviesReducer(initialState, action);
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(newMovie);
  });
});
