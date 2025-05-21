# Real-Time-Chat-App

# 💬 MERN Real-Time Chat App

> ⚠️ **Usage Note**:  
> To simulate chat between two different users, open the application in **two separate browsers** (e.g., Chrome and Firefox).  
> This is required because sessionStorage/localStorage is used to manage user sessions, and browsers isolate sessions between them.  
> Opening two tabs in the same browser will **share the same session**, leading to unexpected behavior.
>
> 🔒 **Security Tip**:  
> This app uses **Private Routes** in React to secure protected routes (like the chat page).  
> Users who are not authenticated will be automatically redirected to the login page to prevent unauthorized access.

---

A full-stack real-time chat application built with the **MERN stack** and **Socket.IO**, supporting:

- 🔐 User authentication with persistent session
- 👥 Live online users display
- ✍️ Typing indicators beside usernames
- 📢 Toast notifications for joins/leaves
- 🧩 Scalable Node.js backend with MongoDB storage

## 🔧 Tech Stack

- **MongoDB** – Database to store users data
- **Express.js** – Backend server and REST API
- **React.js** – Frontend UI
- **Node.js** – Runtime environment
- **Socket.IO** – Real-time WebSocket communication
- **React Toastify** – User notifications

## 📌 Features

- Login with username
- Real-time 1-to-many chat
- Online user tracking
- Typing indicator shown beside username
- Toast alerts for user activity
- Chat messages broadcast instantly to all users
- Session persistence with localStorage / sessionStorage
