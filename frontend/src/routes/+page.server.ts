import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { API_BASE_URL } from '$env/static/private';

export const load: PageServerLoad = async () => {
  const response = await fetch(API_BASE_URL + '/movies');
  if (!response.ok) throw error(500, 'failed to fetch backend');
  const movies = await response.json();
  return { movies };
};