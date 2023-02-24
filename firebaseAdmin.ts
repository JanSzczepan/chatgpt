import admin from 'firebase-admin'
import { getApps } from 'firebase/app'

if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
   throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is required')
}

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)

if (!getApps().length) {
   admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
   })
}

const adminDb = admin.firestore()

export default adminDb
