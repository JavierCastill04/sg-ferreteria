"use client";
import styles from "./carrito.module.css";
import { useOptimistic, startTransition } from "react";
import { eliminar, limpiar, restaurar } from "../../redux/carritoSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Venta, VentaItem } from "../../types/Venta";
import "@/utils/MensajesSwal";
import { Product } from "@/types/Product";
import usePost from "@/customHooks/usePost";
import { CompraExitosa, ConfirmarCarritoVacio, ErrorCompra, VaciarCarrito } from "@/utils/MensajesSwal";
import {ProsesandoComrpra} from "../../redux/configSlice"

export default function Cart() {
  const carrito = useAppSelector((state) => state.carrito);
  const dispatch = useAppDispatch();
  const Procesando = useAppSelector((state)=>state.config.prosecsCompra);
  const optimistic = useAppSelector((state) => state.config.optimistic);
  const [optimisticCarrito, setOptimisticCarrito] = useOptimistic<Product[], Product[]>(
    carrito,
    (_state, nuevoCarrito) => nuevoCarrito
  );

  const { sendData, loading } = usePost("https://6a6ad838eb87a96865a8a64a.mockapi.io/ferreteria/v1/ventas");
  const total = optimisticCarrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const buildVenta = (): Venta => {
    const productos: VentaItem[] = carrito.map((item) => ({
      id: item.id,
      nombre: item.nombre,
      precio: item.precio,
      cantidad: item.cantidad,
      subtotal: item.precio * item.cantidad,
    }));

    return { productos, total, fecha: new Date().toISOString() };
  };

  const handleComprar = () => {
    const venta = buildVenta();
    if (optimistic) {
      const carritoAnterior = [...carrito];
      dispatch(ProsesandoComrpra(true));

      startTransition(async () => {
        setOptimisticCarrito([]);
        CompraExitosa();

        try {
          await sendData(venta);
          dispatch(limpiar());

        } catch (error) {
          setOptimisticCarrito(carritoAnterior);
          ErrorCompra();
        } finally {
          dispatch(ProsesandoComrpra(false));
        }
      });

    } else {
      const realizarCompra = async () => {
        dispatch(ProsesandoComrpra(true));
        try {
          await sendData(venta);
          dispatch(limpiar());
          CompraExitosa();

        } catch (error) {
          ErrorCompra();
        } finally {
          dispatch(ProsesandoComrpra(false));
        }
      };
      realizarCompra();
    }
  };

  const limpiarCarrito = () => {
    VaciarCarrito().then((result) => {
      if (result.isConfirmed) {
        dispatch(limpiar());
        ConfirmarCarritoVacio();
      }
    });
  };

  if (optimisticCarrito.length === 0) {
    return <div className={`${styles["cart-dropdown"]} ${styles["cart-empty"]}`}>El carrito está vacío</div>;
  }

  return (
    <div className={styles["cart-dropdown"]}>
      <div className={styles["cart-items"]}>
        {optimisticCarrito.map((item) => (
          <div key={item.id} className={styles["cart-item"]}>
            <img src={item.imagen} alt={item.nombre} className={styles["cart-item-image"]} />
            <div className={styles["cart-item-info"]}>
              <p className={styles["cart-item-name"]}>{item.nombre}</p>
              <p className={styles["cart-item-detail"]}>Cantidad: {item.cantidad}</p>
              <p className={styles["cart-item-detail"]}>Precio unitario: ${item.precio}</p>
              <strong className={styles["cart-item-subtotal"]}>
                Subtotal: ${(item.precio * item.cantidad).toFixed(2)}
              </strong>
            </div>
            <button
              className={styles["cart-remove-btn"]}
              onClick={() => dispatch(eliminar(item.id))}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className={styles["cart-total"]}>
        <strong>Total: ${total.toFixed(2)}</strong>
      </div>

      <div className={styles["cart-actions"]}>
        <button className={styles["cart-clear-btn"]} onClick={limpiarCarrito}>
          Vaciar carrito
        </button>
      <button className={styles["cart-buy-btn"]} onClick={handleComprar} disabled={loading || Procesando}>
        {loading || Procesando ? "Procesando compra" : "Realizar compra"}
       </button>
      </div>
    </div>
  );
}