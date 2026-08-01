"use client";
import { useState } from "react";
import Cart from "../Carrito/Carrito";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { cambiarOptimistic } from "@/redux/configSlice";
import styles from "@/components/Navbar/navbar.module.css";
import { SlBasket } from "react-icons/sl";
import {SimuladorError} from "../../redux/configSlice";

export default function Navbar() {
  const simularError = useAppSelector((state) => state.config.simulador);
  const [showCart, setShowCart] = useState(false);
  const dispatch = useAppDispatch();
  const optimistic = useAppSelector((state) => state.config.optimistic);
  const carrito = useAppSelector((state) => state.carrito);
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <nav className={styles.navbar}>
      <div className={styles.titulo}>
        <img
          className={styles.icono}
          src="/images/Icono.jpg"
          alt="Logo"
        />
        <h1>Ferreteria Pablito</h1>
      </div>
      <div className={styles.controlador}>
        <label className={styles.etiqueta}>
         <span className={styles.spanst}>Simular error API</span>
          <span className={styles.switch}>
           <input
             type="checkbox"
             checked={simularError}
             onChange={() => dispatch(SimuladorError())} /> 
              <span className={styles.span} />
           </span>
        </label>
        <label className={styles.etiqueta}>
          <span className={styles.spanst}>Optimistic Updates </span>
          <span className={styles.switch}>
            <input
              type="checkbox"
              checked={optimistic}
              onChange={() => dispatch(cambiarOptimistic())}
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