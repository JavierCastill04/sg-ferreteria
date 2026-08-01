"use client";
import { useAppSelector } from "../../redux/hooks";
import styles from "./cargacompra.module.css";

export default function cargacompra() {
  const procesando = useAppSelector((state) => state.config.prosecsCompra);
  const optimistic = useAppSelector((state)=>state.config.optimistic);

  if (!procesando || optimistic) return null;

  return (
    <div className={styles.pantalla}>
      <p className={styles.mensaje}>Procesando realizada compra, por favor espera...</p>
    </div>
  );
}