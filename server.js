import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

const PORT = process.env.PORT || 5000;
const DB_FILE = './database.sqlite';

let db;

async function initializeDb() {
  db = await open({
    filename: DB_FILE,
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS movies (
      id TEXT PRIMARY KEY,
      title TEXT,
      description TEXT,
      poster TEXT,
      rating REAL,
      releaseDate TEXT,
      isFavorite INTEGER
    )
  `);

  const result = await db.get('SELECT count(*) as count FROM movies');
  if (result.count === 0) {
    console.log('Database is empty. Seeding from db.json...');
    try {
        if (fs.existsSync('./db.json')) {
            const data = fs.readFileSync('./db.json', 'utf8');
            const jsonData = JSON.parse(data);
            if (jsonData.movies && Array.isArray(jsonData.movies)) {
                const stmt = await db.prepare('INSERT INTO movies (id, title, description, poster, rating, releaseDate, isFavorite) VALUES (?, ?, ?, ?, ?, ?, ?)');
                for (const movie of jsonData.movies) {
                    await stmt.run(
                        movie.id, 
                        movie.title, 
                        movie.description, 
                        movie.poster, 
                        movie.rating, 
                        movie.releaseDate, 
                        movie.isFavorite ? 1 : 0
                    );
                }
                await stmt.finalize();
                console.log('Initial data loaded from db.json');
            }
        } else {
            console.log('db.json not found. Starting with empty database.');
        }
    } catch (e) {
        console.error('Error seeding database:', e);
    }
  }
}

// Routes
app.get('/movies', async (req, res) => {
  try {
    const movies = await db.all('SELECT * FROM movies');
    // Convert isFavorite back to boolean
    const formattedMovies = movies.map(m => ({...m, isFavorite: !!m.isFavorite}));
    res.json(formattedMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/movies', async (req, res) => {
  try {
    const movie = req.body;
    // Generate ID if not present
    if (!movie.id) movie.id = Math.random().toString(36).substr(2, 9);
    
    await db.run(
      'INSERT INTO movies (id, title, description, poster, rating, releaseDate, isFavorite) VALUES (?, ?, ?, ?, ?, ?, ?)',
      movie.id, movie.title, movie.description, movie.poster, movie.rating, movie.releaseDate, movie.isFavorite ? 1 : 0
    );
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const movie = req.body;
    await db.run(
      'UPDATE movies SET title = ?, description = ?, poster = ?, rating = ?, releaseDate = ?, isFavorite = ? WHERE id = ?',
      movie.title, movie.description, movie.poster, movie.rating, movie.releaseDate, movie.isFavorite ? 1 : 0, id
    );
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.run('DELETE FROM movies WHERE id = ?', id);
    res.json({ id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Handle React routing, return all requests to React app
// In Express 5, '*' is no longer a wildcard. We must use '(.*)' or a regex.
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

