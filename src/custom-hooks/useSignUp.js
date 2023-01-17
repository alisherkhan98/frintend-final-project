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

function useSignUp() {
  const navigate = useNavigate();

  async function signUp(credentials) {
    let error = "";
    // create new user in firebase
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      // adding new user info in a document
      setDoc(doc(db, "users", userCredential.user.uid), {
        email: userCredential.user.email,
        name: capitalizeWords(credentials.name),
        cart: [],
      });

      navigate("/");
    } catch (err) {
      error = "Error: " + authErrorFormat(err.code);
    }
    return error;
  }
  return signUp;
}

export default useSignUp;
