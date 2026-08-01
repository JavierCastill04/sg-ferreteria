"use client";

import { useState, useEffect, useRef } from "react";
import { products } from "@/data/products";
import { Product } from "@/types/Product";
import styles from "./grid.module.css";
import { FaCartPlus } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { agregar } from "@/redux/carritoSlice";
import { AgregarAlCarrito } from "@/utils/MensajesSwal";

export default function ProductGrid() {
  const dispatch = useAppDispatch();
  const carrito = useAppSelector((state) => state.carrito);
  const [items, setItems] = useState<Product[]>(products);
  const itemsAnteriores = useRef<Product[] | null>(null);
  const Procesando = useAppSelector((state) => state.config.prosecsCompra);
  const optimistic = useAppSelector((state) => state.config.optimistic);

  useEffect(() => {
    if (optimistic && Procesando) {
      itemsAnteriores.current = items;
      setItems(prevItems =>
        prevItems.map(producto => ({
          ...producto,
          cantidad: 1
        }))
      );
    }

    if (!Procesando && itemsAnteriores.current) {
      if (carrito.length === 0) {
        itemsAnteriores.current = null;
      } else {
        setItems(itemsAnteriores.current);
        itemsAnteriores.current = null;
      }
    }

  }, [Procesando, carrito.length]);

  const aumentarCantidad = (id: number) => {
    setItems(items.map(product =>
      product.id === id
        ? { ...product, cantidad: product.cantidad + 1 }
        : product
    ));
  };

  const disminuirCantidad = (id: number) => {
    setItems(items.map(product =>
      product.id === id
        ? {
          ...product,
          cantidad: product.cantidad > 1
            ? product.cantidad - 1
            : 1
        }
        : product
    ));
  };

  const agregarAlCarrito = (producto: Product) => {
    dispatch(agregar(producto));
    AgregarAlCarrito(producto);
  };

  const reiniciarCantidades = () => {
    setItems(items.map(producto => ({
      ...producto,
      cantidad: 1
    })));
  };

  return (
    <>
      <div className={styles.grid}>

        {items.map((producto) => (

          <div className={styles.card} key={producto.id}>

            <img
              src={producto.imagen}
              alt={producto.nombre}
              width={300}
              height={220}
              className={styles.image}
            />

            <div className={styles.content}>

              <h2>{producto.nombre}</h2>
              <p>{producto.descripcion}</p>
              <span className={styles.price}> ${producto.precio.toFixed(2)}</span>

              <div className={styles.quantity}>
                <button onClick={() => disminuirCantidad(producto.id)}>-</button>
                <span>{producto.cantidad}</span>
                <button onClick={() => aumentarCantidad(producto.id)}>+</button>
              </div>

              <button
                className={styles.addButton}
                onClick={() => agregarAlCarrito(producto)}
              >
                <FaCartPlus />
                &nbsp;
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}

      </div>
    </>
  );
}