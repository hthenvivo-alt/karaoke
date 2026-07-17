import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const songs: any[] = [
  {
    "title": "Hacelo por mí",
    "artist": "Attaque 77",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[G] [D] [Em] [C] (x2)\n\n[G]No me pidas que no [D]vuelva a intentar\n[Em]que no deje de so[C]ñar\n[G]no me pidas que me [D]quede aquí\n[Em]si no hay nada que de[C]cir\n\n[G]Y yo te dije [D]hacelo por mí\n[Em]hacelo por [C]mí, mi amor\n[G]y yo te dije [D]hacelo por mí\n[Em]hacelo por [C]mí, mi amor\n\n[G]No me pidas que no [D]vuelva a intentar\n[Em]que no deje de so[C]ñar\n[G]no me pidas que me [D]quede aquí\n[Em]si no hay nada que de[C]cir\n\n[G]Y yo te dije [D]hacelo por mí\n[Em]hacelo por [C]mí, mi amor\n[G]y yo te dije [D]hacelo por mí\n[Em]hacelo por [C]mí, mi amor"
  },
  {
    "title": "Demoliendo hoteles",
    "artist": "Charly García",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[C]\n\n[C]Yo que crecí con Videla\nyo que nací sin poder\nyo que luché por la libertad\ny nunca la pude tener,\n[C]yo que viví entre fachistas\nyo que morí en el altar\nyo que crecí con los que estaban bien\npero a la noche estaba todo mal\n\n[Bb]Hoy pa[F]só el [C]tiem[Dm]po,\n[Bb]demoli[F]endo ho[C]te[Dm]les\n[Bb]mientras los plo[F]mos juntan los [C]cables\n[Dm]cazan rehenes\n\n[Bb]Hoy pa[F]só el [C]tiem[Dm]po\n[Bb]demoli[F]endo ho[C]te[Dm]les\n[Bb]mientras los chi[F]cos allá en la [C]esquina\n[F]pegan carteles\n\n[C]Yo fui educado con odio\ny odiaba la humanidad\nun día me fui con los hippies y tuve un amor y mucho más\n[C]Ahora no estoy más tranquilo,\ny por qué tendría que estar\ntodos crecimos sin entender\ny todavía me siento un anormal\n\n[Bb]Hoy pa[F]só el [C]tiem[Dm]po,\n[Bb]demoli[F]endo ho[C]te[Dm]les\n[Bb]mientras los plo[F]mos juntan los [C]cables\n[Dm]cazan rehenes\n\n[Bb]Hoy pa[F]só el [C]tiem[Dm]po\n[Bb]demoli[F]endo ho[C]te[Dm]les\n[Bb]mientras los chi[F]cos allá en la [C]esquina\n[F]pegan carteles"
  },
  {
    "title": "Rezo por vos",
    "artist": "Charly García",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[D] [G] (x4)\n\n[D]La indómita [G]luz\n[D]se hizo carne en [G]mí\n[D]y lo dejé [Em]todo por esta soledad\n[G]y leo re[Am7]vistas\n[Bm7]en la tem[Am7]pes[Bm7]tad\nhice el sacrificio\nabracé la cruz al amanecer\n\n[D]Rezo, [G]rezo, [D]rezo, [G]rezo\n\n[D]Morí sin mo[G]rir\n[D]y me abracé al do[Em]lor\n[D]y lo dejé [Em]todo por esta soledad\n[G]ya se hizo de [Am7]noche\n[Bm7]y ahora es[Am7]toy a[Bm7]quí\nmi cuerpo se cae\nsolo veo la cruz al amanecer\n\n[D]Rezo, [G]rezo, [D]rezo, [G]rezo por vos\n\n[A]Y curé mis he[G]ridas\n[A]y me encendí de a[G]mor\n[A]Y quemé las cor[G]tinas\n[A]y me encendí de a[G]mor\n[A]de amor sa[D]grado\n[D]Y enton[G]ces [D]re[G]zo"
  },
  {
    "title": "No voy en tren",
    "artist": "Charly García",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[C] [G] [F] [G] (x2)\n\n[C]No voy en tren, voy en a[G]vión\n[F]no necesito a nadie, a [G]nadie alrededor\n[C]porque no hay nadie que mi [G]piel resista,\n[F]porque no hay nadie que yo [G]quiera ver,\n[C]no veo televisión ni [G]las revistas,\n[F]no veo ya nada que no [G]pueda hacer\n\n[C]Por eso yo no [G]voy en tren, voy en a[F]vión [G]\n[C]Por eso yo no [G]voy en tren, voy en a[F]vión [G]\n\n[C]Cuando era niño nunca [G]fui muy listo\n[F]tocaba el piano como un [G]animal\n[C]yo se, que algunos piensan [G]que soy mixto\n[F]pero yo tengo persona[G]lidad\n[C]yo soy de la cruz del [G]sur\n[F]soy el que cierra y el que a[G]paga la luz\n[C]yo soy de la cruz del [G]sur,\n[F]aquí! y en any[G]where\n\n[C]No voy en tren, voy en a[G]vión\n[F]no necesito a nadie, a [G]nadie alrededor\n[C]Por eso yo no [G]voy en tren, voy en a[F]vión [G]\n[C]Por eso yo no [G]voy en tren, voy en a[F]vión [G]"
  },
  {
    "title": "Nada de esto fue un error",
    "artist": "Coti",
    "genre": "Pop",
    "lyrics": "Intro:\n[C] [G] [Am] [F] (x2)\n\n[C]Tengo una mala no[G]ticia\n[Am]no fue de casua[F]lidad\n[C]yo quería que pa[G]sara\n[Am]y tú la dejaste pa[F]sar\n\n[C]No me arrepiento de [G]nada\n[Am]el día fue como [F]fue\n[C]pero no fue un ac[G]cidente\n[Am]nada de esto fue un e[F]rror\n\n[C]Nada de esto fue un e[G]rror\n[Am]nada de esto fue un e[F]rror\n[C]nada de esto fue un e[G]rror\n[Am]nada de esto fue un e[F]rror\n\n[C]Tengo una mala no[G]ticia\n[Am]no fue de casua[F]lidad\n[C]yo quería que pa[G]sara\n[Am]y tú la dejaste pa[F]sar\n\n[C]No me arrepiento de [G]nada\n[Am]el día fue como [F]fue\n[C]pero no fue un ac[G]cidente\n[Am]nada de esto fue un e[F]rror\n\n[C]Nada de esto fue un e[G]rror\n[Am]nada de esto fue un e[F]rror\n[C]nada de esto fue un e[G]rror\n[Am]nada de esto fue un e[F]rror"
  },
  {
    "title": "No podrás",
    "artist": "Cristian Castro",
    "genre": "Balada",
    "lyrics": "Intro:\n[Am] [Dm] [G] [C] (x2)\n\n[Am]No podrás olvi[Dm]dar\n[G]que te amé como a [C]nadie\n[Am]no podrás olvi[Dm]dar\n[G]que en mis brazos dor[C]miste\n\n[Am]Y aunque trates de a[Dm]mar\n[G]a otro amor más a[C]delante\n[Am]sé que vas a llor[Dm]ar\n[G]al acordarte de [C]mí\n\n[Am]No podrás, no po[Dm]drás\n[G]arrancarme de tu [C]piel\n[Am]no podrás, no po[Dm]drás\n[G]olvidar que te a[C]mé\n\n[Am]No podrás, no po[Dm]drás\n[G]arrancarme de tu [C]piel\n[Am]no podrás, no po[Dm]drás\n[G]olvidar que te a[C]mé"
  },
  {
    "title": "Mi enfermedad",
    "artist": "Calamaro / Fabi Cantilo",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[A] [D] [E] (x2)\n\n[A]Estoy venci[D]da porque el mundo me\n[E]hizo así,\n[F#m]no puedo cambiar\n[D]Soy el remedio sin re[E]ceta y tu\n[F#m]amor mi enfermedad\n[D]Estoy venci[E]da porque el cuerpo de\n[F#m]los dos es mi debilidad\n[D]esta vez el [E]dolor va a termi[A]nar\n\n[A]Gente que [D]va gente que viene por\n[E]la calle\n[F#m]perdida entre la gente\n[D]Gente que [E]mira y que no quiere\n[F#m]que la vean\n[D]esta vez el [E]dolor va a termi[A]nar\n\n[D]Parece que la [E]fiesta termi[A]nó,\n[D]perdidos en el [E]túnel del a[A]mor\n[D]Y dicen las [E]hojas del libro que\n[F#m]más leo yo,\n[D]esta vez el es[E]clavo se esca[A]pó"
  },
  {
    "title": "Vasos vacíos",
    "artist": "Los Fabulosos Cadillacs",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[G] [C] [D] [C] (x2)\n\n[G]No sé si es el amor que se va\n[C]o el dolor que se [D]queda en su lu[G]gar\n[G]pero sé que ya no puedo [C]más\n[D]y tengo que bus[G]car una salida\n\n[G]Siempre hay vasos va[C]cíos\n[D]con agua de la ciu[G]dad\n[G]siempre hay vasos va[C]cíos\n[D]con agua de la ciu[G]dad\n\n[G]No sé si es el amor que se va\n[C]o el dolor que se [D]queda en su lu[G]gar\n[G]pero sé que ya no puedo [C]más\n[D]y tengo que bus[G]car una salida\n\n[G]Siempre hay vasos va[C]cíos\n[D]con agua de la ciu[G]dad\n[G]siempre hay vasos va[C]cíos\n[D]con agua de la ciu[G]dad"
  },
  {
    "title": "Carnaval toda la vida",
    "artist": "Los Fabulosos Cadillacs",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[A] [D] [E] [A] (x2)\n\n[A]Carnaval toda la [D]vida\n[E]y una noche junto a [A]vos\n[A]Carnaval toda la [D]vida\n[E]y una noche junto a [A]vos\n\n[F#m]Porque el tiempo se nos [Bm]va\n[E]y no vuelve nunca [A]más\n[F#m]porque el tiempo se nos [Bm]va\n[E]y no vuelve nunca [A]más\n\n[A]Carnaval toda la [D]vida\n[E]y una noche junto a [A]vos\n[A]Carnaval toda la [D]vida\n[E]y una noche junto a [A]vos\n\n[F#m]Porque el tiempo se nos [Bm]va\n[E]y no vuelve nunca [A]más\n[F#m]porque el tiempo se nos [Bm]va\n[E]y no vuelve nunca [A]más"
  },
  {
    "title": "La rueda mágica",
    "artist": "Fito Páez",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[G] [D] [C] [D] (x2)\n\n[G]Recuerdo que un [D]día\n[C]nos pusimos a [D]cantar\n[G]y la rueda [D]mágica\n[C]empezó a gi[D]rar\n\n[C]Y hoy que [G]estamos aquí\n[D]vamos a dis[Em]frutar\n[C]que la rueda [G]mágica\n[D]no deje de gi[G]rar\n\n[G]Recuerdo que un [D]día\n[C]nos pusimos a [D]cantar\n[G]y la rueda [D]mágica\n[C]empezó a gi[D]rar\n\n[C]Y hoy que [G]estamos aquí\n[D]vamos a dis[Em]frutar\n[C]que la rueda [G]mágica\n[D]no deje de gi[G]rar"
  },
  {
    "title": "A rodar mi vida",
    "artist": "Fito Páez",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[G] [D/F#] [Em] [C] (x2)\n\n[G]Se me hacía [D/F#]tarde, ya me [Em]iba [C]\n[G]siempre se hace [D/F#]tarde en la ciu[Em]dad [C]\n[G]Cuando me di [D/F#]cuenta estaba [Em]vivo [C]\n[G]vivo para [D/F#]siempre de ver[Em]dad [C]\n\n[G]Hoy compré re[D/F#]vistas en el [Em]metro [C]\n[G]no pensaba en [D/F#]nada, nada [Em]más [C]\n[G]Y caí que al [D/F#]fin esto es un [Em]juego [C]\n[G]todo empieza [D/F#]siempre una vez [Em]más [C]\n\n[G]Y a rodar, y a ro[D/F#]dar\n[Em]y a rodar y a ro[C]dar, mi vida\n[G]Y a rodar, y a ro[D/F#]dar\n[Em]y a rodar y a ro[C]dar, mi amor\n[Em]Yo no sé [D]dónde va\n[C]yo no sé dónde va mi vida\n[Em]Yo no sé [D]dónde va\n[C]pero tampoco creo que [D]sepas vos\n\n[G]Quiero salir, [D/F#]sí, quiero vi[Em]vir [C]\n[G]y quiero de[D/F#]jar una [Em]suerte de se[C]ñal\n[G]si un corazón [D/F#]triste pudo [Em]ver la [C]luz\n[G]si hice más li[D/F#]viano el [Em]peso de tu [C]cruz\n[G]nada más me im[D/F#]porta en esta [Em]vida, [C]uh\n[C]Chau, hasta ma[D]ñana\n\n[G]Y a rodar, y a ro[D/F#]dar\n[Em]y a rodar y a ro[C]dar, mi vida\n[G]Y a rodar, y a ro[D/F#]dar\n[Em]y a rodar y a ro[C]dar, mi amor\n[Em]Yo no sé [D]dónde va\n[C]yo no sé dónde va mi vida\n[Em]Yo no sé [D]dónde va\n[C]pero tampoco creo que [D]sepas vos\n\n[G]Quiero salir, [D/F#]sí, quiero vi[Em]vir [C]\n[G]y quiero de[D/F#]jar una [Em]suerte de se[C]ñal\n[G]si un corazón [D/F#]triste pudo [Em]ver la [C]luz\n[G]si hice más li[D/F#]viano el [Em]peso de tu [C]cruz\n[G]nadie tiene a [D/F#]nadie, yo te [Em]tengo a [C]vos\n[G]dentro de mi [D/F#]alma, [Em]siento que me [C]amas\n[C]Chau, hasta ma[D]ñana\n\n[G]Y a rodar, y a ro[D/F#]dar\n[Em]y a rodar y a ro[C]dar, mi vida\n[G]Y a rodar, y a ro[D/F#]dar\n[Em]y a rodar y a ro[C]dar, mi amor"
  },
  {
    "title": "Mil horas",
    "artist": "Abuelos de la Nada",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[Gm7] [Cm7] [Dm7] [Eb]\n\n[Cm7]Hace frío y es[Dm7]toy lejos de [Gm7]casa,\n[Cm7]hace tiempo que es[Dm7]toy sentado sobre esta [Gm7]piedra,\n[Cm7]yo me pre[Dm7]gunto, ¿para qué sirven las [C7]guerras?\n\n[C7]Tengo un cohete en el pantalón\ny vos estás tan fría como la [Gm7]nieve a mi alrededor,\n[Eb]vos estás tan blanca que ya no sé qué hacer\n\n[Gm7]La otra noche te espe[Cm7]ré bajo la lluvia, dos horas,\n[Dm7]mil horas, [Eb]como un perro\n[Gm7]Y cuando llegaste me mi[Cm7]raste y me dijiste: \"Loco,\n[Dm7]estás moja[Eb]do, ya no te quiero\"\n\n[Cm7]Paso las noches [Dm7]en la tempestad y [Gm7]más,\n[Cm7]paso las noches [Dm7]leyendo y releyendo tus [Gm7]cartas,\n[Cm7]yo me pre[Dm7]gunto, ¿para qué sirven las [C7]guerras?\n\n[C7]Ya ni recuerdo cuál es tu color\nsolo veo rojo, rojo [Gm7]como la sangre que fluye,\n[Eb]cuando te miro de arriba a abajo\n\n[Gm7]La otra noche te espe[Cm7]ré bajo la lluvia, dos horas,\n[Dm7]mil horas, [Eb]como un perro\n[Gm7]Y cuando llegaste me mi[Cm7]raste y me dijiste: \"Loco,\n[Dm7]estás moja[Eb]do, ya no te quiero\""
  },
  {
    "title": "Corazón",
    "artist": "Los Decadentes",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[A] [F#m] [D] [E] (x2)\n\n[A]Loco por tu a[F#m]mor,\n[D]loco por tu a[E]mor\n[A]tengo el cora[F#m]zón loco,\n[D]loco por tu a[E]mor\n\n[D]Y no sé qué pa[E]sará\n[C#m]si no te tengo [F#m]aquí\n[D]tengo el cora[E]zón loco,\n[A]loco por tu amor\n\n[A]Loco por tu a[F#m]mor,\n[D]loco por tu a[E]mor\n[A]tengo el cora[F#m]zón loco,\n[D]loco por tu a[E]mor\n\n[D]Y no sé qué pa[E]sará\n[C#m]si no te tengo [F#m]aquí\n[D]tengo el cora[E]zón loco,\n[A]loco por tu amor"
  },
  {
    "title": "Avanti Morocha",
    "artist": "Iván Noble",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[G] [D] [Em] [C] (x2)\n\n[G]Avanti mo[D]rocha,\n[Em]que no siento el [C]frío\n[G]si estás al [D]lado de [Em]este corazón [C]mío\n\n[G]No te dejes [D]caer,\n[Em]no te dejes ven[C]cer\n[G]que la vida es [D]buena\n[Em]y hay mucho por [C]ver\n\n[G]Avanti mo[D]rocha,\n[Em]que no siento el [C]frío\n[G]si estás al [D]lado de [Em]este corazón [C]mío"
  },
  {
    "title": "Lamento boliviano",
    "artist": "Enanitos Verdes",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[Em] [Bm] [Am] [Em] (x2)\n\n[Em]Me quieren agi[Bm]tar, me incitan a gri[Am]tar\n[Em]soy como una roca, palabras no me [Bm]tocan\n[Am]adentro hay un volcán que pronto va a esta[Em]llar\nyo quiero estar tranquilo\n\n[Em]Es mi situa[Bm]ción una desola[Am]ción\n[Em]soy como un lamento, lamento boli[Bm]viano\n[Am]que un día empezó y no va a termi[Em]nar\ny a nadie hace daño\n\n[G]Y yo estoy a[D]quí, borracho y [Em]loco\ny mi corazón i[Bm]diota siempre brillará[C]\ny yo te ama[G]ré, te amaré por [D]siempre\n[C]Nena, no te peines en la [D]cama\nque los viajantes se van a atrasar\n\n[G]Y yo estoy a[D]quí, borracho y [Em]loco\ny mi corazón i[Bm]diota siempre brillará[C]\ny yo te ama[G]ré, te amaré por [D]siempre\n[C]Nena, no te peines en la [D]cama\nque los viajantes se van a atrasar"
  },
  {
    "title": "Tan solo",
    "artist": "Los Piojos",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[E] [B] [C#m] [A] (x2)\n\n[E]Tan solo, tan [B]solo\n[C#m]buscando tu a[A]mor\n[E]tan solo, tan [B]solo\n[C#m]con mi de[A]selo\n\n[E]Y no sé qué pa[B]sará\n[C#m]cuando te vuelva a [A]ver\n[E]tan solo, tan [B]solo\n[C#m]buscando tu a[A]mor\n\n[E]Tan solo, tan [B]solo\n[C#m]buscando tu a[A]mor\n[E]tan solo, tan [B]solo\n[C#m]con mi de[A]selo"
  },
  {
    "title": "Todo un palo",
    "artist": "Los Redondos",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[C] [G] [Am] [F] (x2)\n\n[C]El futuro ya [G]llegó, [Am]llegó como tres [F]tiros\n[C]que te dan en el [G]pecho, [Am]y no te de[F]jan respirar\n[C]No me digas que no [G]querés, [Am]no me digas que no [F]podés\n[C]todo un palo es el [G]día de hoy, [Am]todo un palo en la [F]ciudad\n\n[C]Yo no sé si [G]es en vano [Am]este dolor [F]\n[C]yo no sé si [G]es en vano [Am]este dolor [F]\n[C]yo no sé si [G]es en vano [Am]este dolor [F]\n[C]yo no sé si [G]es en vano [Am]este dolor [F]\n\n[C]El futuro ya [G]llegó, [Am]yo sé que vos no lo [F]crees\n[C]pero está gol[G]peando tu [Am]puerta de ver[F]dad\n[C]No me digas que no [G]querés, [Am]no me digas que no [F]podés\n[C]todo un palo es el [G]día de hoy, [Am]todo un palo en la [F]ciudad\n\n[C]Yo no sé si [G]es en vano [Am]este dolor [F]\n[C]yo no sé si [G]es en vano [Am]este dolor [F]\n[C]yo no sé si [G]es en vano [Am]este dolor [F]\n[C]yo no sé si [G]es en vano [Am]este dolor [F]"
  },
  {
    "title": "Ahora te puedes marchar",
    "artist": "Luis Miguel",
    "genre": "Balada",
    "lyrics": "Intro:\n[A] [F#m] [D] [E] (x2)\n\n[A]Si no supiste a[F#m]mar\n[D]ahora te puedes mar[E]char\n[A]si no supiste a[F#m]mar\n[D]ahora te puedes mar[E]char\n\n[D]Porque no tengo [E]tiempo\n[C#m]para tus men[F#m]tiras\n[D]si no supiste a[E]mar\n[A]ahora te puedes marchar\n\n[A]Si no supiste a[F#m]mar\n[D]ahora te puedes mar[E]char\n[A]si no supiste a[F#m]mar\n[D]ahora te puedes mar[E]char"
  },
  {
    "title": "Se me ha perdido",
    "artist": "Gilda",
    "genre": "Cumbia",
    "lyrics": "Intro:\n[Am] [G] [F] [E] (x2)\n\n[Am]Se me ha perdido un cora[G]zón\n[F]buscando un nuevo a[E]mor\n[Am]se me ha perdido un cora[G]zón\n[F]buscando un nuevo a[E]mor\n\n[Dm]Y no sé dónde es[Am]tará\n[F]quién se lo lleva[E]rá\n[Am]se me ha perdido un cora[G]zón\n[F]buscando un nuevo a[E]mor\n\n[Am]Se me ha perdido un cora[G]zón\n[F]buscando un nuevo a[E]mor\n[Am]se me ha perdido un cora[G]zón\n[F]buscando un nuevo a[E]mor"
  },
  {
    "title": "Juntos a la par",
    "artist": "Pappo",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[C] [G] [Am] [D]\n\n[C]Le he pedido tanto a Dios\n[G]que al final oyó mi voz\n[Am]por la noche a más tardar\n[D]yendo juntos [G]a la [C]par [G]\n\n[C]Cartas de amor en el hall\n[G]se secan con el sol\n[Am]lejos de la gran ciudad\n[D]ella es mi felicidad\n[G]nada como ir [C]juntos a la [G]par\n\n[C]Nada como ir juntos a la par\n[G]y caminos desandar\n[Am]el honor no lo perdí\n[D]es el héroe que hay en mí\n[G]nada como ir [C]juntos a la [G]par\n\n[C]Sé su nombre, sé su edad\n[G]y sus gustos en la intimidad\n[Am]cuando un corazón se entrega\n[D]y el mañana nunca llega\n[G]¿qué más [C]puedo ha[G]cer?\n\n[C]Nada como ir juntos a la par\n[G]y caminos desandar\n[Am]el honor no lo perdí\n[D]es el héroe que hay en mí\n[G]nada como ir [C]juntos a la [G]par"
  },
  {
    "title": "Rock del gato",
    "artist": "Ratones Paranoicos",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[A] [D] [E] [A] (x2)\n\n[A]Yo te vi en la ca[D]rre, vos no me di[E]jiste nada [A]\n[A]estabas con tu [D]novio y estabas [E]muy enoja[A]da\n[A]Te acordás del [D]gato que te re[E]galé una [A]vez\n[A]era negro y [D]lindo, y se llamaba [E]Gardel [A]\n\n[A]Quiero tocar el [D]rock del gato [E]y divertirme un [A]buen rato\n[A]quiero tocar el [D]rock del gato [E]y divertirme un [A]buen rato\n\n[A]Yo te vi en la ca[D]rre, vos no me di[E]jiste nada [A]\n[A]estabas con tu [D]novio y estabas [E]muy enoja[A]da\n[A]Te acordás del [D]gato que te re[E]galé una [A]vez\n[A]era negro y [D]lindo, y se llamaba [E]Gardel [A]\n\n[A]Quiero tocar el [D]rock del gato [E]y divertirme un [A]buen rato\n[A]quiero tocar el [D]rock del gato [E]y divertirme un [A]buen rato"
  },
  {
    "title": "Te quiero tanto",
    "artist": "Sergio Dennis",
    "genre": "Balada",
    "lyrics": "Intro:\n[G] [D] [Em] [C] (x2)\n\n[G]Cuanta verdad en tus [D]ojos, cuanta dul[Em]zura en tu [C]piel\n[G]cuantas mañanas dis[D]tintas al ama[Em]necer [C]\n[G]Te quiero tanto, mi [D]vida, no puedo vi[Em]vir sin tu a[C]mor\n[G]sos la luz que ilu[D]mina mi co[Em]razón [C]\n\n[G]Te quiero tanto, [D]tanto, [Em]tanto, tanto, mi a[C]mor\n[G]que ya no puedo [D]más si no es[Em]tás con[C]migo\n[G]Te quiero tanto, [D]tanto, [Em]tanto, tanto, mi a[C]mor\n[G]que ya no puedo [D]más si no es[Em]tás con[C]igo\n\n[G]Cuanta verdad en tus [D]ojos, cuanta dul[Em]zura en tu [C]piel\n[G]cuantas mañanas dis[D]tintas al ama[Em]necer [C]\n[G]Te quiero tanto, mi [D]vida, no puedo vi[Em]vir sin tu a[C]mor\n[G]sos la luz que ilu[D]mina mi co[Em]razón [C]\n\n[G]Te quiero tanto, [D]tanto, [Em]tanto, tanto, mi a[C]mor\n[G]que ya no puedo [D]más si no es[Em]tás con[C]migo\n[G]Te quiero tanto, [D]tanto, [Em]tanto, tanto, mi a[C]mor\n[G]que ya no puedo [D]más si no es[Em]tás con[C]igo"
  },
  {
    "title": "De música ligera",
    "artist": "Soda Stereo",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[Bm] [G] [D] [A] (x6)\n\n[Bm]Ella dur[G]mió, al ca[D]lor de las [A]masas\n[Bm]y yo desper[G]té, querien[D]do so[A]ñarla\n[Bm]Algún tiem[G]po atrás, pen[D]sé en escri[A]birle\n[Bm]y nunca sor[G]teé, las tram[D]pas del a[A]mor\n\n[Bm]De aquel a[G]mor, de mú[D]sica li[A]gera\n[Bm]nada nos [G]libra, na[D]da más [A]queda\n\n[Bm] [G] [D] [A] (x4)\n\n[Bm]No le envia[G]ré, ceni[D]zas de [A]rosas\n[Bm]ni pienso evi[G]tar, sus ro[D]ces se[A]cretos\n\n[Bm]De aquel a[G]mor, de mú[D]sica li[A]gera\n[Bm]nada nos [G]libra, na[D]da más [A]queda\n\n[Bm]Nada más [G]que[D]da[A]\n[Bm]Nada más [G]que[D]da[A]\n[Bm]Nada más [G]que[D]da[A]\n\n[G] [D]"
  },
  {
    "title": "Seguir viviendo sin tu amor",
    "artist": "Luis Alberto Spinetta",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[F#] [Bm] [Em7] [A]\n\n[D]Si a tu corazón yo [Bm]llego igual,\n[G]todo siempre se po[Em7]drá ele[A]gir\n[D]No me escribas la pa[Bm]red,\n[G]solo quiero estar en[Em7]tre tu [A]piel\n\n[D]Y si acaso no bri[Bm]llara el sol,\n[G]y quedara yo a[Em7]trapa[A]do aquí,\n[D]no vería la ra[Bm]zón\n[G]de seguir vi[Em7]viendo sin tu [A]amor\n\n[F#]Y hoy que, enloquecido [Bm]vuelvo\nbuscando tu querer,\n[Em7]no queda más que el [A]viento,\nno queda más que el viento\n\n[D]Si a tu corazón yo [Bm]llego igual,\n[G]todo siempre se po[Em7]drá ele[A]gir\n[D]No me escribas la pa[Bm]red,\n[G]solo quiero estar en[Em7]tre tu [A]piel\n\n[F#]Y hoy que, enloquecido [Bm]vuelvo\nbuscando tu querer,\n[Em7]no queda más que el [A]viento,\nno queda más que el viento"
  },
  {
    "title": "Pasos al costado",
    "artist": "Turf",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[A] [E] [F#m] [D] (x2)\n\n[A]A mí me gusta el rock and [E]roll, me gusta la ciu[F#m]dad [D]\n[A]me gusta ver el sol na[E]cer, y ver la gen[F#m]te andar [D]\n[A]Pero a veces me can[E]so, me canso de ve[F#m]ra[D]dad\n[A]de correr atrás de a[E]lgo que no voy a [F#m]alcan[D]zar\n\n[A]Y doy unos pasos al co[E]stado para de[F#m]jarte pa[D]sar\n[A]no quiero más pe[E]leas, solo un po[F#m]co de [D]paz\n[A]Y doy unos pasos al co[E]stado para de[F#m]jarte pa[D]sar\n[A]no quiero más pe[E]leas, solo un po[F#m]co de [D]paz\n\n[A]Y doy unos pasos al co[E]stado para de[F#m]jarte pa[D]sar\n[A]no quiero más pe[E]leas, solo un po[F#m]co de [D]paz"
  },
  {
    "title": "Yo no me quiero casar",
    "artist": "Turf",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[G] [C] [D] [G] (x2)\n\n[G]Mírenme, ya no [C]tengo dieciocho [D]años\n[G]mírenme, sigo es[C]tando igual de [D]soltero\n[G]no tengo auto, no [C]tengo propie[D]dades\n[G]solo tengo mis can[C]ciones y mi pe[D]rro\n\n[G]Yo no me quiero ca[C]sar, ¿y u[D]sted? [G]\n[G]yo no me quiero ca[C]sar, ¿y u[D]sted? [G]\n[C]Quiero vivir mi [D]vida libre [Bm]como el [Em]viento\n[C]yo no me quiero ca[D]sar, ¿y u[G]sted?\n\n[G]Yo no me quiero ca[C]sar, ¿y u[D]sted? [G]\n[G]yo no me quiero ca[C]sar, ¿y u[D]sted? [G]\n[C]Quiero vivir mi [D]vida libre [Bm]como el [Em]viento\n[C]yo no me quiero ca[D]sar, ¿y u[G]sted?"
  },
  {
    "title": "Corazón mentiroso",
    "artist": "Karina",
    "genre": "Cumbia",
    "lyrics": "Intro:\n[Am] [Dm] [G] [C] (x2)\n\n[Am]Mentiroso, corazón menti[Dm]roso\n[G]te vas a arrepentir cuando [C]esté con otro\n[Am]esta tonta se cansó de tus men[Dm]tiras\n[G]ser juguete de tu [C]vida, otra de tu colección\n\n[Am]Mentiroso, corazón menti[Dm]roso\n[G]te vas a arrepentir cuando [C]esté con otro\n[Am]esta tonta se cansó de tus men[Dm]tiras\n[G]ser juguete de tu [C]vida, otra de tu colección"
  },
  {
    "title": "Tu misterioso alguien",
    "artist": "Miranda!",
    "genre": "Pop",
    "lyrics": "Intro:\n[A] [F#m] [Bm] [E] (x2)\n\n[A]Me pregunto quién se[F#m]rá\n[Bm]el que te roba el [E]corazón\n[A]me pregunto quién se[F#m]rá\n[Bm]el dueño de tu pa[E]sión\n[A]Tengo celos de pensar [F#m]\n[Bm]que alguien te pueda to[E]car\n[A]tengo miedo de sa[F#m]ber\n[Bm]que te podés ale[E]jar\n\n[A]Sos tu misterioso al[F#m]guien que me [Bm]roba el co[E]razón\n[A]sos tu misterioso al[F#m]guien que me [Bm]llena de pa[E]sión\n[A]Sos tu misterioso al[F#m]guien que me [Bm]roba el co[E]razón\n[A]sos tu misterioso al[F#m]guien que me [Bm]llena de pa[E]sión"
  },
  {
    "title": "Dejaría todo",
    "artist": "Chayanne",
    "genre": "Balada",
    "lyrics": "Intro:\n[Am] [Dm] [G] [C] (x2)\n\n[Am]He intentado casi [Dm]todo para con[G]vencerte [C]\n[Am]he intentado dejar [Dm]atrás todo mi pa[G]sado [C]\n[Am]pero nada es sufici[Dm]ente, nada te [G]conforma [C]\n[Am]ya no sé qué más ha[Dm]cer para tener[G]te [C]\n\n[Am]Dejaría todo por tu a[Dm]mor, mi vida,\n[G]dejaría todo por un [C]beso tuyo\n[Am]no me importa el do[Dm]lor ni el orgullo\n[G]si estoy cerca de [C]vos\n\n[Am]Dejaría todo por tu a[Dm]mor, mi vida,\n[G]dejaría todo por un [C]beso tuyo\n[Am]no me importa el do[Dm]lor ni el orgullo\n[G]si estoy cerca de [C]vos"
  },
  {
    "title": "Azul",
    "artist": "Cristian Castro",
    "genre": "Balada",
    "lyrics": "Intro:\n[A] [E] [D] [A] (x2)\n\n[A]Fue una mirada que cam[E]bió mi destino\n[D]fue un encuentro en medio [A]del camino\n[A]y de pronto todo se vol[E]vió tan claro\n[D]me enamoré de vos en un [A]segundo\n\n[A]Azul, como el cielo a[E]zul\n[D]azul, como el mar a[A]zul\n[A]sos la luz de mi [E]vida\n[D]mi camino a se[A]guir\n\n[A]Azul, como el cielo a[E]zul\n[D]azul, como el mar a[A]zul\n[A]sos la luz de mi [E]vida\n[D]mi camino a se[A]guir"
  },
  {
    "title": "Polaroid de locura ordinaria",
    "artist": "Fito Páez",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[Am] [Dm] [F] [C]\n\n[Am]Bajó por el calle[Dm]jón\n[F]en donde estaba [C]él,\n[Am]después vomi[Dm]tó ese ron\n[F]manchando la pa[C]red.\n[Am]El sol le ca[Dm]ía bien\n[F]entrando la ave[C]nida,\n[Am]su vida no [Dm]era más su vida\n[F]pero eso estaba [C]O.K.\n\n[D#]La veo cru[F]zar\n[C]cruzando un bosque,\n[D#]la veo ale[F]jándose de [G]mí\n\n[Am]Sus tetas y [Dm]sus dos hermanas\n[F]tomaban un ca[C]fé,\n[Am]me acuerdo de [Dm]la mañana\n[F]que me mostró su [C]piel.\n[Am]Estábamos [Dm]en un bar\n[F]y se cortó la [C]cara,\n[Am]vibraba co[Dm]mo en un nirvana\n[F]luego se echó a co[C]rrer\n\n[D#]La veo cru[F]zar\n[C]cruzando un bosque,\n[D#]la veo ale[F]jándose de [G]mí\n\n[Bm]Pasábamos [Em]todo el día\n[G]tirados en la [D]cama,\n[Bm]el tiempo, mal[Em]dita daga\n[G]lamiéndonos los [D]pies.\n[Bm]Brillaba, e[Em]ra una perla\n[G]y nunca hacía [D]nada,\n[Bm]después dijo [Em]que me amaba\n[G]y se hundió la gi[D]llette.\n\n[G]Sangró, sangró, sangró\n[C]y se reía [D]como loca.\n[G]No he visto luz ni fuerza viva\n[C]tan pode[D]rosa.\n[G]De todas ellas,\n[C]ella fue mi [D]frase más hermosa.\n[G]Todo su cuerpo con espinas\n[C]y a mí me si[D]guen las moscas"
  },
  {
    "title": "Fue amor",
    "artist": "Fito Páez / Fabi Cantilo",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[G] [D] [Em] [C] (x2)\n\n[G]Yo podría ha[D]berlo hecho mejor\n[Em]Vos podrías a[C]cercarte a mí\n[G]Yo intuía [D]que esto, mi amor\n[Em]Se rompía, y [C]esto es siempre así\n[G]La verdad es [D]que todo fue\n[Em]Tan extraño, [C]tan extraño, al fin\n[G]Vos buscando el [D]polvo de Dios\n[Em]Yo bebía pa[C]ra irme de aquí\n\n[G]Cada vez que [D]pienso en vos\n[Em]Fue amor, [C]fue amor\n[G]Cada vez que [D]pienso en vos\n[Em]Fue amor, [C]fue amor\n\n[G]Todo el mundo me [D]habla de vos\n[Em]Y no puedo de[C]jar de reír\n[G]Lo que hacés y a[D]donde vas\n[Em]De tu depto siempre [C]a Prix D'ami\n[G]No está bien rom[D]per un corazón\n[Em]Déjà vu de lo [C]que va a venir\n[G]Vos querías [D]verme feliz\n[Em]Yo quería [C]verte revivir\n\n[G]Cada vez que [D]pienso en vos\n[Em]Fue amor, [C]fue amor\n[G]Cada vez que [D]pienso en vos\n[Em]Fue amor, [C]fue amor\n\n[G]Estos días que [D]corren, mi amor\n[Em]Es aquí que nos [C]tocó vivir\n[G]Enredados en los [D]cables de Entel\n[Em]De algún sueño, [C]vamos a salir\n[G]Como siempre, [D]vuelvo a ensayar\n[Em]Y los pibes [C]siempre están ahí\n[G]Hay un boomerang [D]en la city, mi amor\n[Em]Todo vuelve co[C]mo vos decís\n\n[G]Cada vez que [D]pienso en vos\n[Em]Fue amor, [C]fue amor\n[G]Cada vez que [D]pienso en vos\n[Em]Fue amor, [C]fue amor"
  },
  {
    "title": "Spaghetti del rock",
    "artist": "Divididos",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[E] [Bm] [A] [E] (x2)\n\n[E]Pistones de un cu[Bm]rioso motor de [A]humedad [E]\n[E]depósito de [Bm]barras de mi[A]rar [E]\n[E]un spaghetti del [Bm]rock para ce[A]nar [E]\n[E]un spaghetti del [Bm]rock para ce[A]nar\n\n[E]No quiero más que po[Bm]der hablar [A]con vos [E]\n[E]no quiero más que po[Bm]der hablar [A]con vos [E]\n\n[E]Pistones de un cu[Bm]rioso motor de [A]humedad [E]\n[E]depósito de [Bm]barras de mi[A]rar [E]\n[E]un spaghetti del [Bm]rock para ce[A]nar [E]\n[E]un spaghetti del [Bm]rock para ce[A]nar"
  },
  {
    "title": "Costumbres argentinas",
    "artist": "Abuelos de la Nada",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[Em] [A] [Em] [A]\n\n[Em]Muerdo el anzuelo y [A]vuelvo\n[Em]a empezar de [D]nuevo ca[G]da vez[B7]\n[Em]Tengo en la mano la [A]carta\n[Em]para jugar el [D]juego cuan[G]do quie[B7]ras\n\n[C]Caminan[D]do, cami[G]nándote\n[B7]mi ca[C]lle que qui[D]zás yo pueda cam[G]biar\n[C]Esperan[D]do, espe[G]rándote\n[B7]costumbres ar[C]genti[D]nas de decir [Em]no\n\nY des[C]pués ha[D]cer el a[G]mor\n[B7]Y des[C]pués ha[D]cer el a[Em]mor\n\n[Em]Muerdo el anzuelo y [A]vuelvo\n[Em]a empezar de [D]nuevo ca[G]da vez[B7]\n[Em]Tengo en la mano la [A]carta\n[Em]para jugar el [D]juego cuan[G]do quie[B7]ras\n\n[C]Caminan[D]do, cami[G]nándote\n[B7]mi ca[C]lle que qui[D]zás yo pueda cam[G]biar\n[C]Esperan[D]do, espe[G]rándote\n[B7]costumbres ar[C]genti[D]nas de decir [Em]no\n\nY des[C]pués ha[D]cer el a[G]mor\n[B7]Y des[C]pués ha[D]cer el a[Em]mor\n\n[Em]Siempre mi[A]rando en la calle\n[Em]quién es el que [D]va a ca[G]er prime[B7]ro\n[Em]Y en el [A]viento que me lleva al des[Em]tino\nyo te en[D]cuentro [G]en una can[B7]ción\n\n[C]Caminan[D]do, cami[G]nándote\n[B7]mi ca[C]lle que qui[D]zás yo pueda cam[G]biar\n[C]Esperan[D]do, espe[G]rándote\n[B7]costumbres ar[C]genti[D]nas de decir [Em]no\n\nY des[C]pués ha[D]cer el a[G]mor\n[B7]Y des[C]pués ha[D]cer el a[Em]mor\n[B7]Y des[C]pués ha[D]cer el a[Em]mor"
  },
  {
    "title": "Desconfío",
    "artist": "Pappo",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[G] [C] [D7] (x2)\n\n[G]No sé por qué ima[C]gino\n[G]que la gente me mira [C]mal\n[G]será porque me [C]siento un poco [D7]viejo\n[G]o será por descon[C]fianza de tu a[D7]mor\n\n[G]No sé por qué, [C]no sé por qué [D7]\n[G]desconfío de tu a[C]mor [D7]\n[G]no sé por qué, [C]no sé por qué [D7]\n[G]desconfío de tu a[C]mor [D7]\n\n[G]No sé por qué ima[C]gino\n[G]que la gente me mira [C]mal\n[G]será porque me [C]siento un poco [D7]viejo\n[G]o será por descon[C]fianza de tu a[D7]mor\n\n[G]No sé por qué, [C]no sé por qué [D7]\n[G]desconfío de tu a[C]mor [D7]\n[G]no sé por qué, [C]no sé por qué [D7]\n[G]desconfío de tu a[C]mor [D7]"
  },
  {
    "title": "Luna de miel en las manos",
    "artist": "Virus",
    "genre": "Pop",
    "lyrics": "Intro:\n[G] [B7] [Em] [C] (x2)\n\n[G]Tu cuerpo es un e[B7]fecto especial\n[Em]que me hace delirar [C]de placer\n[G]no puedo evitar que [B7]mi mano\n[Em]te busque una y [C]otra vez\n\n[G]Una luna de miel en la [B7]mano\n[Em]para gozar de tu a[C]mor\n[G]una luna de miel en la [B7]mano\n[Em]para gozar de tu a[C]mor\n\n[G]Tu cuerpo es un e[B7]fecto especial\n[Em]que me hace delirar [C]de placer\n[G]no puedo evitar que [B7]mi mano\n[Em]te busque una y [C]otra vez\n\n[G]Una luna de miel en la [B7]mano\n[Em]para gozar de tu a[C]mor\n[G]una luna de miel en la [B7]mano\n[Em]para gozar de tu a[C]mor"
  },
  {
    "title": "Mr. Jones",
    "artist": "Sui Generis",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[C] [G] [F] [G] (x2)\n\n[C]Mr. Jones era un [G]hombre bueno\n[F]tenía una esposa y un [G]granero\n[C]limpiaba su auto el [G]fin de semana\n[F]y cantaba en la [G]iglesia mañana\n\n[C]Mr. Jones, Mr. [G]Jones, [F]no te dejes ca[G]er\n[C]Mr. Jones, Mr. [G]Jones, [F]no te dejes ca[G]er\n\n[C]Mr. Jones era un [G]hombre bueno\n[F]tenía una esposa y un [G]granero\n[C]limpiaba su auto el [G]fin de semana\n[F]y cantaba en la [G]iglesia mañana\n\n[C]Mr. Jones, Mr. [G]Jones, [F]no te dejes ca[G]er\n[C]Mr. Jones, Mr. [G]Jones, [F]no te dejes ca[G]er"
  },
  {
    "title": "Cartas sin marcar",
    "artist": "Andrés Calamaro",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[G] [D] [C] [D] (x2)\n\n[G]Tengo cartas sin mar[D]car\n[C]para jugar en el [D]juego\n[G]tengo cartas sin mar[D]car\n[C]para jugar en el [D]juego\n\n[C]Y no sé qué pa[G]sará\n[D]cuando las ponga en la [Em]mesa\n[C]tengo cartas sin mar[D]car\n[G]para jugar en el juego\n\n[G]Tengo cartas sin mar[D]car\n[C]para jugar en el [D]juego\n[G]tengo cartas sin mar[D]car\n[C]para jugar en el [D]juego\n\n[C]Y no sé qué pa[G]sará\n[D]cuando las ponga en la [Em]mesa\n[C]tengo cartas sin mar[D]car\n[G]para jugar en el juego"
  },
  {
    "title": "Me siento mucho mejor",
    "artist": "Charly García",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[G] [D/F#] [Em] [C] [G] [D] [G] (x2)\n\n[G]Hace [D/F#]tiempo que es[Em]toy en un [C]lugar\n[G]en donde la [D]gente no re[G]spira\n[G]Y no [D/F#]puedo sa[Em]ber si es la ver[C]dad\n[G]o si es sola[D]mente otra [G]mentira\n\n[G]Pero a[D]hora, [C]me siento mucho me[G]jor [D] [C]\n[G]pero a[D]hora, [C]me siento mucho me[G]jor\n\n[G]No pre[D/F#]guntes por [Em]qué me lo con[C]tó\n[G]un pájaro [D]que volaba al [G]cielo\n[G]El sil[D/F#]encio del [Em]viento me di[C]jo\n[G]que no es sola[D]mente mi de[G]selo\n\n[G]Pero a[D]hora, [C]me siento mucho me[G]jor [D] [C]\n[G]pero a[D]hora, [C]me siento mucho me[G]jor\n\n[G] [D/F#] [Em] [C] [G] [D] [G] (x2)\n\n[G]Pero a[D]hora, [C]me siento mucho me[G]jor [D] [C]\n[G]pero a[D]hora, [C]me siento mucho me[G]jor"
  },
  {
    "title": "Buscando un símbolo de paz",
    "artist": "Charly García",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[C] [F] [G] [F] (x2)\n\n[C]Corriendo por las calles [F]de la gran ciudad\n[G]buscando un poco de tran[F]quilidad\n[C]pero no hay nada que me [F]pueda calmar\n[G]solo quiero un símbolo de [F]paz\n\n[C]Buscando un símbolo de [F]paz,\n[G]buscando un símbolo de [F]paz\n[C]en este mundo tan lo[F]co,\n[G]buscando un símbolo de [F]paz\n\n[C]Corriendo por las calles [F]de la gran ciudad\n[G]buscando un poco de tran[F]quilidad\n[C]pero no hay nada que me [F]pueda calmar\n[G]solo quiero un símbolo de [F]paz\n\n[C]Buscando un símbolo de [F]paz,\n[G]buscando un símbolo de [F]paz\n[C]en este mundo tan lo[F]co,\n[G]buscando un símbolo de [F]paz"
  },
  {
    "title": "Todavía una canción de amor",
    "artist": "Los Rodríguez",
    "genre": "Rock",
    "lyrics": "Intro:\n[C] [G] [Am] [F] (x2)\n\n[C]Tengo guardada en mi [G]mente\n[Am]tu risa y tu [F]mirar\n[C]y sé que de alguna [G]forma\n[Am]te volveré a encon[F]trar\n\n[C]Todavía una can[G]ción de amor\n[Am]suena en mi cora[F]zón\n[C]todavía una can[G]ción de amor\n[Am]suena en mi cora[F]zón\n\n[F]Y no puedo de[G]jar de pensar\n[C]en lo que pudo ha[Am]ber sido\n[F]todavía una can[G]ción de amor\n[C]suena en mi corazón"
  },
  {
    "title": "Raros peinados nuevos",
    "artist": "Charly García",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[C] [G] [Am] [F] (x2)\n\n[C]Y si vas a la de[G]recha\n[Am]y cambiás hacia la iz[F]quierda, adelante\n[C]es mejor que estarse [G]quieto,\n[Am]es mejor que ser un vi[F]gilante\n\n[C]Si me gustan las can[G]ciones de amor\n[Am]y me gustan esos [F]raros peinados nuevos\n[C]ya no quiero criti[G]car\n[Am]sólo quiero ser un en[F]fermero\n\n[C]Y si trabajás al [G]pedo\n[Am]y estás haciendo algo [F]nuevo, adelante\n[C]y si cantas a la [G]luna\n[Am]y perdés la vida [F]en un instante\n\n[C]Si luchaste por un [G]mundo mejor\n[Am]y te gustan esos [F]raros peinados nuevos\n[C]no quiero ver al doc[G]tor\n[Am]sólo quiero ver al en[F]fermero"
  },
  {
    "title": "No me dejan salir",
    "artist": "Charly García",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[G] [C] [D] [C] (x2)\n\n[G]Estoy gritando y no [C]puedo salir\n[D]estoy gritando y no [C]puedo salir\n[G]la gente me mira y se [C]empieza a reír\n[D]y no sé qué es lo que [C]quieren de mí\n\n[G]No me dejan sa[C]lir,\n[D]no me dejan sa[C]lir\n[G]no me dejan sa[C]lir,\n[D]no me dejan sa[C]lir\n\n[G]Estoy gritando y no [C]puedo salir\n[D]estoy gritando y no [C]puedo salir\n[G]la gente me mira y se [C]empieza a reír\n[D]y no sé qué es lo que [C]quieren de mí\n\n[G]No me dejan sa[C]lir,\n[D]no me dejan sa[C]lir\n[G]no me dejan sa[C]lir,\n[D]no me dejan sa[C]lir"
  },
  {
    "title": "Fanky",
    "artist": "Charly García",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[Dm7] [Dm] (x4)\n\n[Dm7]No voy a parar, [Dm]yo no tengo dudas\n[Dm7]no voy a bajar, [Dm]déjalo que suba\n[Dm7]no voy a parar, [Dm]yo no tengo dudas\n[Dm7]no voy a bajar, [Dm]déjalo que suba\n\nPor eso... [Dm]\n\n[Dm7]No quiero parar, [Dm]ya no tengo dudas\n[Dm7]no voy a bajar, [Dm]déjalo que suba\n\n[Gm7]Gozar es [C]tan parecido al a[Dm7]mor\n[Gm7]gozar es [C7]tan diferente al do[Dm7]lor\n\n[Dm7]Él cambió la dirección, otra oportunidad\n[Dm]merece alguna decisión\n[Dm7]¡Uh, uh-uh-uh, uuuh, uuuuh!\n[Dm]¡Basta! [A7]\n\n[Dm7]No voy a parar, [Dm]yo no tengo dudas\n[Dm7]no voy a bajar, [Dm]déjalo que suba\n\n[Gm7]Gozar es [C]tan parecido al a[Dm7]mor\n[Gm7]gozar es [C7]tan diferente a ma[Dm7]tar\n\n[Bb]Cuando [C]pienso en el fin\n[Dm7]cuando pienso en todo lo que vi\n[Bb]cuando [C]llegue el final\n[Dm7]cuando sé bien que todo va a cambiar\n\n[Gm7]Gozar es [C]tan necesario, mi a[Dm7]mor\n[Gm7]gozar es [C7]tan diferente al do[Dm7]lor"
  },
  {
    "title": "Rap de las hormigas",
    "artist": "Charly García",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[C] [G] [Am] [F] (x2)\n\n[C]Las hormigas corren [G]de acá para allá\n[Am]las hormigas corren [F]de acá para allá\n[C]y yo me pregunto qué [G]es lo que buscarán\n[Am]siempre apuradas [F]por trabajar\n\n[C]Rap de las hor[G]migas, [Am]rap de las hor[F]migas\n[C]rap de las hor[G]migas, [Am]rap de las hor[F]migas\n\n[C]Las hormigas corren [G]de acá para allá\n[Am]las hormigas corren [F]de acá para allá\n[C]y yo me pregunto qué [G]es lo que buscarán\n[Am]siempre apuradas [F]por trabajar\n\n[C]Rap de las hor[G]migas, [Am]rap de las hor[F]migas\n[C]rap de las hor[G]migas, [Am]rap de las hor[F]migas"
  },
  {
    "title": "Seminare",
    "artist": "Serú Girán",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[G] [C] [G] [C]\n\n[G]Quiero [D]ver, quiero en[Em]trar\n[B7]nena, nadie te va a ha[C]cer mal\n[D7]excepto amarte\n[G]Vas a[D]quí, vas a[Em]llá\n[Bm]pero nunca te encontra[C]rás\n[D7]al escaparte\n\n[Am]No hay fuer[G]za alre[C]dedor\n[D7]no hay pocio[Em]nes para el amor\n[Em7]¿Dónde es[Em6]tás? ¿dón[Cm]de voy?\n[G]Porque estamos [G7]en la calle\n[C]de la sen[B7]sa[Em]ción [A7]\n[D]muy le[D4]jos del [D]sol\n[G]que quema de amor\n\n[G] [C] [G] [C]\n\n[G]Te doy [D]pan, quie[Em]res sal\n[B7]nena, nunca te voy a [C]dar\n[D7]lo que me pides\n[G]Te doy [D]Dios, quie[Em]res más\n[B7]es que nunca compren[C]derás\n[D7]a un pobre pibe\n\n[Am]Esas mo[G]tos que [C]van a mil\n[D7]solo el vien[Em]to te harán sentir\n[Em7]Nada [A7]más, na[Cm]da más\n[G]si pudieras olvi[G7]dar tu mente\n[C]fren[B7]te a [Em]mí [A7]\n[D]sé que tu co[D4]ra[D]zón\n[G]diría que sí"
  },
  {
    "title": "Nos veremos otra vez",
    "artist": "Serú Girán",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[A] [B/A] [E] [E4] [E] (x2)\n\n[A]Aunque te [B/A]abraces a la [E]luna [E4] [E]\n[A]aunque te [B/A]acuestes con el [E]sol, [E4] [E]\n[A]no hay más es[B/A]trellas que las [G#m7]que dejes bri[B/C#]llar [C#m7]\n[A]tendrá el [B]cielo tu co[E]lor [E4] [E]\n\n[E/G#]No estés [A9]sola en esta [B]lluvia [B/A]\n[E/G#]no te en[A9]tregues por fa[B]vor [B/A]\n[E/G#]Si debes [A9]ser fuerte en estos tiempos\n[E/G#]para re[A9]sistir la decepción\n[E/G#]y quedar a[A9]bierta, mente y alma,\n[B]yo estoy con [E]vos [E4] [E]\n\n[A]Si te hace [B]falta quien te [G#m7]trate con a[B/C#]mor [C#m7]\n[A]si no te[B]nés a quien brin[G#m7]dar tu cora[B/C#]zón [C#m7]\n[A]si todo [B]vuelve cuando [G#m7]más lo preci[B/C#]sás [C#m7]\n[A]nos ve[B]remos otra [E]vez\n\n[E/G#]No estés [A9]sola en esta [B]lluvia [B/A]\n[E/G#]no te en[A9]tregues por fa[B]vor [B/A]\n[E/G#]Si debes [A9]ser fuerte en estos tiempos\n[E/G#]para re[A9]sistir la decepción\n[E/G#]y quedar a[A9]bierta, mente y alma,\n[B]yo estoy con [E]vos [E4] [E]\n\n[A]Si te hace [B]falta quien te [G#m7]trate con a[B/C#]mor [C#m7]\n[A]si no te[B]nés a quien brin[G#m7]dar tu cora[B/C#]zón [C#m7]\n[A]si todo [B]vuelve cuando [G#m7]más lo preci[B/C#]sás [C#m7]\n[A]nos ve[B]remos otra [E]vez"
  },
  {
    "title": "Nos siguen pegando abajo",
    "artist": "Charly García",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[G] [C] [D] [C] (x2)\n\n[G]Mírenlo, se está cayen[C]do en la calle\n[D]mírenlo, nadie lo [C]quiere ayudar\n[G]es un juego de locos [C]en el que nos tocó [D]estar\n[G]y nos siguen pegando a[C]bajo,\n[D]nos siguen pegando a[C]bajo\n\n[G]Y nos siguen pegando a[C]bajo,\n[D]nos siguen pegando a[C]bajo\n[G]y la gente corre y no [C]sabe qué hacer\n[D]solo quieren po[C]der correr\n\n[G]Mírenlo, se está cayen[C]do en la calle\n[D]mírenlo, nadie lo [C]quiere ayudar\n[G]es un juego de locos [C]en el que nos tocó [D]estar\n[G]y nos siguen pegando a[C]bajo,\n[D]nos siguen pegando a[C]bajo\n\n[G]Y nos siguen pegando a[C]bajo,\n[D]nos siguen pegando a[C]bajo\n[G]y la gente corre y no [C]sabe qué hacer\n[D]solo quieren po[C]der correr"
  },
  {
    "title": "Cerca de la revolución",
    "artist": "Charly García",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[E5] [A5] (x4)\n\n[E5]¿Por qué no vienes [A5]hasta mí?\n[E5]¿Por qué no [G]puedo [Am7]amarte?\n[C#7]¿Por qué no vienes [D7]hasta mí?\n[E5]¿Por qué no cambias [A5]como el sol?\n[E5]¿Por qué eres [G]tan dis[Am7]tante?\n[C#7]¿Por qué no cambias [D7]como el sol?\n\n[Gm]Me siento [F]solo y con[C]fundido a la [Dm7]vez\n[Gm]los ana[F]listas no po[C]drán enten[Dm7]der\n[Gm]ya no sé [F]bien qué decir,\n[C]ya no sé [Dm7]más qué hacer\n[Gm]todo el [F]mundo loco [C]y yo sin po[Dm7]derte ver\n\n[Am7]Pero si insisto,\n[Bb]yo sé muy [G5]bien que conse[C5]guiré\n[Am7]Pero si insisto,\n[Bb]yo sé muy [G5]bien que conse[C5]guiré\n\n[E5]Cerca de la re[A5]volución,\n[E5]el pueblo [G]pide [Am7]sangre\n[C#7]Cerca de la revolución,\n[D7]yo estoy cantando esta canción\n[E5]Que alguna [A5]vez fue hambre,\n[C#7]estoy cantando [D7]esta canción\n\n[Gm]Y si ma[F]ñana es como [C]ayer otra [Dm7]vez,\n[Gm]lo que fue her[F]moso será ho[C]rrible des[Dm7]pués\n[Gm]ya no sé [F]bien qué decir,\n[C]ya no sé [Dm7]más qué hacer\n[Gm]todo el [F]mundo loco [C]y yo sin po[Dm7]derte ver\n\n[Am7]Pero si insisto,\n[Bb]yo sé muy [G5]bien que conse[C5]guiré\n[Am7]Pero si insisto,\n[Bb]yo sé muy [G5]bien que conse[C5]guiré"
  },
  {
    "title": "Cucamonga Dance",
    "artist": "Charly García",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[C] [F] [G] [F] (x2)\n\n[C]Baila Cucamonga, [F]baila sin parar\n[G]baila Cucamonga, [F]baila sin parar\n[C]este ritmo loco [F]te va a atrapar\n[G]baila Cucamonga, [F]baila sin parar\n\n[C]Baila Cucamonga, [F]baila sin parar\n[G]baila Cucamonga, [F]baila sin parar\n[C]este ritmo loco [F]te va a atrapar\n[G]baila Cucamonga, [F]baila sin parar"
  },
  {
    "title": "Qué ves el cielo",
    "artist": "Invisible",
    "genre": "Rock Nacional",
    "lyrics": "[C]Hoy tu po[C7M]llera [C7]gira al [F]viento\n[Fm]quiero [G]verte bai[C]lar [G]\n[C]Entre la [C7M]gente, [C7]entre la [F]gente\n[Fm]quiero [G]verte bai[C]lar [G]\n\n[Am7]No importa tu [Em7]nombre\n[Am7]si me puedes contes[Em7]tar\n[F]son tantos tus [C]sueños\n[F]que ves el [C]cielo\n[F]mientras te [G]veo bai[C]lar\n\n[C]Hoy tu po[C7M]llera [C7]gira al [F]viento\n[Fm]quiero [G]verte bai[C]lar [G]\n[C]Entre la [C7M]gente, [C7]entre la [F]gente\n[Fm]quiero [G]verte bai[C]lar [G]\n\n[Am7]No importa tu [Em7]nombre\n[Am7]si me puedes contes[Em7]tar\n[F]son tantos tus [C]sueños\n[F]que ves el [C]cielo\n[F]mientras te [G]veo bai[C]lar"
  },
  {
    "title": "Muchacha (Ojos de papel)",
    "artist": "Almendra",
    "genre": "Rock Nacional",
    "lyrics": "[G]Muchacha [D/F#]ojos de pa[Em]pel,\n[Am7]¿adónde vas? Quédate [D]hasta el [D4]alba.\n[G]Muchacha pe[D/F#]queños [Em]pies,\n[Am7]no corras más, quédate [D]hasta el [D4]alba.\n\n[Em]Sueña un sueño [Em7M]despacito en[Em7]tre mis [Em6]manos,\n[C]hasta que por [G/B]la ventana [Am7]suba el [D]sol. [D4]\n[G]Muchacha [D/F#]piel de ra[Em]yón,\n[Am7]no corras más, tu tiempo es [G]hoy.\n\n[C]Y no hables [Em]más muchacha,\n[Bb]corazón de [G]tiza.\n[C]Cuando todos [C/B]duerman,\n[Am7]te robaré un co[G]lor.\n\n[G]Muchacha [D/F#]voz de go[Em]rrión,\n[Am7]¿adónde vas? Quédate [D]hasta el [D4]día.\n[G]Muchacha pe[D/F#]chos de [Em]miel,\n[Am7]no corras más, quédate [D]hasta el [D4]día.\n\n[Em]Duerme un poco [Em7M]y yo entre[Em7]tanto construi[Em6]ré\n[C]un castillo [G/B]con tu vientre [Am7]hasta que el [D]sol.\n[G]Muchacha [D/F#]te hagas re[Em]ír,\n[Am7]hasta llorar... [D]\nhasta llo[G]rar.\n\n[C]Y no hables [Em]más muchacha,\n[Bb]corazón de [G]tiza.\n[C]Cuando todos [C/B]duerman,\n[Am7]te robaré un co[G]lor.\n\n[C]Y no hables [Em]más muchacha,\n[Bb]corazón de [G]tiza.\n[C]Cuando todos [C/B]duerman,\n[Am7]te robaré un co[G]lor."
  },
  {
    "title": "Durazno sangrando",
    "artist": "Invisible",
    "genre": "Rock Nacional",
    "lyrics": "[Dm]Temprano el durazno del [C]árbol ca[G]yó\n[Bb]su piel era rosa do[Am]rada del [Dm]sol\n[Dm]Y al verse en la suerte de [C]todo fru[G]tal\n[Bb]a la orilla de un río su [Am]fe lo hizo lle[Dm]gar\n\n[Dm7]Dicen que en este [G/D]valle\n[C]los duraznos son de los [F]duendes\n[Dm]Pasó cierto tiempo en el [C]mismo lu[G]gar\n[Bb]hasta que un buen día se [Am]puso a escu[Dm]char\n\n[Dm]Una melodía muy [C]triste del [G]sur\n[Bb]que así le lloraba des[Am]de su inte[Dm]rior\n[Dm7]\"Quién canta es tu ca[G/D]rozo\n[C]pues tu cuerpo al fin tiene un [F]alma\n[Dm]Y si tu ser es[C]ta[G]lla\n[Bb]será tu corazón [Am]el que san[Dm]gre\"\n\n[Dm]La brisa de enero a la [C]orilla lle[G]gó\n[Bb]y al llegar el alba el ca[Am]rozo can[Dm]tó\n[Dm]Y al verse en la suerte de [C]todo fru[G]tal\n[Bb]se partió el durazno, san[Am]grando al [Dm]río"
  },
  {
    "title": "Rutas argentinas",
    "artist": "Almendra",
    "genre": "Rock Nacional",
    "lyrics": "[G]Rutas argen[C]tinas,\n[G]hasta el fin con [D]mi camión\n[G]rutas argen[C]tinas,\n[G]hasta el fin con [D]mi camión\n\n[G]Chicas de las [C]provincias\n[G]tienen el vientre de [D]sol\n[G]chicas de las [C]provincias\n[G]tienen el vientre de [D]sol\n\n[C]Las rutas argen[G]tinas\n[C]tienen algo de a[G]mor\n[C]las rutas argen[G]tinas\n[C]tienen algo de a[G]mor"
  },
  {
    "title": "No te alejes tanto de mí",
    "artist": "Luis Alberto Spinetta",
    "genre": "Rock Nacional",
    "lyrics": "[G]No te a[Bm7]lejes tanto de [C]mí, [D]\n[G]no te a[Bm7]lejes tanto de [C]mí [D]\n\n[G]Sé que hay un ca[Bm7]mino que de[C]bemos se[D]guir\n[G]sé que hay un es[Bm7]pacio que de[C]bemos com[D]partir\n[G]El amor [Bm7]tiene que ser as[C]í, [D]\n[G]el amor [Bm7]tiene que ser as[C]í [D]\n\n[C]Porque el tiempo se [D]va,\n[Bm7]porque el tiempo se [Em]va\n[C]no te alejes [D]tanto de [G]mí\n\n[G]No te a[Bm7]lejes tanto de [C]mí, [D]\n[G]no te a[Bm7]lejes tanto de [C]mí [D]"
  },
  {
    "title": "Cheques",
    "artist": "Luis Alberto Spinetta",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[E7] [A7] [E7] [B7] [A7] [E7]\n\n[E7]Ella tiene un look, ella tiene un look\n[A7]y tiene cheques [E7]también\n[B7]ella tiene un look, [A7]tiene un look\n[E7]y tiene cheques también\n\n[E7]No le importa el mañana, no le importa el ayer\n[A7]solo quiere gas[E7]tar\n[B7]ella tiene un look, [A7]tiene un look\n[E7]y tiene cheques también\n\n[E7]Ella tiene un look, ella tiene un look\n[A7]y tiene cheques [E7]también\n[B7]ella tiene un look, [A7]tiene un look\n[E7]y tiene cheques también"
  },
  {
    "title": "11 y 6",
    "artist": "Fito Páez",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[G] [F#m7] [B7] [Em7] [D4]\n[C#m7] [Cm] [G] [Am7] [D4]\n\n[G]En un café se [F#m7]vieron por ca[B7]sualidad,\n[Em7]cansados en el [D4]alma de tan[C#m7]to andar,\n[Cm]ella tenía un [G]clavel [Am7]en la [D]mano\n[G]Él se acercó y le [F#m7]preguntó si [B7]andaba bien,\n[Em7]llegaba a la ven[D4]tana en pun[C#m7]tas de pie,\n[Am7]y la llevó a cami[D]nar por Corrientes\n\n[C]Miren [Bm7]todos, [Em7]ellos solos,\n[C]pueden [B7]más que el [Em7]amor, [A7]\n[Am7]y son más fuertes que el O[D]limpo\n[C]Se escon[Bm7]dieron [Em7]en el centro,\n[C]y en el [B7]baño de un [Em7]bar, [A7]\n[Am7]sellaron todo con un [D]be[G]so\n\n[G]Durante un mes ven[F#m7]dieron rosas [B7]en La Paz,\n[Em7]presiento que no [D4]importaba na[C#m7]da más,\n[Cm]y entre los [G]dos jun[Am7]taban [D]algo\n[G]No sé por qué pero ja[F#m7]más los vol[B7]ví a ver,\n[Em7]él carga con [D4]once y ella [C#m7]con seis,\n[Am7]y, si reía, él le [D]daba la luna\n\n[C]Miren [Bm7]todos, [Em7]ellos solos,\n[C]pueden [B7]más que el [Em7]amor, [A7]\n[Am7]y son más fuertes que el O[D]limpo\n[C]Se escon[Bm7]dieron [Em7]en el centro,\n[C]y en el [B7]baño de un [Em7]bar, [A7]\n[Am7]sellaron todo con un [D]be[G]so"
  },
  {
    "title": "Ciudad de pobres corazones",
    "artist": "Fito Páez",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[G] [Bb] [C] [Bb] [C] [Bb]\n[C] [Eb] [C]\n\n[Cm]En esta puta ciudad todo se incendia y se va,\n[Ab]matan a [Gm]pobres cora[F]zones\n[Fm]matan a pobres corazones\n\n[Cm]En esta sucia ciudad no hay que seguir ni parar,\n[Ab]ciudad de [Gm]locos cora[F]zones\n[Fm]ciudad de locos corazones\n\n[C5]No quiero [C5/D]salir a fu[C5/Eb]mar,\n[F#dim]no quiero salir a la [C/E]calle con vos\n[Ab]no quiero em[Bb]pezar a pen[G]sar quién puso\n[F]la yerba en el [Gm/Bb]viejo ca[G/D]jón [G]\n\n[C5]Buen día, [C5/D]lexota[C5/Eb]nil,\n[F#dim]buen día señora, buen [C5]día doctor\n[C5/Ab]maldito [C5/Bb]sea tu a[C5/G]mor\n[C5/F]tu inmenso [C5/Bb]reino y tu an[C5/A]siado do[C5/D]lor [C5/G]\n\n[Cm]¿Qué es lo que quieres de mí? ¿Qué es lo que quieres saber?\n[Ab]no me ve[Gm]rás arrodilla[F]do\n[Fm]no me verás arrodillado\n\n[Cm]Dicen que ya no soy yo, que estoy más loco que ayer,\n[Ab]y matan a [Gm]pobres cora[F]zones\n[Fm]matan a [Gm]pobres cora[Ab]zones...\n\n[C5]No quiero [C5/D]salir a fu[C5/Eb]mar,\n[F#dim]no quiero salir a la [C/E]calle con vos\n[Ab]no quiero em[Bb]pezar a pen[G]sar quién puso\n[F]la yerba en el [Gm/Bb]viejo ca[G/D]jón [G]\n\n[C5]Buen día, [C5/D]lexota[C5/Eb]nil,\n[F#dim]buen día señora, buen [C5]día doctor\n[C5/Ab]maldito [C5/Bb]sea tu a[C5/G]mor\n[C5/F]tu inmenso [C5/Bb]reino y tu an[C5/A]siado do[C5/D]lor [C5/G]"
  },
  {
    "title": "El chico de la tapa",
    "artist": "Fito Páez",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[C] [G] [Am] [F] (x2)\n\n[C]El chico de la [G]tapa salió en el [Am]diario hoy [F]\n[C]estaba en la es[G]quina con un [Am]arma en la [F]mano\n[C]no tenía des[G]tino, no tenía a [Am]dónde ir [F]\n[C]y la policía [G]lo fue a bus[Am]car de ver[F]dad\n\n[C]El chico de la [G]tapa [Am]salió en el dia[F]rio hoy\n[C]el chico de la [G]tapa [Am]salió en el dia[F]rio hoy\n[C]Y todos lo mi[G]raban [Am]como a una gran atrac[F]ción\n[C]el chico de la [G]tapa [Am]salió en el dia[F]rio hoy"
  },
  {
    "title": "Fue amor",
    "artist": "Fito Páez",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[G] [D] [Em] [C] (x2)\n\n[G]Yo podría ha[D]berlo hecho mejor\n[Em]Vos podrías a[C]cercarte a mí\n[G]Yo intuía [D]que esto, mi amor\n[Em]Se rompía, y [C]esto es siempre así\n[G]La verdad es [D]que todo fue\n[Em]Tan extraño, [C]tan extraño, al fin\n[G]Vos buscando el [D]polvo de Dios\n[Em]Yo bebía pa[C]ra irme de aquí\n\n[G]Cada vez que [D]pienso en vos\n[Em]Fue amor, [C]fue amor\n[G]Cada vez que [D]pienso en vos\n[Em]Fue amor, [C]fue amor\n\n[G]Todo el mundo me [D]habla de vos\n[Em]Y no puedo de[C]jar de reír\n[G]Lo que hacés y a[D]donde vas\n[Em]De tu depto siempre [C]a Prix D'ami\n[G]No está bien rom[D]per un corazón\n[Em]Déjà vu de lo [C]que va a venir\n[G]Vos querías [D]verme feliz\n[Em]Yo quería [C]verte revivir\n\n[G]Cada vez que [D]pienso en vos\n[Em]Fue amor, [C]fue amor\n[G]Cada vez que [D]pienso en vos\n[Em]Fue amor, [C]fue amor\n\n[G]Estos días que [D]corren, mi amor\n[Em]Es aquí que nos [C]tocó vivir\n[G]Enredados en los [D]cables de Entel\n[Em]De algún sueño, [C]vamos a salir\n[G]Como siempre, [D]vuelvo a ensayar\n[Em]Y los pibes [C]siempre están ahí\n[G]Hay un boomerang [D]en la city, mi amor\n[Em]Todo vuelve co[C]mo vos decís\n\n[G]Cada vez que [D]pienso en vos\n[Em]Fue amor, [C]fue amor\n[G]Cada vez que [D]pienso en vos\n[Em]Fue amor, [C]fue amor"
  },
  {
    "title": "El viejo",
    "artist": "Pappo's Blues",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[G] [C] [D7] (x4)\n\n[G]¿Qué nos ocurre después de tanto tiempo?\nReflexionamos al vernos al espejo\n[C]Qué es lo que pasa, me estoy viniendo viejo\n[G]No sé ya qué pensar, si ya no sé qué es lo que pienso\n\n[G]Yo soy un hombre bueno\n[D7]Lo que pasa es que me estoy viniendo viejo\n[C]Trataré de hacer las [Bm]cosas a su tiempo\n[G]O sino no le daré im[Bb]portancia al [D7]cuerpo, oh no\n\n[G]No puede ser que esto me preocupe\nSi estoy naciendo, qué bueno, qué bueno\n[C]Para qué tantos años de experiencia\n[D7]Si justo ahora me doy cuenta que no tengo\n\n[G]Yo soy un hombre bueno\n[D7]Lo que pasa es que me estoy viniendo viejo\n[C]Trataré de hacer las [Bm]cosas a su tiempo\n[G]O sino no le daré im[Bb]portancia al [D7]cuerpo, oh no"
  },
  {
    "title": "El tren de las 16",
    "artist": "Pappo's Blues",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[G] [C] [G] [D7] [C] [G] (x2)\n\n[G]Tomo el tren de las dieciséis\n[C]y me voy a ver a mi [G]amor\n[D7]ella me espera en la es[C]tación\n[G]con un beso y un vaso de ron\n\n[G]Tomo el tren de las dieciséis\n[C]y me voy a ver a mi [G]amor\n[D7]ella me espera en la es[C]tación\n[G]con un beso y un vaso de ron\n\n[G]El maquinista corre a mil\n[C]el fuego en su motor se a[G]viva\n[D7]tengo tantas ganas de lle[C]gar\n[G]y ver a mi chica linda\n\n[G]Tomo el tren de las dieciséis\n[C]y me voy a ver a mi [G]amor\n[D7]ella me espera en la es[C]tación\n[G]con un beso y un vaso de ron"
  },
  {
    "title": "Rock and Roll y fiebre",
    "artist": "Pappo",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[A] [D] [A] [E] [D] [A] (x2)\n\n[A]Nena, tengo rock and roll y fiebre\n[D]nena, tengo rock and roll y [A]fiebre\n[E]y mi termómetro [D]marca cuarenta y [A]dos\n\n[A]Nena, tengo rock and roll y fiebre\n[D]nena, tengo rock and roll y [A]fiebre\n[E]y mi termómetro [D]marca cuarenta y [A]dos\n\n[A]No puedo estar en la cama solo\n[D]no puedo estar en la cama [A]solo\n[E]necesito tu a[D]mor y tu ca[A]lor\n\n[A]Nena, tengo rock and roll y fiebre\n[D]nena, tengo rock and roll y [A]fiebre\n[E]y mi termómetro [D]marca cuarenta y [A]dos"
  },
  {
    "title": "Cowboy",
    "artist": "Ratones Paranoicos",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[A] [D] [E] [A] (x2)\n\n[A]Soy un cowboy de la [D]ciudad, voy pa[E]sando por la [A]calle\n[A]con mis botas de [D]cuero y mi som[E]brero bien [A]puesto\n[A]no me importa el des[D]tino, solo [E]quiero cami[A]nar\n[A]y buscar una [D]chica que me [E]quiera de ver[A]dad\n\n[A]Soy un cowboy de la [D]ciudad [E]y me gusta diver[A]tirme\n[A]soy un cowboy de la [D]ciudad [E]y me gusta diver[A]tirme\n[D]Tengo mis botas [E]listas [A]y mi sombrero [F#m]bien puesto\n[A]soy un cowboy de la [D]ciudad [E]y me gusta diver[A]tirme"
  },
  {
    "title": "Enlace",
    "artist": "Ratones Paranoicos",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[G] [C] [D] [C] (x2)\n\n[G]Buscando un en[C]lace en la oscuri[D]dad de la [C]noche\n[G]buscando un en[C]lace para po[D]der conec[C]tar\n[G]los cables se cru[C]zan, la luz se [D]empieza a a[C]pagar\n[G]pero sé que al fi[C]nal te voy a encon[D]trar [C]\n\n[G]Buscando un en[C]lace [D]en la oscuri[C]dad\n[G]buscando un en[C]lace [D]para conec[C]tar\n[G]Buscando un en[C]lace [D]en la oscuri[C]dad\n[G]buscando un en[C]lace [D]para conec[C]tar"
  },
  {
    "title": "Estrella",
    "artist": "Ratones Paranoicos",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[G] [D] [Em] [C] (x2)\n\n[G]Vos sos la es[D]trella que alumbra [Em]mi cami[C]no\n[G]en medio de la [D]noche me marcas [Em]el des[C]tino\n[G]no dejes de bri[D]llar, te lo pido [Em]de ver[C]dad\n[G]porque sin tu [D]luz no sé a [Em]dónde voy a [C]ir\n\n[G]Sos mi estrella de la [D]noche [Em]que alumbra mi ca[C]mino\n[G]sos mi estrella de la [D]noche [Em]que alumbra mi ca[C]mino\n[G]Sos mi estrella de la [D]noche [Em]que alumbra mi ca[C]mino\n[G]sos mi estrella de la [D]noche [Em]que alumbra mi ca[C]mino"
  },
  {
    "title": "Rock de la mujer perdida",
    "artist": "Los Gatos",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[A] [D] [E] [A] (x2)\n\n[A]El rock de la mujer per[D]dida suena en la [E]ciudad [A]\n[A]la vi pasar de [D]noche con su [E]paso apura[A]do\n[A]nadie sabe su [D]nombre, nadie sabe a [E]dónde va [A]\n[A]es la reina del [D]barrio de la oscuri[E]dad [A]\n\n[A]El rock de la mujer per[D]dida [E]suena en la ciu[A]dad\n[A]el rock de la mujer per[D]dida [E]suena en la ciu[A]dad\n[A]El rock de la mujer per[D]dida [E]suena en la ciu[A]dad\n[A]el rock de la mujer per[D]dida [E]suena en la ciu[A]dad"
  },
  {
    "title": "No pibe",
    "artist": "Manal",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[E] [A] [E] [B7] [A] [E]\n\n[E]No, pibe, no vayas a la ciudad\n[A]no, pibe, no vayas a la ciu[E]dad\n[B7]allá no hay nada [A]que te pueda ser[E]vir\n\n[E]La gente corre de acá para allá\n[A]la gente corre de acá para a[E]llá\n[B7]y nadie sabe a [A]dónde quiere ir [E]\n\n[E]No, pibe, no vayas a la ciudad\n[A]no, pibe, no vayas a la ciu[E]dad\n[B7]allá no hay nada [A]que te pueda ser[E]vir"
  },
  {
    "title": "Jugo de tomate frío",
    "artist": "Manal",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[A] [D] [E] [A] (x2)\n\n[A]Jugo de tomate [D]frío para cal[E]mar la se[A]d\n[A]en esta tarde de [D]verano que me [E]hace enloque[A]cer\n[A]no hay nada en el [D]mundo que me [E]guste [A]más\n[A]que tomar mi [D]jugo en la tran[E]quilidad [A]\n\n[A]Jugo de tomate [D]frío [E]para calmar la se[A]d\n[A]jugo de tomate [D]frío [E]para calmar la se[A]d\n[A]Jugo de tomate [D]frío [E]para calmar la se[A]d\n[A]jugo de tomate [D]frío [E]para calmar la se[A]d"
  },
  {
    "title": "Maldición, va a ser un día hermoso",
    "artist": "Patricio Rey y sus Redonditos de Ricota",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[Bm] [G] [D] [A] (x2)\n\n[Bm]Me desperté tem[G]prano y el sol es[D]taba bri[A]llando\n[Bm]las nubes se fue[G]ron y el cielo es[D]tá a[A]zul\n[Bm]maldición, va a [G]ser un día her[D]moso [A]\n[Bm]y nada lo po[G]drá evi[D]tar [A]\n\n[Bm]Maldición, va a ser un día her[G]moso [D]y nada lo podrá e[A]vitar\n[Bm]maldición, va a ser un día her[G]moso [D]y nada lo podrá e[A]vitar\n[Bm]Maldición, va a ser un día her[G]moso [D]y nada lo podrá e[A]vitar\n[Bm]maldición, va a ser un día her[G]moso [D]y nada lo podrá e[A]vitar"
  },
  {
    "title": "La vaca cubana",
    "artist": "Patricio Rey y sus Redonditos de Ricota",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[C] [F] [G] [F] (x2)\n\n[C]La vaca cubana [F]mueve la cola [G]al compás del [F]son\n[C]la gente se a[F]cerca a verla [G]bailar con pa[F]sión\n[C]no hay otra en el [F]campo que tenga [G]tanto sa[F]bor\n[C]la vaca cu[F]bana es la [G]reina del [F]show\n\n[C]La vaca cubana [F]baila [G]al ritmo del tam[F]bor\n[C]la vaca cubana [F]baila [G]al ritmo del tam[F]bor\n[C]La vaca cubana [F]baila [G]al ritmo del tam[F]bor\n[C]la vaca cubana [F]baila [G]al ritmo del tam[F]bor"
  },
  {
    "title": "En la ciudad de la furia",
    "artist": "Soda Stereo",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[Em] [G] [A] (x4)\n\n[Em]Me verás vo[G]lar\n[A]por la ciudad de la [Em]furia\n[G]donde nadie sabe de [A]mí\ny yo soy parte de todos\n\n[Em]Nada cambia[G]rá\n[A]con un aviso de [Em]curvas\n[G]en sus caras veo el te[A]mor\nya no hay fábulas\nen la ciudad de la furia\n\n[Em]Me verás ca[G]er\n[A]como un ave de [Em]presa\n[G]me verás caer\n[A]sobre terrazas de[G]siertas [A]\n[Em]Te desnuda[G]ré\n[A]por las calles a[Em]zules\n[G]me refugiaré\n[A]antes que todos des[G]pierten [A]\n\n[Bm]Me dejarás dor[D]mir al amane[G]cer\n[Bm]entre tus [D]piernas, [G]entre tus piernas\n[A]Sabrás ocul[F#m]tarme bien y de[Bm]sapare[D]cer\nentre la [G]niebla, [Bm]entre la [D]niebla [G]\n[A]Un hombre a[G]lado extra[D]ña la [A]tierra [C] [G] [A]\n\n[Em]Me verás vo[G]lar\n[A]por la ciudad de la [Em]furia\n[G]donde nadie sabe de [A]mí\ny yo soy parte de todos\n\n[Em]Con la luz del [G]sol\n[A]se derriten mis [Em]alas\n[G]solo encuentro en la oscuri[A]dad\nlo que me une con la ciudad de la furia\n\n[Em]Me verás ca[G]er\n[A]como una flecha sal[Em]vaje\n[G]me verás caer\n[A]entre vuelos fu[G]gaces [A]\n[Em]Buenos Aires se [G]ve\n[A]tan suscepti[Em]ble\n[G]ese destino de furia [A]es\nlo que en sus caras persiste\n\n[Bm]Me dejarás dor[D]mir al amane[G]cer\n[Bm]entre tus [D]piernas, [G]entre tus piernas\n[A]Sabrás ocul[F#m]tarme bien y de[Bm]sapare[D]cer\nentre la [G]niebla, [Bm]entre la [D]niebla [G]\n[A]Un hombre a[G]lado pre[D]fiere la [A]noche [C] [G] [A]\n\n[Em]Me verás vol[G]ver, [A]me verás vol[Em]ver\n[G]A la ciudad de la [A]furia"
  },
  {
    "title": "Sobredosis de TV",
    "artist": "Soda Stereo",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[Am] [F] [G] [Am] (x2)\n\n[Am]Estoy echado [F]en el sillón\n[G]mirando la te[Am]levisión\n[Am]y tengo una [F]gran dosis de\n[G]sobredosis de te[Am]levisión\n\n[F]Sobredosis de [G]TV,\n[Am]sobredosis de TV\n[F]sobredosis de [G]TV,\n[Am]sobredosis de TV\n\n[Am]Mi cabeza [F]va a estallar\n[G]de tanta infor[Am]mación\n[Am]ya no puedo [F]pensar más\n[G]tengo sobredosis de te[Am]levisión\n\n[F]Sobredosis de [G]TV,\n[Am]sobredosis de TV\n[F]sobredosis de [G]TV,\n[Am]sobredosis de TV"
  },
  {
    "title": "Crimen",
    "artist": "Gustavo Cerati",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[E]\n\n[E]La espera me ago[C]tó, no sé [D]nada de vos\n[G#m]dejaste tanto [A]en mí\n[F#m]En llamas me acos[B]té, en un len[E]to degradé\n[C]supe que [D]te per[F#m]dí [B]\n\n[F#m]¿Qué otra co[B]sa puedo hacer?\n[C#m]si no olvi[Am]do moriré\n[F#m]y otro cri[G#m]men quedará\n[F#m]otro crimen quedará\n[E]sin resolver\n\n[E]Acecha desde [C]allí, la memo[D]ria es cruel\n[G#m]dice: ven a [A]mí\n[F#m]Todo lo que fue[B], se agigan[E]ta después\n[C]no voy a [D]lamen[F#m]tar [B]\n\n[F#m]¿Qué otra co[B]sa puedo hacer?\n[C#m]si no olvi[Am]do moriré\n[F#m]y otro cri[G#m]men quedará\n[F#m]otro crimen quedará\n[E]sin resolver\n\n[F#m]La espera [B]me agotó\n[C#m]no me [Am]queda corazón\n[F#m]y otro cri[G#m]men quedará\n[F#m]otro crimen quedará\n[E]sin resolver"
  },
  {
    "title": "Adiós",
    "artist": "Gustavo Cerati",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[C] [G] [D] [Em] (x2)\n\n[C]Suspiraban lo [G]mismo los [D]dos\ny hoy son [Em]parte de una lluvia [C]lejos\nNo te con[G]fundas, no sirve el [D]rencor\nson es[Em]pasmos después del a[C]díos\n\n[C]Pones can[G]ciones [D]tristes\npara sen[Em]tirte me[C]jor\nTu es[G]encia es más vi[D]sible\nDel mismo do[Em]lor\nvendrá un nuevo ama[C]necer\nUh-uh-uh-uh-[G]uh [D] [Em]\n\n[C]Tal vez col[G]maban la [D]necesidad\npero hay va[Em]cíos que no pueden lle[C]nar\nNo cono[G]cían la profundi[D]dad\nhasta que un [Em]día no dio para [C]más\n\n[C]Quedabas espe[G]rando\n[D]ecos que no [Em]volverán\n[C]Flotando en[G]tre re[D]chazos\nDel mismo do[Em]lor\nvendrá un nuevo ama[C]necer\nUh-uh-uh-uh-[G]uh [D] [Em]\n\n[C]Separarse de la [G]especie por algo supe[D]rior\nno es so[Em]berbia, es a[C]mor\nno es so[G]berbia, es a[D]mor [Em]\n[C]Poder decir a[G]diós, es cre[D]cer [Em]\n[C]Poder decir a[G]diós, es cre[D]cer [Em] [C] [G] [D] [Em]"
  },
  {
    "title": "Ella usó mi cabeza como un revólver",
    "artist": "Soda Stereo",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[Bm] [A] [G] [F#] (x2)\n\n[Bm]Ella usó mi ca[D]beza como un re[F#m]vólver [A]\n[Bm]E incendió mi con[D]ciencia con sus de[F#m]monios [A]\n[Bm]Me vi llegando [D]tarde, tarde a [F#m]todo [A]\n[G]Después de un baño cere[Em]bral\nestaba [F#]listo para ser a[Bm]mado\n\n[G]Pasa el tiempo [Em]y ahora creo que\n[F#]el vacío es un lugar nor[Bm]mal\n\n[Bm]Ella usó mi ca[D]beza como un re[F#m]vólver [A]\n[Bm]No creerías las [D]cosas que he hecho por [F#m]ella [A]\n[G]Cobardemente, sí, [Em]pero sin ver[F#]güenza [Bm]\n\n[G]Era una piedra en el [Em]agua, seca por dentro\n[F#]así se siente cuando la ver[Bm]dad\n[G]es la palabra so[Em]metida [F#] [Bm]\n\n[G]Fui tan dócil como un [Em]guante y\n[F#]tan sincero como [Bm]pude\n[Bm]Y ella usó mi ca[D]beza como un re[F#m]vólver [A]\n[Bm]No creerías las [D]cosas que he hecho por [F#m]ella [A]\n[G]Cobardemente, sí, [Em]pero sin ver[F#]güenza [Bm]\n\n[Bm]Ella, [D] [F#m] [A] ella..."
  },
  {
    "title": "Himno de mi corazón",
    "artist": "Los Abuelos de la Nada",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[G] [D] [Em] [C] (x2)\n\n[G]Sobre la palma de mi [D]lengua vive el [Em]himno de mi cora[C]zón\n[G]siento la alianza mas per[D]fecta que in[Em]justicia a media [C]voz\n[G]la vida es un libro [D]útil para a[Em]quel que puede compren[C]der\n[G]tengo confianza en la ba[D]lanza que in[Em]clina mi pare[C]cer\n\n[C]Nadie quiere dor[D]mirse aquí, [Bm7]algo puedo ha[Em]cer\n[C]tras haber cru[D]zado la mar, [Bm7]te seduci[Em]ré\n[C]por felici[D]dad yo can[G]to\n\n[G]Nada me abruma ni me im[D]pide en este [Em]día que te quiera a[C]mor\n[G]naturalmente mi pre[D]sente busca [Em]flores es de a [C]dos\n[G]nada hay que nada pro[D]hiban ya te [Em]veo andar en liber[C]tad\n[G]que no se rasgue como [D]seda el clima [Em]de tu cora[C]zón\n\n[C]Nadie quiere dor[D]mirse aquí, [Bm7]algo debo ha[Em]cer\n[C]tras haber cru[D]zado la mar, [Bm7]te seduci[Em]ré\n[C]solo por a[D]mor lo can[G]to"
  },
  {
    "title": "Lunes por la madrugada",
    "artist": "Los Abuelos de la Nada",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[Am] [G] [F] [Em] (x2)\n\n[Am]Lunes por la madru[G]gada yo cierro los [F]ojos y veo tu [Em]cara\nque son[Am]ríe cómplice de a[G]mor\n[Am]Días en la carre[G]tera yo siento aquí [F]dentro la emo[Em]ción\nde haber de[Am]jado lo me[G]jor\n\n[C]Yo no sé si es en [G]vano este amor, [F]aquí no hay luces de es[E]cena\n[C]y algo en mí [G]no se serena, [F]no [E]\n\n[Am]Yo ya no compren[G]do nada, tantas [F]caras dibu[Em]jadas\ncomo [Am]manchas en una pa[G]red\n[Am]Noches de melanco[G]lía pateando en una [F]ciudad va[Em]cía\nen mi oscuri[Am]dad te busco a [G]vos\n\n[C]Quizás hoy si te [G]pueda encontrar, [F]más allá de toda [E]pena\n[C]siento que la [G]vida es buena, [F]hoy [E]\n[C]Yo sé que no es en [G]vano este amor, [F]más allá de toda [E]pena\n[C]siento que la [G]vida es buena, [F]hoy [E] [Am]"
  },
  {
    "title": "Marinero Bengalí",
    "artist": "Los Abuelos de la Nada",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[G] [C] [D] [G] (x2)\n\n[G]Marinero ben[C]galí que via[D]jas por el [G]mar\n[G]buscando un des[C]tino en el [D]que descan[G]sar\n[G]tus ojos han [C]visto la tem[D]pestades pa[G]sar\n[G]pero sigues via[C]jando sin [D]mirar a[G]trás\n\n[G]Marinero Ben[C]galí, [D]adonde vas a [G]ir\n[G]marinero Ben[C]galí, [D]adonde vas a [G]ir\n[G]Marinero Ben[C]galí, [D]adonde vas a [G]ir\n[G]marinero Ben[C]galí, [D]adonde vas a [G]ir"
  },
  {
    "title": "Amor descartable",
    "artist": "Virus",
    "genre": "Pop",
    "lyrics": "Intro:\n[Dm] [Am] [C] (x4)\n\n[Dm]Encontrarte en al[Am]gún lu[C]gar\n[Dm]Aunque sea muy [Am]tar[C]de,\n[Dm]Tantos odios pa[Am]ra cu[C]rar,\n[Dm]Tanto amor des[Am]carta[C]ble.\n\n[Dm]Escucharte a mi [Am]lado ha[C]blar\n[Dm]Aunque estemos dis[Am]tan[C]tes,\n[Dm]Es el mundo tan [Am]poco sen[C]sual\n[Dm]Que no puedo a[Am]liviar[C]me.\n\n[Gm]Vos sos mi ob[Bb]sesión,\n[C]Quisiera a[Am]traparte.\n[Gm]Vos sos mi des[Bb]trucción,\n[C]No puedo de[Am]jar de pen[F]sar.\n\n[Bb]Tengo que or[F]denar\n[Bb]Esta confu[F]sión,\n[Bb]Quiero estar [F]libre\n[Bb]Para un nuevo [F]amor\n\n[Dm]Encontrarte en al[Am]gún lu[C]gar\n[Dm]Aunque sea muy [Am]tar[C]de,\n[Dm]Tantos odios pa[Am]ra cu[C]rar,\n[Dm]Tanto amor des[Am]carta[C]ble.\n\n[Dm]Escucharte a mi [Am]lado ha[C]blar\n[Dm]Aunque estemos dis[Am]tan[C]tes,\n[Dm]Es el mundo tan [Am]poco sen[C]sual\n[Dm]Que no puedo a[Am]liviar[C]me.\n\n[Gm]Vos sos mi ob[Bb]sesión,\n[C]Quisiera a[Am]traparte.\n[Gm]Vos sos mi des[Bb]trucción,\n[C]No puedo de[Am]jar de pen[F]sar.\n\n[Bb]Tengo que or[F]denar\n[Bb]Esta confu[F]sión,\n[Bb]Quiero estar [F]libre\n[Bb]Para un nuevo [F]amor"
  },
  {
    "title": "Heroína",
    "artist": "Sumo",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[Em] [Bm] [Am] [Em] (x2)\n\n[Em]Heroína de mi [Bm]vida, te bus[Am]co en la oscuri[Em]dad\n[Em]sin tu amor no [Bm]tengo fuerzas [Am]para conti[Em]nuar\n[Em]dame tu ve[Bm]neno, dame [Am]tu ca[Em]lor\n[Em]sos la única [Bm]cura para [Am]este do[Em]lor\n\n[Em]Heroína de mi [Bm]vida, [Am]no te vayas de mi [Em]lado\n[Em]heroína de mi [Bm]vida, [Am]no te vayas de mi [Em]lado\n[Em]Heroína de mi [Bm]vida, [Am]no te vayas de mi [Em]lado\n[Em]heroína de mi [Bm]vida, [Am]no te vayas de mi [Em]lado"
  },
  {
    "title": "No tan distintos",
    "artist": "Sumo",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[G] [A] [Bm] (x4)\n\n[Bm]Sé que estás [Em]conmigo y me [A]parece muy [Bm]bien\n[Bm]sé que tie[Em]nes frío, yo [A]lo tengo tam[Bm]bién\n[Bm]pero por de[Em]ntro no se [A]siente lo [Bm]mismo\n[Bm]y no pa[Em]rece haber nin[A]gún abis[Bm]mo\n\n[G]No tan dis[A]tintos, [Bm]no\n[G]No tan dis[A]tintos, [Bm]no\n[G]No tan dis[A]tintos, [Bm]no\n[G]No tan dis[A]tintos, [Bm]no\n\n[Bm]Sé que estás en [Em]busca de [A]tu propia ver[Bm]dad\n[Bm]y que has de[Em]jado atrás a [A]toda la ciu[Bm]din\n[Bm]pero no en[Em]cuentras nada [A]que te haga acos[Bm]tar\n[Bm]y no en[Em]cuentras na[A]da que te ha[Bm]ga pensar\n\n[G]No tan dis[A]tintos, [Bm]no\n[G]No tan dis[A]tintos, [Bm]no\n[G]No tan dis[A]tintos, [Bm]no\n[G]No tan dis[A]tintos, [Bm]no\n\nSolo de Saxo:\n[Bm] [Em] [A] [Bm] (x4)\n\n[G]No tan dis[A]tintos, [Bm]no\n[G]No tan dis[A]tintos, [Bm]no\n[G]No tan dis[A]tintos, [Bm]no\n[G]No tan dis[A]tintos, [Bm]no"
  },
  {
    "title": "La rubia tarada",
    "artist": "Sumo",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[Cm] [G#] (x4)\n\n[Cm]Ouh mama, papa y mama, [G#]papa oh papa y mama.\n[Cm]Ouh mama, papa y [G#]mama.\n[Cm]Caras conchetas, miradas [G#]berretas\n[Cm]y hombres encajados en Fio[G#]rucci.\n[Cm]Oigo \"dame\", \"quiero\" y [G#]\"no te metas\",\n[Cm]¿te gustó el último [G#]Bertolucci?\n\n[Cm]La rubia tarada, bron[G#]ceada, aburrida\n[Cm]me dice: \"¿Por qué te pe[G#]laste?\"\n[Cm]Y yo: \"Por el asco que me [G#]da tu sociedad,\n[Cm]por el pelo de hoy ¿cuánto gas[G#]taste?\"\n\n[Cm]Ouh mama, papa y [G#]mama...\n[Cm]Ouh mama, papa y [G#]mama...\n\n[Cm]Un seudo-punkito, con el a[G#]cento finito\nquiere hacerse el chico malo,\ntuerce la boca, se arregla el pelito,\ntoma un trago y vuelve a Belgrano.\n\n[Cm]¡Basta! Me voy rumbo a la [G#]puerta,\ny después a un boliche a la esquina\na tomar unas ginebras con [G#]gente despierta,\n[Cm]¡esto sí es Argen[G#]tina!\n\n[Cm]Ouh mama, papa y [G#]mama...\n[Cm]Ouh mama, papa y [G#]mama..."
  },
  {
    "title": "Mañana en el Abasto",
    "artist": "Sumo",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[Am] [Dm] [E] [Am] (x2)\n\n[Am]Mañana en el A[Dm]basto los ti[E]les se abri[Am]rán\n[Am]los carros con [Dm]frutas pronto [E]llegar[Am]án\n[Am]la gente del [Dm]barrio empeza[E]rá a cami[Am]nar\n[Am]bajo el cielo [Dm]gris que empieza [E]a acla[Am]rar\n\n[Am]Mañana en el A[Dm]basto, [E]la vida empe[Am]zará\n[Am]mañana en el A[Dm]basto, [E]la vida empe[Am]zará\n[Am]Mañana en el A[Dm]basto, [E]la vida empe[Am]zará\n[Am]mañana en el A[Dm]basto, [E]la vida empe[Am]zará"
  },
  {
    "title": "Acariciando lo áspero",
    "artist": "Divididos",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[E] [G] [A] (x2)\n\n[E]Acariciando lo [G]áspero en la [A]noche de la ciu[E]dad\n[E]donde el ruido no [G]deja es[A]cuchar la ver[E]dad\n[E]buscando una [G]mano para [A]poder to[E]car\n[E]acariciando lo [G]áspero de[A]jándose lle[E]var\n\n[E]Acariciando lo [G]áspero [A]en la noche de la ciu[E]dad\n[E]acariciando lo [G]áspero [A]en la noche de la ciu[E]dad\n[E]Acariciando lo [G]áspero [A]en la noche de la ciu[E]dad\n[E]acariciando lo [G]áspero [A]en la noche de la ciu[E]dad"
  },
  {
    "title": "Par mil",
    "artist": "Divididos",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[E] [A] [D] [A] (x2)\n\n[E]Qué hay de esa [A]imagen en mi [D]cielo [A]\n[E]no creo [A]ser tan impor[D]tante [A]\n[E]Camino mi [A]propia [D]luz [A]\n[E]y me [A]siento un [D]haz de [A]luz\n[E]claridad de [A]propio [D]ser [A]\n[C]Luz, luz, [D]luz del [E]alma\n[C]soy un [D]hombre que es[E]pera el alba\n\n[E]Qué hay de esa [A]imagen en mi in[D]fierno [A]\n[E]si ya fui [A]roto a tomar [D]aire [A]\n[E]Caminas[A]te por mi [D]brasas [A]\n[E]me so[A]ñé en la oscuri[D]dad [A]\n[E]me estre[A]llé contra [D]mí [A]\n[C]Luz, luz, [D]luz del [E]alma\n[C]soy un [D]hombre que es[E]pera el alba\n\n[E]No con[A]funda che pas[D]tor [A]\n[E]no me in[A]teresa tu [D]cielo [A]\n[E]toda el [A]agua va hacia el [D]mar [A]\n[C]Luz, luz, [D]luz del [E]alma\n[C]soy un [D]hombre que es[E]pera el [Am]alba\n[C]Luz, luz, [D]luz del [E]alma\n[C]soy un [D]hombre que es[E]pera el alba"
  },
  {
    "title": "Dos días en la vida",
    "artist": "Fabiana Cantilo",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[C] [G/B] [Am7] [G] (x2)\n\n[C]Honey, honey, honey, [Dsus4]babe y [D]ya dejemos de llo[G]rar,\n[C]te veo ahí en media hora, [Dsus4]no te [D]olvides, nos lar[G]gamos de aquí\n[C]Dos días en la [Dsus4]vida [D]nunca vienen [Em]nada mal\n[C]de alguna forma, de [Dsus4]eso se [D]trata vivir\n\n[C]Salieron en un [Dsus4]coche, [D]descansaron [G]en un bar,\n[C]con mejicanos, mar[Dsus4]garitas, [D]dos chicas: una [G]sabe mentir\n[C]Eligen una [Dsus4]mesa, [D]un par de tragos [Em]y a bailar,\n[C]Thelma y su cowboy que [Dsus4]ahora la [D]saca de allí\n\n[G]Presa [G/B]del [C]mal, quise esca[Dsus4]par, [D] [G]\n[C]el tipo trata de violarla, [D]cae Louise\n[G]que te [G/B]salgas de [C]ahí, vas a pe[B7]dir, vas a pe[Em]dir, [A7]\n[C]piedad o te [Dsus4]vuelo la ca[D]beza puercoes[C]pín [G/B] [Am7] [G]"
  },
  {
    "title": "Fue amor",
    "artist": "Fabiana Cantilo",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[G] [D] [Em] [C] (x2)\n\n[G]Yo podría ha[D]berlo hecho mejor\n[Em]Vos podrías a[C]cercarte a mí\n[G]Yo intuía [D]que esto, mi amor\n[Em]Se rompía, y [C]esto es siempre así\n[G]La verdad es [D]que todo fue\n[Em]Tan extraño, [C]tan extraño, al fin\n[G]Vos buscando el [D]polvo de Dios\n[Em]Yo bebía pa[C]ra irme de aquí\n\n[G]Cada vez que [D]pienso en vos\n[Em]Fue amor, [C]fue amor\n[G]Cada vez que [D]pienso en vos\n[Em]Fue amor, [C]fue amor\n\n[G]Todo el mundo me [D]habla de vos\n[Em]Y no puedo de[C]jar de reír\n[G]Lo que hacés y a[D]donde vas\n[Em]De tu depto siempre [C]a Prix D'ami\n[G]No está bien rom[D]per un corazón\n[Em]Déjà vu de lo [C]que va a venir\n[G]Vos querías [D]verme feliz\n[Em]Yo quería [C]verte revivir\n\n[G]Cada vez que [D]pienso en vos\n[Em]Fue amor, [C]fue amor\n[G]Cada vez que [D]pienso en vos\n[Em]Fue amor, [C]fue amor\n\n[G]Estos días que [D]corren, mi amor\n[Em]Es aquí que nos [C]tocó vivir\n[G]Enredados en los [D]cables de Entel\n[Em]De algún sueño, [C]vamos a salir\n[G]Como siempre, [D]vuelvo a ensayar\n[Em]Y los pibes [C]siempre están ahí\n[G]Hay un boomerang [D]en la city, mi amor\n[Em]Todo vuelve co[C]mo vos decís\n\n[G]Cada vez que [D]pienso en vos\n[Em]Fue amor, [C]fue amor\n[G]Cada vez que [D]pienso en vos\n[Em]Fue amor, [C]fue amor"
  },
  {
    "title": "Nada es para siempre",
    "artist": "Fabiana Cantilo",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[D] [A] [Bm] [G] (x2)\n\n[D]Sin querer te lasti[A]mé\n[Bm]sin querer te abando[G]né\n[D]solo sé que yo no [A]sé\n[Bm]cuidarte de mi a[G]mor\n[D]Necesito tu per[A]dón\n[Bm]necesito verte [G]hoy\n[D]solo sé que yo no [A]sé\n[Bm]cuidarte de mi [G]amor\n\nPorque [G]nada es [A]para [D]siempre [Bm]\nporque [G]nada es [A]para [D]siempre [Bm]\nsi tu [G]risa esca[A]pó\nporque [G]nada es [A]para [D]siempre [Bm]\nporque [G]nada es [A]para [D]siempre [Bm]\nsi tu [G]risa esca[A]pó\nsin mi[G]rar más a[A]llá [D]\n\n[D]Yo creo que al final nunca [A]sé dónde voy\n[Bm]pero sigo un ca[G]mino\n[D]Algo ocurrirá, tengo [A]la sensación\n[Bm]una carta marcada, un buen [G]signo del sol\n\nPorque [G]nada es [A]para [D]siempre [Bm]\nporque [G]nada es [A]para [D]siempre [Bm]\nsi tu [G]risa esca[A]pó\nporque [G]nada es [A]para [D]siempre [Bm]\nporque [G]nada es [A]para [D]siempre [Bm]\nsi tu [G]risa esca[A]pó\nsin mi[G]rar más a[A]llá [D]"
  },
  {
    "title": "Mi enfermedad",
    "artist": "Fabiana Cantilo",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[A] [D] [E] (x2)\n\n[A]Estoy venci[D]da porque el mundo me\n[E]hizo así,\n[F#m]no puedo cambiar\n[D]Soy el remedio sin re[E]ceta y tu\n[F#m]amor mi enfermedad\n[D]Estoy venci[E]da porque el cuerpo de\n[F#m]los dos es mi debilidad\n[D]esta vez el [E]dolor va a termi[A]nar\n\n[A]Gente que [D]va gente que viene por\n[E]la calle\n[F#m]perdida entre la gente\n[D]Gente que [E]mira y que no quiere\n[F#m]que la vean\n[D]esta vez el [E]dolor va a termi[A]nar\n\n[D]Parece que la [E]fiesta termi[A]nó,\n[D]perdidos en el [E]túnel del a[A]mor\n[D]Y dicen las [E]hojas del libro que\n[F#m]más leo yo,\n[D]esta vez el es[E]clavo se esca[A]pó"
  },
  {
    "title": "Una tregua",
    "artist": "Fabiana Cantilo",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[G] [D] [Em] [C] (x2)\n\n[G]Dame una tregua, mi [D]amor, no po[Em]demos se[C]guir así\n[G]las palabras nos [D]duelen, nos [Em]alejan de [C]aquí\n[G]dame una tregua, mi [D]amor, solo [Em]quiero un po[C]co de paz\n[G]para ver si es po[D]sible volver a [Em]empe[C]zar\n\n[G]Dame una tregua, mi [D]amor [Em]no quiero pelear [C]hoy\n[G]dame una tregua, mi [D]amor [Em]no quiero pelear [C]hoy\n[G]Dame una tregua, mi [D]amor [Em]no quiero pelear [C]hoy\n[G]dame una tregua, mi [D]amor [Em]no quiero pelear [C]hoy"
  },
  {
    "title": "Sola en los bares",
    "artist": "Hilda Lizarazu",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[E] [A] [B] [E] (x2)\n\n[E]Esta mare[A]ada\nsu cuerpo [B]quiere descan[E]sar\n[E]es madru[A]gada [B] [E]\n[E]Sola en las [A]calles\ncon su ve[B]stido azul fran[E]cés\n[E]no siente [A]nada [B] [E]\n\n[C#m]No, no puedo cre[A]er\nque estaba en [B]ese lu[E]gar\n[C#m]y que antes de a[A]yer\nfumando [B]la vi pa[E]sar\n\n[E]Duerme asus[A]tada\nhuele a per[B]fume de mu[E]jer\n[E]sobre la [A]cama [B] [E]\n[E]Sola en los [A]bares\nun viejo a[B]migo y un je[E]rez\n[E]a sus es[A]paldas [B] [E]\n\n[C#m]No, no puedo cre[A]er\nque vuelva al [B]mismo lu[E]gar\n[C#m]como si alguna [A]vez\nun prínci[B]pe la fuera a bus[E]car\n\n[E]Esta ma[A]ñana\nsu madre [B]la fue a desper[E]tar\n[E]no reaccio[A]naba [B] [E]\n[E]Sola en los [A]bares\nno era [B]hombre ni mu[E]jer\n[E]se transfor[A]maba [B] [E]\n\n[C#m]No, no puedo cre[A]er\nque estaba en [B]ese lu[E]gar\n[C#m]y que antes de a[A]yer\nfumando [B]la vi pa[E]sar"
  },
  {
    "title": "Flaca",
    "artist": "Andrés Calamaro",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[G] [B7] [Em] [C]\n[G] [D] [G] [D]\n\n[G]Flaca, no me [B7]claves\n[Em]tus puñales, [C]por la espalda\n[G]tan profundo, [D]no me duelen,\n[G]no me ha[D]cen mal\n\n[G]Lejos, en el [B7]centro\n[Em]de la tierra, [C]las raíces\n[G]del amor, don[D]de estaban\n[G]queda[D]rán\n\n[G]Entre no me olvides\n[B7]me dejé nuestros abriles\n[Em]olvidados,\n[C]en el fondo del placard,\n[G]del cuarto de invitados\n[D]Eran tiempos dorados\n[G]un pasa[D]do mejor\n\n[G]Aunque casi me equivoco\n[B7]y te digo poco a poco:\n[Em]\"no me mientas,\n[C]no me digas la verdad\"\n[G]No te quedes callada,\n[D]no levantes la voz,\n[G]ni me pi[D]das perdón\n\n[G]Aunque casi te confieso\n[B7]que también he sido un perro,\n[Em]compañero,\n[C]un perro ideal,\n[G]que aprendió a ladrar\n[D]y a volver al hogar\n[G]para po[D]der comer\n\n[G]Flaca, no me [B7]claves\n[Em]tus puñales, [C]por la espalda\n[G]tan profundo, [D]no me duelen,\n[G]no me ha[D]cen mal"
  },
  {
    "title": "Loco",
    "artist": "Andrés Calamaro",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[Am7] [Bm7] [Em7] (x2)\n\n[Am7]Voy a salir a caminar solito\n[Bm7]sentarme en un [Em7]parque a fumar un porrito\n[Am7]y mirar a las palomas comer\n[Bm7]el pan que la [Em7]gente les tira!\n\n[Am7]Y reprimir el [D]instinto asesino\n[Bm7]delante de un mimo o de un clown\n[Em7]Hoy estoy [Am7]down violento, down radikal\n[D]pero tengo a[Bm7]prendido el pa[Em7]pel principal\n\n[Am7]Yo soy un [Bm7]loco que se [Em7]dio cuenta que el tiempo es muy poco\n[Am7]Yo soy un [Bm7]loco que se [Em7]dio cuenta que el tiempo es muy poco\n\n[Am7] [Bm7] [Em7]\nNanananana... nananana... nananananana...\n[Am7] [Bm7] [Em7]\nNanananana... nananana... a lo mejor resulta mejor así\n\n[Am7]Yo soy un [Bm7]loco que se [Em7]dio cuenta que el tiempo es muy poco\n[Am7]Yo soy un [Bm7]loco que se [Em7]dio cuenta que el tiempo es muy poco\nA lo mejor resulta mejor así\n[Am7]que el [Bm7]tiempo es muy [Em7]poco"
  },
  {
    "title": "Exodus",
    "artist": "Bob Marley & The Wailers",
    "genre": "Reggae",
    "lyrics": "Intro:\n[Am] [Dm] [G] [Am] (x2)\n\n[Am]Exodus, movement of Jah [Dm]people\n[G]Exodus, movement of Jah [Am]people\n[Am]Exodus, movement of Jah [Dm]people\n[G]Exodus, movement of Jah [Am]people\n\n[Am]Exodus, movement of Jah [Dm]people\n[G]Exodus, movement of Jah [Am]people\n[Am]Exodus, movement of Jah [Dm]people\n[G]Exodus, movement of Jah [Am]people"
  },
  {
    "title": "Buffalo Soldier",
    "artist": "Bob Marley & The Wailers",
    "genre": "Reggae",
    "lyrics": "Intro:\n[A] [F#m] [D] [E] (x2)\n\n[A]Buffalo Soldier, [F#m]dreadlock Rasta\n[D]there was a Buffalo [E]Soldier in the [A]heart of A[F#m]merica,\n[D]stolen from A[E]frica, brought to A[A]merica,\n[F#m]fighting on ar[D]rival, fighting for sur[E]vival\n\n[A]Buffalo Soldier, [F#m]dreadlock Rasta\n[D]there was a Buffalo [E]Soldier\n[A]in the heart of A[F#m]merica, [D]stolen from A[E]frica\n[A]Buffalo Soldier, [F#m]dreadlock Rasta\n[D]there was a Buffalo [E]Soldier\n[A]in the heart of A[F#m]merica, [D]stolen from A[E]frica"
  },
  {
    "title": "Waiting in Vain",
    "artist": "Bob Marley & The Wailers",
    "genre": "Reggae",
    "lyrics": "Intro:\n[G] [C] [G] [C] (x2)\n\n[G]I don't wanna [C]wait in vain for [G]your love [C]\n[G]I don't wanna [C]wait in vain for [G]your love [C]\n\n[G]From the first time [C]I set my eyes on [G]you, girl [C]\n[G]my heart says [C]follow through [G] [C]\n[G]But I know now that [C]I'm way down on [G]your line [C]\n[G]but the waiting [C]feeling's fine [G] [C]\n\n[G]I don't wanna [C]wait in vain for [G]your love [C]\n[G]I don't wanna [C]wait in vain for [G]your love [C]\n\n[Am]It's been three years [D]since I'm knocking on [Am]your door [D]\n[Am]and I still can [D]knock some more [Am] [D]\n[Am]Ooh girl, ooh [D]girl, is it feasi[Am]ble? [D]\n[Am]I wanna know [D]if I'm to knock some [Am]more [D]\n\n[G]I don't wanna [C]wait in vain for [G]your love [C]\n[G]I don't wanna [C]wait in vain for [G]your love [C]"
  },
  {
    "title": "Iron Lion Zion",
    "artist": "Bob Marley & The Wailers",
    "genre": "Reggae",
    "lyrics": "Intro:\n[G] [C] [D] [G] (x2)\n\n[G]I'm gonna be [C]iron, like a [D]lion in [G]Zion\n[G]I'm gonna be [C]iron, like a [D]lion in [G]Zion\n[G]no runnin' [C]away, no [D]runnin' [G]away\n[G]I'm gonna be [C]iron, like a [D]lion in [G]Zion\n\n[G]Iron Lion [C]Zion, [D]Iron Lion [G]Zion\n[G]Iron Lion [C]Zion, [D]Iron Lion [G]Zion\n[G]Iron Lion [C]Zion, [D]Iron Lion [G]Zion\n[G]Iron Lion [C]Zion, [D]Iron Lion [G]Zion"
  },
  {
    "title": "Dos días en la vida",
    "artist": "Fito Paez",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[C] [G/B] [Am7] [G] (x2)\n\n[C]Honey, honey, honey, [Dsus4]babe y [D]ya dejemos de llo[G]rar,\n[C]te veo ahí en media hora, [Dsus4]no te [D]olvides, nos lar[G]gamos de aquí\n[C]Dos días en la [Dsus4]vida [D]nunca vienen [Em]nada mal\n[C]de alguna forma, de [Dsus4]eso se [D]trata vivir\n\n[C]Salieron en un [Dsus4]coche, [D]descansaron [G]en un bar,\n[C]con mejicanos, mar[Dsus4]garitas, [D]dos chicas: una [G]sabe mentir\n[C]Eligen una [Dsus4]mesa, [D]un par de tragos [Em]y a bailar,\n[C]Thelma y su cowboy que [Dsus4]ahora la [D]saca de allí\n\n[G]Presa [G/B]del [C]mal, quise esca[Dsus4]par, [D] [G]\n[C]el tipo trata de violarla, [D]cae Louise\n[G]que te [G/B]salgas de [C]ahí, vas a pe[B7]dir, vas a pe[Em]dir, [A7]\n[C]piedad o te [Dsus4]vuelo la ca[D]beza puercoes[C]pín [G/B] [Am7] [G]"
  },
  {
    "title": "ADIÓS",
    "artist": "GUSTAVO CERATTI",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[C] [G] [D] [Em] (x2)\n\n[C]Suspiraban lo [G]mismo los [D]dos\ny hoy son [Em]parte de una lluvia [C]lejos\nNo te con[G]fundas, no sirve el [D]rencor\nson es[Em]pasmos después del a[C]díos\n\n[C]Pones can[G]ciones [D]tristes\npara sen[Em]tirte me[C]jor\nTu es[G]encia es más vi[D]sible\nDel mismo do[Em]lor\nvendrá un nuevo ama[C]necer\nUh-uh-uh-uh-[G]uh [D] [Em]\n\n[C]Tal vez col[G]maban la [D]necesidad\npero hay va[Em]cíos que no pueden lle[C]nar\nNo cono[G]cían la profundi[D]dad\nhasta que un [Em]día no dio para [C]más\n\n[C]Quedabas espe[G]rando\n[D]ecos que no [Em]volverán\n[C]Flotando en[G]tre re[D]chazos\nDel mismo do[Em]lor\nvendrá un nuevo ama[C]necer\nUh-uh-uh-uh-[G]uh [D] [Em]\n\n[C]Separarse de la [G]especie por algo supe[D]rior\nno es so[Em]berbia, es a[C]mor\nno es so[G]berbia, es a[D]mor [Em]\n[C]Poder decir a[G]diós, es cre[D]cer [Em]\n[C]Poder decir a[G]diós, es cre[D]cer [Em] [C] [G] [D] [Em]"
  },
  {
    "title": "Carnaval de Brasil",
    "artist": "Andrés Calamaro",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[C] [C/E] [F] [G/B] (x2)\n[C] [C/E] [F] [G#dim] [Bdim]\n\n[C]La musa es una [C/E]sola musa o [F]es una serpiente de [G#dim]muchas ca[Bdim]bezas,\n[Am]los busca[G]dores de pro[F]mesas la tientan con cerveza\n[C]Si se va puede [C/E]volver, el [F]día menos pen[G#dim]sa[Bdim]do,\n[Am]para darle su con[G]suelo al [F]poeta mal ha[F/G]blado\n\n[C]No son mu[Gsus]jeres au[Am]sentes, no son cu[F]chillos en los dientes,\n[C]no son [Gsus]martes de carna[Am]val de Bra[F]sil\n[C]no son can[Gsus]ciones ur[Am]gentes, no son a[F]suntos pendientes,\n[C]no son [Gsus]martes de carna[Am]val de Bra[F]sil\n\n[C]Habrá que desenvai[C/E]nar las [F]espadas del [G#dim]texto\n[Am]y escribir una can[G]ción aunque [F]no haya algún pretexto\n[G]Y dedicár[C]sela al [C/E]primero que [F]pase cami[G#dim]nando,\n[Am]al que se que[G]dó pensando, al [F]que no quiere pen[F/G]sar\n\n[C]Al olvido selec[C/E]tivo, a la [F]memoria per[G#dim]di[Bdim]da,\n[Am]a los pe[Em/G]dazos de [F]vida que no [G]vamos a perder jamás\n\n[C]No son mu[Gsus]jeres au[Am]sentes, no son cu[F]chillos en los dientes,\n[C]no son [Gsus]martes de carna[Am]val de Bra[F]sil\n[C]no son can[Gsus]ciones ur[Am]gentes, no son a[F]suntos pendientes,\n[C]no son [Gsus]martes de carna[Am]val de Bra[F]sil"
  },
  {
    "title": "Me haces bien",
    "artist": "Jorge Drexler",
    "genre": "Pop",
    "lyrics": "Intro:\n[A] [A11] [A] [Amaj7] [A7] [D9/F#] [E7] (x2)\n\n[A]Para con[A11]tarte, [A]canto\n[Amaj7]quiero que [Amaj7/11]sepas [A7]cuánto\n[D9/F#]me haces bien, [E7]me haces bien\n[A]me haces [A11]bien [A]\n\n[A]Te quiero [A11]de mil [A]modos\n[Amaj7]te quiero [Amaj7/11]y sobre [A7]todo\n[D9/F#]me haces bien, [E7]me haces bien\n[A]me haces bien\n\n[Bm7]Basta ver el re[E7]flejo de tus [Amaj7]ojos en los [F#7]míos\n[Bm7]como se lleva el [E7]frío [Amaj7]para enten[A7]der\n[D]que el corazón no [Dm]miente, [C#m7]que afortunada[F#7]mente\n[Bm7]me haces bien, [E7]me haces bien\n\n[A]Para con[A11]tarte, [A]canto\n[Amaj7]quiero que [Amaj7/11]sepas [A7]cuánto\n[D9/F#]me haces bien, [E7]me haces bien\n[A]me haces [A11]bien [A]"
  },
  {
    "title": "Pensé que se trataba de cieguitos",
    "artist": "Los Twist",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[A] (x4)\n\n[A]Era un sábado a la noche, tenía plata y hacía calor\n[D]me dije, viejo, aprovechá, sos joven\n[A]y me fui al cine a ver una de terror\n[E]salí a la calle, paré un [D]taxi, y me fui, [A]por ahí... [E]\n\n[A]Bajé en Sarmiento y Esmeralda\ncompré un paquete de pastillas Renomé\nen eso siento que un señor me llama\nal darme vuelta me di cuenta que eran tres\n[D]muy bien peinados, muy bien vestidos\n[A]y con un Ford verde.\n[E]Pensé que se trataba de [D]cieguitos,\n[A]anteojos negros usaban los [E]tres.\n\n[A]Me preguntaron la hora y al instante me subieron\nme preguntaron por gente que no vi jamás\nme preguntaron qué hacía yo en la calle\ny por el nombre de mi tío carnal\n[D]muy bien peinados, muy bien vestidos\n[A]y con un Ford verde.\n[E]Pensé que se trataba de [D]cieguitos,\n[A]anteojos negros usaban los [E]tres."
  },
  {
    "title": "Promesas sobre el bidet",
    "artist": "Charly García",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[Dm7] [Gm7] [Am7] (x2)\n\n[Gm7]Por favor, [Am7]no hagas pro[Dm7]mesas sobre el bidet.\n[Gm7]Por favor, [Am7]no me abras [Dm7]más los sobres.\n[Gm7]Por favor, [Am7]yo te pro[Dm7]meto, te esperaré,\n[Bbmaj7]si es que paro [Csus4]de correr.\n\n[Gm7]Por favor, [Am7]sigue la [Dm7]sombra de mi bebé.\n[Gm7]Por favor, [Am7]no bebas [Dm7]más, no llores.\n[Gm7]Por favor, [Am7]yo te pro[Dm7]meto, te escribiré,\n[Bbmaj7]si es que para [Csus4]de llover.\n\n[F]Porque me [Fm]tratas tan [Dm7]bien, me tratas tan mal.\n[Bbmaj7]¿Sabés que no aprendí a vivir?\n[F]A veces es[Fm]toy tan bien, es[Dm7]toy tan down,\n[Ebmaj7]calambres en el alma.\n[Dm7]Cada cual [A/C#]tiene un [Am/C]trip en el [Bø]bocho,\n[Bbmaj7]difícil que lle[Am7]guemos a po[Csus4]nernos de a[Dm7]cuerdo."
  },
  {
    "title": "Qué Ves",
    "artist": "Divididos",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[Am] [G] [D/F#] [F] (x4)\n\n[Am]El wawa de [G]Troilo no [D/F#]quiere arran[F]car\n[Am]falta en[G]vido y truco, [D/F#]chiste nacio[F]nal\n[Am]\"Estamos en [G]vena\" grita el [D/F#]mayo[F]ral\n[Am]y pagás el [G]vale un [D/F#]día des[F]pués\n\n[Am]¿Qué [G]ves?\n[Am]¿Qué ves [G]cuando me ves?\n[Am]Cuando la [G]mentira es la [D/F#]ver[F]dad\n\n[Am]La prensa de [G]dios lleva [D/F#]póster cen[F]tral\n[Am]el bien y el [G]mal de[D/F#]finen por pe[F]nal\n[Am]fía la cha[G]pita, porrón [D/F#]en Palo[F]mar\n[Am]cruzando la [G]vía pa' [D/F#]poderla pa[F]sar\n\n[Am]¿Qué [G]ves?\n[Am]¿Qué ves [G]cuando me ves?\n[Am]Cuando la [G]mentira es la [D/F#]ver[F]dad\n\n[Am]Mentira [G]es la [Am]últi[G]ma ver[Am]dad"
  }
];

async function main() {
  console.log(`🌱 Seeding ${songs.length} songs...`)

  let updatedCount = 0
  let createdCount = 0

  for (const song of songs) {
    const existing = await prisma.song.findFirst({
      where: {
        title: song.title,
        artist: song.artist,
      },
    })

    if (existing) {
      await prisma.song.update({
        where: { id: existing.id },
        data: {
          genre: song.genre,
          lyrics: song.lyrics || existing.lyrics,
        },
      })
      updatedCount++
    } else {
      await prisma.song.create({
        data: song,
      })
      createdCount++
    }
  }

  const count = await prisma.song.count()
  console.log(`✅ Done! Created: ${createdCount}, Updated: ${updatedCount}. Total in database: ${count}`)

  try {
    const seedKeys = new Set(songs.map(s => `${s.title.toLowerCase().trim()}::${s.artist.toLowerCase().trim()}`));
    const dbSongs = await prisma.song.findMany({ select: { title: true, artist: true } });
    const extraSongs = dbSongs.filter(s => !seedKeys.has(`${s.title.toLowerCase().trim()}::${s.artist.toLowerCase().trim()}`));

    if (extraSongs.length > 0) {
      console.log(`\n⚠️ Se encontraron ${extraSongs.length} canciones en la base de datos que NO están en seed.ts:`);
      extraSongs.forEach((s, idx) => {
        console.log(`   ${idx + 1}. "${s.title}" - ${s.artist}`);
      });
      console.log(`\nCopiá esta lista de la consola de Render y pegámela en el chat, así les busco los acordes!\n`);
    }
  } catch (err) {
    console.error("Error al buscar canciones extra:", err);
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
