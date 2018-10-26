// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read http://bit.ly/CRA-PWA.

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then((registration) => {
          if (!registration.pushManager) {
            return;
          }
          // pushNotification(registration);
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit http://bit.ly/CRA-PWA'
          );
        });
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

function updateData(id ,key, update) {
  let events = JSON.parse(localStorage.getItem('joom_event')) || [];
  let newEvent = [];
  events.map((i) => {
    if (i.id === id) {
      i[key] = update;
    }
    newEvent.push(i);
  })
  localStorage.setItem('joom_event', JSON.stringify(newEvent));
}

function eventData() {
  let events = JSON.parse(localStorage.getItem('joom_event')) || [];
  let newEvent = []
  events.map(i => {
    if ('pre' in i && 'knock' in i) {
      newEvent.push(i)
    } else {
      i.pre = false;
      i.knock = false;
      newEvent.push(i)
    }
  })
  localStorage.setItem('joom_event', JSON.stringify(newEvent));
  return newEvent;
}


function pushNotification(registration) {
  const vapidPublicKey = "BDQZUzEODaPotGd2ptDnVUdJ4IWIvV5T4UFf-TM9OlGXgKxhoCPfrkENw1vkSuiIh_bsds5Hy2HQhjIAybVnfaU"
  const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey)
  registration.pushManager
  .subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedVapidKey
  })
  .then(subscribe => {
    
    setInterval(() => {
      let data = eventData();

      let nw = data.filter(i => {
        return new Date(i.end).getTime() - 600  >= new Date().getTime() && !i.pre;
      })
      let seq = 0;
      nw.forEach(ev => {
        let{ title, type, data } = ev;
        let tit = `${title} ${data[type.toLowerCase()]}`;
        seq += 5000;
        setTimeout(() => {
          registration.showNotification(tit);
          updateData(ev, 'pre', true);
        }, seq)
      })
    }, 10000);
  })
  .catch(err => console.log(err))
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      pushNotification(registration);
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                'New content is available and will be used when all ' +
                  'tabs for this page are closed. See http://bit.ly/CRA-PWA.'
              );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      if (
        response.status === 404 ||
        response.headers.get('content-type').indexOf('javascript') === -1
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
