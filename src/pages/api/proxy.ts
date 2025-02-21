import type { APIRoute } from 'astro';

export const GET: APIRoute = async function get(context) {
    console.log('Hello from proxy');

    // TODO: get oboToken
    // TODO: get correct url
    return context.rewrite("/attestasjon");
};