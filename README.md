# 🚦 Sistema de Gestión de Trámites de Tránsito - Frontend

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![Axios](https://img.shields.io/badge/Axios-HTTP-yellow?logo=axios)](https://axios-http.com/)

---

## 📖 Descripción

Este proyecto corresponde al **frontend** del sistema de **gestión de trámites de tránsito**.

La aplicación web permite a **ciudadanos y funcionarios**:

* Iniciar sesión y gestionar sus credenciales.
* Administrar trámites de tránsito y usuarios.
* Consultar y manejar turnos.
* Acceder a un **dashboard moderno y responsivo**.

---

## 🏗️ Arquitectura

### 🔹 Tipo de arquitectura

* **Frontend desacoplado (SPA + SSR con Next.js)**.
* Arquitectura **modular por capas**:
  * **UI Layer** → Componentes React + TailwindCSS (formularios, tablas, layouts, sidebar).
  * **Hooks/Services Layer** → Lógica de negocio del frontend (`useAuth`, validaciones, sesión).
  * **Data Layer** → Comunicación con la **API REST** (backend en **NestJS + PostgreSQL**).

### 🔹 Características clave

✔️ Escalable: cada módulo es independiente.  
✔️ Separación de responsabilidades entre UI, lógica y datos.  
✔️ Seguridad en sesión: **JWT + cookies + sessionStorage**.  
✔️ Preparado para despliegue en **Vercel, AWS o servidores Node.js**.  

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

La estructura sigue la convención de **Next.js App Router**, con organización modular:

```

frontend/
│── public/                  # Archivos estáticos (logos, íconos)
│── src/
│   ├── app/                 # Rutas y páginas (Next.js App Router)
│   │   ├── auth/            # Login y registro
│   │   ├── dashboard/       # Panel principal con sidebar y gestiones
│   ├── components/          # Componentes reutilizables (inputs, tablas, modales, alerts)
│   ├── hooks/               # Hooks personalizados (ej: useAuth, useFetch)
│   ├── libs/                # Configuración global (axios, auth, cookies)
│   ├── types/               # Definiciones de tipos en TypeScript
│   ├── middleware.ts        # Middleware para validación de rutas y auth
│── .env.local               # Variables de entorno (ignorada en git)
│── package.json             # Dependencias del proyecto
│── next.config.ts           # Configuración de Next.js
│── tailwind.config.ts       # Configuración de TailwindCSS
│── README.md                # Documentación

````

---

## ⚙️ Instalación y ejecución

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/cristianManco/tramites-transito-front.git
cd tramites-transito-front
````

### 2️⃣ Instalar dependencias

```bash
npm install
# o
pnpm install
```

### 3️⃣ Configurar variables de entorno

Crear `.env.local` en la raíz con al menos:

```env
NEXT_PUBLIC_API_URL=http://localhost:3002
```

> ⚠️ Ajusta el puerto según la configuración de tu backend en **NestJS**.

### 4️⃣ Ejecutar en desarrollo

```bash
npm run dev
# o
pnpm dev
```

La aplicación estará en 👉 [http://localhost:3000](http://localhost:3000)

### 5️⃣ Build para producción

```bash
npm run build && npm run start
# o
pnpm build && pnpm start
```

---

## 🔑 Credenciales de prueba

Puedes **crear un usuario desde el registro** o usar las credenciales de prueba ya disponibles:

```
email: cristian@tramites.net
password: zxcvbnm
```

---

## 🛠️ Pruebas

### 🔹 Prueba manual

1. Inicia el backend en `localhost:3002`.
2. Levanta el frontend en `localhost:3000`.
3. Inicia sesión con el usuario demo o regístrate.
4. Explora los módulos disponibles:

   * Dashboard con **sidebar de navegación**.
   * Gestión de usuarios.
   * Trámites y tipos de trámites.
   * Turnos.

---

## 🎨 Sustento de diseño

* **Next.js (SSR + SPA)** → rendimiento y SEO mejorados.
* **TailwindCSS** → estilos modernos y consistentes.
* **Arquitectura modular** → facilita mantenimiento y escalabilidad.
* **JWT + Cookies + sessionStorage** → autenticación segura y flexible.

---

## 🧑‍💻 Desarrollador

**Cristian Manco**
📧 Email: [camilomanco2005@gmail.com](mailto:camilomanco2005@gmail.com)
💼 GitHub: [cristianManco](https://github.com/cristianManco)

```

