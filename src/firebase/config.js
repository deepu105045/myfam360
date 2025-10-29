import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const db = getFirestore(app)

export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, provider)
  return result.user
}

export function signOutUser() {
  return signOut(auth)
}

export function initFirebaseAuthListener() {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userRef = doc(db, getEnvPrefix(), 'users', user.uid)
      try {
        const snapshot = await getDoc(userRef)
        if (!snapshot.exists()) {
          await setDoc(userRef, { email: user.email, name: user.displayName, createdAt: Date.now() })
        }
      } catch (e) {
        console.error('Error ensuring user doc', e)
      }
      import('../store/useUserStore').then(({ default: useUserStore }) => {
        useUserStore.getState().setUser({ uid: user.uid, email: user.email, name: user.displayName })
      })
    } else {
      import('../store/useUserStore').then(({ default: useUserStore }) => {
        useUserStore.getState().clearUser()
      })
    }
  })
}

export { auth, db }

function getEnvPrefix() {
  const env = import.meta.env.VITE_ENV || 'dev'
  return `fam360/${env}`
}
