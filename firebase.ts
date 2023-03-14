import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1irwbVyf3LrbW6TRCRbm6UsNZ5dPvry0",
  authDomain: "brightdata-yt-build-88684.firebaseapp.com",
  projectId: "brightdata-yt-build-88684",
  storageBucket: "brightdata-yt-build-88684.appspot.com",
  messagingSenderId: "771429688824",
  appId: "1:771429688824:web:1b5f194e7e620e57ae620d",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
