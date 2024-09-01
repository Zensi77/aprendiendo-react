import { useRef, useState, useMemo } from 'react';
import { searchMovies } from '../../services/movies';

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]); // Inicializamos el estado con un array vacío
  const [loading, setLoading] = useState(false); // Inicializamos el estado con false
  const previousSearch = useRef(search); // useRef nos permite mantener el valor de una variable entre renderizados sin que se vuelva a renderizar el componente

  const getMovies = useMemo(() => {// useMemo nos permite memorizar el valor de una función
    return async ({ search }) => {

      try {
        if (previousSearch.current === search) return; // Si el valor de la búsqueda actual es igual al valor anterior, salimos de la función
        setLoading(true); // Actualizamos el estado de loading
        previousSearch.current = search; // Actualizamos el valor de la búsqueda anterior
        const movies = await searchMovies({ search }); // Llamamos a la función searchMovies con el valor de search
        setMovies(movies); // Actualizamos el estado con las películas

      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false); // Actualizamos el estado de loading
      }
    }
  }, []); // La función getMovies se ejecutará cada vez que cambie el valor de search

  
  const sortMovies = useMemo(() => {
    return sort ? [... movies].sort((a, b) => a.title.localeCompare(b.title)) : movies;
  }, [movies, sort]);

  return { movies: sortMovies, getMovies, loading }; // Devolvemos un objeto con las películas y la función
}
