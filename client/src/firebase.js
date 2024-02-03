// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "mern-blog-1968f.firebaseapp.com",
	projectId: "mern-blog-1968f",
	storageBucket: "mern-blog-1968f.appspot.com",
	messagingSenderId: "648578825437",
	appId: "1:648578825437:web:8c1a62007f34ba01e5af34",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
