import { useEffect } from "react";
// fiebase
import { auth, db } from "../firebase/firebaseConfig";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
// stripe
import { loadStripe } from "@stripe/stripe-js";

function useCheckOut() {
  // function to handle click on checkout
  async function handleCheckout(lineItems) {
    let stripeError = "";

    const currentUser = auth.currentUser.uid;
    const checkoutSessionsRef = collection(
      db,
      "customers",
      currentUser,
      "checkout_sessions"
    );
    const sessionRef = await addDoc(checkoutSessionsRef, {
      mode: "payment",
      line_items: lineItems,
      success_url: window.location.origin + "/success",
      cancel_url: window.location.href,
    });

    // listener for changes in checkout session
    onSnapshot(sessionRef, async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        console.log(error);
        stripeError = error;
      }

      if (sessionId) {
        // API key is publishable so it doesn't need to be set as env var
        const stripe = await loadStripe(
          "pk_test_51MDr2bHmfsxl9tuhkJd7fDkvm6uTnutmiJZM00oev6TCw50ZVw2R8FxVDyCyjvfFsJfIzkB6ksyWjiHt0GJaoc4300dYyXlMck"
        );
        console.log(stripe);
        stripe.redirectToCheckout({ sessionId });
      }
    });
    return stripeError;
  }

  return handleCheckout;
}

export default useCheckOut;
