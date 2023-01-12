import { useEffect } from "react";
// redux
import { useDispatch } from "react-redux";
import { signIn, signOut } from "../redux/features/authSlice";
import { clearCart, setInitialCart } from "../redux/features/shopSlice";
import { setIsLoading } from "../redux/features/loadingSlice";
// firebase
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function useAuthenticate(setAlertMessage) {
  const dispatch = useDispatch();

  // listener for any change in the authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      // in case a user signed in
      if (newUser) {
        dispatch(signIn({ email: newUser.email, uid: newUser.uid }));
        // grab signed in user's cart from firestore
        getDoc(doc(db, "users", newUser.uid))
          .then((docsnap) => {
            dispatch(setInitialCart(docsnap.data().cart));
          })
          .catch((error) => {
            setAlertMessage(
              "There was an error retrieving the data from firestore"
            );
            setTimeout(() => {
              setAlertMessage("");
            }, 2000);
            console.log(error);
          });
      } else {
        // in case user signed out
        dispatch(clearCart());
        dispatch(signOut());
      }
      setTimeout(() => {
        dispatch(setIsLoading(false));
      }, 500);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return;
}

export default useAuthenticate;
