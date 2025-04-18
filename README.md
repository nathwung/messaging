# 💬 Messaging Website

[![Built with Vue](https://img.shields.io/badge/Built%20with-Vue.js-42b883?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Built with Quasar](https://img.shields.io/badge/Built%20with-Quasar-1976d2?style=for-the-badge&logo=quasar&logoColor=white)](https://quasar.dev/)
[![Powered by Firebase](https://img.shields.io/badge/Powered%20by-Firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Deployed on Firebase Hosting](https://img.shields.io/badge/Hosted%20on-Firebase%20Hosting-FF5722?style=for-the-badge&logo=firebase&logoColor=white)](https://chat-55a76.web.app)

A secure, real-time chat application built with **Vue.js** and the **Quasar Framework**, integrated with **Firebase Authentication** and **Realtime Database**. The platform enables 1-on-1 messaging with live user presence, image sharing, and smart timestamps. Deployed seamlessly with Firebase Hosting.

---

## 🚀 Features

### 🔐 User Authentication
- Register using name, email, and password
- Secure login/logout via **Firebase Authentication**
- Auto-login for returning users

### 👥 User Directory
- View all registered users
- Online users marked in real time
- Offline users display last seen **day & date**
- Update your name (reflected live via Firebase)
- Logout sets status to offline instantly

### 💬 Chat System
- One-on-one messaging by clicking a user
- If the recipient is offline, a banner appears below their name
- Send:
  - ✍️ **Text messages**
  - 😊 **Emoticons**
  - 🖼️ **Images** with preview + optional captions

### 📄 Message Display
- Sent messages on the right (green bubbles)
- Received messages on the left (white bubbles)
- Timestamps below each message
- Smart date dividers:
  - “Today”, “Yesterday”, weekday name, or full date
- ✅ Grey double checks = Sent
- ✅✅ Blue double checks = Read (when recipient is on the chat page)

### 🗑️ Message Deletion
- Delete individual messages
- Clear entire chat on your end

### 🔁 Realtime Syncing
- All updates (messages, names, status) are synced live with **Firebase Realtime Database**

---

## 🛠 Tech Stack

- **Frontend**: Vue.js, Quasar Framework, HTML, CSS, JavaScript  
- **Backend / Realtime DB**: Firebase Realtime Database  
- **Authentication**: Firebase Authentication  
- **Hosting**: Firebase Hosting

---

## 🔗 Live Links

- 🌐 **Website**: [chat-55a76.web.app](https://chat-55a76.web.app/#/auth)  
- 🎥 **Video Demo**: [Watch on Google Drive](https://drive.google.com/file/d/1EzaCifBafGvaQluX7zmfk1MRs3IsTnuR/view)  
- 💻 **Source Code**: [GitHub Repository](https://github.com/nathwung/messaging)
