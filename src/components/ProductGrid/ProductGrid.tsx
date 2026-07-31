"use client";

import { useState } from "react";
import Image from "next/image";
import { products } from "@/data/products";
import { Product } from "@/types/Product";
import styles from "./grid.module.css";
export default function ProductGrid() {

  const [items, setItems] = useState<Product[]>(products);

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
    console.log("Producto agregado:", producto);

    // Aquí Marvin conectará Redux o el carrito.
  };

  return (
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

            <span className={styles.price}>
              ${producto.precio.toFixed(2)}
            </span>

            <div className={styles.quantity}>

              <button
                onClick={() => disminuirCantidad(producto.id)}
              >
                -
              </button>

              <span>{producto.cantidad}</span>

              <button
                onClick={() => aumentarCantidad(producto.id)}
              >
                +
              </button>

            </div>

            <button
              className={styles.addButton}
              onClick={() => agregarAlCarrito(producto)}
            >
              Agregar al carrito
            </button>

          </div>

        </div>

      ))}

    </div>
  );
}