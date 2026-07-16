import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const songs: any[] = [
  {
    "title": "Hacelo por mí",
    "artist": "Attaque 77",
    "genre": "Rock Nacional"
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
    "lyrics": "No voy en tren, voy en avión\nno necesito a nadie, a nadie alrededor.\nporque no hay nadie que mi piel resista,\nporque no hay nadie que yo quiera ver,\nno veo televisión ni las revistas,\nno veo ya nada que no pueda hacer.\npor eso yo no voy en tren...\ncuando era niño nunca fui muy listo\ntocaba el piano como un animal\nyo se, que algunos piensan que soy mixto\npero yo tengo personalidad.\nyo soy de la cruz del sur\nsoy el que cierra y el que apaga la luz\nyo soy de la cruz del sur,\naquí! y en anywhere.\nno voy en tren..."
  },
  {
    "title": "Nada de esto fue un error",
    "artist": "Coti",
    "genre": "Pop",
    "lyrics": "Tengo una mala noticia\nNo fue de casualidad\nYo quería que nos pasara\nY tú, y tú lo dejaste pasar\n\nNo quiero que me perdones\nY no me pidas perdón\nNo me niegues que me buscaste\nNada, nada de esto\nNada de esto fue un error\nNada fue un error\nNada de esto fue un error\nNada fue un error\n\nLos errores nos eligen\nPara bien y o para mal\nYo fallé cuando viniste\nY tú, y tú no quisiste fallar\n\nAprendí la diferencia\nEntré el juego y el azar\nQuién te mira y quién se entrega\nNada, nada de esto\nNada de esto fue un error\nNada fue un error\nNada de esto fue un error\nNada fue un error\n\nY tengo una mala noticia\nNo fue de casualidad\nYo quería que nos pasará\nY tú, y tú lo dejaste pasar\n\nNo quiero que me perdones\nY no me pidas perdón\nNo me niegues que me buscaste\nNada, nada de esto\nNada de esto fue un error\nNada fue un error\nNada de esto fue un error\nNada fue un error\n\nLos errores nos eligen\nPara bien y o para mal\nNo fallé cuando viniste\nY tú, y tú no quisiste fallar\n\nAprendí la diferencia\nEntré el juego y el azar\nQuién te mira y quién se entrega\nNada, nada de esto\nNada de esto fue un error\nNada fue un error\nNada de esto fue un error\nNada fue un error\n\nNada de esto fue"
  },
  {
    "title": "No podrás",
    "artist": "Cristian Castro",
    "genre": "Balada",
    "lyrics": "Tal vez te olvides de mi\ntal vez me olvide de ti\npero esta vez aprendi\nque no se debe mentir\nno...\n\nDe una promesa vivi\nyo ya no puedo seguir\ncreyendo en ti...\n\nCada momento\nvoy tropesando el eslavon\nes que no queda nada entre tu y yo...\n\nSi estoy llorando\nno es que te extrañe el corazon\nes que a tu lado aprendi el dolor...\n\nNo podras olvidar\nque te ame como yo nunca imagine\nestare en tu piel\ncada momento en donde estes\nsiempre habra un lugar\nalgun recuerdo que sera\nun eterno suspirar..."
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
    "lyrics": "No se bien que dia es hoy\nsolo se que te vi salir\ny en cinco minutos perdí\nlas letras para hablarte a vos.\nYo se que no tengo palabras\ny nunca las voy a tener\npor eso aprovecho esta noche\nya vez estoy sola otra vez\nPor eso aprovecho esta noche\ntal vez lo puedas entender\nno me importa poner las letras\nsolo me importa mi mujer\nMañana cuando te levantes\ny pienses lo que dije ayer\nAy viejo! que en este juego\na mí siempre me toca perder\nSiempre\nSiempre habra vasos vacios\ncon agua de la ciudad\nla nuestra es agua de rió\nmezclada con mar\nLevanta los brazos mujer\ny ponte esta noche a bailar\nque la nuestra es agua de rió\nmezclada con mar\nA ti te quiero decir no te preocupes mi amor\nque yo te voy a entender que yo te voy a querer\nSiempre ..."
  },
  {
    "title": "Carnaval toda la vida",
    "artist": "Los Fabulosos Cadillacs",
    "genre": "Rock Nacional"
  },
  {
    "title": "La rueda mágica",
    "artist": "Fito Páez",
    "genre": "Rock Nacional",
    "lyrics": "Un recuerdo desde el áfrica...\nun sueño con el liverpool bar,\ny ella que siempre se va.\nuna foto de los rolling stones,\nmi vieja nunca los escuchó y no me puse a llorar.\nUh!!! los días en cualquier lugar,\nperdido en una inmensa ciudad,\nen una rueda mágica,\ny el, el ángel de la soledad,\nprotege, lava y cura este mal,\nél no me abandonará.\nNuestra vida es un lecho de cristal,\ny esta vida esta echa de cristal,\nnuestra vida es un lecho de cristal,\nun lecho de cristal para los dos.\nUh!!! qué extraña esa fascinación,\nun póster y una dicson lespur\nque nunca voy a olvidar noo!\nUh!!! recuerdo un día como hoy\nme fui de casa a tocar rock and roll\ny no volví nunca más.\nNuestra vida es un lecho de cristal,\ny esta vida esta echa de cristal,\nnuestra vida es un lecho de cristal,\nun lecho de cristal para los dos.\nPodrías verlo así,\nsólo si supieras que yo sin ti ya no podría mas vivir,\ntodos ya nos fuimos de aquí,\ntodos ya nos fuimos de casa,\npara tocar rock and roll!.\ntodo lo que pude sentir,\ntodo está sellado en mi alma!\npara tocar rock and roll... yeh!\nUn recuerdo desde el áfrica...\nun sueño con el liverpool bar.."
  },
  {
    "title": "A rodar mi vida",
    "artist": "Fito Páez",
    "genre": "Rock Nacional",
    "lyrics": "Se me hacía tarde, ya me iba\nsiempre se hace tarde en la ciudad\ncuando me di cuenta estaba vivo\nvivo para siempre de verdad.\nHoy compré revistas en palermo\nno pensaba en nada, nada más\ny caí que al fin esto en un juego\ntodo empieza siempre una vez más.\nY a rodar, y a rodar, y a rodar\ny a rodar mi vida\ny a rodar, y a rodar, y a rodar\ny a rodar mi amor.\nyo no sé dónde va,\nyo no sé dónde va mi vida\nyo no sé dónde va, pero tampoco creo que sepas vos.\nquiero salir, sí, yo quiero vivir\ny quiero dejar una suerte de señal\nsi un corazón triste pudo ver la luz\nsi hice mas liviano el peso de tu cruz\nnada mas me importa en esta vida aún.\nchau, hasta mañana.\nY a rodar, y a rodar, y a rodar\ny a rodar mi vida\ny a rodar, y a rodar, y a rodar\ny a rodar mi amor.\nyo no sé dónde va,\nyo no sé dónde va mi vida\nyo no sé dónde va, pero tampoco creo que sepas vos\nquiero salir, sí, quiero vivir\nquiero dejar una suerte de señal\nsi un corazón triste pudo ver la luz\nsi hice mas liviano el peso de tu cruz.\nnadie tiene a nadie\nyo te tengo a vos\ndentro de mi alma\nsiento que me amas.\nchau, hasta mañana."
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
    "lyrics": "Yo no sé lo que me pasa\ncuando estoy con vos\nme hipnotiza tu sonrisa\nme desarma tu mirada\ny de mi no queda nada\nme derrito\ncomo un hielo al sol\ncuando vamos a algún lado\nnunca elijo yo\nporque lo único que quiero\nes ir contigo\nvivo dando vueltas\na tu alrededor\ncomo un perro abandonado\nque en la calle te siguió\npero yo no soy tu prisionero\ny no tengo alma de robot\nes que hay algo en tu carita\nque me gusta\nque me gusta\ny se llevó mi corazón\noh oh, yo no soy tu prisionero\ny no tengo alma de robot\nes que hay algo en tu carita\nque me gusta\nque me gusta\ny se llevó mi corazón\npuede ser por tu carácter\no mi voluntad\nme hipnotiza tu sonrisa\nme desarma tu mirada\ny de mi no queda nada\nme derrito\ncomo un hielo al sol\ncuando vamos a algún lado\nnunca elijo yo\nporque lo único que quiero\nes ir contigo\nvivo dando vueltas\na tu alrededor\ncomo un perro abandonado\nque en la calle te siguió\npero yo no soy tu prisionero\ny no tengo alma de robot\nes que hay algo en tu carita\nque me gusta\nque me gusta\ny se llevó mi corazón\noh oh,yo no soy tu prisionero\ny no tengo alma de robot\nes que hay algo en tu carita\nque me gusta\nque me gusta\ny se llevó mi corazón\nyo no soy tu prisionero\ny no tengo alma de robot\nes que hay algo en tu carita\nque me gusta\nque me gusta\ny se llevó mi corazón\noh oh, yo no soy tu prisionero\ny no tengo alma de robot\nes que hay algo en tu carita\nque me gusta\nque me gusta\ny se llevó mi corazón\nse llevó mi corazón\nse llevó mi corazón\nse llevó mi corazón\nse llevó mi corazón\nse llevó mi corazón\nse llevó mi corazón\nse llevó mi corazón\nse llevó mi corazón\nse llevó mi corazón\nse llevó mi corazón\nse llevó mi corazón"
  },
  {
    "title": "Avanti Morocha",
    "artist": "Iván Noble",
    "genre": "Rock Nacional",
    "lyrics": "Nos empezamos de golpe\nnos saboreamos de prepo\ncomo salidos de un cuento de amor\nvos venías de un viaje de mochilas cansadas\nyo pateaba verano sin sol\n\nY en el escolazo de los besos\ncantamos bingo, y así andamos\nsin nada de mapas ni de candados\n\nArriba morocha\nque nadie está muerto\nvamos a punguearle a esta vida amarreta\nun ramo de sueños\nAvanti morocha no nos llueve tanto\nno tires la toalla que hasta los más mancos\nla siguen remando\n\nNunca dejo que un ángel haga un nido en mi almohada\npero me acuerdo tarde, mi amor\nhoy me siento a la sombra de tus piernas dormidas\ny le converso a mi insomio de vos\n\nY como los fantasmas del recuerdo\nsalen a la noche a patotearte\nvos andás descalza y en puntas de pie\n\nArriba morocha\nque nadie está muerto\nvamos a punguearle a esta vida amarreta\nun ramo de sueños\nAvanti morocha no nos llueve tanto\nno tires la toalla que hasta los más mancos\nla siguen remando\n\nEs tan fácil perderse en las calles del miedo\nno me sueltes la mano mi amor\nmi casa es un desastre sin tu risa\nno me dejaste ni las\n\nArriba morocha\nque nadie está muerto\nvamos a punguearle a esta vida amarreta\nun ramo de sueños\nAvanti morocha no nos llueve tanto\nno tires la toalla que hasta los más mancos\nla siguen remando"
  },
  {
    "title": "Lamento boliviano",
    "artist": "Enanitos Verdes",
    "genre": "Rock Nacional",
    "lyrics": "Me quieren agitar\nMe incitan a gritar.\nSoy como una roca,\nPalabras no me tocan\nAdentro hay un volcán\nQue pronto va a estallar.\nYo quiero estar tranquilo.\n\nEs mi situación\nUna desolación,\nSoy como un lamento,\nLamento boliviano.\nQue un día empezó\n\nY no va a terminar\nY a nadie hace daño.\n\nOoooh !\n\nREFRAIN (x3)\nY yo estoy aquí\nBorracho y loco\nY mi corazón idiota\nSiempre brillará\nY yo te amaré,\nTe amaré por siempre.\nNena no te peines en la cama\nQue los viajantes se van a atrasar.\n\n(Merci à Carla pour cettes paroles)"
  },
  {
    "title": "Tan solo",
    "artist": "Los Piojos",
    "genre": "Rock Nacional",
    "lyrics": "Quizás no sea el vino\nquizás no sea el postre\nquizás no sea\nno sea nada\npero hay tanta belleza\ntirada en la mesa\ndesnuda toda rebalsada\nApurás el vaso\nvas perdiendo el paso\ny en la mesa ya no hay nada\nBorracha está la puerta\ncerraste y quedó abierta\ny puedo escuchar tu llamada\nOh! Tan solo...\nOh! Tan solo...\nServida ya tu boca\ntan dulce está tu boca\ntan dulce con un blues amargo\nun vaso rueda al piso\nlento cae al piso\nlento y muere en mil pedazos\nno quiero dejar que se vean\ntus ojos se vean\ntan, tan, tan, tan, tristes\nhabrá sido el destino\no ese vaso de vino\nque dijiste:\nOh! Tan solo\nOh! Tan solo\nSalta la cuerda, se enreda\ny cae de boca\ny cae de boca\ny cae de boca\nOh! Tan solo\nOh! Tan solo"
  },
  {
    "title": "Todo un palo",
    "artist": "Los Redondos",
    "genre": "Rock Nacional"
  },
  {
    "title": "Ahora te puedes marchar",
    "artist": "Luis Miguel",
    "genre": "Balada",
    "lyrics": "Si tu me hubieras dicho siempre la verdad.\nSi hubieras respondido cuando te llamé.\nSi hubieras amado cuando te amé.\nSerias en mis sueños la mejor mujer\nSi no supiste amar, ahora te puedes marchar.\n\nSi tu superas lo que yo sufrí por ti\nTeniendo que olvidarte sin saber por qué\nY ahora me llamas, me quieres ver.\nMe juras que has cambiado y piensas en volver.\nSi no supiste amar ahora te puedes marchar.\n\nAléjate de mi, no hay nada más qué hablar\nContigo yo perdí, ya tengo con quién ganar.\n\nYa se que no hubo nadie\nQue te diera lo que yo te di\nQue nadie te ha cuidado come te cuidé.\nPor eso comprendo que estás aqui\nPero ha pasado el tiempo y yo también cambié\nSi no supiste amar, ahora te puedes marchar.\nSi no supiste amar, ahora te puedes marchar."
  },
  {
    "title": "Se me ha perdido",
    "artist": "Gilda",
    "genre": "Cumbia",
    "lyrics": "Se me ha perdido un corazón\nSi alguien lo tiene por favor\nQue lo devuelva.\n\nYo lo tenía junto a mi\nPero la puerta de su amor\nEstaba abierta.\nSe fue volando detrás de otra ilusión\nDe esas que llevan a perder la razón.\nEste vacío que hay en mi\nHace crecer la soledad\nY siento que me estoy muriendo\nSe me ha perdido un corazón\nPor eso hoy quiero brindar\nPor los fracasos del amor.\n\nTodo lo di sin esperar\nEra feliz pudiendo amar\nComo podré sobrevivir\nSin su calor no se vivir.\nSe me ha perdido un corazón...."
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
    "genre": "Rock Nacional"
  },
  {
    "title": "Te quiero tanto",
    "artist": "Sergio Dennis",
    "genre": "Balada"
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
    "lyrics": "Nunca dormí tan poco,\ntal vez viva demasiado.\nNo reconozco el punto justo donde hay que frenar.\nMe preguntaba lo que había dado\ny lo que me habían dejado,\nme respondieron que la vida hay que aceptar.\nDe cualquier modo que te toque esta bien.\nDe cualquier modo que te toque esta mal.\nMejor abrir los ojos para saber,\nlo que te gustaría hacer.\nDebo haber estado dando pasos al costado,\nparalizado por el miedo de saber la verdad.\nMe imaginaba que lo que habíamos pasado había quedado pisado,\npero encontramos una nueva forma de hablar.\nDe cualquier modo que te toque esta bien.\nDe cualquier modo que te toque esta mal.\nMejor abrir los ojos para saber,\nlo que te gustaría hacer.\nY es el momento en que todo comienza de vuelta.\nMi corazón esta alerta y el tuyo también.\nTodo este tiempo vivido me sirve de ejemplo,\npara no volver, para no volver, para no volver a caer."
  },
  {
    "title": "Yo no me quiero casar",
    "artist": "Turf",
    "genre": "Rock Nacional"
  },
  {
    "title": "Corazón mentiroso",
    "artist": "Karina",
    "genre": "Cumbia",
    "lyrics": "Mentiroso, corazon mentiroso\nte vas a arrepentir cuando este con otro.\n\nEsta tonta se canso de tus mentiras\nser juguete de tu vida\notra de tu coleccion.\nNo me llames para que me mandas flores\nquieres que yo te perdone\nSi no tienes corazon.\nSe acabo tu mentira se acabo\nSe acabo y te digo basta, basta, basta.\n\nMentiroso corazon mentiroso\nNo tienes perdon estas muy loco\nmentiroso corazon mentiroso\nte vas a arrepentir cuando este con otro.\n\nYa no vuelvas contigo corro yo peligro\nEl corazon lo tienes frio\neres un ladron de amor\nse acabo tu mentira se acabo\nSe acabo y te digo, basta, basta, basta.\n\nMentiroso corazon mentiroso\nNo tienes perdon estas muy loco\nmentiroso corazon mentiroso\nte vas a arrepentir cuando este con otro.\n\nMentiroso corazon mentiroso\nNo tienes perdon estas muy loco\nmentiroso corazon mentiroso\nte vas a arrepentir cuando este con otro."
  },
  {
    "title": "Tu misterioso alguien",
    "artist": "Miranda!",
    "genre": "Pop",
    "lyrics": "Hay alguien en tu vida que esta transformandote.\nHay alguien que ha cambiado en ti la forma en que te ves.\nHay alguien nuevo que se aparecio\ny que tu corazon robo.\nYa lo se.\nSolo dime quien es?\n\nQuien Es Tu nuevo amor?\nTu nueva ocupacion?\nTu misterioso Alguien\nA quien has ocultado de mi todo el tiempo\npara no matarme.\n\nQuien es tu seductor?\nTu rey y tu peon?\nQuien ocupo el lugar que siempre ocupe yo?\nTu misterioso alguien\nMe robo.\n\nAhora te despiertas y preparas un café\nDesde que me he enterado yo no puedo ni comer.\nCariño, no soporto estar sin ti,\npero parece que tu si.\nQuien es el?\nDime, lo matare!\n\nQuien Es Tu nuevo amor?\nTu nueva ocupacion?\nTu misterioso Alguien\nA quien has ocultado de mi todo el tiempo\npara no matarme.\n\nQuien es tu seductor?\nTu rey y tu peon?\nQuien ocupo el lugar que siempre ocupe yo?\nTu misterioso alguien\nMe robo.\n\n(Quiero saber quien es)\nY no me animo a preguntarte por el\nporque seria peor.\n(A veces es mejor)\nDejar todo correr.\nQuien es tu nuevo amor?\na quien has ocultado.\n\nQuien es tu seductor?\nTu rey y tu peon?\nQuien ocupo el lugar que siempre ocupe yo?\nTu misterioso alguien\nMe robo.\n\nTu misterioso alguien\nMe robo."
  },
  {
    "title": "Dejaría todo",
    "artist": "Chayanne",
    "genre": "Balada",
    "lyrics": "He intentado casi todo para convencerte,\nMientras el mundo se derrumba todo aquí a mis pies.\nMientras aprendo de esta soledad que desconozco,\nMe vuelvo a preguntar quizás si sobreviviré.\n\nPorque sin ti me queda la conciencia helada y vacía,\nPorque sin ti me he dado cuenta que renaceré,\nPorque yo he ido más allá del límite de la desolación,\nMi cuerpo, mi mente y mi alma ya no tienen conexión,\nY yo te juro que\n\nLo dejaría todo por que te quedaras,\nMi credo, mi pasado, mi religión,\nDespués de todo estás rompiendo nuestros lazos,\nY dejas en pedazos a este corazón.\nMi piel también la dejaría,\nMi nombre, mi fuerza, hasta mi propia vida,\nY que más da perder,\nSi te llevas del todo mi fe.\nLo dejaría.\n\nDuelen más tus cosas buenas cuando estás ausente,\nYo sé que es demasiado tarde para remediar.\nNo me queda bien valerme de diez mil excusas,\nCuando definitivamente sé que ahora te vas.\n\nAunque te vuelva a repetir que estoy muriendo día a día,\nAunque también estés muriendo, tú no me perdonarás.\nAunque sin ti haya llegado al límite de la desolación,\nMi cuerpo, mi mente y mi alma ya no tienen conexión,\nSigo muriéndome.\n\nLo dejaría todo por que te quedaras,\nMi credo, mi pasado, mi religión,\nDespués de todo estás rompiendo nuestros lazos,\nY dejas en pedazos a este corazón.\nMi piel también la dejaría,\nMi nombre, mi fuerza, hasta mi propia vida,\nY que más da perder,\nSi te llevas del todo mi fe.\n\nLo dejaría todo por que te quedaras,\nMi credo, mi pasado, mi religión,\nDespués de todo estás rompiendo nuestros lazos,\nY dejas en pedazos a este corazón.\nMi piel también la dejaría,\nMi nombre, mi fuerza, hasta mi propia vida,\nY que más da perder,\nSi te llevas del todo mi fe.\n\nLo dejaría todo por que te quedaras"
  },
  {
    "title": "Azul",
    "artist": "Cristian Castro",
    "genre": "Balada",
    "lyrics": "Fue una mañana que yo te encontré\ncuando la brisa besaba tu dulce piel,\ntus ojos tristes que al ver adoré\nla noche que yo te amé.\nCuando el silencio por fin te besé\nsentí muy dentro nacer este amor azul,\nhoy miro al cielo y en ti puedo ver,\nestrella que siempre soñé.\nEs que este amor es azul como el mar azul,\ncomo de tu mirada nació mi ilusión,\nazul como una lágrima cuando hay perdón,\ntan dulce y tan azul que me ahogó el corazón,\nes que este amor es azul como el mar azul,\ncomo el azul del cielo nació entre los dos\nazul como el lucero de nuestra pasión,\nun manantial azul que me llena de amor.\nComo el milagro que siempre esperé,\neres la niña que siempre busqué Azul,\nes tu inocencia que quiero entender,\ntu príncipe azul yo seré,\nAzul es mi locura si estoy junto a ti,\nazul, rayo de luna serás para mí\nAzul, y con la lluvia pintada de azul,\npor siempre serás solo tú...\nEs que este amor es azul como el mar azul,\ncomo de tu mirada nació mi ilusión,\nazul como una lágrima cuando hay perdón,\ntan dulce y tan azul que me ahogó el corazón,\nes que este amor es azul como el mar azul,\ncomo el azul del cielo nació entre los dos\nazul como el lucero de nuestra pasión,\nun manantial azul que me llena de amor"
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
    "lyrics": "Intro:\n[Em] [C] [G] [D] (x2)\n\n[Em]Y yo te dije [C]que fue amor\n[G]que todo siempre [D]fue amor\n[Em]y que no importa [C]nada más\n[G]que lo que pueda [D]pasar\n\n[Am]Fue amor, fue a[Em]mor\n[C]fue amor y nada [D]más\n[Am]fue amor, fue a[Em]mor\n[C]fue amor y nada [D]más\n\n[Em]Y yo te dije [C]que fue amor\n[G]que todo siempre [D]fue amor\n[Em]y que no importa [C]nada más\n[G]que lo que pueda [D]pasar\n\n[Am]Fue amor, fue a[Em]mor\n[C]fue amor y nada [D]más\n[Am]fue amor, fue a[Em]mor\n[C]fue amor y nada [D]más"
  },
  {
    "title": "Spaghetti del rock",
    "artist": "Divididos",
    "genre": "Rock Nacional",
    "lyrics": "Pistones de un curioso motor de humanidad\nResortes viejos de este amor que va.\nMemoria hostil de un tiempo de paz, sin paz.\nNarices frias de una noche atras\n\nBesos por celular\nLas momias de este amor\npiden el actor de lo que fui\n\nPantalla de la muerte y de la cancion\nProyectos de un nuevo spaghetti del rock.\nCiclope de cristal, Debora ambicion\nVomita modelos de ficcion\n\nRemontar el barrilete en esta tempestad\nSolo habra entender\nQue ayer no es hoy\nQue hoy es hoy\nY que no soy actor de lo que fui\n\nBesos por celular\nLas momias de este amor\nPiden el actor de lo que fui\n\nRemontar el barrilete en esta tempestad\nSolo habra entender\nQue ayer no es hoy\nQue hoy es hoy\nY que no soy actor de lo que fui"
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
    "lyrics": "No sé por qué\nImaginé\nQue estábamos unidos\nY me sentí mejor\n\nPero aquí estoy\nTan solo en la vida\nQue mejor me voy\n\nUn viejo blues\nMe hizo recordar\nMomentos de mi vida\nY mi primer amor\n\nPero aquí estoy\nTan solo en la vida\nQue mejor me voy"
  },
  {
    "title": "Luna de miel en las manos",
    "artist": "Virus",
    "genre": "Pop"
  },
  {
    "title": "Mr. Jones",
    "artist": "Sui Generis",
    "genre": "Rock Nacional"
  },
  {
    "title": "Cartas sin marcar",
    "artist": "Andrés Calamaro",
    "genre": "Rock Nacional",
    "lyrics": "Igual que un niño abandonado\nQue en la calle lo han dejado\nYo te busco desesperado\nNecesito un amigo\nNecesito que alguien quiera hablar conmigo\n\nCuando empieza a amanecer\nLa verdad es tan cruel\nY tu lo sabes, eres testigo\nAhora soy un mendigo\nQue camina por las calles perdido.\n\nNo me siento bien\nHoy perdi la fe\nLa suerte juega con cartas sin marcar\nNo se puede cambiar."
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
    "lyrics": "Estás buscando un viejo camisón\nestás buscando alguna religión\nestás buscando un símbolo de paz.\nEstás buscando un incienso ya\nestás buscando un sueño en el placard.\nEstás buscando un símbolo de paz.\nY damos vueltas a la heladera\ny solo queda un limón sin exprimir\nnos divertimos en primavera\ny en invierno nos queremos morir.\nEstás buscando un porro de papá\nestás buscando un saco de mamá\nporque si nada queda nada da.\nEstás buscando un incienso ya\nEstás buscando un sueño en el placard\nestás buscando un símbolo de paz.\nY damos vuelta a la discoteca\ny ya no quedan ganas de sonreír\nnos divertimos en primavera\ny en invierno nos queremos morir.\nSerá porque nos queremos sentir bien\nque ahora estamos bailando entre la gente\nserá porque nos queremos sentir bien\nque ahora todo suena diferente.\nY damos vueltas a la heladera\ny solo queda un limón sin exprimir\nnos divertimos en primavera\ny en invierno nos queremos morir."
  },
  {
    "title": "Todavía una canción de amor",
    "artist": "Los Rodríguez",
    "genre": "Rock",
    "lyrics": "No te fies si te juro que es imposible\nno dudes de mi duda why mi quizas\nel amor es igual que un imperdible\nperdido en la solapa del azar\n\nLa luna toma el sol de madrugada\nnunca jamas quiere decir tal vez\nla muerte es una amante despechada\nque juega sucio why no sabe perder\n\nEstoy tratando de decirte que\nme desespero de esperarte\nque no salgo a buscarte por que se\nque corro el riesgo de encontrarte\nque me sigo mordiendo noche why dia\nlas uñas del rencor\nque te sigo debiendo todavia\nuna cancion de amor\n\nNo corras si te llamo de repente\nno te vayas si te grito pierdete\na menudo los labios mas urgentes\nno tienen prisa dos besos despues\n\nSe aferra el corazon a lo perdido\nlos ojos que no ven miran mejor\ncantar es disparar contra el olvido\nvivir sin ti es morir en la estacion\n\nby cuitron (montevideo,uruguay)"
  },
  {
    "title": "Raros peinados nuevos",
    "artist": "Charly García",
    "genre": "Rock Nacional",
    "lyrics": "Y si vas a la derecha\ny cambiás hacia la izquierda, adelante.\nEs mejor que estarse quieto,\nes mejor que ser un vigilante.\n\nSi me gustan las canciones de amor\ny me gustan esos raros peinados nuevos\nya no quiero criticar\nsólo quiero ser un enfermero.\n\nY si trabajás al pedo\ny estás haciendo algo nuevo, adelante.\nY si cantas a la luna\ny perdés la vida en un instante.\n\nSi luchaste por un mundo mejor\ny te gustan esos raros peinados nuevos\nno quiero ver al doctor\nsólo quiero ver al enfermero.\n\nDame un poquito de amor\nno quiero un toco.\nQuiero algo de razón,\nno quiero un loco.\n\nApagá el televisor.\nSi lo que te gusta es gritar\ndesenchufa el cable del parlante.\nEl silencio tiene acción\nel mas cuerdo es el más delirante.\n\nMe gustaban las canciones de amor\nme gustaban esos raros peinados nuevos\nde chiquito fui aviador,\npero ahora soy un enfermero."
  },
  {
    "title": "No me dejan salir",
    "artist": "Charly García",
    "genre": "Rock Nacional",
    "lyrics": "Estoy verde, no me dejan salir.\nEstoy verde, no me dejan salir.\n\nNo puedo largar, no puedo salir\nno puedo sentir amor a este sentimiento\ntengo que volverte a ver.\n\nTengo que volverte a ver\nno puedo salir\npor amor a este sentimiento.\n\nEstoy verde, no me dejan salir\nestoy verde, no me dejan salir.\n\nNo puedo pensar, no puedo vivir\nno puedo pensar si amor es un pensamiento\ntengo que volverte a ver.\n\nTengo que volverte a ver\nno puedo perder, por amor a ese sentimiento.\n\nTengo que confiar en mi amor\ntengo que confiar en mi sentimiento\ntengo que confiar en mi amor\ntengo que confiar en mi sentimiento.\n\nYa no sirve vivir para sufrir\nte das cuenta, sacate el mocasín.\n\nNo puedo calmar, no puedo parir\nno puedo esperar mil años que cambie el viento\ntengo que volverte a ver.\n\nTengo que volverte a ver\nno puedo perder, por amor a ese sentimiento\nTengo que confiar en mi amor\ntengo que confiar en mi sentimiento."
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
    "lyrics": "Vamos al campo\na descansar.\nNo queda nada, nada, nada que jalar\nde vacaciones me quiero ir\na ver las focas y el casino en la Feliz.\n\nNo me banco las hormigas\npor favor pasame el Raid.\nNo tengo teca, no tengo grass\ny la heladera no funciona\nporque la misma es a gas.\n\nComida, no hay más.\nEstoy en el medio de la selva\nesto no lo aguanto más.\nNo me banco las hormigas,\nyo me vuelvo a la ciudad."
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
    "genre": "Rock Nacional"
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
    "genre": "Rock Nacional"
  },
  {
    "title": "Qué ves el cielo",
    "artist": "Invisible",
    "genre": "Rock Nacional",
    "lyrics": "[D]Qué ves el [G]cielo,\n[D]qué ves el [G]cielo,\n[Em]si no hay más [A]luz\n[D]bajo el do[G]lor\n\n[D]Qué ves el [G]cielo,\n[D]qué ves el [G]cielo,\n[Em]si no hay más [A]luz\n[D]bajo el do[G]lor\n\n[Em]Viento que [A]lleva\n[D]el polvo de a[G]yer\n[Em]déjame a[A]brir\n[D]los ojos del [G]sol"
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
    "lyrics": "Intro:\n[Dm] [Am] (x2)\n\n[Dm]Temprano el [Am]durazno del [Dm]árbol ca[Am]yó\n[C]al agua del [G]charco un [Bb]brillo le [A]dio\n[Dm]Y el viento del [Am]norte, la [Dm]tierra mo[Am]jó\n[C]y el árbol to[G]davía [Bb]nada si[A]ntió\n\n[F]En el alma [C]del dur[G]azno [Bb]sangra\n[Dm]y la [Am]brisa ya se [Dm]lo lle[Am]vó\n[F]en el alma [C]del dur[G]azno [Bb]sangra\n[Dm]y la [Am]brisa ya se [Dm]lo lle[Am]vó\n\n[Dm]Y al fin, el [Am]agua con su [Dm]charco el dur[Am]azno bebió\n[C]y en su cuer[G]po de pulpa un [Bb]brillo se [A]hizo flor\n[Dm]Y el árbol en[Am]tonces con [Dm]su viento ha[Am]bló\n[C]y en su alma de [G]árbol la [Bb]sangre si[A]ntió\n\n[F]En el alma [C]del dur[G]azno [Bb]sangra\n[Dm]y la [Am]brisa ya se [Dm]lo lle[Am]vó\n[F]en el alma [C]del dur[G]azno [Bb]sangra\n[Dm]y la [Am]brisa ya se [Dm]lo lle[Am]vó"
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
    "lyrics": "[G]No te a[Bm7]lejes tanto de [C]mí, [D]\n[G]no te a[Bm7]lejes tanto de [C]mí [D]\n\n[G]El amor [Bm7]tiene que ser as[C]í, [D]\n[G]el amor [Bm7]tiene que ser as[C]í [D]\n\n[C]Porque el tiempo se [D]va,\n[Bm7]porque el tiempo se [Em]va\n[C]no te alejes [D]tanto de [G]mí\n\n[G]No te a[Bm7]lejes tanto de [C]mí, [D]\n[G]no te a[Bm7]lejes tanto de [C]mí [D]"
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
    "lyrics": "(Hola, hola? Cardozo? cuchame acá en Villa Clara\nprincipal 4-27 tenemos uno de los cabecitas\nnegras...-sigue hablando el poli-)\nEl chico de la tapa ayer vendía flores en Corrientes\ndespués perdió a su chica en una sala en algún hospital\ny hoy amablemente y con una gran sonrisa en los dientes\nte para en la calle y si no le das te manda a guardar\n\nSi la policía no lo trata muy decentemente\nsi los camioneros no lo llevan hasta donde va\nél se vuelve al Docke caminando muy tranquilamente\ncon la 22 en el bolsillo del papel de armar\n\nHace algunos años pateaba la calle\nhaciendo \"La Paz\" y venidiendo postales\nel mundo está lleno de hijos de puta\ny hoy especialmente está llena la ruta\nno voy a morir de amor..\n\nEl chico de la tapa tiene algunos asuntos pendientes\nsu madre esá de yiro y sus hermanos bebiendo en el bar\ny el sábado a la tarde en la cancha se oye sólo un grito\nDock Sud ya tuvo un hijo y lo bautizaron Arsenal..\n\nY pasan los barbones, los snobs y los hinchapelotas\nlos tanques, las estrellas,las revistas y la Federal\nY yo me rio de todos en la cara son unos idiotas\nun ángel me vigila y me protege en esta ciudad\n\nYo siempre viví en la boca del diablo\nnaciendo, muriendo y resucitando\nel mundo está lleno de hijos de puta\ny hoy especialmente estállena la ruta..\nno voy a morir de amooooor!! ..."
  },
  {
    "title": "Fue amor",
    "artist": "Fito Páez",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[Em] [C] [G] [D] (x2)\n\n[Em]Y yo te dije [C]que fue amor\n[G]que todo siempre [D]fue amor\n[Em]y que no importa [C]nada más\n[G]que lo que pueda [D]pasar\n\n[Am]Fue amor, fue a[Em]mor\n[C]fue amor y nada [D]más\n[Am]fue amor, fue a[Em]mor\n[C]fue amor y nada [D]más\n\n[Em]Y yo te dije [C]que fue amor\n[G]que todo siempre [D]fue amor\n[Em]y que no importa [C]nada más\n[G]que lo que pueda [D]pasar\n\n[Am]Fue amor, fue a[Em]mor\n[C]fue amor y nada [D]más\n[Am]fue amor, fue a[Em]mor\n[C]fue amor y nada [D]más"
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
    "genre": "Rock Nacional"
  },
  {
    "title": "Enlace",
    "artist": "Ratones Paranoicos",
    "genre": "Rock Nacional"
  },
  {
    "title": "Estrella",
    "artist": "Ratones Paranoicos",
    "genre": "Rock Nacional"
  },
  {
    "title": "Rock de la mujer perdida",
    "artist": "Los Gatos",
    "genre": "Rock Nacional"
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
    "lyrics": "La tierra que te da la vida\nDa un tiempo para decidir\nEligiendo inteligentemente\nTodo el mundo podrá ser feliz\n\nJugo de tomate frío\nJugo de tomate frío\nEn las venas\nEn las venas, deberás tener\n\nSi querés ser un terrible vago\nTodo el día panza arriba y a dormir\nO elegiste ser un tipo capo\nSiempre serio y que da temor\nDeberás tener\n\nJugo de tomate frío\nJugo de tomate frío\nEn las venas\nEn las venas, deberás tener\n\nSi querés triunfar con las mujeres\nTener muchas que lloren por vos\nTendrás que ser muy poco inteligente\nTener dinero y una buena voz\nPero\n\nJugo de tomate frío\nJugo de tomate frío\nEn las venas\nEn las venas, deberás tener\n\nSi querés ser un hombre importante\nQue se hable todo el día de vos\nO querés inmortalizarte como héroe\nAsesino o semidiós\n\nJugo de tomate frío\nJugo de tomate frío\nEn las venas\nEn las venas, deberás tener"
  },
  {
    "title": "Maldición, va a ser un día hermoso",
    "artist": "Patricio Rey y sus Redonditos de Ricota",
    "genre": "Rock Nacional"
  },
  {
    "title": "La vaca cubana",
    "artist": "Patricio Rey y sus Redonditos de Ricota",
    "genre": "Rock Nacional"
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
    "lyrics": "Intro:\n[G] [D] [Em] [C] (x2)\n\n[G]Suspiro de li[D]món,\n[Em]un viento del es[C]te nos llevó\n[G]el tiempo pasará [D]\n[Em]y sé que todo esta[C]rá mejor\n\n[Am7]Poder decir a[Bm7]diós\n[C]es crecer, [D]es crecer\n[Am7]poder decir a[Bm7]diós\n[C]es crecer, [D]es crecer\n\n[G]El puente que cru[D]zamos\n[Em]ya nunca se volve[C]rá a pisar\n[G]sé que tus ojos [D]\n[Em]tienen ganas de [C]llorar\n\n[Am7]Poder decir a[Bm7]diós\n[C]es crecer, [D]es crecer\n[Am7]poder decir a[Bm7]diós\n[C]es crecer, [D]es crecer\n\n[G] [D] [Em] [C] (x2)\n\n[Am7]Poder decir a[Bm7]diós\n[C]es crecer, [D]es crecer\n[Am7]poder decir a[Bm7]diós\n[C]es crecer, [D]es crecer"
  },
  {
    "title": "Ella usó mi cabeza como un revólver",
    "artist": "Soda Stereo",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[Bm] [A] [G] [F#] (x2)\n\n[Bm]Ella usó mi ca[A]beza\n[G]como un re[F#]vólver\n[Bm]y me disparó [A]tanto\n[G]que no sé qué pa[F#]só\n\n[Bm]No tengo de[G]fensas\n[D]en mi cora[A]zón\n[Bm]ella usó mi ca[G]beza\n[D]como un re[A]vólver\n\n[Bm]Ella usó mi ca[A]beza\n[G]como un re[F#]vólver\n[Bm]y me disparó [A]tanto\n[G]que no sé qué pa[F#]só\n\n[Bm]No tengo de[G]fensas\n[D]en mi cora[A]zón\n[Bm]ella usó mi ca[G]beza\n[D]como un re[A]vólver"
  },
  {
    "title": "Himno de mi corazón",
    "artist": "Los Abuelos de la Nada",
    "genre": "Rock Nacional",
    "lyrics": "Sobre la palma de mi lengua vive el himno de mi corazónsiento la alianza mas perfecta que injusticia a media vozla vida es un libro útil para aquel que puede comprendertengo confianza en la balanza que inclina mi parecer.Nadie quiere dormirse aquí, algo puedo hacer,tras haber cruzado la mar, te seduciré por felicidad yo canto.ohohoh! oh oh oh oh oh!Nada me abruma ni me impide en este día que te quiera amornaturalmente mi presente busca flores es de a dosnada hay que nada prohiba ya te veo andar en libertadque no se rasgue como seda el clima de tu corazón.Nadie quiere dormirse aquí, algo debo hacertras haber cruzado la mar te seduciré sólo por amor lo canto..."
  },
  {
    "title": "Lunes por la madrugada",
    "artist": "Los Abuelos de la Nada",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[Am] [G] [F] [Em] (x2)\n\n[Am]Lunes por la madru[G]gada yo cierro los [F]ojos y veo tu [Em]cara\nque son[Am]ríe cómplice de a[G]mor\n[Am]Días en la carre[G]tera yo siento aquí [F]dentro la emo[Em]ción\nde haber de[Am]jado lo me[G]jor\n\n[C]Yo no sé si es en [G]vano este amor, [F]aquí no hay luces de es[E]cena\n[C]y algo en mí [G]no se serena, [F]no [E]\n\n[Am]Lunes por la madru[G]gada yo cierro los [F]ojos y veo tu [Em]cara\nque son[Am]ríe cómplice de a[G]mor\n[Am]Noches de melanco[G]lía pateando en una [F]ciudad va[Em]cía\nen la oscuri[Am]dad te busco a [G]vos\n\n[C]Quizás hoy si te [G]pueda encontrar, [F]más allá de toda [E]pena\n[C]siento que la [G]vida es buena, [F]yo sé que no es en [E]vano este [Am]amor"
  },
  {
    "title": "Marinero Bengalí",
    "artist": "Los Abuelos de la Nada",
    "genre": "Rock Nacional"
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
    "genre": "Rock Nacional"
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
    "genre": "Rock Nacional"
  },
  {
    "title": "Acariciando lo áspero",
    "artist": "Divididos",
    "genre": "Rock Nacional"
  },
  {
    "title": "Par mil",
    "artist": "Divididos",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[E] [G] [A] (x4)\n\n[E]Par mil de [G]años [A]más\n[E]en este lu[G]gar sin [A]sol\n[E]par mil de [G]años [A]más\n[E]en este lu[G]gar sin [A]sol\n\n[C]Y la luz [D]llegará [E]\n[C]y la luz [D]llegará [E]\n[C]y la luz [D]llegará [E]\n\n[E]Par mil de [G]años [A]más\n[E]en este lu[G]gar sin [A]sol\n[E]par mil de [G]años [A]más\n[E]en este lu[G]gar sin [A]sol\n\n[C]Y la luz [D]llegará [E]\n[C]y la luz [D]llegará [E]\n[C]y la luz [D]llegará [E]"
  },
  {
    "title": "Dos días en la vida",
    "artist": "Fabiana Cantilo",
    "genre": "Rock Nacional"
  },
  {
    "title": "Fue amor",
    "artist": "Fabiana Cantilo",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[Em] [C] [G] [D] (x2)\n\n[Em]Y yo te dije [C]que fue amor\n[G]que todo siempre [D]fue amor\n[Em]y que no importa [C]nada más\n[G]que lo que pueda [D]pasar\n\n[Am]Fue amor, fue a[Em]mor\n[C]fue amor y nada [D]más\n[Am]fue amor, fue a[Em]mor\n[C]fue amor y nada [D]más\n\n[Em]Y yo te dije [C]que fue amor\n[G]que todo siempre [D]fue amor\n[Em]y que no importa [C]nada más\n[G]que lo que pueda [D]pasar\n\n[Am]Fue amor, fue a[Em]mor\n[C]fue amor y nada [D]más\n[Am]fue amor, fue a[Em]mor\n[C]fue amor y nada [D]más"
  },
  {
    "title": "Nada es para siempre",
    "artist": "Fabiana Cantilo",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[D] [A] [Bm] [G] (x2)\n\n[D]Nada es para [A]siempre,\n[Bm]nada es para [G]siempre\n[D]todo tiene un fi[A]nal\n[Bm]y es mejor acep[G]tarlo\n\n[G]Pero hoy es[A]tamos a[D]quí [Bm]\n[G]vamos a dis[A]frutar[D] [Bm]\n[G]nada es para [A]siempre\n[G]nada es para [A]siempre\n\n[D]Nada es para [A]siempre,\n[Bm]nada es para [G]siempre\n[D]todo tiene un fi[A]nal\n[Bm]y es mejor acep[G]tarlo\n\n[G]Pero hoy es[A]tamos a[D]quí [Bm]\n[G]vamos a dis[A]frutar[D] [Bm]\n[G]nada es para [A]siempre\n[G]nada es para [A]siempre"
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
    "lyrics": "Hace frío todo el día, el invierno quiere volver a herirme\nArrasando con el tiempo de las penas pude llegar a Tigre\n\nGente q se ocupa de otra gente\nY le quiere hacer mal, esta mal\nSe ilumina la burbuja que me cuida y quiero ayudar a todas\n\nNo hay q decir mas nada\nYa no hay que hablar\nNo necesito mas nada\n\nYo se q te llame esa tarde q volví de New York (Nueva York)\nYo se q le pedí al de arriba una tregua por favor.\n\nSe me acusa de hacer bardo y hacer parte del rock & roll\nY que? Yo nací con una estrella y cuando canto vuelve a brillar\nNo lo ves\n\nYo se q te llame esa tarde q volví de New York (Nueva York)\nYo se q le pedí al de arriba una tregua por favor.\n\nYo no estaba bien por culpa del fin\nConecte los cables correctos y apareciste\n\nYo se q te llame esa tarde q volví de New York\nYo se q le pedí al de arriba una tregua por favor\n\nYo se q te llame esa tarde q volví de New York\nYo se q le pedí al de arriba una tregua...\n\nNo hay q decir mas nada\nYa no hay que hablar\nNo necesito mas nada"
  },
  {
    "title": "Sola en los bares",
    "artist": "Hilda Lizarazu",
    "genre": "Rock Nacional",
    "lyrics": "Intro:\n[D] [G] [A] [D] (x2)\n\n[D]Ella camina [G]sola por la ca[A]lle\n[D]mirando los carteles de la [G]gente que se [A]va\n[D]no le importa el [G]frío de la no[A]che\n[D]solo quiere en[G]contrar su lu[A]gar\n\n[Bm]Sola en los [G]bares\n[A]buscando un a[D]mor\n[Bm]sola en los [G]bares\n[A]buscando un a[D]mor\n\n[D]Ella camina [G]sola por la ca[A]lle\n[D]mirando los carteles de la [G]gente que se [A]va\n[D]no le importa el [G]frío de la no[A]che\n[D]solo quiere en[G]contrar su lu[A]gar\n\n[Bm]Sola en los [G]bares\n[A]buscando un a[D]mor\n[Bm]sola en los [G]bares\n[A]buscando un a[D]mor"
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
    "lyrics": "Exodus: Movement of Jah people! Oh-oh-oh, yea-eah!\n.......\nMen and people will fight ya down (Tell me why!)\nWhen ya see Jah light. (Ha-ha-ha-ha-ha-ha-ha!)\nLet me tell you if you're not wrong; (Then, why?)\nEverything is all right.\nSo we gonna walk - all right! - through de roads of creation:\nWe the generation (Tell me why!)\n(Trod through great tribulation) trod through great tribulation.\n\nExodus, all right! Movement of Jah people!\nOh, yeah! O-oo, yeah! All right!\nExodus: Movement of Jah people! Oh, yeah!\n\nYeah-yeah-yeah, well!\nUh! Open your eyes and look within:\nAre you satisfied (with the life you're living)? Uh!\nWe know where we're going, uh!\nWe know where we're from.\nWe're leaving Babylon,\nWe're going to our Father land.\n\n2, 3, 4: Exodus: movement of Jah people! Oh, yeah!\n(Movement of Jah people!) Send us another brother Moses!\n(Movement of Jah people!) From across the Red Sea!\n(Movement of Jah people!) Send us another brother Moses!\n(Movement of Jah people!) From across the Red Sea!\nMovement of Jah people!\n\n--- Instrumental break ---\n\nExodus, all right! Oo-oo-ooh! Oo-ooh!\nMovement of Jah people! Oh, yeah!\nExodus!\nExodus! All right!\nExodus! Now, now, now, now!\nExodus!\nExodus! Oh, yea-ea-ea-ea-ea-ea-eah!\nExodus!\nExodus! All right!\nExodus! Uh-uh-uh-uh!\n\nMove! Move! Move! Move! Move! Move!\n\nOpen your eyes and look within:\nAre you satisfied with the life you're living?\nWe know where we're going;\nWe know where we're from.\nWe're leaving Babylon, y'all!\nWe're going to our Father's land.\n\nExodus, all right! Movement of Jah people!\nExodus: movement of Jah people!\nMovement of Jah people!\nMovement of Jah people!\nMovement of Jah people!\nMovement of Jah people!\n\nMove! Move! Move! Move! Move! Move! Move!\n\nJah come to break downpression,\nRule equality,\nWipe away transgression,\nSet the captives free.\n\nExodus, all right, all right!\nMovement of Jah people! Oh, yeah!\nExodus: movement of Jah people! Oh, now, now, now, now!\nMovement of Jah people!\nMovement of Jah people!\nMovement of Jah people!\nMovement of Jah people!\nMovement of Jah people!\nMovement of Jah people!\n\nMove! Move! Move! Move! Move! Move! Uh-uh-uh-uh!\nMove(ment of Jah people)!\nMove(ment of Jah people)!\nMove(ment of Jah people)!\nMove(ment of Jah people)! Movement of Jah people!\nMove(ment of Jah people)!\nMove(ment of Jah people)!\nMovement of Jah people!\nMovement of Jah people!\nMovement of Jah people!"
  },
  {
    "title": "Buffalo Soldier",
    "artist": "Bob Marley & The Wailers",
    "genre": "Reggae",
    "lyrics": "Buffalo Soldier, Dreadlock Rasta:\nThere was a Buffalo Soldier in the heart of America,\nStolen from Africa, brought to America,\nFighting on arrival, fighting for survival.\n\nI mean it, when I analyze the stench -\nTo me it makes a lot of sense:\nHow the Dreadlock Rasta was the Buffalo Soldier,\nAnd he was taken from Africa, brought to America,\nFighting on arrival, fighting for survival.\n\nSaid he was a Buffalo Soldier, Dreadlock Rasta -\nBuffalo Soldier in the heart of America.\n\nIf you know your history,\nThen you would know where you coming from,\nThen you wouldn't have to ask me,\nWho the 'eck do I think I am.\n\nI'm just a Buffalo Soldier in the heart of America,\nStolen from Africa, brought to America,\nSaid he was fighting on arrival, fighting for survival;\nSaid he was a Buffalo Soldier win the war for America.\n\nDreadie, woy yoy yoy, woy yoy-yoy yoy,\nWoy yoy yoy yoy, yoy yoy-yoy yoy!\nWoy yoy yoy, woy yoy-yoy yoy,\nWoy yoy yoy yoy, yoy yoy-yoy yoy!\nBuffalo Soldier troddin' through the land, wo-ho-ooh!\nSaid he wanna ran, then you wanna hand,\nTroddin' through the land, yea-hea, yea-ea.\n\nSaid he was a Buffalo Soldier win the war for America;\nBuffalo Soldier, Dreadlock Rasta,\nFighting on arrival, fighting for survival;\nDriven from the mainland to the heart of the Caribbean.\n\nSinging, woy yoy yoy, woy yoy-yoy yoy,\nWoy yoy yoy yoy, yoy yoy-yoy yoy!\nWoy yoy yoy, woy yoy-yoy yoy,\nWoy yoy yoy yoy, yoy yoy-yoy yoy!\n\nTroddin' through San Juan in the arms of America;\nTroddin' through Jamaica, a Buffalo Soldier# -\nFighting on arrival, fighting for survival:\nBuffalo Soldier, Dreadlock Rasta.\n\nWoy yoy yoy, woy yoy-yoy yoy,\nWoy yoy yoy yoy, yoy yoy-yoy yoy!\nWoy yoy yoy, woy yoy-yoy yoy,\nWoy yoy yoy yoy, yoy yoy-yoy yoy!"
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
    "lyrics": "I am on the rock and then I check a stock\nI have to run like a fugitive to save the life I live\nI'm gonna be Iron like a Lion in Zion (repeat)\nIron Lion Zion\nI'm on the run but I ain't got no gun\nSee they want to be the star\nSo they fighting tribal war\nAnd they saying Iron like a Lion in Zion\nIron like a Lion in Zion,\nIron Lion Zion\n\nI'm on the rock, (running and you running)\nI take a stock, (running like a fugitive)\nI had to run like a fugitive just to save the life I live\nI'm gonna be Iron like a Lion in Zion (repeat)\nIron Lion Zion, Iron Lion Zion, Iron Lion Zion\nIron like a Lion in Zion, Iron like a Lion in Zion\nIron like a Lion in Zion"
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
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
