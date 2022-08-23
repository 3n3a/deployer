import { Router } from 'itty-router'

// now let's create a router (note the lack of "new")
const router = Router()

// GET collection index
router.get('/', () => new Response(''))


// POST to the collection (we'll use async here)
router.post('/api/trigger', async request => {
  const apiKey = '' // X-API-KEY
  const body = await request.json()
  const part = body.part
  
  // trigger webhook
  
  if(isApiKeyValid(apiKey)) return new Response('OK')
  return new Response('INVALID KEY')
})

// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }))

// attach the router "handle" to the event handler
addEventListener('fetch', event =>
  event.respondWith(router.handle(event.request))
)
