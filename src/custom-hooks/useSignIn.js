// Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
// router
import { useNavigate } from "react-router-dom";

// function to change format of error string
function authErrorFormat(text) {
  return text.slice(5).split("-").join(" ");
}

function useSignIn(credentials, isSigningIn, setIsSigningIn, setSignInError) {
  const navigate = useNavigate();

  if (!isSigningIn) return;

  // firebase sign in
  signInWithEmailAndPassword(auth, credentials.email, credentials.password)
    .then(() => {
      navigate("/");
    })
    .catch((error) => {
      setSignInError("Error: " + authErrorFormat(error.code));
    })
    .then(() => setIsSigningIn(false));
  return;
}

export default useSignIn;
