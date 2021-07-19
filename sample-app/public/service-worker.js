/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

workbox.core.setCacheNameDetails({prefix: "sample-app"});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(png|svg|woff|ttf|eot)/, new workbox.strategies.CacheFirst({ "cacheName":"assets", plugins: [] }), 'GET');

self.addEventListener('fetch', function(event) {
  //ブラウザが回線に接続しているかをboolで返してくれる
  var online = navigator.onLine;
  //回線が使えるときの処理
  if(!online){
    //オフラインのときの制御
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
            // キャッシュがあったのでそのレスポンスを返す
            if (response) {
              return response;
            }
            //オフラインでキャッシュもなかったパターン
            return caches.match("offline.html")
              .then(function(responseNodata)
              {
                return responseNodata;
              });
          }
        )
    );
  }
});