'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "0931ecad57154056b12ed62a3a0c3e79",
"assets/AssetManifest.json": "aa0d35c1677d40da2d66e1998b64f378",
"assets/assets/3danimations/animation_lmi4qgx8.json": "af14f4accebcc46fd6d8a8eb93f77609",
"assets/assets/3danimations/animation_lnkbd5dl.json": "7732a109d7bccd72a9ac2163d7d099d4",
"assets/assets/3danimations/congrats.json": "2da3d66e98a45a742338db3184f73be8",
"assets/assets/3danimations/correct_ans.json": "8a7457b22388bd5317de8d4e7e09a233",
"assets/assets/3danimations/start_left.json": "5d70a440b1a37a2f3b8e7d62e194cf3a",
"assets/assets/3danimations/start_right.json": "7bf15b04e261fe67544a9c288e8e6418",
"assets/assets/background_image0.png": "ffcae356411a9b36d7fa93626a9d0f12",
"assets/assets/IISER.png": "586355e0aba8dced31b65fb8a14d94cd",
"assets/assets/IIT.png": "41c70185bd9433c709362ae413c64129",
"assets/assets/images/autoclave.jpg": "4f1e065367a0368dda3c2a66450d4ec9",
"assets/assets/images/eppendorf%2520centrifuge.jpg": "bb78a8eb6217dba9f9f125bbf0f40c70",
"assets/assets/images/gel%2520electrophoresis.jpg": "87f21f0f5564d4e27c562290b3a29a80",
"assets/assets/images/geldoc.jpg": "e032a4e11463f7bd3ab68f6a60d40e2d",
"assets/assets/images/nanodrop.jpg": "3f11fe40bc2edd2092375e2f758aed72",
"assets/assets/images/pipette.jpg": "a76255abb707f83826f38e75af4bb306",
"assets/assets/level_bgr.png": "17bf559ab7c95a1c2be76f30529c76ab",
"assets/assets/Sounds/background.mp3": "60a6d99bf91a6f4285204fd63e3f0d53",
"assets/assets/start_screen.png": "7d598b34aaa7a41ae201964ea0cf3bd8",
"assets/FontManifest.json": "2d5aeff6728b78133638ab7e60738738",
"assets/fonts/MaterialIcons-Regular.otf": "32fce58e2acb9c420eab0fe7b828b761",
"assets/fonts/Roboto.ttf": "11eabca2251325cfc5589c9c6fb57b46",
"assets/NOTICES": "27718a94347914b2e8ce18292dc868ad",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "bbf39143dfd758d8d847453b120c8ebb",
"canvaskit/canvaskit.wasm": "19d8b35640d13140fe4e6f3b8d450f04",
"canvaskit/chromium/canvaskit.js": "96ae916cd2d1b7320fff853ee22aebb0",
"canvaskit/chromium/canvaskit.wasm": "1165572f59d51e963a5bf9bdda61e39b",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "d1fde2560be92c0b07ad9cf9acb10d05",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "78e2924cfcf4ac18273486250b52fd3d",
"/": "78e2924cfcf4ac18273486250b52fd3d",
"main.dart.js": "aa1a494692a493dbcd5031d7e4741df3",
"manifest.json": "32e7c5300f410279773ad8c0dba86f44",
"splash/img/dark-1x.png": "6ca56c973a785852c791224ea77e3248",
"splash/img/dark-2x.png": "9a19bc7c64377b678f14fe1515e03bf8",
"splash/img/dark-3x.png": "33f9a49f159866fdff5e31380842ee1d",
"splash/img/dark-4x.png": "603766bf980a9e9e434f8ba4d1908ec5",
"splash/img/light-1x.png": "6ca56c973a785852c791224ea77e3248",
"splash/img/light-2x.png": "9a19bc7c64377b678f14fe1515e03bf8",
"splash/img/light-3x.png": "33f9a49f159866fdff5e31380842ee1d",
"splash/img/light-4x.png": "603766bf980a9e9e434f8ba4d1908ec5",
"version.json": "fd062eaa0d285367f1762888640f2876"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
