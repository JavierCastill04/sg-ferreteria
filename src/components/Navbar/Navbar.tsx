"use client";
import { useState } from "react";
import Link from "next/link";
import Cart from "../Carrito/Carrito";
import { useAppSelector } from "../../redux/hooks";
import styles from "./navbar.module.css";
import { SlBasket } from "react-icons/sl";
import { SlWrench } from "react-icons/sl";

export default function Navbar() {
  const [showCart, setShowCart] = useState(false);
  const [optimisticUpdates, setOptimisticUpdates] = useState(false); // TODO: mover a redux si se necesita global
  const carrito = useAppSelector((state) => state.carrito);
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <nav className={styles.navbar}>
      <div className={styles.title}>
        <SlWrench size={15}></SlWrench>
        <h1>Ferreteria Pablito</h1>
      </div>

      <div className={styles.controls}>
        <label className={styles.switchWrapper}>
          <span className={styles.switchLabel}>Optimistic Updates</span>
          <span className={styles.switch}>
            <input
              type="checkbox"
              checked={optimisticUpdates}
              onChange={() => setOptimisticUpdates((prev) => !prev)}
            />
            <span className={styles.slider} />
          </span>
        </label>

        <div className={styles.cartContainer}>
          <button className={styles.cartButton} onClick={() => setShowCart(!showCart)}>
           <SlBasket size={18}></SlBasket>
            Carrito ({totalItems})
          </button>
          {showCart && <Cart />}
        </div>
      </div>
    </nav>
  );
}