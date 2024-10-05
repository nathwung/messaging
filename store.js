import { defineStore } from 'pinia'
import { db, auth } from 'boot/firebase'
import { date } from 'quasar'
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { ref, set, get, onValue, update, push, remove } from "firebase/database"
import { RouterLink, useRoute, useRouter } from 'vue-router'

let getUserSnapshot = null
let getMessages = null

export const useStore = defineStore('store', {
  state: () => ({
    userDetails: {},
    users: {},
    messages: {}
  }),
  mutations: {
    setUserDetails(state, payload) {
      state.userDetails = payload
    }
  },
  getters: {
    doubleCount: (state) => state.counter * 2,
    filteredUsers: (state) => {
      let usersFiltered = {}
      Object.keys(state.users).forEach(key =>{
        if (key != state.userDetails.id){
          usersFiltered[key] = state.users[key]
        }
      })
      return usersFiltered
    }
  },
  actions: {
    registerUser(payload) {
      createUserWithEmailAndPassword(auth, payload.email, payload.password)
      .then((userCredential) => {
        const userId = userCredential.user.uid
        set(ref(db, 'users/' + userId), {
          name: payload.name,
          email: payload.email,
          online: true,
          lastSeen: Date.now()
        })
      })
    },
    loginUser(payload) {
      signInWithEmailAndPassword(auth, payload.email, payload.password)
      .then((userCredential) => {
       })
    },
    logoutUser(payload) {
      signOut(auth).then(() => {
        this.router.push('/auth')
      })
    },
    handleAuthStateChanged(){
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userId = user.uid
          this.userDetails.id = userId
          return onValue(ref(db, '/users/' + userId), (snapshot) => {
            this.userDetails.name = snapshot.val().name
            this.userDetails.email = snapshot.val().email
            this.userDetails.online = snapshot.val().online
            update(ref(db, "users/" + this.userDetails.id), {
              online: true
            })
            getUserSnapshot = onValue(ref(db, 'users/'), (snapshot) => {
              if (snapshot.exists()){
                console.log(snapshot.val())
                this.users = snapshot.val()
              } else{
                console.log('No Data')
              }
            })
            console.log(getUserSnapshot)
            this.router.push('/')
          }, {
            onlyOnce: true
          })
        } else {
          if (this.userDetails.id){
            update(ref(db, "users/" + this.userDetails.id), {
              online: false,
              lastSeen: Date.now()
            })
          }
          this.userDetails = {}
        }
         })
    },
    firebaseGetMessages(otherUserId){
      let userId = this.userDetails.id
      getMessages = onValue(ref(db, 'chats/' + userId + '/' + otherUserId), (snapshot) => {
        console.log(snapshot.val())
        if(snapshot.val()!=null){
          this.messages = snapshot.val()
          let day = []
          Object.keys(this.messages).forEach(messageId =>{
            if (!day.includes(date.formatDate(this.messages[messageId].time, 'DD/MM/YYYY'))){
              day.push(date.formatDate(this.messages[messageId].time, 'DD/MM/YYYY'))
              this.messages[messageId].date=this.messages[messageId].time
            }
          })
        } else{
          this.messages = {}
        }
        let getMessage = onValue(ref(db, 'chats/' + otherUserId + '/' + userId), (snapshot) => {
          console.log("snapshot", snapshot.val())
          if(snapshot.val()!=null){
            Object.keys(snapshot.val()).forEach(messageId =>{
              if(snapshot.val()[messageId].from=='me' && !snapshot.val()[messageId].read){
                update(ref(db, "chats/" + otherUserId + '/' + this.userDetails.id + '/' + messageId), {
                  read: true
                })
              }
            })
          }
          getMessage()
        })
      })
    },
    firebaseStopGettingMessages(){
      this.messages = {}
      if (getMessages){
        getMessages()
      }
    },
    firebaseSendMessage(payload){
      console.log('payload: ', payload)
      push(ref(db, 'chats/' + this.userDetails.id + '/' + payload.otherUserId), 
        payload.message
      )
      payload.message.from = 'them'
      push(ref(db, 'chats/' + payload.otherUserId + '/' + this.userDetails.id), 
         payload.message
      )
    },
    firebaseDeleteMessage(otherUserId){
      // console.log(otherUserId)
      remove(ref(db, 'chats/' + this.userDetails.id + '/' + otherUserId))
    },
    firebaseDeleteSingleMessage(otherUserId, messageId){
      remove(ref(db, 'chats/' + this.userDetails.id + '/' + otherUserId + '/' + messageId))
    },
    firebaseEditName(){
      update(ref(db, "users/" + this.userDetails.id), {
        name: this.userDetails.name
      })
    }
  }
})
