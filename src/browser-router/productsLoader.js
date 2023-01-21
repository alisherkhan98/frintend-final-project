// firebase
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// loader function
export default async function productsLoader() {
  const productsRef = collection(db, "products");
  const q = query(productsRef, where("active", "==", true));

  let products = {};

  let querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (doc) => {
    const priceRef = collection(doc.ref, "prices");
    let priceSnap = await getDocs(priceRef);
    priceSnap.forEach((price) => {
      products[doc.data().name] = price.id;
    });
  });
  return products;
}
