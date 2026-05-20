// Global Pages middleware — runs on every request.
// Funnels all alternate hostnames into the canonical spacecat.bet so
// Google only ever sees a single set of URLs.

const CANONICAL = 'spacecat.bet';

export const onRequest = async ({ request, next }) => {
  const url = new URL(request.url);
  const host = url.hostname;

  if (host.endsWith('.pages.dev') || host === `www.${CANONICAL}`) {
    url.hostname = CANONICAL;
    return Response.redirect(url.toString(), 301);
  }

  return next();
};
