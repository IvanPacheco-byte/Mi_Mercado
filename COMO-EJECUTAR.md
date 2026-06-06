# Mi Mercado — Cómo ejecutar la app

App **Ionic + Angular + TypeScript**, réplica del diseño de Figma Make "Mi_Mercado app development".
Sin backend: todos los datos se guardan localmente (`localStorage`).

Funciona en: **Web (navegador)** · **PWA instalable** · **Android** · **iOS** (requiere Mac).

## Requisitos

| Herramienta | Para qué | Verificar con |
|---|---|---|
| Node.js 20+ (probado con v22) | Todo | `node --version` |
| npm 10+ | Todo | `npm --version` |
| Android Studio | Solo app Android | — |
| Xcode (en una Mac) | Solo app iOS | — |

> No necesitas el CLI de Ionic global: todo funciona con `npx` / scripts de npm.

---

## 1) Web — desarrollo (lo habitual)

```powershell
cd C:\Users\rfrodriguez\testingfigma\mi-mercado
npm install   # solo la primera vez
npm start     # levanta el servidor de desarrollo
```

Abre **http://localhost:4200**

- **Móvil** (hasta ~640px): la app llena todo el ancho, como app real.
- **Tablet/Desktop**: el contenido se centra en una columna legible de 640px.
- No hay barra de estado simulada: la hora/batería las pone el sistema operativo real.
- Live reload: recarga sola al editar código. Detener: `Ctrl + C`.
- ¿Puerto ocupado? `npx ng serve --port 8100`

---

## 2) PWA — instalable desde el navegador

El **service worker solo se activa en build de producción** (en `npm start` no).

```powershell
npm run build                       # genera www/ con service worker + manifest
node tools/static-server.js 8080    # servidor estático local con fallback SPA
```

Abre http://localhost:8080 y:

- **Android/Chrome**: menú ⋮ → "Agregar a pantalla de inicio" (o el banner de instalación).
- **Desktop Chrome/Edge**: icono de instalación en la barra de direcciones.
- **iPhone/Safari**: Compartir → "Agregar a pantalla de inicio".

Una vez instalada funciona **offline** (los assets quedan cacheados por el service worker).
Para producción real basta subir la carpeta `www/` a cualquier hosting **con HTTPS** (requisito de las PWA).

---

## 3) Android — app nativa (Capacitor)

```powershell
npm run build        # 1. compilar la web
npx cap sync         # 2. copiar el build al proyecto Android
npx cap open android # 3. abre Android Studio
```

En Android Studio: espera el sync de Gradle → botón **Run ▶** (emulador o teléfono con depuración USB).
Para generar el APK/AAB: *Build → Build Bundle(s) / APK(s)*.

> En el teléfono la app va a pantalla completa real, respetando notch y gesto de home (safe areas).

- App ID: `com.atlanticqi.mimercado` · Nombre: `Mi Mercado` (configurable en `capacitor.config.ts`)

## 4) iOS — app nativa (requiere una Mac)

```bash
npm run build
npx cap add ios      # solo la primera vez, en la Mac
npx cap sync
npx cap open ios     # abre Xcode → Run ▶
```

(El paquete `@capacitor/ios` ya está instalado; desde Windows no se puede compilar iOS.)

---

## Ciclo de trabajo típico

| Quiero... | Comando |
|---|---|
| Desarrollar con live reload | `npm start` |
| Probar la PWA | `npm run build` + servidor estático |
| Actualizar la app Android tras cambios | `npm run build; npx cap sync` |
| Abrir Android Studio | `npx cap open android` |

## Dónde se guardan los datos

| Dato | Clave en localStorage |
|---|---|
| Despensa | `mi-mercado.pantry` |
| Lista de compras | `mi-mercado.shopping` |

- La primera vez se cargan datos de ejemplo (los del Figma); tus cambios persisten.
- Resetear: F12 → *Application* → *Local Storage* → borrar claves `mi-mercado.*` → refrescar.
- En Android/iOS el localStorage vive dentro del WebView de la app (persiste entre sesiones).

## Estructura del proyecto (resumen)

```
src/
├── theme/variables.scss        # Tokens de color/tipografía del Figma
├── global.scss                 # Estilos globales y utilidades
└── app/
    ├── models/                 # Interfaces TypeScript
    ├── data/mock-data.ts       # Datos iniciales (despensa, compras, recetas)
    ├── services/               # PantryService, ShoppingService, RecipeService, StorageService
    ├── shared/components/      # bottom-nav, expiry-badge, modales
    └── pages/                  # inicio, despensa, vencimientos, compras, recetas
public/                         # manifest.webmanifest + iconos PWA
android/                        # proyecto nativo Android (Capacitor)
capacitor.config.ts             # configuración nativa (appId, nombre)
tools/make-icons.ps1            # regenera los iconos PWA si los cambias
```

## Problemas comunes

| Síntoma | Solución |
|---|---|
| `npm install` falla con `ECONNRESET` | Red inestable: reintenta con `npm install --fetch-retries=5` |
| Puerto en uso | `npx ng serve --port 8100` |
| Pantalla en blanco | Consola del navegador (F12) y revisar errores de `npm start` |
| La PWA no se actualiza tras un deploy | El service worker cachea: cierra y reabre, o "Update" en F12 → Application → Service Workers |
| Android Studio no compila | Verifica Android SDK 35+ instalado y deja terminar el Gradle sync |
| Quiero datos limpios | Borra las claves `mi-mercado.*` del localStorage y refresca |
