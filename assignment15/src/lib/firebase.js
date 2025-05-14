import { initializeApp } from "firebase/app";
import { getFirestore, orderBy } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";
import { getDocs, getDoc, query, where } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

// Collection reference
const todosCollectionRef = collection(db, "todos");

// Add a new todo
export const addTodo = async (todo) => {
    return await addDoc(todosCollectionRef, todo);
};

// Get all todos
export const getAllTodos = async () => {
    const q = query(todosCollectionRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};

// Get a single todo
export const getTodo = async (id) => {
    const docRef = doc(db, "todos", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return {
            id: docSnap.id,
            ...docSnap.data(),
        };
    } else {
        return null;
    }
};

// Update a todo
export const updateTodo = async (id, updatedTodo) => {
    const todoDoc = doc(db, "todos", id);
    return await updateDoc(todoDoc, updatedTodo);
};

// Delete a todo
export const deleteTodo = async (id) => {
    const todoDoc = doc(db, "todos", id);
    return await deleteDoc(todoDoc);
};
