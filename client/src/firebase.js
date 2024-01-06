// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "authtoolkit-2929.firebaseapp.com",
  projectId: "authtoolkit-2929",
  storageBucket: "authtoolkit-2929.appspot.com",
  messagingSenderId: "860371760966",
  appId: "1:860371760966:web:d00c4e8deef7e058fcd747",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
