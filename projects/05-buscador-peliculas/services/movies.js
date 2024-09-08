import { API_KEY } from '../.env';

export const searchMovies = async ({ search }) => {
    if(search === '') {
        return null;
    }

    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`);
        const json = await response.json();
        const movies = json.Search;

        return movies?.map((movie) => {
            return {
                id: movie.imdbID,
                image: movie.Poster,
                title: movie.Title,
                year: movie.Year,
            };
        });
    } catch (error) {
        console.error('Error:', error);
    }

}