# Mi Mercado — Guía de pruebas para QA

App de gestión de despensa (Ionic + Angular). **No tiene backend**: todos los datos
viven en el navegador (`localStorage`), por lo que no necesitas credenciales ni VPN.

## 1. Requisitos

- **Node.js 20 o superior** → verificar con `node --version`
- npm 10+ → `npm --version`
- Navegador Chrome/Edge actualizado

## 2. Cómo ejecutar

```powershell
# 1. Ubicarse en la carpeta del proyecto
cd <ruta-del-proyecto>\mi-mercado

# 2. Instalar dependencias (solo la primera vez, tarda unos minutos)
npm install

# 3. Levantar la app
npm start
```

Abrir en el navegador: **http://localhost:4200**

> Para probar como móvil: F12 → icono de dispositivo (Ctrl+Shift+M) → elegir iPhone o Pixel.
> Para resetear todos los datos a su estado inicial: F12 → Application → Local Storage →
> borrar las claves que empiezan por `mi-mercado.` → refrescar la página.

## 3. Datos iniciales esperados

| Dato | Valor inicial |
|---|---|
| Alimentos en despensa | 10 |
| Alertas de vencimiento (card Home) | 4 (1 "Hoy", 1d, 2d, 3d) |
| Lista de compras | 6 productos (2 ya comprados → 33%) |
| Recetas | 6 |
| Notificaciones campana | 4 sin leer |

## 4. Casos de prueba

### CP-01 · Home
1. Al cargar, se ve saludo "Buenos días 👋", título "Mi Mercado", campana con globo rojo **4**.
2. Tres tarjetas resumen: 10 Alimentos / 4 Alertas / 4 Por comprar.
3. Sección "Alertas de vencimiento" con 4 filas naranjas y badges (Hoy/1d/2d/3d).
4. Grid "Por categoría" con 6 categorías de colores.
5. Preview "Lista de compras" con 3 items y "+1 más por comprar".

### CP-02 · Notificaciones (campana)
1. Tocar la campana → abre la lista con **4 notificaciones** marcadas como no leídas (punto rojo).
2. Cada una muestra título, leyenda, hora relativa ("Hace 30 min", "Ayer"...).
3. Tocar "Producto vence hoy" → abre detalle con el producto "Pechuga de pollo", badge "Hoy" y botón "Ver vencimientos".
4. Volver (←): la notificación queda atenuada (leída) y el contador dice "3 sin leer".
5. Volver al Home: el globo rojo ahora muestra **3**.
6. **Refrescar la página (F5)**: el globo sigue en 3 (persistencia).
7. En la lista, "Marcar todas" → el globo desaparece del Home.
8. El botón de cada detalle navega al tab correcto (Vencimientos/Recetas/Compras).

### CP-03 · Despensa
1. Lista de 10 alimentos con icono de categoría, cantidad, ubicación y badge de vencimiento.
2. Buscar "leche" → filtra en vivo.
3. Chips de categoría (filtro relleno) y ubicación (filtro con borde) funcionan combinados.
4. Botón "+" → abre formulario: nombre, cantidad, unidad, categoría, vencimiento, ubicación.
5. Agregar un alimento → aparece en la lista. **Refrescar** → sigue ahí (persistencia).
6. Eliminar (icono basura) → desaparece.
7. Filtro sin resultados → estado vacío "Sin resultados".

### CP-04 · Vencimientos
1. Productos agrupados: Urgente (0-2 días) / Próximos (3-7 días) / En buen estado, ordenados por urgencia.
2. El subtítulo dice "3 productos requieren atención".

### CP-05 · Compras
1. Barra de progreso "2 de 6 productos · 33%".
2. Marcar un pendiente (círculo) → pasa a "Comprado", tachado y atenuado; el % sube.
3. Desmarcar → vuelve a "Por comprar".
4. Agregar con "+" y eliminar con basura. **Refrescar** → cambios persisten.

### CP-06 · Recetas
1. Listado con % de ingredientes disponibles (las 6 al 100% con datos iniciales → sección "Puedes cocinar ahora (6)").
2. Chips de filtro por categoría (Desayuno, Almuerzo...); "Postre" → estado vacío.
3. Tocar una receta → modal con ingredientes (✓ verdes), pasos numerados y botón Cerrar.
4. Eliminar de la despensa el "Queso parmesano" y volver a Recetas → "Pollo con Arroz" y "Galletas con Queso" bajan de 100% y cambian de sección.

### CP-07 · Responsive
Probar en estos anchos (DevTools): **360, 390, 412, 768 y 1024+**
- Hasta ~640px: la app ocupa todo el ancho.
- Tablet/desktop: contenido centrado en columna de 640px, nav inferior alineado.
- Sin textos cortados, sin scroll horizontal, sin elementos superpuestos.
- **No debe verse** ninguna barra de estado simulada (hora 9:41/batería): eso era solo del mockup.

### CP-08 · Modales
1. Los formularios y el detalle de receta abren como hoja desde abajo con fondo oscurecido.
2. Tocar fuera del modal o la "X" lo cierra.
3. "Agregar" con nombre vacío no hace nada (validación mínima).

## 5. Dónde reportar diferencias

- Diseño de referencia: export de Figma en `../figma-make-export/img1.png` (pantalla Home).
- Los datos de vencimiento se generan **relativos al día actual**, así que las fechas
  concretas cambian cada día — lo que debe mantenerse son los badges (Hoy/1d/2d/3d).

## 6. Builds adicionales (opcional)

- **PWA producción**: `npm run build` y luego `node tools/static-server.js 8080` → http://localhost:8080 (instalable, funciona offline).
- **Android**: requiere Android Studio → `npm run build; npx cap sync; npx cap open android` → Run ▶.
