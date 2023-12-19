//!\\ Do not edit without the scrum's permission

import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWNPr3fYZhSPtuCpBvCIuNYw6P_F6P7fo",
    authDomain: "myfitness-525cc.firebaseapp.com",
    projectId: "myfitness-525cc",
    storageBucket: "myfitness-525cc.appspot.com",
    messagingSenderId: "128098127408",
    appId: "1:128098127408:web:38c1e1a500bc013276e7f5"
};
export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth();