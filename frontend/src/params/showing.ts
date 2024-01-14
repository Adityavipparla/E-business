import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
  return /^[0-9]+-[0-9]+$/.test(param) && parseInt(param.split('-')[1]) > 1672552800;
};