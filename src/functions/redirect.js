addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const { searchParams } = new URL(request.url)
  const targetUrl = searchParams.get('url')

  if (!targetUrl) {
    return new Response('Missing "url" parameter', {
      status: 400,
      headers: { 'Content-Type': 'text/plain' },
    })
  }

  try {
    new URL(targetUrl)
  } catch (error) {
    return new Response('Invalid URL provided', {
      status: 400,
      headers: { 'Content-Type': 'text/plain' },
    })
  }

  return Response.redirect(targetUrl, 302)
}
