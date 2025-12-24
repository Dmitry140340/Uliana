import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Movie, NewMovie } from '../../types';

const API_URL = import.meta.env.PROD ? '/movies' : 'http://localhost:5000/movies';

interface MoviesState {
  items: Movie[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MoviesState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axios.get<Movie[]>(API_URL);
  return response.data;
});

export const addMovie = createAsyncThunk('movies/addMovie', async (newMovie: NewMovie) => {
  const response = await axios.post<Movie>(API_URL, newMovie);
  return response.data;
});

export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

export const toggleFavorite = createAsyncThunk('movies/toggleFavorite', async (movie: Movie) => {
  const updatedMovie = { ...movie, isFavorite: !movie.isFavorite };
  const response = await axios.put<Movie>(`${API_URL}/${movie.id}`, updatedMovie);
  return response.data;
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch movies';
      })
      .addCase(addMovie.fulfilled, (state, action: PayloadAction<Movie>) => {
        state.items.push(action.payload);
      })
      .addCase(deleteMovie.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((movie) => movie.id !== action.payload);
      })
      .addCase(toggleFavorite.fulfilled, (state, action: PayloadAction<Movie>) => {
        const index = state.items.findIndex((movie) => movie.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default moviesSlice.reducer;
