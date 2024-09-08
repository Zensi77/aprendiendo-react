import { useId } from "react";
import { CartIcon, ClearCartIcon } from "./Icons";
import { useCart } from "../hooks/useCart";
import "./Cart.css";

function CartItem({ thumbnail, price, title, quantity, addToCart }) {
  console.log(quantity);
  return (
    <li>
      <img src={thumbnail} alt={title} />
      <div>
        <strong>{title}</strong>
        <p>{price} €</p>
      </div>
      <footer>
        <small>
          <span>Qty: {quantity}</span>
        </small>
        <button onClick={addToCart}>+</button>
      </footer>
    </li>
  );
}

export function Cart() {
  const cartCheckboxId = useId();
  const { cart, cleanCart, addToCart } = useCart();
  return (
    <>
      <label htmlFor={cartCheckboxId} className="cart-button">
        <CartIcon />
      </label>
      <input type="checkbox" id={cartCheckboxId} hidden />

      <aside className="cart" htmlFor={cartCheckboxId}>
        <ul>
          {cart.map((product) => (
            <CartItem
              key={product.id}
              {...product}
              addToCart={() => addToCart(product)}
            />
          ))}
        </ul>
        <button onClick={cleanCart}>
          <ClearCartIcon />
        </button>
      </aside>
    </>
  );
}
