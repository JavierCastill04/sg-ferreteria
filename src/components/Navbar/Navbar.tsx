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
      <div className={styles.titulo}>
        <SlWrench size={15}></SlWrench>
        <h1>Ferreteria Pablito</h1>
      </div>

      <div className={styles.controlador}>
        <label className={styles.etiqueta}>
          <span className={styles.spanst}>Optimistic Updates            </span>
          <span className={styles.switch}>
            <input
              type="checkbox"
              checked={optimisticUpdates}
              onChange={() => setOptimisticUpdates((prev) => !prev)}
            />
            <span className={styles.span} />
          </span>
        </label>

        <div className={styles.Contenedor}>
          <button className={styles.BttnC} onClick={() => setShowCart(!showCart)}>
           <SlBasket size={18}></SlBasket>
            Carrito ({totalItems})
          </button>
          {showCart && <Cart />}
        </div>
      </div>
    </nav>
  );
}