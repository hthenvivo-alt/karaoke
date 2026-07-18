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

---

## ⚠️ REGLAS CRÍTICAS PARA AGENTES IA — NO IGNORAR

### NUNCA inventar letras de canciones

Las letras de canciones son contenido real. Está **PROHIBIDO** inventar, aproximar o generar letras aunque parezcan correctas. Solo se pueden cargar letras verificadas desde la fuente original (ej: letras.com).

### SIEMPRE hacer backup antes de tocar `prisma/seed.ts`

Antes de cualquier modificación que afecte letras de canciones, ejecutar:

```bash
node -e "
const fs = require('fs');
const content = fs.readFileSync('prisma/seed.ts', 'utf8');
const startIdx = content.indexOf('const songs: any[] =');
const arrayStart = content.indexOf('[', startIdx + 20);
let depth = 0; let arrayEnd = -1;
for (let i = arrayStart; i < content.length; i++) {
  if (content[i] === '[') depth++;
  else if (content[i] === ']') { depth--; if (depth === 0) { arrayEnd = i + 1; break; } }
}
const songs = JSON.parse(content.substring(arrayStart, arrayEnd));
const ts = new Date().toISOString().replace(/[:.]/g,'-').slice(0,19);
fs.mkdirSync('docs', { recursive: true });
fs.writeFileSync('docs/songs_backup_' + ts + '.json', JSON.stringify({ backupDate: new Date().toISOString(), totalSongs: songs.length, songs }, null, 2));
console.log('Backup OK:', songs.length, 'songs');
"
```

Los backups se guardan en `docs/songs_backup_*.json` y deben commitearse antes de cualquier cambio.
