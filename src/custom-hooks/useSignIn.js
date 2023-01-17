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
    let error = "";
    try {
      await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      navigate("/");
    } catch (err) {
      error = "Error: " + authErrorFormat(err.code);
    }
    return error;
  }

  return signIn;
}

export default useSignIn;
