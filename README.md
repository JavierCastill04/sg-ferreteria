# Aplicación de carrito de compras con enfoque Optimistic Update UI

Aplicación web desarrollada con Next.js para gestionar un carrito de compras. El proyecto incluye manejo de estado con Redux, Optimistic UI y una API para simular el envío de compras.

## Instalación

### 1. Crear el proyecto

El proyecto puede iniciarse utilizando `create-next-app`:

    npx create-next-app@latest sg-ferreteria

### 2. Clonar el repositorio

Clonar el repositorio:

    git clone https://github.com/JavierCastill04/sg-ferreteria

Entrar a la carpeta del proyecto:

    cd sg-ferreteria

Instalar las dependencias:

    npm install

### 3. Ejecutar el proyecto

Para iniciar el servidor de desarrollo:

    npm run dev

Después abrir en el navegador:

    http://localhost:3000

## Funcionalidades

### Catálogo de productos

El proyecto muestra un catálogo de productos de ferretería con tarjetas. Cada producto contiene:
- Imagen
- Nombre
- Descripción
- Precio
- Selector de cantidad
- Botón para agregar al carrito

La cantidad puede aumentarse o disminuirse antes de agregar el producto.

### Carrito de compras

El carrito permite:
- Agregar productos.
- Mostrar la cantidad de cada producto.
- Mostrar el precio unitario.
- Calcular el subtotal de cada producto.
- Calcular el total de la compra.
- Eliminar productos individualmente.
- Vaciar el carrito completo.
- Realizar una compra.

Al vaciar el carrito, las cantidades de los productos del catálogo vuelven a 1.

### Realizar compra

Al realizar una compra, se genera un objeto `Venta` que contiene:

- Productos comprados.
- Cantidad de cada producto.
- Precio de cada producto.
- Subtotal.
- Total.
- Fecha de la compra.

La información se envía mediante una petición `POST` a la API utilizada por el proyecto.

### Optimistic UI

El proyecto permite activar o desactivar el comportamiento Optimistic UI desde el selector correspondiente del Navbar.

Cuando Optimistic UI está desactivado:

1. Se envía la compra al servidor.
2. Se espera la respuesta.
3. Si la petición es exitosa, se vacía el carrito.
4. Se muestra el mensaje de compra realizada.

Cuando Optimistic UI está activado:

1. El carrito se vacía inmediatamente en la interfaz.
2. Se muestra el resultado optimista.
3. La petición se envía al servidor.
4. Si la petición funciona, el cambio se mantiene.
5. Si la petición falla, el carrito recupera su estado anterior.

### Selector de Optimistic UI

El Navbar incluye un selector para activar o desactivar Optimistic UI:

- **Desactivado:** comportamiento tradicional, esperando la respuesta del servidor.
- **Activado:** comportamiento optimista, actualizando la interfaz antes de recibir la respuesta.

### Selector de simulación de errores

También existe un selector para simular errores en el envío de la compra:

- **Desactivado:** utiliza la URL correcta de la API.
- **Activado:** utiliza una URL incorrecta para provocar un error en la petición.

Esto permite comprobar el comportamiento de rollback de Optimistic UI.

### Combinaciones de los selectores

Los dos selectores permiten probar diferentes escenarios:

| Optimistic UI | Simular error | Resultado |
|---|---|---|
| Desactivado | Desactivado | Compra normal y exitosa |
| Desactivado | Activado | La petición falla y el carrito permanece |
| Activado | Desactivado | El carrito se actualiza inmediatamente y la compra termina correctamente |
| Activado | Activado | El carrito se actualiza inmediatamente, la petición falla y se recupera el estado anterior |

## Tecnologías utilizadas

- Next.js
- React
- TypeScript
- Redux Toolkit
- React Icons
- SweetAlert2
- MockAPI
- `useOptimistic`
- CSS Modules
