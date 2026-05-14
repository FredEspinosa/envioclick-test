# Envioclick Frontend Technical Test

Aplicación desarrollada con React + Vite para la prueba técnica frontend de Envioclick.

## 🚀 Tecnologías utilizadas

- React JS
- Vite
- React Router DOM
- Axios
- CSS Vanilla (Mobile First)
- LocalStorage

---

# 📦 Instalación del proyecto

## 1. Clonar repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```

---

## 2. Entrar al proyecto

```bash
cd envioclick-test
```

---

## 3. Instalar dependencias

Este proyecto utiliza `pnpm`.

```bash
pnpm install
```

---

## 4. Ejecutar proyecto

```bash
pnpm dev
```

---

## 5. Abrir en navegador

```bash
http://localhost:5173
```

---

# 🔐 Credenciales de acceso

```txt
Usuario: admin
Password: 1234
```

---

# ✨ Funcionalidades implementadas

## ✅ Login
- Simulación de autenticación
- Protección de rutas
- Persistencia con LocalStorage

---

## ✅ Gestión de usuarios
- Consumo de RandomUser API
- Caché local para evitar llamadas innecesarias
- Vista tipo cards y tabla
- Diseño responsive mobile first

---

## ✅ Filtros dinámicos
- Género
- Nacionalidad
- Edad

---

## ✅ Detalle de usuario
- Información detallada
- Historial de mensajes

---

## ✅ Historial de mensajes
- Envío de mensajes
- Persistencia con LocalStorage

---

## ✅ Exportación CSV
- Descarga de usuarios filtrados

---

## ✅ Eliminación de usuarios
- Modal de confirmación
- Actualización dinámica de UI

---

# 📁 Arquitectura del proyecto

```bash
src/
│
├── api/
├── components/
├── pages/
├── routes/
├── services/
├── styles/
│
├── App.jsx
└── main.jsx
```

---

# 🧠 Decisiones técnicas

## Mobile First
La interfaz fue desarrollada siguiendo enfoque mobile first para garantizar buena experiencia en dispositivos móviles y posteriormente escalar hacia desktop mediante media queries.

---

## Separación por responsabilidades
El proyecto divide:
- lógica HTTP
- servicios
- componentes
- páginas

para mejorar mantenibilidad y escalabilidad.

---

## Cache local
Se implementó cache usando `localStorage` para optimizar rendimiento y evitar llamadas innecesarias a la API.

---

# 🌎 API utilizada

Random User API

https://randomuser.me/

---

# 👨‍💻 Autor

Desarrollado por:
Luis Alfredo Espinosa Caballero