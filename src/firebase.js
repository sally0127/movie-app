import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrnsVJFzB4RaAJbvdYIUe24MEybCmjJ0M",
  authDomain: "my-movie-app-5d9e0.firebaseapp.com",
  projectId: "my-movie-app-5d9e0",
  storageBucket: "my-movie-app-5d9e0.firebasestorage.app",
  messagingSenderId: "410412030675",
  appId: "1:410412030675:web:4f2e86eb5857c6b1f95226"
};

export const app = initializeApp(firebaseConfig);  // ← 第一步：先初始化連線
export const db = getFirestore(app);         // ← 第二步：再用這個連線去拿 Firestore 功能