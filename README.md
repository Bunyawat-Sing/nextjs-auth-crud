# 🛡️ Authentication System with Next.js, NextAuth, and MongoDB

This project implements a user authentication system using **Next.js** and **NextAuth** with **MongoDB** as the database. It includes essential features such as **user login**, **registration**, **logout**, and **protected routes**, including a **Welcome page** displayed after successful login.

---

## 📚 Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Contributing](#contributing)

---

## ⚙️ Tech Stack

This project uses the following technologies:

- **Next.js**: A powerful React framework for **server-side rendering** (SSR) and **static site generation** (SSG), making it ideal for building scalable applications.
- **NextAuth**: A flexible authentication library for Next.js that simplifies **session handling** and **sign-in** functionalities.
- **MongoDB**: A NoSQL database used to store user data securely and efficiently, integrated with NextAuth for user authentication.
- **TypeScript**: A superset of JavaScript that adds **type safety** to the code, improving the overall development experience.

---

## 🚀 Features

- **Login & Register Pages**: Users can log in with existing credentials or create a new account on the **register page**.
- **Protected Route**: After logging in, users are redirected to a **protected welcome page**. If users try to access it without being authenticated, they will be redirected to the **login page**.
- **Navbar with Login/Logout**: The **Navbar** allows users to sign in, sign out, and navigate between pages. When logged in, users can log out directly from the Navbar.
- **Session Management**: **NextAuth** ensures that user sessions are properly handled, and authenticated users remain logged in across different pages.
- **Redirect Handling**: Unauthenticated users will be automatically redirected to the **login page** if they try to access protected pages.
- **MongoDB Integration**: MongoDB is used for storing user credentials and session data securely in the database.

---

## 🤝 Contributing

We welcome contributions from the community! To contribute to this project, follow these steps:

1. **Fork** the repository.
2. Create a **new branch** for your feature:
   ```bash
   git checkout -b feature-branch
Commit your changes:
bash
Copy
Edit
git commit -am 'Add new feature'
Push to your branch:
bash
Copy
Edit
git push origin feature-branch
Open a pull request to merge your changes.


