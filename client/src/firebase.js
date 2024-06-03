// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "broe-code.firebaseapp.com",
	projectId: "broe-code",
	storageBucket: "broe-code.appspot.com",
	messagingSenderId: "575491455237",
	appId: "1:575491455237:web:b104538ac2ca6c73a71f6c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
