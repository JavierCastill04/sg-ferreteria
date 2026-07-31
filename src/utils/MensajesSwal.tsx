import { Product } from "@/types/Product";
import Swal from "sweetalert2";

export function CompraExitosa() {
    return Swal.fire({
        icon: "success",
        title: "¡Compra realizada!",
        text: "Tu compra se ha registrado correctamente.",
        timer: 1500,
        showConfirmButton: false,
    })
}

export function ErrorCompra() {
    return Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo realizar la compra.",
    });
}

export function VaciarCarrito() {
    return Swal.fire({
        title: "¿Vaciar carrito?",
        text: "Se eliminarán todos los productos del carrito.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, vaciar",
        cancelButtonText: "Cancelar"
    })
}

export function ConfirmarCarritoVacio() {
    return Swal.fire({
        icon: "success",
        title: "Carrito vacío",
        timer: 1200,
        showConfirmButton: false
    });
}

export function AgregarAlCarrito(producto: Product) {
    return Swal.fire({
        icon: "success",
        title: "Producto agregado",
        text: `${producto.nombre} agregado al carrito`,
        timer: 1500,
        showConfirmButton: false,
    });
}