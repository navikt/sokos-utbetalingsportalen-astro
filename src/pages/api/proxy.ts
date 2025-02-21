import type { APIRoute } from 'astro';
import { getOboToken } from '../../utils/server/token.ts';

export const GET: APIRoute = async function get(context) {
  console.log('Hello from proxy');

  const oboToken = getOboToken('');
  // TODO: get oboToken
  // TODO: get correct url
  return context.rewrite('/attestasjon');
};
