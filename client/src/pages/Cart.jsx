import React, { useState } from "react";
import Navbar from "../components/navbar";
import styles from "../styles/Cart.module.css";

const dummyItems = [
  { id: 1, name: "Product 1", price: 99.99, quantity: 1 },
  { id: 2, name: "Product 2", price: 150.0, quantity: 1 },
  { id: 3, name: "Product 3", price: 25.0, quantity: 2 },
];

export default function Cart() {
  const [items, setItems] = useState(dummyItems);
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Cart</h1>
          <hr className={styles.seperatorLine} />
        </div>

        <div className={styles.gridContainer}>
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className={styles.card}>
                <div className={styles.imagePlaceholder}>
                  <span className={styles.imageText}>Image Placeholder</span>
                </div>
                <div className={styles.cardDetails}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>

                  <div className={styles.cardActions}>
                    <span className={styles.quantity}>
                      Quantity: {item.quantity}
                    </span>
                    <button
                      className={styles.removeBtn}
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.empty}>Your cart is empty!</p>
          )}
        </div>

        <hr className={styles.seperatorLine} />
        {items.length > 0 && (
          <div className={styles.summaryContainer}>
            <div className={styles.summaryBox}>
              <h2>Order Summary</h2>
              <div className={styles.summaryRow}>
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping:</span>
                <span>FREE</span>
              </div>
              <hr className={styles.divider} />
              <div className={`${styles.summaryRow} ${styles.total}`}>
                <span>Total:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button className={styles.checkoutBtn}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
