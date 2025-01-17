import Link from "next/link";
import { useSelector } from "react-redux";
import type { RootState } from "store";

import { useRouter } from 'next/router';
import { ProductStoreType } from 'types';
import CartStatus from "../cart-status";
import Item from "./item";

const Wishlist = () => {
  const { wishlistItems } = useSelector((state: RootState) => state.wishlist);

  const router = useRouter();
  //Get the Search Text from the router query
  const searchText = router.query.search as string;
  // Filter the Products depending on the search
  const filteredWishlistItems = (searchText
    ? wishlistItems?.filter((item: ProductStoreType) => item.name.toLowerCase().includes(searchText))
    : wishlistItems)

  const priceTotal = () => {
    let totalPrice = 0;
    if (wishlistItems.length > 0) {
      wishlistItems.map((item) => (totalPrice += item.price * item.count));
    }

    return totalPrice;
  };

  return (
    <section className="cart">
      <div className="container">
        <div className="cart__intro">
          <h3 className="cart__title">Wishlist</h3>
          <CartStatus step="wishlist" />
        </div>

        <div className="cart-list">
          {filteredWishlistItems.length > 0 && (
            <table>
              <tbody>
                <tr>
                  <th style={{ textAlign: "left" }}>Product</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th />
                  <th />
                </tr>

                {filteredWishlistItems.map((item) => (
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

          {filteredWishlistItems.length === 0 && <p>Nothing in the Wishlist</p>}
        </div>

        <div className="cart-actions">
          <Link href="/products" className="cart__btn-back">
            <i className="icon-left" /> Continue Shopping
          </Link>

          <div className="cart-actions__items-wrapper">
            <p className="cart-actions__total">
              Total cost <strong>${priceTotal().toFixed(2)}</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Wishlist;
