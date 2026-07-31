"use client";

import { useState, useEffect } from "react";
import { products } from "@/data/products";
import { Product } from "@/types/Product";
import styles from "./grid.module.css";
import { FaCartPlus } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { agregar, limpiar } from "@/redux/carritoSlice";

import Swal from "sweetalert2";

export default function ProductGrid() {
  const dispatch = useAppDispatch();
  const carrito = useAppSelector((state) => state.carrito);
  const [items, setItems] = useState<Product[]>(products);

  useEffect(() => {
    if (carrito.length === 0) {
      setItems(items.map(producto => ({
        ...producto,
        cantidad: 1
      })))
    }
  }, [carrito.length]);

  useEffect(() => {
    setItems(prevItems =>
      prevItems.map(producto => {
        const productoEnCarrito = carrito.find(item => item.id === producto.id);
        if (!productoEnCarrito) {
          return {
            ...producto,
            cantidad: 1
          };
        }
        return producto;
      })
    );
  }, [carrito]);

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

    Swal.fire({
      icon: "success",
      title: "Producto agregado",
      text: `${producto.nombre} agregado al carrito`,
      timer: 1500,
      showConfirmButton: false,
    });
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
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <button
          className={styles.addButton}
          onClick={() => {
            Swal.fire({
              title: "¿Vaciar carrito?",
              text: "Se eliminarán todos los productos del carrito.",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Sí, vaciar",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.isConfirmed) {
                dispatch(limpiar());
                reiniciarCantidades();

                Swal.fire({
                  icon: "success",
                  title: "Carrito vacío",
                  timer: 1200,
                  showConfirmButton: false,
                });
              }
            });
          }}
        >
          Vaciar carrito
        </button>
      </div>
    </>
  );
}