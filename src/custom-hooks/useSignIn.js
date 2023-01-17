// Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
// router
import { useNavigate } from "react-router-dom";

// function to change format of error string
function authErrorFormat(text) {
  return text.slice(5).split("-").join(" ");
}

function useSignIn() {
  const navigate = useNavigate();

  // sign in with firebase
  async function signIn(credentials) {
    try {
      await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      navigate("/");
    } catch (err) {
      throw new Error("Error: " + authErrorFormat(err.code));
    }
  }

  return signIn;
}

export default useSignIn;
