"use client";
import { removeFromCart, clearCart } from "../../redux/carritoSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Venta, VentaItem } from "../../types/Venta";
import "./carrito.module.css"

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
    dispatch(clearCart());
  };

  if (carrito.length === 0) {
    return <div className="cart-dropdown cart-empty">El carrito está vacío</div>;
  }

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {carrito.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.imagen} alt={item.nombre} className="cart-item-image" />
            <div className="cart-item-info">
              <p className="cart-item-name">{item.nombre}</p>
              <p className="cart-item-detail">Cantidad: {item.cantidad}</p>
              <p className="cart-item-detail">Precio unitario: ${item.precio}</p>
              <strong className="cart-item-subtotal">Subtotal: ${item.precio * item.cantidad}</strong>
            </div>
            <button className="cart-remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <strong>Total: ${total}</strong>
      </div>

      <div className="cart-actions">
        <button className="cart-clear-btn" onClick={() => dispatch(clearCart())}>
          Vaciar carrito
        </button>
        <button className="cart-buy-btn" onClick={handleComprar}>
          Realizar compra
        </button>
      </div>
    </div>
  );
}