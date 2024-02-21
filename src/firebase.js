import { FirebaseConstants } from './constants/firebase'

import { initializeApp } from 'firebase/app'

const firebaseConfig = {
	apiKey: FirebaseConstants.API_KEY,
	authDomain: FirebaseConstants.AUTH_DOMAIN,
	databaseURL: FirebaseConstants.DATABASE_URL,
	projectId: FirebaseConstants.PROJECT_ID,
	storageBucket: FirebaseConstants.STORAGE_BUCKET,
	messagingSenderId: FirebaseConstants.MESSAGING_SENDER_ID,
	appId: FirebaseConstants.APP_ID,
}

export const firebaseApp = initializeApp(firebaseConfig)
