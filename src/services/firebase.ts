// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_Xd2PkrWlBW2I6n6ZNBmgaENibxpT7L0",
  authDomain: "fastfruit-ecommerce.firebaseapp.com",
  projectId: "fastfruit-ecommerce",
  storageBucket: "fastfruit-ecommerce.appspot.com",
  messagingSenderId: "1009231433516",
  appId: "1:1009231433516:web:f468081cc3c94f48232689",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);