import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCSdB3YP9L4FFEwRoaUZPE7DTgiweBWTG0",
  authDomain: "invoice-app-b6af8.firebaseapp.com",
  projectId: "invoice-app-b6af8",
  storageBucket: "invoice-app-b6af8.appspot.com",
  messagingSenderId: "65890400014",
  appId: "1:65890400014:web:17e7614699ff2ed02dc95f"
}

const firestoreInstance = getFirestore(initializeApp(firebaseConfig))

export { firestoreInstance }
