import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
   apiKey: 'AIzaSyBfY1z1OvvgpaMArpZvCxEBoTL1rmBeoXc',
   authDomain: 'chatgpt-5e643.firebaseapp.com',
   projectId: 'chatgpt-5e643',
   storageBucket: 'chatgpt-5e643.appspot.com',
   messagingSenderId: '905778555859',
   appId: '1:905778555859:web:fa755c5e66ad30fb3fdd26',
}

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const db = getFirestore(app)
