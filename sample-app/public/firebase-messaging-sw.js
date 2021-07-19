importScripts('https://www.gstatic.com/firebasejs/8.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  projectId: "sample-app-xxxxx",
  messagingSenderId: "xxxxxxxxxxxx",
  appId: "1:xxxxxxxxxxxx:web:xxxxxxxxxxxxxxxxxxxxxx",
});

var messaging = firebase.messaging();

// バックグラウンドでのプッシュ通知受信
messaging.setBackgroundMessageHandler(function(payload) {
  var notificationTitle = payload.notification.title;
  var notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});