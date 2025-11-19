'use strict';

const version = 'v1.2.0'; 
const __DEVELOPMENT__ = false;
const __DEBUG__ = false;
const offlineResources = [  
    '/',
];
const ignoreFetch = [          
    "/chrome-extension:\/\//",     
    "/https?://cdn.bootcss.com//",
    "/https?://zz.bdstatic.com//",
    "/https?://s.360.cn//",
    "/https?://s.ssl.qhres.com//",
    "/https?://hm.baidu.com//",
    "/https?://s19.cnzz.com//",
    "/https?://sp0.baidu.com//",
    "/https?://tag.baidu.com//",
    "/https?://msite.baidu.com//",
    "/https?://s.bdstatic.com//",
    "/https?://timg01.bdimg.com//,"
];
//////////
// Install
//////////
function onInstall(event) {
    log('install event in progress.');
    event.waitUntil(updateStaticCache());
}
function updateStaticCache() {
    return caches
        .open(cacheKey('offline'))
        .then((cache) => {
            return cache.addAll(offlineResources);
        })
        .then(() => {
            log('installation complete!');
        });
}
////////
// Fetch
////////
function onFetch(event) {
    const request = event.request;
    if (shouldAlwaysFetch(request)) {
        event.respondWith(networkedOrOffline(request));
        return;
    }

    event.respondWith(cachedOrNetworked(request));
}
function networkedOrCached(request) {
    return networkedAndCache(request)
        .catch(() => { return cachedOrOffline(request) });
}
// Stash response in cache as side-effect of network request
function networkedAndCache(request) {
    return fetch(request)
        .then((response) => {
            var copy = response.clone();
            // 检查请求的URL是否以 "chrome-extension" 开头，如果是，则不缓存
            if (!request.url.startsWith('chrome-extension')) {
                caches.open(cacheKey('resources'))
                    .then((cache) => {
                        cache.put(request, copy);
                    });
                log("(network: cache write)", request.method, request.url);
            } else {
                log("(network: skip cache write for chrome-extension)", request.method, request.url);
            }
            return response;
        });
}
function cachedOrNetworked(request) {
    return caches.match(request)
        .then((response) => {
            log(response ? '(cached)' : '(network: cache miss)', request.method, request.url);
            return response ||
                networkedAndCache(request)
                    .catch(() => { return offlineResponse(request) });
        });
}
function networkedOrOffline(request) {
    return fetch(request)
        .then((response) => {
            log('(network)', request.method, request.url);
            return response;
        })
        .catch(() => {
            return offlineResponse(request);
        });
}
function cachedOrOffline(request) {
    return caches
        .match(request)
        .then((response) => {
            return response || offlineResponse(request);
        });
}
function offlineResponse(request) {
    return null;
}
///////////
// Activate
///////////
function onActivate(event) {
    log('activate event in progress.');
    event.waitUntil(removeOldCache());
}
function removeOldCache() {
    return caches
        .keys()
        .then((keys) => {
            return Promise.all( // We return a promise that settles when all outdated caches are deleted.
                keys
                    .filter((key) => {
                        return !key.startsWith(version); // Filter by keys that don't start with the latest version prefix.
                    })
                    .map((key) => {
                        return caches.delete(key); // Return a promise that's fulfilled when each outdated cache is deleted.
                    })
            );
        })
        .then(() => {
            log('removeOldCache completed.');
        });
}
function cacheKey() {
    return [version, ...arguments].join(':');
}
function log() {
    if (developmentMode()) {
        console.log("SW:", ...arguments);
    }
}
function shouldAlwaysFetch(request) {
    return __DEVELOPMENT__ ||
        request.method !== 'GET' ||
        ignoreFetch.some(regex => request.url.match(regex));
}
function developmentMode() {
    return __DEVELOPMENT__ || __DEBUG__;
}
log("Hello from ServiceWorker land!", version);
this.addEventListener('install', onInstall);
this.addEventListener('fetch', onFetch);
this.addEventListener("activate", onActivate);