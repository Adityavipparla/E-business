import { error, type Actions, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { API_BASE_URL } from '$env/static/private';

interface ShowingResponse {
  showing: {
    available: 0 | 1;
    theater_id: number;
    time: string;
    type: string;
  };
  movie: {
    id: number;
    title: string;
    poster_url: string;
  };
  theater: {
    id: number;
    name: string;
    ticket_price: string;
  };
  seats: {
    id: string;
    price: string | null;
    row_number: number;
    column_number: number;
    available: boolean;
  }[];
}

export const load: PageServerLoad = async ({ params }) => {
  const [theaterId, showingTime] = params.showing.split('-');
  const response = await fetch(`${API_BASE_URL}/theaters/${theaterId}/showing/${showingTime}`);
  if (response.status === 404) throw error(404, 'not found');
  if (!response.ok) throw error(500, 'failed to fetch backend');
  const { movie, showing, theater, seats }: ShowingResponse = await response.json();
  return { movie, showing: { ...showing, theater, seats } };
};


export const actions = {
	default: async ({ params, request }) => {
		const data = await request.formData();
		const name = data.get('name');
		const email = data.get('email');
		const seat = data.get('seat');

    const [theaterId, showingTime] = params.showing!.split('-');
    const response = await fetch(`${API_BASE_URL}/theaters/${theaterId}/showing/${showingTime}/seat/${seat}`, {
      method: 'POST',
      body: JSON.stringify({ email, name }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.status === 404) throw error(404, 'not found');
    if (!response.ok) throw error(500, 'failed to fetch backend');

		return { done: true, seat }
	},
} satisfies Actions;