import { Router } from 'itty-router'

// now let's create a router (note the lack of "new")
const router = Router()

// GET collection index
router.get('/', () => new Response(''))


// POST to the collection (we'll use async here)
router.post('/api/trigger', async request => {
  const apiKey = '' // X-API-KEY
  if(!isApiKeyValid(apiKey)) return new Response('INVALID KEY')

  const body = await request.json()
  const part = body.part
  const webhook_url = getWebhookUrl(part)
  if(webhook_url) {
    // triggers webhook
    const res = await fetch(webhook_url, {body: '', method: 'POST'})
    if(!res.ok) return new Response('INVALID WEBHOOK RESPONSE')

    const json = await res.json()
    console.log('webhook response', json)

    return new Response('OK')
  }
    
  return new Response('URL NOT FOUND')
})

// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }))

/**
 * Get Webhook Url by Name, or return false
 * @param {string} part Name of Deploy Url
 * @returns URL|boool
 */
function getWebhookUrl(part) {
  const urls = JSON.parse(DEPLOY_URLS)
  if(urls.hasOwnProperty(part)) return urls[part]
  return false
}

/**
 * Check if API Key is contained in Array
 * @param {string} key Api key
 * @returns bool
 */
function isApiKeyValid(key) {
  const urls = JSON.parse(API_KEYS)
  if(urls.includes(key)) return true
  return false
}

// attach the router "handle" to the event handler
addEventListener('fetch', event =>
  event.respondWith(router.handle(event.request))
)
