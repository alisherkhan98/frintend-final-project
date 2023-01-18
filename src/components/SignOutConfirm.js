import React from "react";
// MUI
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
// firebase
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
// router
import { useNavigate } from "react-router-dom";
function SignOutConfirm({ dialogOpen, setDialogOpen }) {
  const navigate = useNavigate();
  // function when clicked on sign out
  function handleSignOut() {
    setDialogOpen(false);
    signOut(auth).then(() => navigate("/"));
  }
  return (
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      aria-labelledby="sign-out-confirm"
      aria-describedby="sign-out-description"
      sx={{
        "& .MuiPaper-root": {
          p: 1,
          borderRadius: 4,
        },
      }}
    >
      <DialogTitle id="sign-out-confirm">
        {"Are you sure you want to sign out?"}
      </DialogTitle>

      <DialogActions>
        <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
        <Button color="error" onClick={handleSignOut} autoFocus>
          Sign Out
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SignOutConfirm;
