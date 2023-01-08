import { useEffect } from "react";
// redux
import { useSelector } from "react-redux";
// firebase
import { db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

function useUpdateCart(user, setAlertMessage) {
  // cart
  const { cart } = useSelector((state) => state.shop);

  useEffect(() => {
    if (user) {
      setDoc(
        doc(db, "users", user.uid),
        {
          cart: cart,
        },
        { merge: true }
      ).catch((error) => {
        setAlertMessage(
          "There was an error while updating the cart: " + error.code
        );
        setTimeout(() => {
          setAlertMessage("");
        }, 1500);
        console.log(error);
      });
    }
  }, [cart]);
  return;
}

export default useUpdateCart;
