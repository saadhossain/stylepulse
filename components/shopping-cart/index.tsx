import Link from "next/link";
import { useSelector } from "react-redux";
import type { RootState } from "store";

import { useRouter } from 'next/router';
import { ProductStoreType } from 'types';
import CheckoutStatus from "../checkout-status";
import Item from "./item";

const ShoppingCart = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const router = useRouter();
  //Get the Search Text from the router query
  const searchText = router.query.search as string;
  // Filter the Products depending on the search
  const filteredCartItems = (searchText
    ? cartItems?.filter((item: ProductStoreType) => item.name.toLowerCase().includes(searchText))
    : cartItems)

  const priceTotal = () => {
    let totalPrice = 0;
    if (cartItems.length > 0) {
      cartItems.map((item) => (totalPrice += item.price * item.count));
    }

    return totalPrice;
  };

  return (
    <section className="cart">
      <div className="container">
        <div className="cart__intro">
          <h3 className="cart__title">Shopping Cart</h3>
          <CheckoutStatus step="cart" />
        </div>

        <div className="cart-list">
          {filteredCartItems.length > 0 && (
            <table>
              <tbody>
                <tr>
                  <th style={{ textAlign: "left" }}>Product</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th />
                </tr>

                {filteredCartItems.map((item) => (
                  <Item
                    key={item.id}
                    id={item.id}
                    thumb={item.thumb}
                    name={item.name}
                    color={item.color}
                    price={item.price}
                    size={item.size}
                    count={item.count}
                  />
                ))}
              </tbody>
            </table>
          )}

          {filteredCartItems.length === 0 && <p>Nothing in the cart</p>}
        </div>

        <div className="cart-actions">
          <Link href="/products" className="cart__btn-back">
            <i className="icon-left" /> Continue Shopping
          </Link>
          {/* Hide Promo Input, Total Amount and Checkout button if there is nothing in the Cart */}
          {
            cartItems.length > 0 && <>
              <input
                type="text"
                placeholder="Promo Code"
                className="cart__promo-code"
              />

              <div className="cart-actions__items-wrapper">
                <p className="cart-actions__total">
                  Total cost <strong>${priceTotal().toFixed(2)}</strong>
                </p>
                <Link
                  href="/cart/checkout"
                  className="btn btn--rounded btn--yellow"
                >
                  Checkout
                </Link>
              </div>
            </>
          }
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
