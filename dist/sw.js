importScripts('workbox-sw.prod.v1.1.0.js');

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
    "url": "dist/app.js",
    "revision": "71896d9f50f328e14e1342dc3aab03bc"
  },
  {
    "url": "dist/styles.css",
    "revision": "3cfd0e1ca8d02726b5098ea360e9c577"
  },
  {
    "url": "index.html",
    "revision": "2863b716899f3c3ec495e6594cae73db"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
