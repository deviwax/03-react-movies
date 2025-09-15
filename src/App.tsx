import React, { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import MovieGrid from "./components/MovieGrid/MovieGrid";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import MovieModal from './components/MovieModal/MovieModal';
import type { Movie } from './types/movie';
import { fetchMovies } from "./services/movieService";
import { Toaster, toast } from "react-hot-toast";
import styles from './App.module.css';

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string |null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    setMovies([]);
    try {
      const result = await fetchMovies(query);
      if (result.results.length === 0) {
        toast('No movies found for your request.');
      }
      setMovies(result.results);
    } catch (error) {
      console.error(error);
      setError('Unable to fetch movies.');
      toast.error('There was an error, please try again...');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  }

  return (<div className={styles.app}>
    <Toaster />
    <SearchBar onSubmit={handleSearch} />
    {loading && <Loader />}
    {error && !loading && <ErrorMessage message={error} />}
    {!loading && !error && <MovieGrid movies={movies} onSelect={handleSelectMovie} />}
    {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleCloseModal} />}
  </div>);
};

export default App;