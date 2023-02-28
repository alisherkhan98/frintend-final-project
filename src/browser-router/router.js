import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
// screens
import HomeScreen from "../screens/HomeScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ShopScreen from "../screens/ShopScreen";
import CartScreen from "../screens/CartScreen";
import SuccessScreen from "../screens/SuccessScreen";
import Calculator from "../components/Calculator";
import ContactScreen from "../screens/ContactScreen";
// loaders and actions
import contactAction from "./contactAction";
import homeLoader from "./homeLoader";
import listLoader from "./listLoader";
import shopLoader from "./shopLoader";
import productsLoader from "./productsLoader";

// router
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomeScreen />}>
        <Route index element={<Calculator />} loader={listLoader} />
      </Route>
      <Route path="/signin" element={<SignInScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
      <Route path="/shop" element={<ShopScreen />} />
      <Route path="/cart" element={<CartScreen />} loader={productsLoader} />
      <Route
        path="/contact"
        element={<ContactScreen />}
        action={contactAction}
      />

      <Route path="/success" element={<SuccessScreen />} />
      <Route path="*" element={<Navigate to="/" />} />
    </>
  )
);

export default router;
