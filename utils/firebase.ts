import 'firebase/analytics';
import 'firebase/firestore';

import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  authDomain: 'portfolio-7b363.firebaseapp.com',
  storageBucket: 'portfolio-7b363.appspot.com',
  messagingSenderId: '141715760877',
  measurementId: 'G-9EV5GWN8RQ',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.app().firestore();
const analytics = firebase.analytics;

export { db, analytics };
