"use client";
import styles from "./carrito.module.css";
import { eliminar, limpiar } from "../../redux/carritoSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Venta, VentaItem } from "../../types/Venta";
import Swal from "sweetalert2";

export default function Cart() {
  const carrito = useAppSelector((state) => state.carrito);
  const dispatch = useAppDispatch();

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

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
    console.log("Venta preparada:", venta);
    dispatch(limpiar());
  };

  const limpiarCarrito = () => {
    Swal.fire({
      title: "¿Vaciar carrito?",
      text: "Se eliminarán todos los productos del carrito.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, vaciar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(limpiar());

        Swal.fire({
          icon: "success",
          title: "Carrito vacío",
          timer: 1200,
          showConfirmButton: false
        });
      }
    });
  };

  if (carrito.length === 0) {
    return <div className={`${styles["cart-dropdown"]} ${styles["cart-empty"]}`}>El carrito está vacío</div>;
  }

  return (
    <div className={styles["cart-dropdown"]}>
      <div className={styles["cart-items"]}>
        {carrito.map((item) => (
          <div key={item.id} className={styles["cart-item"]}>
            <img src={item.imagen} alt={item.nombre} className={styles["cart-item-image"]} />
            <div className={styles["cart-item-info"]}>
              <p className={styles["cart-item-name"]}>{item.nombre}</p>
              <p className={styles["cart-item-detail"]}>Cantidad: {item.cantidad}</p>
              <p className={styles["cart-item-detail"]}>Precio unitario: ${item.precio}</p>
              <strong className={styles["cart-item-subtotal"]}>
                Subtotal: ${item.precio * item.cantidad}
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
        <strong>Total: ${total}</strong>
      </div>

      <div className={styles["cart-actions"]}>
        <button className={styles["cart-clear-btn"]} onClick={limpiarCarrito}>
          Vaciar carrito
        </button>
        <button className={styles["cart-buy-btn"]} onClick={handleComprar}>
          Realizar compra
        </button>
      </div>
    </div>
  );
}