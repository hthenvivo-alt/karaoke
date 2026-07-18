<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:song-lyrics-rules -->
# ⚠️ REGLAS CRÍTICAS — BASE DE DATOS DE CANCIONES

## NUNCA inventar letras de canciones

**PROHIBIDO TERMINANTEMENTE**: Inventar, generar, aproximar o fabricar letras de canciones.
Las letras de canciones son contenido real con copyright. Cualquier letra que no sea verificada
desde la fuente original (letras.com u otra fuente confiable) es INACEPTABLE y destruye la
integridad de la base de datos.

- ✅ CORRECTO: Copiar la letra exacta desde letras.com verificando su contenido
- ✅ CORRECTO: Pedirle al usuario que confirme la letra antes de cargarla
- ❌ INCORRECTO: Generar/inventar una letra aunque "suene parecida"
- ❌ INCORRECTO: Completar letras parciales con texto inventado

## SIEMPRE hacer backup antes de modificar prisma/seed.ts

Antes de cualquier modificación a `prisma/seed.ts` que afecte letras de canciones:

1. Crear un backup en `docs/songs_backup_YYYYMMDD_HHMMSS.json` con TODAS las canciones y sus letras
2. Hacer commit del backup antes de cualquier cambio
3. Verificar que el backup es legible y completo

El comando para crear el backup:
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
<!-- END:song-lyrics-rules -->
