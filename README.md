# 🚦 Sistema de Gestión de Trámites de Tránsito - Frontend

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![Axios](https://img.shields.io/badge/Axios-HTTP-yellow?logo=axios)](https://axios-http.com/)

---

## 📖 Descripción

Este proyecto corresponde al **frontend** del sistema de **gestión de trámites de tránsito**.

La aplicación web permite a **ciudadanos y funcionarios** realizar y administrar procesos relacionados con los trámites de tránsito.

Incluye:

* 🔐 **Login y registro** con almacenamiento de sesión en **sessionStorage + cookies**.
* 📑 **Módulos CRUD**:

  * Gestión de usuarios y roles.
  * Gestión de trámites.
  * Tipos de trámites.
  * Gestión de turnos.
* 🖥️ **Dashboard administrativo** con navegación lateral (sidebar).
* 📊 Interfaz moderna, rápida y responsiva con **Next.js 15 + TailwindCSS**.

---

## 🧑‍💻 Desarrollador

**Cristian Correa**
📧 Email: [camilomanco2005@gmail.com](mailto:camilomanco2005@gmail.com)
💼 GitHub: [cristianManco](https://github.com/cristianManco)

---

## 🏗️ Arquitectura

### 🔹 Tipo de arquitectura

* **Frontend desacoplado (SPA + SSR con Next.js)**.
* Arquitectura **modular por capas**:

  * **UI Layer** → Componentes React + TailwindCSS (formularios, tablas, layouts, sidebar).
  * **Hooks/Services Layer** → Lógica de negocio del frontend (ej: `useAuth`, validación de sesión).
  * **Data Layer** → Comunicación con la API REST (NestJS + SQL Server).

### 🔹 Sustento

✔️ Escalable: cada módulo de trámites es independiente.
✔️ Separación de responsabilidades entre UI, lógica y datos.
✔️ Seguridad en sesión: **cookies + JWT + sessionStorage**.
✔️ Optimizado para despliegue en **Vercel, AWS o servidores Node.js**.

---

## 🚀 Tecnologías principales

<p align="center">
  <img src="https://cdn.worldvectorlogo.com/logos/next-js.svg" alt="Next.js" width="70" />
  <img src="https://cdn.worldvectorlogo.com/logos/typescript.svg" alt="TypeScript" width="70" />
  <img src="https://cdn.worldvectorlogo.com/logos/tailwindcss.svg" alt="TailwindCSS" width="70" />
  <img src="https://axios-http.com/assets/logo.svg" alt="Axios" width="70" />
</p>

---

## 📂 Estructura del proyecto

```
frontend/
│── src/
│   ├── app/                 # Páginas y rutas (Next.js App Router)
│   │   ├── auth/            # Login y registro
│   │   ├── dashboard/       # Panel principal con sidebar y todas las gestiones
│   ├── components/          # Componentes reutilizables (inputs, tablas, modales)
│   ├── hooks/               # Hooks personalizados (ej: useAuth)
│   ├── libs/                # Configuración de axios y manejo de cookies
│   ├── types/               # Definiciones de tipos en TypeScript
│── public/                  # Archivos estáticos (logos, íconos)
│── package.json
│── tailwind.config.ts
│── tsconfig.json
│── README.md
```

---

## ⚙️ Instalación y ejecución

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/cristianManco/tramites-transito.git
cd tramites-transito/frontend
```

### 2️⃣ Instalar dependencias

```bash
pnpm install
# o
npm install
```

### 3️⃣ Configurar variables de entorno

Crear `.env.local` en la raíz:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

> ⚠️ Ajusta el puerto según la configuración de tu backend NestJS.

### 4️⃣ Ejecutar en desarrollo

```bash
pnpm dev
# o
npm run dev
```

La app estará en 👉 [http://localhost:3000](http://localhost:3000)

### 5️⃣ Build para producción

```bash
pnpm build && pnpm start
# o
npm run build && npm run start
```

---

## 🔑 Credenciales de prueba

Usuario administrador demo (solo ambiente de pruebas):

```
email: admin@test.com
password: 123456
```

---

## 🛠️ Pruebas

### 🔹 Prueba manual

1. Inicia el backend en `localhost:3002`.
2. Levanta el frontend en `localhost:3000`.
3. Inicia sesión con el usuario demo o regístrate.
4. Explora los módulos:

   * Dashboard con **sidebar de navegación**.
   * Gestión de usuarios.
   * Trámites y tipos de trámites.
   * Turnos.



## 🎨 Sustento de diseño

* **Next.js (SSR + SPA)** → mejor rendimiento y SEO.
* **TailwindCSS** → estilos consistentes y modernos.
* **Arquitectura modular** → facilita mantenimiento y escalabilidad.
* **JWT + Cookies + sessionStorage** → autenticación segura y flexible.

---



