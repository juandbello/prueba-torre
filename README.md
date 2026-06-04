# Pedidos App

Aplicación web de ecommerce/restaurante desarrollada con Angular 19, Angular Material y TailwindCSS.
Permite visualizar productos, filtrar, ordenar, administrar un carrito de compras dinámico y visualizar detalles completos de cada producto mediante dialogs interactivos.

---

# 🚀 Tecnologías utilizadas

* Angular 19
* Angular Material
* TailwindCSS
* RxJS
* SwiperJS
* TypeScript
* Standalone Components

---

# ✨ Funcionalidades

## 📦 Productos

* Visualización de productos en cards responsive.
* Carrusel de imágenes por producto.
* Vista detallada mediante dialog.
* Badges de stock y disponibilidad.
* Responsive design.

---

## 🔍 Filtros y búsqueda

* Filtrado por categorías.
* Búsqueda por nombre.
* Ordenamiento por:

  * Precio ascendente/descendente.
  * Rating ascendente/descendente.

---

## 🛒 Carrito de compras

* Agregar productos dinámicamente.
* Actualización automática de cantidades.
* Cálculo de total en tiempo real.
* Eliminación de productos.
* Drawer responsive para carrito.
* Manejo de stock dinámico.

---

## 📱 Responsive Design

La aplicación adapta automáticamente el comportamiento del carrito dependiendo del tamaño de pantalla:

* Desktop → carrito lateral fijo.
* Tablet/Mobile → drawer flotante.

---

# 📸 Características UI/UX

* Diseño moderno tipo ecommerce.
* Scroll interno optimizado.
* Dialogs interactivos.
* Sidebar responsive.
* Animaciones suaves.
* Layout adaptable.

---

# ⚙️ Instalación

## Clonar proyecto

```bash
git clone <repository-url>
```

---

## Instalar dependencias

```bash
npm install
```

---

## Ejecutar aplicación

```bash
ng serve
```

Abrir en:

```txt
http://localhost:4200
```

---

# 🏗️ Build producción

```bash
ng build
```

---

# 📂 Estructura del proyecto

```txt
src/
 ├── app/
 │    ├── components/
 │    ├── core/
 │    │    ├── services/
 │    │    ├── models/
 │    │    └── imports/
 │    ├── layouts/
 │    ├── pages/
 │    └── shared/
```

---

# 🔄 Arquitectura

La aplicación utiliza:

* Standalone Components.
* Servicios reactivos con BehaviorSubject.
* Comunicación entre componentes mediante RxJS.
* Drawer global manejado por servicio.
* Estado reactivo del carrito.

---

# 🌐 API

Los productos son consumidos desde:

```txt
https://dummyjson.com/products
```


---

# 👨‍💻 Autor

Desarrollado por Juan Bello.
