import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { API_BASE_URL } from '$env/static/private';

interface MovieResponse {
  movie: {
    id: number;
    title: string;
    description: string;
    poster_url: string;
    genre: string | null;
    rating: string | null;
    release_date: string | null;
    trailer_id: string | null;
    runtime_minutes: number | null;
  };
  showings: {
    available: 0 | 1;
    theater_id: number;
    time: string;
    type: string;
  }[];
  theaters: {
    id: number;
    name: string;
    city: string;
    state: string;
    zip: number;
  }[];
}

export const load: PageServerLoad = async ({ params }) => {
  const response = await fetch(`${API_BASE_URL}/movies/${params.id}`);
  if (response.status === 404) throw error(404, 'not found');
  if (!response.ok) throw error(500, 'failed to fetch backend');
  const { movie, showings, theaters }: MovieResponse = await response.json();
  return { movie, showings: { slots: showings, theaters } };
};