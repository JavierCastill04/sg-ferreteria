import { useAppDispatch } from "@/redux/hooks";
import { limpiar } from "@/redux/carritoSlice";
import Swal from "sweetalert2";

export default function Carrito() {
    const dispatch = useAppDispatch();

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

    return (
        <div>
            {/* Aquí va la lista de productos */}

            <button onClick={limpiarCarrito}>
                Vaciar carrito
            </button>
        </div>
    );
}