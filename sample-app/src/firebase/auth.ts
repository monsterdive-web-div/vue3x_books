import { FirebaseApp } from "./app";
import firebase from "firebase/app";
import "firebase/auth";

export const FirebaseAuth: firebase.auth.Auth = FirebaseApp.auth();
