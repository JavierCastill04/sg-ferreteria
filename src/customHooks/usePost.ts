import { Venta } from "@/types/Venta";
import { useState } from "react";

const usePost = (url: string) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(<Error | null>(null));

    const sendData = async (datos: Venta) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datos),
            });
            if (!res.ok) {
                throw new Error("Error al enviar los datos");
            }
            const resultado = await res.json();

            setData(resultado);

            return resultado;
        } catch (error) {
            if (error instanceof Error) {
                setError(error);
            } else {
                setError(new Error("Ocurrió un error desconocido"));
            }

            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, sendData };
};

export default usePost;