import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'
const firebaseApp = firebase.initializeApp(firebaseConfig)
const auth = firebaseApp.auth()
const db = firebaseApp.firestore()
const settings = { timestampsInSnapshots: true }
db.settings(settings)
export { auth, db }
