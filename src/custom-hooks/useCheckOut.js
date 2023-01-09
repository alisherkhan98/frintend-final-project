import { useEffect } from "react";
// fiebase
import { auth, db } from "../firebase/firebaseConfig";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
// stripe
import { loadStripe } from "@stripe/stripe-js";
// redux
import { stopCheckout } from "../redux/features/shopSlice";
import { useDispatch, useSelector } from "react-redux";

function useCheckOut(lineItems) {
  const { isCheckingOut } = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  useEffect(() => {
    // function to handle click on checkout
    async function handleCheckout() {
      if (!isCheckingOut) return;

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
          dispatch(stopCheckout());
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
    }

    handleCheckout();
    console.log("done");
  }, [isCheckingOut]);
  return;
}

export default useCheckOut;
