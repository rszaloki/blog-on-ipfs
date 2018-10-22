if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {scope: '/'})
    .then((reg) => console.log('Successful service worker register'))
    .catch((err) => console.error('Failed service worker register', err))
}
