// src/firebaseAuth.js
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification, deleteUser, sendPasswordResetEmail, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";
import { getDatabase, ref, set, get, remove, push, update } from "firebase/database";

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
    return { ...userData, uid: user.uid, verificationSent: true };
  } catch (error) {
    throw error;
  }
}

export async function login(email, password, { remember } = { remember: false }) {
  try {
    await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if (!user.emailVerified) {
      await auth.signOut();
      throw new Error("Email not verified. Please check your inbox and verify your email before logging in.");
    }
    const userRef = ref(db, `/users/${user.uid}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return { ...snapshot.val(), uid: user.uid };
    } else {
      return { email: user.email, username: user.displayName, uid: user.uid };
    }
  } catch (error) {
    if (error.code === "auth/wrong-password") {
      throw new Error("Incorrect password");
    } else if (error.code === "auth/user-not-found") {
      throw new Error("No user found with this email");
    } else if (error.code === "auth/invalid-credential") {
      throw new Error("Invalid email or password. Please try again.");
    } else {
      throw new Error(error.message);
    }
  }
}

export async function deleteAccount() {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Not authenticated.");
  }
  // Remove user data from Realtime Database (ignore if not present)
  try {
    await remove(ref(db, `/users/${user.uid}`));
  } catch (_) {
    // No-op if record doesn't exist
  }
  // Delete the auth user
  try {
    await deleteUser(user);
  } catch (error) {
    if (error && error.code === 'auth/requires-recent-login') {
      throw new Error('Please log in again to delete your account.');
    }
    throw new Error(error?.message || 'Failed to delete account.');
  }
}

// Update username and/or password for the current user
export async function updateAccount({ username, currentPassword, newPassword }) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated.');

  // Update display name and DB username if provided
  if (typeof username === 'string' && username.trim() !== '') {
    await updateProfile(user, { displayName: username.trim() });
    await update(ref(db, `/users/${user.uid}`), { username: username.trim() });
  }

  // Update password if requested
  if (newPassword && newPassword.length >= 6) {
    // Re-authenticate using current password
    const { EmailAuthProvider, reauthenticateWithCredential, updatePassword } = await import('firebase/auth');
    if (!currentPassword) {
      throw new Error('Current password is required to change password.');
    }
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
  }

  // Return latest profile snapshot
  const snap = await get(ref(db, `/users/${user.uid}`));
  const dbData = snap.exists() ? snap.val() : {};
  return { uid: user.uid, email: user.email, username: user.displayName || dbData.username || '', ...dbData };
}

// History helpers under /history/{uid}/{id}
export async function saveHistoryItem({ filename, slides, templateName }) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated.');
  const item = {
    filename,
    templateName: templateName || 'Classic Classroom',
    slides: Array.isArray(slides) ? slides : [],
    generatedAt: new Date().toISOString(),
  };
  const listRef = ref(db, `/history/${user.uid}`);
  const newRef = await push(listRef, item);
  return { id: newRef.key, ...item };
}

export async function fetchHistoryItems() {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated.');
  const listRef = ref(db, `/history/${user.uid}`);
  const snap = await get(listRef);
  if (!snap.exists()) return [];
  const val = snap.val();
  return Object.keys(val).map(id => ({ id, ...val[id] })).sort((a, b) => new Date(b.generatedAt) - new Date(a.generatedAt));
}

export async function renameHistoryItem(id, newFilename) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated.');
  await update(ref(db, `/history/${user.uid}/${id}`), { filename: newFilename });
}

export async function deleteHistoryItem(id) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated.');
  await remove(ref(db, `/history/${user.uid}/${id}`));
}
