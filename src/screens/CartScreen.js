import React from "react";
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
import { clearCart, startCheckout } from "../redux/features/shopSlice";
// components
import CartRow from "../components/CartRow";
import MyAlert from "../components/MyAlert";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrolltoTop from "../components/ScrollToTop";
// custom hooks
import useGetProducts from "../custom-hooks/useGetProducts";
import useCheckOut from "../custom-hooks/useCheckOut";
// router
import { Navigate } from "react-router-dom";

function CartScreen() {
  const { cart, isCheckingOut } = useSelector((state) => state.shop);
  const { user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  // getting list of products from stripe extension with custom hook
  const products = useGetProducts();

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

  // function to handle checkout
  function handleCheckout() {
    dispatch(startCheckout());
  }

  // custom hook to checkout
  useCheckOut(lineItems);

  // if not signed in redirects to sign in screen
  if (!user && !isLoading) {
    return <Navigate to="/signin" />;
  } else {
    return (
      <>
        <ScrolltoTop />
        <Navbar />
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
                    onClick={handleCheckout}
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
}

export default CartScreen;
