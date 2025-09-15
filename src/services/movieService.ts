import axios from "axios";
import type { Movie } from '../types/movie';

interface TMDResponse {
    results: Movie[];
}

export async function fetchMovies(query: string): Promise<TMDResponse> {
    const config = {
        params: { query },
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzc2YTFhOTJiZTNmMTYzODUzODc2MzhjZDQwZTI2MCIsIm5iZiI6MTc1NzgwMzgxMC4yNjksInN1YiI6IjY4YzVmNTIyN2M1ZDAxMDAwYWU2MTcwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gMyGWEz9Yfr0CJRSFg3ydRXetJm-Qvf6UJgnkNTQmzo`,
        },
    };

    const response = await axios.get<TMDResponse>('https://api.themoviedb.org/3/search/movie',
        config
    );
    return response.data;
}