import { db } from "../config/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

// Reference to the "inventory" collection
const inventoryRef = collection(db, "inventory");

// ➕ Add new item
export const addItem = async (item) => {
  await addDoc(inventoryRef, item);
};

// 📦 Get all items
export const getItems = async () => {
  const snapshot = await getDocs(inventoryRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ❌ Delete item
export const deleteItem = async (id) => {
  const docRef = doc(db, "inventory", id);
  await deleteDoc(docRef);
};
