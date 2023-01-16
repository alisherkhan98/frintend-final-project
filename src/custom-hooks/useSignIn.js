// Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
// router
import { useNavigate } from "react-router-dom";

// function to change format of error string
function authErrorFormat(text) {
  return text.slice(5).split("-").join(" ");
}

function useSignIn(credentials, setSignInError) {
  const navigate = useNavigate();

  return () => {
    // firebase sign in
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setSignInError("Error: " + authErrorFormat(error.code));
      });
  };
}

export default useSignIn;
