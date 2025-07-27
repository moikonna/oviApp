import Fastify from 'fastify';
import * as cheerio from 'cheerio';
const fastify = Fastify({ logger: true });

fastify.get('/', async (request, reply) => {
async function getCsrfToken(url: string) {
  const response = await fetch(url);
  const html = await response.text();

  const $ = cheerio.load(html);
  const csrfToken = $('meta[name="csrf-token"]').attr('content');

  if (csrfToken) {
    console.log(csrfToken);
    return csrfToken;
  } else {
    console.error('CSRF token not found');
    return null;
  }
 
}
 getCsrfToken('https://dc.autoparkki.fi/access/c8ac638d-5ed6-4b15-8618-aad16529cfeb');
  const response = { hello: 'world' };
  return response;
});
fastify.get('/getToken', async (request, reply) => {
async function getCsrfToken(url: string) {
  const response = await fetch(url);
  const html = await response.text();
  const keksi = response.headers.getSetCookie();
  const match = keksi[0].match(/XSRF-TOKEN=([^;]+)/);
    const xsrfToken = match ? match[1] : null;
const match2 = keksi[1].match(/europark_finland_adc_session=([^;]+)/);
const sessionCookie = match2 ? match2[1] : null;
console.log(sessionCookie);
 // console.log("cookie "+keksi)
  const $ = cheerio.load(html);
  const csrfToken = $('meta[name="csrf-token"]').attr('content');

  if (csrfToken) {
    console.log(csrfToken);
    return [xsrfToken,csrfToken,sessionCookie];
  } else {
    console.error('CSRF token not found');
    return null;
  }
 
}
 return getCsrfToken('https://dc.autoparkki.fi/access/c8ac638d-5ed6-4b15-8618-aad16529cfeb');
});
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server listening on port 3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
