/* 
* Array of files to be cached
*/
const cacheFiles = [
    '/',
    '/index.html',
    'restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    'js/restaurant_info.js',
    'data/restaurants.json',
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg',
    'img/10.jpg'
];
/* 
* Listenes for Service Worker(SW) installation event
*/
self.addEventListener('install', function(e){
    e.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll(cacheFiles);
        })
    );
});
/* 
* Listenes for SW fetching event
*/
self.addEventListener('fetch',function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            if(response) {
                console.log('Found ', e.request, ' in cache');
                return response;
            }
            else {
                console.log('Could not find ', e.request, ' in cache, FETCHING!');
                return fetch(e.request)
                .then(function(response) {
                    const cloneResponse = response.clone();
                    caches.open('v1').then(function(cache) {
                        cache.put(e.request, cloneResponse);
                    })
                    return response;
                })
                .catch(function(err) {
                    console.error(err);
                });
            }
        })
    );
});