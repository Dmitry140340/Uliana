import type { Meta, StoryObj } from '@storybook/react';
import MovieCard from './MovieCard';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../features/movies/moviesSlice';
import { BrowserRouter } from 'react-router-dom';

const mockStore = configureStore({
  reducer: { movies: moviesReducer },
});

const meta: Meta<typeof MovieCard> = {
  component: MovieCard,
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MovieCard>;

export const Default: Story = {
  args: {
    movie: {
      id: '1',
      title: 'Inception',
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology...',
      poster: 'https://via.placeholder.com/300x450',
      rating: 8.8,
      releaseDate: '2010-07-16',
      isFavorite: false,
    },
  },
};

export const Favorite: Story = {
  args: {
    movie: {
      id: '2',
      title: 'The Matrix',
      description: 'A computer hacker learns from mysterious rebels about the true nature of his reality...',
      poster: 'https://via.placeholder.com/300x450',
      rating: 8.7,
      releaseDate: '1999-03-31',
      isFavorite: true,
    },
  },
};
