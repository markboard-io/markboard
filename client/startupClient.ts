export function startupClient() {
  navigator.serviceWorker
    .register('/sw.js')
    .then(() => console.info('SW: registered'))
    .catch(error => {
      console.log('SW: registration failed', error)
    })
}
