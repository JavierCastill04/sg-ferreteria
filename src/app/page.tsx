<<<<<<< HEAD
"use client"
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Navbar from "@/components/Navbar/Navbar";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Provider store={store}>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
=======

export default function Home() {
  return (
    <main className="home-container">
      <br />
      <section>
        Hola mundo
      </section>
    </main>
>>>>>>> 116654d0c41acb8c43618139aeb7550cfd4752c2
  );
}