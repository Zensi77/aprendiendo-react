// eslint-disable-next-line react/prop-types
export function ListOfMovies({ movies }) {
    return (
        <ul className="movies">
            {
                // eslint-disable-next-line react/prop-types
                movies.map(movie => (
                    <li key={movie.id}>
                        <img src={movie.image} alt={movie.title} />
                        <h2>{movie.title}</h2>
                        <p>{movie.year}</p>
                    </li>
                ))
            }
        </ul>
    )
}

export function NoMoviesResult() {
    return <p>No se encontraron peliculas</p>
}

// eslint-disable-next-line react/prop-types
export function Movies({ movies }) {
    // eslint-disable-next-line react/prop-types
    const hasMovies = movies?.length > 0 // Si movies es undefined, hasMovies es false
    
    return (
        hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResult />
    )
}
