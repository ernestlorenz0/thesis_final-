// src/firebaseAuth.js
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDOXiQeOiFmOnc0frxqwrohXyhiQSZ90is",
    authDomain: "thesisproject-b1758.firebaseapp.com",
    databaseURL: "https://thesisproject-b1758-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "thesisproject-b1758",
    storageBucket: "thesisproject-b1758.firebasestorage.app",
    messagingSenderId: "392838616426",
    appId: "1:392838616426:web:c36a4e6a33897e7a5e4113",
    measurementId: "G-GD68BJ6HT6"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export async function signUp(email, password, username) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName: username });
    await sendEmailVerification(user);
    const userData = {
      username: username,
      email: user.email,
      createdAt: new Date().toISOString(),
      emailVerified: false
    };
    await set(ref(db, `/users/${user.uid}`), userData);
    return { ...userData, verificationSent: true };
  } catch (error) {
    throw error;
  }
}

export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if (!user.emailVerified) {
      await auth.signOut();
      throw new Error("Email not verified. Please check your inbox and verify your email before logging in.");
    }
    const userRef = ref(db, `/users/${user.uid}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return { email: user.email, username: user.displayName };
    }
  } catch (error) {
    if (error.code === "auth/wrong-password") {
      throw new Error("Incorrect password");
    } else if (error.code === "auth/user-not-found") {
      throw new Error("No user found with this email");
    } else {
      throw new Error(error.message);
    }
  }
}
