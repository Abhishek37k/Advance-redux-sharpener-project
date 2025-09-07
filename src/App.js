import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "./store/cart-slice";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notifications";

let isInitial = true;

function App() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

const notification = useSelector((state) => state.ui.notification);

  // ✅ Fetch cart on app load
  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch(
        "https://redux-cart-82976-default-rtdb.firebaseio.com/cart.json"
      );
      const data = await response.json();

      if (data) {
        dispatch(cartActions.replaceCart(data));
      }
    };
    fetchCart();
  }, [dispatch]);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        })
      );
      const response = await fetch(
        "https://redux-cart-82976-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!response.ok) {
        // Handle error
        throw new Error("Sending cart data failed.");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    };
 if (isInitial) {
      isInitial = false;
      return;
    }
      sendCartData().catch((error) => {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Sending cart data failed!",
          })
        );
      });
  }, [cart , dispatch]);

  const showCart = useSelector((state) => state.ui.cartIsVisible);
  return (
    <>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
