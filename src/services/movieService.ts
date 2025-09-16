import axios from "axios";
import type { Movie } from '../types/movie';

interface TMDResponse {
    results: Movie[];
}

export async function fetchMovies(query: string): Promise<TMDResponse> {
    const token = import.meta.env.VITE_TMDB_TOKEN;

    console.log("TMDB Token from env:", token);
    
    if (!token) {
        throw new Error("TMDB token is not defined");
    }

    const config = {
        params: { query },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };  

    const response = await axios.get<TMDResponse>('https://api.themoviedb.org/3/search/movie',
        config
    );
    return response.data;
}