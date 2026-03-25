# KaraOK 🎤 — Karaoke en vivo

App móvil para eventos de karaoke en vivo. Los participantes entran desde el celular, eligen una canción y ven la letra. El animador gestiona la cola desde el panel admin.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Base de datos**: PostgreSQL via Prisma 7
- **Real-time**: Socket.io (servidor Node.js custom)
- **UI**: Tailwind CSS v4 (tema oscuro neon)
- **Deploy**: Render (GitHub CI/CD)

---

## Variables de entorno

Copiar `.env.example` a `.env` y completar:

```
DATABASE_URL="postgresql://user:pass@host:5432/karaoke"
ADMIN_PIN="tu-pin-secreto"
NEXT_PUBLIC_BASE_URL="https://tu-app.onrender.com"
```

---

## Desarrollo local

```bash
npm install
npx prisma migrate deploy
npm run db:seed
npm run dev
```

---

## Deploy en Render

### 1. Crear el repositorio en GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TU_USUARIO/karaoke.git
git push -u origin main
```

### 2. Crear el servicio en Render

Usá **"New → Blueprint"** en Render apuntando al repo. El `render.yaml` configura automáticamente el Web Service + PostgreSQL.

Variables a completar manualmente:
- `ADMIN_PIN` → tu PIN secreto (Render inyecta `DATABASE_URL` automáticamente)

### 3. Primera vez: migraciones y seed

Desde la **Shell** del Web Service en Render:

```bash
npx prisma migrate deploy
npm run db:seed
```

---

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Entrada de participantes |
| `/songs` | Listado de canciones |
| `/lyrics` | Letra + posición en cola |
| `/admin` | Login animador (PIN) |
| `/admin/dashboard` | Panel principal |
| `/admin/queue` | Cola en vivo (drag & drop) |
| `/admin/events` | Gestión de fechas |
| `/admin/catalog` | Canciones y letras |
| `/admin/screen` | Modo proyector/TV |

---

## Agregar letras

Admin → Catálogo → ✏️ en la canción → pegar letra → Guardar.
