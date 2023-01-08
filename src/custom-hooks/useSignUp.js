// firebase
import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
// router
import { useNavigate } from "react-router-dom";

// function to capitalize name
function capitalizeWords(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].slice(1);
  }
  return splitStr.join(" ");
}

// function to change format of error string
function authErrorFormat(text) {
  return text.slice(5).split("-").join(" ");
}

function useSignUp(credentials, isSigningUp, setIsSigningUp, setSignUpError) {
  const navigate = useNavigate();

  if (!isSigningUp) return;

  // create new user in firebase
  createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
    .then((userCredential) => {
      // adding new user info in a document
      console.log(userCredential);
      setDoc(doc(db, "users", userCredential.user.uid), {
        email: userCredential.user.email,
        name: capitalizeWords(credentials.name),
        cart: [],
      });
    })
    .then(() => {
      navigate("/");
    })
    .catch((error) => {
      setSignUpError("Error: " + authErrorFormat(error.code));
    })
    .then(() => setIsSigningUp(false));
  return;
}

export default useSignUp;
