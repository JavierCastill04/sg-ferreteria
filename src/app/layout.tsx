"use client";

import { Provider } from "react-redux";
import store from "../redux/store";
import Navbar from "@/components/Navbar/Navbar";
import Cargarcompra from "../components/Carrito/Cargacompra"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Provider store={store}>
          <Navbar/>
          <Cargarcompra></Cargarcompra>
          {children}
        </Provider>
      </body>
    </html>
  );
}