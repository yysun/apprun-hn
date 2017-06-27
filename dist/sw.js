importScripts('workbox-sw.prod.v1.0.1.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "/app.js",
    "revision": "ccdc974f6e14c9d612cd1bc85f81e6c0"
  },
  {
    "url": "/styles.css",
    "revision": "daa7ce7a4e5f94b7ec9d4bed9bd94f7d"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
