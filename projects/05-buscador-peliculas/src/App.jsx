import './App.css'
import { useMovies } from './hooks/useMovies'
import { useEffect, useRef, useState, useCallback } from 'react';
import { Movies } from './components/movies'
import debounce from 'just-debounce-it'

function useSearch() {
  const [search, updateSearch] = useState('');
  const [error, setError] = useState(null);
  const isFirstSearch = useRef(true); // useRef nos permite mantener el valor de una variable entre renderizados sin que se vuelva a renderizar el componente

  useEffect(() => { // sirve para validar el input
    /* 
    controlado quiere decir que el valor del input está controlado por el estado de React
    no controlado quiere decir que el valor del input no está controlado por el estado de React
    */
    
    if (isFirstSearch.current) {
      isFirstSearch.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }
    
    setError(null);
  }, [search]);

  return [search, updateSearch, error];
}


function App() {
  const [sort, setSort] = useState(false);
  const [search, updateSearch, error] = useSearch(); // Destructuramos el objeto que devuelve useSearch
  const { movies, getMovies, loading } = useMovies({ search, sort });


  const handleSubmit = (event) => {
    event.preventDefault(); // Evitamos que se recargue la página
    console.log({ search });
    // const fields = Object.fromEntries(new window.FormData(event.target)); // Otra forma de acceder al valor del input con js Vanilla

    getMovies({ search }); // Llamamos a la función getMovies con el valor de search
  }

  const debouncedGetMovies = useCallback(
    debounce(search => {
      console.log('search', search);
      getMovies({ search });
    }, 500), [getMovies]);

  const handleChange = (event) => {
    const newSearch = event.target.value; // Obtenemos el valor del input
    updateSearch(newSearch); // Actualizamos el estado de search
    //getMovies({ search: newSearch }); // Llamamos a la función getMovies con el valor de newSearch
    // al hacer esto, cada vez que escribimos en el input, se llama a la api, lo cual no es eficiente, asi que se soluciona con un debounce
    // debounce es una técnica que nos permite retrasar la ejecución de una función hasta que haya pasado un tiempo determinado

    debouncedGetMovies(newSearch);
  }

  const handleSort = () => {
    setSort(!sort); // Actualizamos el estado de sort
  }


  return (
    <>
      <div className='page'>
        <h1>Buscador de Películas</h1>
        <p>Busca tu película favorita</p>
        <header>
          <form action="" className='form' onSubmit={handleSubmit}>
            <input onChange={handleChange} value={search} name='query' type="text" placeholder='Buscar película' style={{
              border: '1px solid transparent',
              borderColor: error ? 'red' : 'transparent',
            }} />
            <input type="checkbox" onChange={handleSort} checked={sort} />
            <button type='submit'>Buscar</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </header>
      </div>

      <main>
        {
          loading ? (
            <p>Cargando...</p>
          ) : (
            <Movies movies={movies} />
          )
        }
      </main>
    </>
  );
}

export default App

// min 1:34:00
