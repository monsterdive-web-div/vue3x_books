import firebase from "firebase/app";
import { credentials } from "./credentials";

export const FirebaseApp: firebase.app.App = firebase.initializeApp(credentials.config);
