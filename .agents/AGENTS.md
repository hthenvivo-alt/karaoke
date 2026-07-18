# Reglas del proyecto KaraOK — OBLIGATORIAS PARA AGENTES IA

## ⛔ NUNCA inventar letras de canciones

Está **TERMINANTEMENTE PROHIBIDO** inventar, generar, aproximar, completar o fabricar
letras de canciones bajo ninguna circunstancia.

Las letras son contenido con copyright de autores reales. Inventarlas destruye la integridad
de la base de datos y engaña al usuario.

**Reglas concretas:**
- Solo cargar letras copiadas textualmente desde una fuente verificada (ej: letras.com)
- Si no se puede obtener la letra real, decirle al usuario y pedirle que la provea él mismo
- Nunca "completar" una letra parcial con texto inventado
- Nunca generar una letra aunque el modelo "conozca" la canción — siempre verificar la fuente

## ⛔ SIEMPRE hacer backup antes de modificar letras en prisma/seed.ts

Antes de cualquier modificación a `prisma/seed.ts` que toque letras de canciones:

1. Ejecutar el script de backup:
```bash
export PATH="/usr/local/bin:$PATH" && node -e "
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

2. Verificar que el backup fue creado correctamente en `docs/`
3. Hacer commit del backup antes de aplicar cualquier cambio
4. Solo entonces proceder con la modificación

## Contexto del error que motivó estas reglas

El 2026-07-17, un agente IA inventó letras completas de canciones para llenar el catálogo,
arruinando la base de datos. El usuario tuvo que recargar manualmente todas las canciones.
Este error NO debe repetirse jamás.
