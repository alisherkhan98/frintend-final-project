import React, { useEffect, useState } from "react";
// MUI
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
// redux
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/features/shopSlice";
// components
import CartRow from "../components/CartRow";
import MyAlert from "../components/MyAlert";
import Footer from "../components/Footer";
// fiebase
import { auth, db } from "../firebase/firebaseConfig";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
// custom hook
import UseGetProducts from "../custom-hooks/UseGetProducts";
// stripe
import { loadStripe } from "@stripe/stripe-js";

function CartScreen() {
  const { cart } = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  // state to trigger checkout
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // getting list of products from stripe extension with custom hook
  const products = UseGetProducts();

  // array of items with their price ID and their quantity
  let lineItems = cart.map((item) => ({
    price: products[item.name],
    quantity: item.amount,
  }));

  // calculate total price
  const totalPrice = cart.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.amount * currentValue.price,
    0
  );

  // calculate total co2
  const totalCo2 = cart.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.amount * currentValue.co2,
    0
  );

  useEffect(() => {
    // function to handle click on checkout
    async function handleCheckout() {
      if (!isCheckingOut) return;

      const currentUser = auth.currentUser.uid;
      const checkoutSessionsRef = collection(
        db,
        "customers",
        currentUser,
        "checkout_sessions"
      );
      const sessionRef = await addDoc(checkoutSessionsRef, {
        mode: "payment",
        line_items: lineItems,
        success_url: window.location.origin + "/success",
        cancel_url: window.location.href,
      });

      // listener for changes in checkout session
      onSnapshot(sessionRef, async (snap) => {
        const { error, sessionId } = snap.data();

        if (error) {
          setIsCheckingOut(false);
        }

        if (sessionId) {
          // API key is publishable so it doesn't need to be set as env var
          const stripe = await loadStripe(
            "pk_test_51MDr2bHmfsxl9tuhkJd7fDkvm6uTnutmiJZM00oev6TCw50ZVw2R8FxVDyCyjvfFsJfIzkB6ksyWjiHt0GJaoc4300dYyXlMck"
          );
          console.log(stripe);
          stripe.redirectToCheckout({ sessionId });
        }
      });
    }

    handleCheckout();
  }, [isCheckingOut]);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "neutral.main",
          py: 8,
          minHeight: "100vh",
          boxSizing: "border-box",
        }}
      >
        <Container>
          <Typography
            color="primary"
            variant="h4"
            textAlign="center"
            fontWeight={700}
            mb={5}
            mt={5}
          >
            Your Cart
          </Typography>
          {cart.length ? (
            <Paper
              sx={{
                px: { xs: 3, sm: 5 },
                py: { xs: 2, sm: 3 },

                borderRadius: 5,
                boxShadow: "0 0 15px rgba(0,0,0,0.3)",
              }}
            >
              {cart.map((item) => {
                return <CartRow item={item} key={item.id} />;
              })}

              <Typography variant="subtitle1" my={2}>
                Total CO&#8322; absorbed: <strong>{totalCo2} kg</strong>
              </Typography>

              <Typography variant="subtitle1" my={2}>
                Total price: <strong>{totalPrice.toFixed(2)} €</strong>
              </Typography>

              {/* action buttons */}
              <Stack
                sx={{
                  flexDirection: { xs: "column", sm: "row" },
                }}
                justifyContent="center"
                alignItems="center"
                gap={2}
                mt={5}
                mb={2}
              >
                <Button
                  color="primary"
                  variant="contained"
                  endIcon={isCheckingOut && <CircularProgress size={20} />}
                  disabled={isCheckingOut}
                  sx={{
                    width: { xs: "90%", sm: "fit-content" },
                  }}
                  onClick={() => setIsCheckingOut(true)}
                >
                  Checkout
                </Button>
                <Button
                  color="error"
                  variant="outlined"
                  sx={{
                    width: { xs: "90%", sm: "fit-content" },
                  }}
                  onClick={() => dispatch(clearCart())}
                >
                  Clear Cart
                </Button>
              </Stack>
            </Paper>
          ) : (
            <MyAlert severity="warning">Your cart is empty</MyAlert>
          )}
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default CartScreen;
