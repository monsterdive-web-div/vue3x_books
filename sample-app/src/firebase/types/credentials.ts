interface Config {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  databaseURL: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

interface MessagingConfig {
  vapidKey: string;
}

export interface Credentials {
  config: Config,
  messagingConfig: MessagingConfig
}
