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
    "url": "/dist/app.js",
    "revision": "c7d8323bf596670d5f716ecc546ee521"
  },
  {
    "url": "/dist/styles.css",
    "revision": "3cfd0e1ca8d02726b5098ea360e9c577"
  },
  {
    "url": "/index.html",
    "revision": "ec99474be2a1437d2fd3c1a0ee0ce043"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
