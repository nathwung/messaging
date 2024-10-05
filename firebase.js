import { initializeApp } from 'firebase/app'
import { getDatabase } from "firebase/database"
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAlue14pbm5CwH3wem7lua9NpvwcXASYTg",
  authDomain: "chat-55a76.firebaseapp.com",
  projectId: "chat-55a76",
  storageBucket: "chat-55a76.appspot.com",
  messagingSenderId: "267629678936",
  appId: "1:267629678936:web:d0589a72435df31591d52d"
};

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const auth = getAuth(app)

export {
    db, auth
}
