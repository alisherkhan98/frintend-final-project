// Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
// router
import { useNavigate } from "react-router-dom";
// redux
import { setIsSigningIn } from "../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";

// function to change format of error string
function authErrorFormat(text) {
  return text.slice(5).split("-").join(" ");
}

function useSignIn(credentials, setSignInError) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isSigningIn } = useSelector((state) => state.auth);

  if (!isSigningIn) return;

  // firebase sign in
  signInWithEmailAndPassword(auth, credentials.email, credentials.password)
    .then(() => {
      navigate("/");
    })
    .catch((error) => {
      setSignInError("Error: " + authErrorFormat(error.code));
    })
    .then(() => dispatch(setIsSigningIn(false)));
  return;
}

export default useSignIn;
