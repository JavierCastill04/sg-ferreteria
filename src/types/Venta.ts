export interface VentaItem {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
  subtotal: number;
}

export interface Venta {
  productos: VentaItem[];
  total: number;
  fecha: string;
}