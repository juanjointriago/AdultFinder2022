// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAZMzWBqCESW6yLyYAnOX2OYxFKP7CiX7c",
  authDomain: "localzaihm.firebaseapp.com",
  databaseURL: "https://localzaihm.firebaseio.com",
  projectId: "localzaihm",
  storageBucket: "localzaihm.appspot.com",
  messagingSenderId: "531616491230",
  appId: "1:531616491230:web:123620ba22b475ba73844f",
  measurementId: "G-ZXLLJHCX6W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authentication = getAuth();