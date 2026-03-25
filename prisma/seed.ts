import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const songs = [
  { title: 'Hacelo por mí', artist: 'Attaque 77', genre: 'Rock Nacional' },
  { title: 'Demoliendo hoteles', artist: 'Charly García', genre: 'Rock Nacional' },
  { title: 'Rezo por vos', artist: 'Charly García', genre: 'Rock Nacional' },
  { title: 'No voy en tren', artist: 'Charly García', genre: 'Rock Nacional' },
  { title: 'Nada de esto fue un error', artist: 'Coti', genre: 'Pop' },
  { title: 'No podrás', artist: 'Cristian Castro', genre: 'Balada' },
  { title: 'Mi enfermedad', artist: 'Calamaro / Fabi Cantilo', genre: 'Rock Nacional' },
  { title: 'Vasos vacíos', artist: 'Los Fabulosos Cadillacs', genre: 'Rock Nacional' },
  { title: 'Carnaval toda la vida', artist: 'Los Fabulosos Cadillacs', genre: 'Rock Nacional' },
  { title: 'La rueda mágica', artist: 'Fito Páez', genre: 'Rock Nacional' },
  { title: 'A rodar mi vida', artist: 'Fito Páez', genre: 'Rock Nacional' },
  { title: 'Mil horas', artist: 'Abuelos de la Nada', genre: 'Rock Nacional' },
  { title: 'Corazón', artist: 'Los Decadentes', genre: 'Rock Nacional' },
  { title: 'Avanti Morocha', artist: 'Iván Noble', genre: 'Rock Nacional' },
  { title: 'Lamento boliviano', artist: 'Enanitos Verdes', genre: 'Rock Nacional' },
  { title: 'Tan solo', artist: 'Los Piojos', genre: 'Rock Nacional' },
  { title: 'Todo un palo', artist: 'Los Redondos', genre: 'Rock Nacional' },
  { title: 'Ahora te puedes marchar', artist: 'Luis Miguel', genre: 'Balada' },
  { title: 'Se me ha perdido', artist: 'Gilda', genre: 'Cumbia' },
  { title: 'Juntos a la par', artist: 'Pappo', genre: 'Rock Nacional' },
  { title: 'Rock del gato', artist: 'Ratones Paranoicos', genre: 'Rock Nacional' },
  { title: 'Te quiero tanto', artist: 'Sergio Dennis', genre: 'Balada' },
  { title: 'De música ligera', artist: 'Soda Stereo', genre: 'Rock Nacional' },
  { title: 'Seguir viviendo sin tu amor', artist: 'Luis Alberto Spinetta', genre: 'Rock Nacional' },
  { title: 'Pasos al costado', artist: 'Turf', genre: 'Rock Nacional' },
  { title: 'Yo no me quiero casar', artist: 'Turf', genre: 'Rock Nacional' },
  { title: 'Corazón mentiroso', artist: 'Karina', genre: 'Cumbia' },
  { title: 'Tu misterioso alguien', artist: 'Miranda!', genre: 'Pop' },
  { title: 'Dejaría todo', artist: 'Chayanne', genre: 'Balada' },
  { title: 'Azul', artist: 'Cristian Castro', genre: 'Balada' },
  { title: 'Polaroid de locura ordinaria', artist: 'Fito Páez', genre: 'Rock Nacional' },
  { title: 'Fue amor', artist: 'Fito Páez / Fabi Cantilo', genre: 'Rock Nacional' },
  { title: 'Spaghetti del rock', artist: 'Divididos', genre: 'Rock Nacional' },
  { title: 'Costumbres argentinas', artist: 'Abuelos de la Nada', genre: 'Rock Nacional' },
  { title: 'Desconfío', artist: 'Pappo', genre: 'Rock Nacional' },
  { title: 'Luna de miel en las manos', artist: 'Virus', genre: 'Pop' },
  { title: 'Mr. Jones', artist: 'Sui Generis', genre: 'Rock Nacional' },
  { title: 'Cartas sin marcar', artist: 'Andrés Calamaro', genre: 'Rock Nacional' },
  { title: 'Me siento mucho mejor', artist: 'Charly García', genre: 'Rock Nacional' },
  { title: 'Buscando un símbolo de paz', artist: 'Charly García', genre: 'Rock Nacional' },
  { title: 'Todavía una canción de amor', artist: 'Los Rodríguez', genre: 'Rock' },
]

async function main() {
  console.log(`🌱 Seeding ${songs.length} songs...`)

  // createMany with skipDuplicates is idempotent — safe to re-run
  await prisma.song.createMany({
    data: songs,
    skipDuplicates: false,
  })

  const count = await prisma.song.count()
  console.log(`✅ Done! ${count} songs in database.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
