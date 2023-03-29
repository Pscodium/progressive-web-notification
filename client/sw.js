var APP_PREFIX = 'fakepwa_';
var VERSION = 'version_001';
var URLS = [
    `/`,
    `/index.html`,
    `/index.js`
];

var CACHE_NAME = APP_PREFIX + VERSION;
self.addEventListener('fetch', function (e) {
    console.log('Fetch request : ' + e.request.url);
    e.respondWith(
        caches.match(e.request).then(function (request) {
            if (request) {
                console.log('Responding with cache : ' + e.request.url);
                return request;
            } else {
                console.log('File is not cached, fetching : ' + e.request.url);
                return fetch(e.request);
            }
        })
    );
});

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('Installing cache : ' + CACHE_NAME);
            return cache.addAll(URLS);
        })
    );
});

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keyList) {
            var cacheWhitelist = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX);
            });
            cacheWhitelist.push(CACHE_NAME);
            return Promise.all(keyList.map(function (key, i) {
                if (cacheWhitelist.indexOf(key) === -1) {
                    console.log('Deleting cache : ' + keyList[i]);
                    return caches.delete(keyList[i]);
                }
            }));
        })
    );
});

async function notify() {
    try {
        await self.registration.showNotification('notification title', {
            // image: data.imageUrl,
            body: 'body message',
            icon: 'https://camerite-landing-page-v2.s3.amazonaws.com/favicon.ico',
            badge: 'https://camerite-landing-page-v2.s3.amazonaws.com/favicon.ico',
            // data: { clickAction: '/lpr/' + data.detectionId },
        });
    } catch (err) {
        console.error(err);
    }
}


setTimeout(() => {
    console.log('hello');
    notify();
}, 5000);