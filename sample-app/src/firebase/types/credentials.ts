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

export interface Credentials {
  config: Config;
}
