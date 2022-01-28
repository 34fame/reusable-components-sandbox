import { boot } from 'quasar/wrappers'
import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

const useEmulator = process.env.APP_ENV === 'local'

const firebaseConfig = {
   apiKey: 'AIzaSyC3M9vxUdzV202uVyf59Chrhi_rzQaOLk0',
   authDomain: 'fame-sandbox-dev.firebaseapp.com',
   projectId: useEmulator ? 'emulator-sandbox' : 'fame-sandbox-dev',
   storageBucket: 'fame-sandbox-dev.appspot.com',
   messagingSenderId: '679264882364',
   appId: '1:679264882364:web:56a81ca69452b2848c0ab9',
   measurementId: 'G-LS6CVPFJKC',
}

initializeApp(firebaseConfig)
const db = getFirestore()

if (useEmulator) {
   connectFirestoreEmulator(db, 'localhost', 8081)
}

export default boot(async ({ app }) => {
   app.provide('db', db)
})
