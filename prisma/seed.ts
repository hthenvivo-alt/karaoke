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
    "lyrics": "Yo que nací con Videla\nyo que nací sin poder\nyo que luché por la libertad\ny nunca la pude tener,\nyo que viví entre fachistas\nyo que morí en el altar\nyo que crecí con los que estaban bien\npero a la noche estaba todo mal.\n\nHoy pasó el tiempo,\ndemoliendo hoteles\nmientras los plomos juntan los cables\ncazan rehenes.\n\nHoy pasó el tiempo\ndemoliendo hoteles\nmientras los chicos allá en la esquina\npegan carteles.\n\nYo fui educado con odio\ny odiaba la humanidad\nun día me fui con los hippies y tuve un amor y mucho más.\nAhora no estoy más tranquilo,\ny por qué tendría que estar\ntodos crecimos sin entender\ny todavía me siento un anormal.\n\nHoy pasó el tiempo,\ndemoliendo hoteles\nmientras los plomos juntan los cables\ncazan rehenes.\n\nHoy pasó el tiempo\ndemoliendo hoteles\nmientras los chicos allá en la esquina\npegan carteles."
  },
  {
    "title": "Rezo por vos",
    "artist": "Charly García",
    "genre": "Rock Nacional",
    "lyrics": "La indómita luz\nse hizo carne en mí\ny lo dejé todo por esta soledad.\ny leo revistas\nen la tempestad\nhice el sacrificio\nabracé la cruz al amanecer.\n\nRezo, rezo, rezo, rezo.\n\nMorí sin morir\ny me abracé al dolor\ny lo dejé todo por esta soledad\nya se hizo de noche\ny ahora estoy aquí\nmi cuerpo se cae\nsólo veo la cruz al amanecer.\n\nRezo, rezo, rezo, rezo por vos.\n\nY curé mis heridas\ny me encendí de amor\nY quemé las cortinas\ny me encendí de amor, de amor sagrado.\nY entonces rezo."
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
    "genre": "Rock Nacional"
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
    "genre": "Rock Nacional"
  },
  {
    "title": "Corazón",
    "artist": "Los Decadentes",
    "genre": "Rock Nacional"
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
    "genre": "Cumbia"
  },
  {
    "title": "Juntos a la par",
    "artist": "Pappo",
    "genre": "Rock Nacional",
    "lyrics": "Le he pedido tanto a Dios,\nque al final oyó mi voz,\npor la noche a más tardar\nyendo juntos a la par.\n\nCartas de amor en el hall,\nse secan con el sol,\nlejos de la gran ciudad, ella es mi felicidad,\nnada como ir juntos a la par.\n\nNada como ir juntos a la par\ny caminos desandar,\nel honor no lo perdí, ese héroe que hay en mí,\nnada como ir juntos a la par.\n\nSé su nombre, sé su edad,\ny sus gustos en la intimidad,\ncuando un corazón se entrega\ny el mañana nunca llega,\nque más puedo hacer.\n\nNada como ir juntos a la par\ny caminos desandar,\nel honor no lo perdí, ese héroe que hay en mí,\nnada como ir juntos a la par."
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
    "lyrics": "A ver...\n\nElla durmió al calor de las masas,\ny yo desperté queriendo soñarla.\nAlgún tiempo atrás pensé en escribirle\nque nunca sorteé las trampas del amor.\n\nDe aquel amor de música ligera\nnada nos libra, nada más queda.\n\nElla durmió al calor de las masas,\ny yo desperté queriendo soñarla.\nAlgún tiempo atrás pensé en escribirle\nque nunca sorteé las trampas del amor.\n\nDe aquel amor de música ligera\nnada nos libra, nada más queda.\n\nNo le enviaré cenizas de rosas,\nni pienso evitar un roce secreto.\n\nDe aquel amor de música ligera\nnada nos libra, nada más queda.\n\nDe aquel amor de música ligera\nnada nos libra, nada más queda, nada más.\n\nNada más queda.\nNada más queda.\nNada más queda.\nNada más queda."
  },
  {
    "title": "Seguir viviendo sin tu amor",
    "artist": "Luis Alberto Spinetta",
    "genre": "Rock Nacional",
    "lyrics": "Si a tu corazón yo llego igual\nTodo siempre se podrá elegir\nNo me escribas la pared\nSólo quiero estar entre tu piel\n\nY si acaso no brillara el sol\nY quedara yo atrapado aquí\nNo veria la razón\nDe seguir viviendo sin tu amor\n\nY hoy que enloquecido vuelvo\nBuscando tu querer\nNo queda más que el viento\nNo queda mas que el viento\n\nY si acaso no brillara el sol\nY quedara yo atrapado aquí\nNo veria la razón\nDe seguir viviendo sin tu amor."
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
    "lyrics": "Bajo por el callejón\nen donde estaba el\ndespués vomito ese ron\nmanchando la pared\nel sol le caí bien\nentrando en la avenida\nsu vida no era mas su vida\npero eso estaba okey\n\nLa veo cruzar\ncruzando un bosque\nla veo alejándose de mi\n\nSus tetas y sus dos hermanas\ntomaban un café\nme acuerdo de la mañana\nque me mostró su piel\nestábamos en un bar\ny se corto la cara\nvibraba como en un nirvana\nluego se hecho a correr\n\nLa veo cruzar\ncruzando un bosque\nla veo alejándose de mi\n\nPasábamos todo el día\ntirados en la cama\nel tiempo maldita daga\nlamiéndonos los pies\nbrillaba era una perla\ny nunca hacia nada\ndespués dijo que me amaba\ny se hundió la Gillete\nSangro, sangro, sangro,\ny se reía como loca\nno he visto luz\nni fuerza viva tan poderosa\nde todas ellas\nella fue mi frase mas hermosa\ntodo su cuerpo con espinas\ny a mi me siguen las moscas."
  },
  {
    "title": "Fue amor",
    "artist": "Fito Páez / Fabi Cantilo",
    "genre": "Rock Nacional",
    "lyrics": "Yo podría haberlo hecho mejor\nVos podrías acercarte a mí\nYo intuía que esto mi amor\nSe rompía y esto es siempre así\nLa verdad es que todo fue\nTan extraño, tan extraño al fin\nVos buscando el polvo de dios\nYa bebía para irme de aquí\nCada vez que pienso en vos\nFue amor, fue amor\nTodo el mundo me habla de vos\nY no puedo dejar de reír\nLo que haces y a donde vas\nDe tu depto siempre a prix d'ami\nNo esta bien romper un corazón\nMe sacude lo que va a venir\nVos querías verme feliz\nYo quería verme revivir.\nCada vez que pienso en vos\nFue amor, fue amor, (bis)\nEstos días que corren mi amor\nEs aquí que nos toco vivir\nEnredados en los cables de entel\nDe algún sueño vamos a salir\nComo siempre vuelvo a ensayar\nY los pibes siempre están ahí\nHay un boomerang en la city mi amor\nTodo vuelve como vos decís\nCada vez que pienso en vos\nFue amor, fue amor"
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
    "lyrics": "No razonar\ndesaparecer\ncuando tenías que estar\nte echaste a correr\nlo que hiciste en mí\nno tiene perdón\ny yo sé que me siento mucho más fuerte\nsin tu amor.\nMucho tiempo atrás\nme hiciste sentir\nque nuestro amor era más\ny de esa forma vivir\nno sé más quién soy\nde qué te reís\ny ahora sé que me siento mucho más fuerte\nsin tu amor.\nNo sé más que hacer\nno sé qué decir\ncuando tenías que estar\nte echaste a reír\nlo que hiciste en mí\nno tiene perdón\ny ahora sé que me siento mucho más fuerte\nsin tu amor\ny yo sé que me siento mucho más fuerte\nsin tu amor\noh sin tu amor."
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
    "lyrics": "No voy a parar\nyo no tengo dudas\nno voy a bajar\ndéjalo que suba.\n\nPor eso no quiero parar\nya no tengo dudas\nno voy a bajar\ndéjalo que suba.\n\nGozar, es tan parecido al amor\nGozar es tan diferente al amor.\nEl cambió una dirección\notra oportunidad merece alguna decisión.\n\nBasta!\n\nNo voy a parar\nyo no tengo dudas\nno voy a bajar\ndéjalo que suba.\n\nGozar es tan parecido al amor\nGozar es tan diferente a matar.\nCuando pienso en el fin\ncuando pienso en todo lo que dí.\n\nCuando miro el final\ncuando sueño que todo va a acabar.\nGozar es tan necesario, mi amor\nGozar es tan diferente al amor."
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
    "lyrics": "Quiero ver, quiero entrar\nnena nadie te va a hacer mal,\nexcepto amarte.\n\nVas aquí, vas allá\npero nunca te encontrarás\nal escaparte.\n\nNo hay fuerza alrededor\nno hay pociones para el amor\n¿A dónde estás?\n¿Dónde voy?\n\nPorque estamos en la calle de la sensación\nmuy lejos del sol que quema de amor.\n\nTe doy pan, quieres sal\nnena nunca te voy a dar\nlo que me pides.\n\nTe doy Dios, quieres más\nes que nunca comprenderás\na un pobre pibe.\n\nEsas motos que van a mil\nsólo el viento te harán sentir\nnada más, nada más.\n\nSi pudieras olvidar tu mente\nfrente a mí, sé que tu corazón\ndiría que sí."
  },
  {
    "title": "Nos veremos otra vez",
    "artist": "Serú Girán",
    "genre": "Rock Nacional",
    "lyrics": "Aunque te abraces a la luna\nAunque te acuestes con el sol.\nNo hay más estrellas que las que dejes brillar\nTendrá el cielo tu color\n\nNo estés solo en esta lluvia\nNo te entregues por favor!\nSi debes ser fuerte en estos tiempos\nPara resistir la decepción\nY quedar abierto, mente y alma,\nYo estoy con vos.\n\nSi te hace falta quien te trate con amor\nSi no tenés a quien brindar tu corazón\nSi todo vuelve cuando más lo precisás\nNos veremos otra vez.\n\nNo estés sola en esta lluvia\nNo te entregues por favor.\nSi debes ser fuerte en estos tiempos\nPara resistir la decepción\nY quedar abierto, mente y alma,\nYo estoy con vos.\n\nSi te hace falta quien te trate con amor\nSi no tenés a quien brindar tu corazón\nSi todo vuelve cuando más lo precisás\nNos veremos otra vez."
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
    "lyrics": "Porque no vienes hasta mí, porque no puedo\nAmarte. Porque no vienes hasta mí, porque\nCambias como el sol porque eres tan distante\nPorque no cambias como el sol.\n\nMe siento sólo y confundido a la vez los\nAnalistas no podrán entender no se muy bien\nQue decir no se muy bien que hacer todo el mundo\nLoco y yo sin poderte ver. Pero si insisto, yo se\nMuy bien que conseguiré. Pero si insisto,\nYo se muy bien que conseguiré.\n\nCerca de la revolución, el pueblo pide\nSangre cerca de la revolución yo estoy\nCantando esta canción que alguna vez fue\nHambre estoy cantando esta canción.\n\nY si mañana es como ayer otra vez lo que\nFue hermoso será horrible después.\nNo es sólo una cuestión de\nElecciones. No elegí este mundo, pero\nAprendí a querer. Pero si insisto, yo se\nMuy bien que conseguiré. Pero si insisto,\nYo se muy bien que conseguiré.\n\nSi estas palabras te pudieran dar fe si esta\nArmonía te ayudara a crecer yo sería\nTan feliz, tan feliz, en el mundo, que\nMoriría arrodillado a tus pies. Pero si\nInsisto, yo se muy bien te conseguiré. Pero\nSi insisto, yo se muy bien te conseguiré.\nSeguiré."
  },
  {
    "title": "Cucamonga Dance",
    "artist": "Charly García",
    "genre": "Rock Nacional"
  },
  {
    "title": "Qué ves el cielo",
    "artist": "Invisible",
    "genre": "Rock Nacional"
  },
  {
    "title": "Muchacha (Ojos de papel)",
    "artist": "Almendra",
    "genre": "Rock Nacional",
    "lyrics": "Muchacha ojos de papel\n¿adónde vas? Quédate hasta el alba\nMuchacha pequeños pies\nno corras más. Quédate hasta el alba\nSueña un sueño despacito entre mis manos\nhasta que por la ventana suba el sol\nMuchacha piel de rayón\nno corras más. Tu tiempo es hoy\nY no hables más, muchacha\ncorazón de tiza\nCuando todo duerma\nte robare un color\nMuchacha voz de gorrión\n¿adonde vas? Quédate hasta el día\nMuchacha pechos de miel\nno corras más. Quedate hasta el día\nDuerme un poco y yo entretanto construiré\nun castillo con tu vientre hasta que el sol\nmuchacha, te haga reír\nhasta llorar, hasta llorar\nY no hables más, muchacha\ncorazón de tiza\nCuando todo duerma\nte robare un color."
  },
  {
    "title": "Durazno sangrando",
    "artist": "Invisible",
    "genre": "Rock Nacional"
  },
  {
    "title": "Rutas argentinas",
    "artist": "Almendra",
    "genre": "Rock Nacional"
  },
  {
    "title": "No te alejes tanto de mí",
    "artist": "Luis Alberto Spinetta",
    "genre": "Rock Nacional",
    "lyrics": "Algo está pasando hoy,\nEs que te quiero tanto amor\nYa nada está cerrado\nLuces como el mundo\nMe estaba preguntando,\nMe estaba preguntando,\nEstaba simplemente así\nY ellos se estaban oxidando,\nY yo estaba por creer, en vos\nNo te alejes tanto\nNo te alejes tanto de mí\nMe estaba preguntando,\nY estaba alimentando,\nY estaba alucinando bien,\nY es que estaba satinado,\nY estaba por pensar, en vos\nEstaba yo pensando,\nQue era balanceado,\nY estabas acercándote\nNena vos acercándote\nPero no,\nVos venías por alta,\nYo estaba satinado,\nMe estabas recorriendo al fin\nNena al fin\nNo te alejes tanto de mí."
  },
  {
    "title": "Cheques",
    "artist": "Luis Alberto Spinetta",
    "genre": "Rock Nacional"
  },
  {
    "title": "11 y 6",
    "artist": "Fito Páez",
    "genre": "Rock Nacional",
    "lyrics": "En un café se vieron por casualidad,\ncansados en el alma de tanto andar,\nella tenia un clavel en la mano,\nel se acerco le pregunto si andaba bien,\nllegaba a la ventana en puntas de pies y la llevo a caminar por corrientes....\n\nMiren todos ellos solos fue de más que el amor\ny son mas fuertes que el olimpo,\nse escondierón en el centro,\ny en el baño de un bar sellaron todo todo con un beso.\n\nDurante un mes vendiron rosas a la paz,\npreciento que no importaba nada más,\ny entre los dos juntaron algo,\nno se porque pero jamas los volvi a ver,\nel carga con 11 y ella con 6,\ny si reia le daba la luna.\n\nMiren todos ellos solos fue de más que el amor\ny son mas fuertes que el olimpo,\nse escondierón en el centro,\ny en el baño de un bar sellaron todo todo todo todo con un beso."
  },
  {
    "title": "Ciudad de pobres corazones",
    "artist": "Fito Páez",
    "genre": "Rock Nacional",
    "lyrics": "En esta puta ciudad todo se incendia y se va,\nmatan a pobres corazones.\nEn esta sucia ciudad no hay que seguir ni parar,\nciudad de locos corazones.\n\nNo quiero salir a fumar,\nno quiero salir a la calle con vos.\nNo quiero empezar a pensar\nquién puso la yerba en ese viejo cajón.\n\nBuen día lexotanil,\nbuen día señora, buen día doctor.\nMaldito sea tu amor\ntu inmenso reino y tu ansiado dolor.\n\n¿Qué es lo que quieren de mí,\nqué es lo que quieren saber?\nNo me verás arrodillado.\n\nDicen que ya no soy más yo,\nque estoy más loco que ayer,\ny matan a pobres corazones."
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
    "lyrics": "Yo podría haberlo hecho mejor\nVos podrías acercarte a mí\nYo intuía que esto mi amor\nSe rompía y esto es siempre así\nLa verdad es que todo fue\nTan extraño, tan extraño al fin\nVos buscando el polvo de dios\nYa bebía para irme de aquí\nCada vez que pienso en vos\nFue amor, fue amor\nTodo el mundo me habla de vos\nY no puedo dejar de reír\nLo que haces y a donde vas\nDe tu depto siempre a prix d'ami\nNo esta bien romper un corazón\nMe sacude lo que va a venir\nVos querías verme feliz\nYo quería verme revivir.\nCada vez que pienso en vos\nFue amor, fue amor, (bis)\nEstos días que corren mi amor\nEs aquí que nos toco vivir\nEnredados en los cables de entel\nDe algún sueño vamos a salir\nComo siempre vuelvo a ensayar\nY los pibes siempre están ahí\nHay un boomerang en la city mi amor\nTodo vuelve como vos decís\nCada vez que pienso en vos\nFue amor, fue amor"
  },
  {
    "title": "El viejo",
    "artist": "Pappo's Blues",
    "genre": "Rock Nacional",
    "lyrics": "Qué nos ocurre después de tanto tiempo,\nReflexionamos al vernos al espejo\nQué es lo que pasa, me estoy viniendo viejo,\nNo se ya qué pensar, si ya no se qué es lo que pienso\n\nYo soy un hombre bueno,\nLo que pasa es que me estoy viniendo viejo\nTrataré de hacer las cosas a su tiempo,\nO sino no le daré importancia al cuerpo, oh no\n\nNo puede ser que esto me preocupe,\nSi estoy naciendo, que bueno, que bueno\nPara qué tantos años de experiencia,\nSi justo ahora me doy cuenta que no tengo\n\nYo soy un hombre bueno,\nLo que pasa es que me estoy viniendo viejo\nTrataré de hacer las cosas a su tiempo,\nO sino no le daré importancia al cuerpo"
  },
  {
    "title": "El tren de las 16",
    "artist": "Pappo's Blues",
    "genre": "Rock Nacional",
    "lyrics": "Yo sólo quiero hacerte el amor\nE ir caminando un rato bajo el sol\nY de un momento a otro te diré\nque tengo que dejarte otra vez\npero estaremos juntos hasta el amanecer\nYo tomo el tren que sale a la hora dieciseis.\nQue tengo que dejarte otra vez\npero estaremos juntos hasta el amanecer\nYo tomo el tren que sale a la hora dieciseis."
  },
  {
    "title": "Rock and Roll y fiebre",
    "artist": "Pappo",
    "genre": "Rock Nacional",
    "lyrics": "Ya va a amanecer\ny escucho un rock and roll en la radio,\napago el motor para escucharlo mejor.\nmi articulación se presta para el movimiento,\nmi mano en tu cintura empieza a sentir su sudor.\n\nRock and roll y fiebre, van de la mano los dos,\nrock and roll y fiebre, van de la mano,\nvan de la mano los dos.\n\nLa gente se acercó y empiezan a marcar el paso,\nla luz se apagó, va a comenzar la función.\nMe marca el reloj que sube la temperatura,\ntodo se prepara, esta noche hay rock and roll.\n\nRock and roll y fiebre, van de la mano los dos,\nrock and roll y fiebre, van de la mano,\nvan de la mano los dos.\n\nMe encuentro lejos en la ciudad,\nhay una ruta entre vos y yo,\nno tengo paciencia, no puedo esperar,\nI mean, mother fucker with a vest in alpaca\nrattlesnake boots and 44 from his father.\n\nVa a amanecer\ny escucho un rock and roll en la radio,\napago el motor para escucharlo mejor.\nmi articulación se presta para el movimiento,\nmi mano en tu cintura empieza a sentir su sudor.\n\nRock and roll y fiebre, van de la mano los dos,\nrock and roll y fiebre, van de la mano,\nvan de la mano los dos.\n\nRock and roll y fiebre, van de la mano los dos,\nrock and roll y fiebre, van de la mano,\nvan de la mano los dos."
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
    "lyrics": "No hay que tener un auto\nNi relojes de medio millón\nCuatro empleos bien pagados\nSer un astro de televisión\n\nNo, no, no, no, pibe\nPara que alguien te pueda amar\nPorque, así, solo tendrás\nUn negocio más\n\nNo debes cambiar tu origen\nNi mentir sobre tu identidad\nEs muy triste negar de donde vienes\nLo importante es adonde vas\n\nNo, no, no, no, pibe\nNo lo hagas, que eso está mal\nSi tu madre te escuchara\nMoriría de llorar\n\nNo hay que viajar a Europa\nNi estudiar en la universidad\nTener títulos de nobleza\nO prestigio en la sociedad\n\nNo, no, no, no, pibe\nPara que alguien te pueda amar\nNada de eso es importante\nEn amor, ya lo verás"
  },
  {
    "title": "Jugo de tomate frío",
    "artist": "Manal",
    "genre": "Rock Nacional"
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
    "lyrics": "Me verás volar\nPor la ciudad de la furia\nDonde nadie sabe de mi\nY yo soy parte de todos\n\nNada cambiará\nCon un aviso de curva\nEn sus caras veo el temor\nYa no hay fábulas\nEn la ciudad de la furia\n\nMe verás caer\nComo un ave de presa\nMe verás caer\nSobre terrazas desiertas\nTe desnudaré\nPor las calles azules\nMe refugiaré\nAntes que todos despierten\n\nMe dejarás dormir al amanecer\nEntre tus piernas\nEntre tus piernas\nSabrás ocultarme bien y desaparecer\nEntre la niebla\nEntre la niebla\nUn hombre alado extraña la tierra.\n\nMe verás volar\nPor la ciudad de la furia\nDonde nadie sabe de mi\nY yo soy parte de todos\n\nCon la luz del sol\nSe derriten mis alas\nSolo encuentro en la oscuridad\nLo que me une con la ciudad de la furia\n\nMe verás caer\nComo una flecha salvaje\nMe verás caer\nEntre vuelos fugaces\nBuenos Aires se ve tan susceptible\nEse destino de furia es\nLo que en sus caras persiste\n\nMe dejarás dormir al amanecer\nEntre tus piernas\nEntre tus piernas\nSabrás ocultarme bien y desaparecer\nEntre la niebla\nEntre la niebla\nUn hombre alado prefiere la noche\n\nMe verás volver\nMe verás volver\nA la ciudad de la furia"
  },
  {
    "title": "Sobredosis de TV",
    "artist": "Soda Stereo",
    "genre": "Rock Nacional",
    "lyrics": "Estoy desesperado\nSoy tan vulnerable a su amor\nElla ya se ha ido, un hueco en mi habitacion\nSus manos siguen frias\nHe perdido la fascinacion\nSus rasgos son escombros\nDetienen mi respiracion\nAcuestate-levantate, no puedo seguir asi, oh no\nApagalo-enciendelo, no puedo seguir asi, oh no\n\nSobredosis de T.V., no creo poder resistir\nY un aire demasiado tenso\nSi al menos estuvieras tu aqui\nMi cuerpo procesado\nAl ritmo de tu corazon\nEstoy desesperado\nSoy tan vulnerable a su amor\nAcuestate-levantate, no puedo seguir asi, oh no\nApagalo-enciendelo, no puedo seguir asi, oh no\n\nAcuestate-levantate, no puedo seguir asi, oh no\nApagalo-enciendelo, no puedo seguir asi, oh no\nAcuestate-levantate, apagalo-enciendelo, no puedo seguir asi\nAcuestate-levantate, apagalo-enciendelo\n\nNo puedo seguir marginandome\nNo puedo, no puedo seguir marginandome\nNo puedo seguir marginandome\nOh oh\nOh oh\nOh oh, oh oh"
  },
  {
    "title": "Crimen",
    "artist": "Gustavo Cerati",
    "genre": "Rock Nacional",
    "lyrics": "La espera me agotó\nno se nada de vos\ndejaste tanto en mí\nEn llamas me acosté\ny en un lento degradé\nsupe que te perdí\n¿Qué otra cosa puedo hacer?\nsi no olvido, moriré\ny otro crimen quedará\notro crimen quedará\nsin resolver\nUna rápida traición\ny salimos del amor\ntal vez me lo busqué.\nMi ego va a estallar\nahí donde no estás\noh... los celos otra vez\n¿Qué otra cosa puedo hacer?\nsi no olvido moriré\ny otro crimen quedará\notro crimen quedará\nsin resolver.\nNo lo sé\ncuanto falta no lo sé\nsi es muy tarde no lo sé\nsi no olvido, moriré\nque otra cosa puedo hacer?\nque otra cosa puedo hacer?\nAhora sé lo que es perder\nOtro crimen quedará\notro crimen quedará\nsin resolver"
  },
  {
    "title": "Adiós",
    "artist": "Gustavo Cerati",
    "genre": "Rock Nacional",
    "lyrics": "Suspiraban lo mismo los dos\ny hoy son parte de una lluvia lejos\nno te confundas no sirve el rencor\nson espasmos después del adiós\n\nPonés canciones tristes para sentirte mejor\ntu esencia es más visible,\nDel mismo dolor\nvendrá un nuevo amanecer.\nuuuuh\n\nTal vez colmaban la necesidad\npero hay vacíos que no pueden llenar\nno conocían la profundidad\nhasta que un día no dio para más\nQuedabas esperando ecos que no volverán\nflotando entre rechazos\ndel mismo dolor\nvendrá un nuevo amanecer.\nuuuuh\n\nSepararse de la especie\npor algo superior\nno es soberbia es amor\nno es soberbia es amor\n\nPoder decir adiós\nes crecer\nuuuuh"
  },
  {
    "title": "Ella usó mi cabeza como un revólver",
    "artist": "Soda Stereo",
    "genre": "Rock Nacional",
    "lyrics": "Ella usó mi cabeza como un revolver\nE incendió mi conciencia con sus demonios\nMe vi llegando tarde, tarde a todo\n\nDespués de un baño cerebral\nEstaba listo para ser amado\n\nPasa el tiempo y ahora creo\nQue el vacío es un lugar normal\nElla usó mi cabeza como un revolver\n\nNo creerías las cosas que he hecho por ella\nCobardemente, pero sin vergüenza\nEra una piedra en el agua seca por dentro\n\nAsí se siente cuando la verdad\nEs la palabra sometida\n\nFui tan dócil como un guante y tan sincero como pude\nElla usó mi cabeza como un revolver\n\nNo creerías las cosas que he hecho por ella"
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
    "lyrics": "Lunes por la madrugada yo cierro los ojos y veo tu cara que sonríe cómplice de amor.Días en la carretera yo siento aquí dentro la emoción de haber dejado lo mejor.Yo no sé si es en vano este amor, aquí no hay luces de escena y algo en mí no se serena, no.Yo ya no comprendo nada, tantas caras dibujadas como manchas en una pared.Noches de melancolía pateando en una ciudad vacía en la oscuridad te busco a vos.Quizás hoy si te pueda encontrar, más allá de toda pena siento que la vida es buena.Yo sé que no es en vano este amor..."
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
    "lyrics": "Encontrarte en algún lugar\nAunque sea muy tarde,\nTantos odios para curar,\nTanto amor descartable.\n\nEscucharte a mi lado hablar\nAunque estemos distantes,\nEs el mundo tan poco sensual\nQue no puedo aliviarme.\n\nVos sos mi obsesión,\nQuisiera atraparte.\nVos sos mi destrucción,\nNo puedo dejar de pensar.\n\nTengo que ordenar\nEsta confusión,\nQuiero estar libre\nPara un nuevo amor\n\nEncontrarte en algún lugar\nAunque sea muy tarde,\nTantos odios para curar,\nTanto amor descartable.\n\nEscucharte a mi lado hablar\nAunque estemos distantes,\nEs el mundo tan poco sensual\nQue no puedo aliviarme.\n\nVos sos mi obsesión,\nQuisiera atraparte.\nVos sos mi destrucción,\nNo puedo dejar de pensar.\n\nTengo que ordenar\nEsta confusión,\nQuiero estar libre\nPara un nuevo amor"
  },
  {
    "title": "Heroína",
    "artist": "Sumo",
    "genre": "Rock Nacional"
  },
  {
    "title": "No tan distintos",
    "artist": "Sumo",
    "genre": "Rock Nacional"
  },
  {
    "title": "La rubia tarada",
    "artist": "Sumo",
    "genre": "Rock Nacional"
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
    "lyrics": "Que hay de esa imagen en mi cielo\nno creo ser tan importante\ncamino mi propia luz\ny me siento un haz de luz\nclaridad de propio ser.\nLuz, luz, luz del alma\nsoy un hombre que espera el alba.\nQue hay de esa imgen en mi infierno\nsi ya fui roto a tomar aire\ncaminastes por mis brazas\nme so en la oscuridad\nme estrell contra mi.\nLuz, luz, luz del alma\nsoy un hombre que espera el alba.\nNo confunda che pastor\nno me interesa tu cielo\ntoda el agua va hacia el mar.\nLuz, luz, luz del alma\nsoy un hombre que espera el alba.\nluz, luz, luz del alba\nsoy un hombre que espera el alma."
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
    "lyrics": "Yo podría haberlo hecho mejor\nvos podrías acercarte a mi\nyo intuía que esto, mi amor\nse rompía y esto es siempre así.\n\nLa verdad es que todo fue\ntan extraño, tan extraño al fin.\nVos buscando el polvo de Dios\nyo bebía para irme de aquí.\n\nCada vez que pienso en vos fue amor, fue amor...\nCada vez que pienso en vos fue amor, fue amor...\n\nTodo el mundo me habla de vos\ny puedo dejar de reir\nlo que haces y a donde vas\nde tu depto siempre a Pix D'Ami.\n\nNo está bien romper un corazón\ndeja vú de lo que va a venir\nvos querías verme feliz,\nyo quería verte revivir.\n\nCada vez que pienso en vos fue amor, fue amor...\n\nEstos días que corren, mi amor\nes aquí que nos tocó vivir\nenredados en los cables de Entel\nde algún sueño vamos a salir.\n\nComo siempre vuelvo a ensayar\ny los pibes siempre están ahí\nhay un boomerang en la city, mi amor\ntodo vuelve, como vos decís.\n\nCada vez que pienso en vos fue amor, fue amor"
  },
  {
    "title": "Nada es para siempre",
    "artist": "Fabiana Cantilo",
    "genre": "Rock Nacional",
    "lyrics": "Sin querer, te lastimé.\nSin querer,\nte abandoné.\nSólo sé que yo no sé,\ncuidarte de mi amor.\nNecesito tu perdón,\nnecesito verte hoy.\nSólo sé que yo no sé,\ncuidarte de mi amor.\nSi al final, siempre el tiempo se va,\ndonde caen los días.\nSi al final,\nabrazarse al dolor,\nno nos deja brillar.\nDime que será,\nqué será de los dos\ncuando pase la vida?\nAlgo ocurrirá,\ntengo una sensación,\nuna carta guardadda,\nun buen signo del sol.\nNada es para siempre,\nnada es para siempre.\nNo me digas mi amor,\nque te falta valor,\nporque nada es para siempre.\nSi pudieramos hablar,\nsi pudieramos dejarlo.\nVos sabés que yo no sé,\ncuidarte de mi amor.\nOtra vez me equivoqué,\notra vez te abandoné.\nVos sabés que yo no sé,\ncuidarte de mi amor.\nEl azar nos permite cambiar\nnuestro incierto destino.\nEl temor que nos puede vencer\nsin mirar más allá.\nYo creo que al final,\nnunca sé dónde voy,\npero sigo un camino.\nAlgo ocurrirá, tengo la sensación,\nuna carta marcada,\nun buen signo del sol.\nNada es para siempre,\nnada es para siempre,\nno me digas mi amor,\nque te falta valor, porque nada es para siempre.\nNada es para siempre\nmada es para siempre,\nSi tu risa escapó,\nsi no escuchas mi voz.\nSabés, nada es para siempre...\nTodo vuelve a mí,\nuna vez más.\nTodo vuelve a mí, una vez más...\nUna vez más, me aliviarás, me aliviarás...\nTodo vuelve a mí una vez más,\ntodo vuelve a mí, una vez más...\nTan cerca de mí, un vez más..."
  },
  {
    "title": "Mi enfermedad",
    "artist": "Fabiana Cantilo",
    "genre": "Rock Nacional",
    "lyrics": "Estoy vencido porque el mundo me hizo así\nno puedo cambiar.\nsoy el remedio sin receta y tu amor: mi enfermedad\nestoy vencido porque el cuerpo de los dos es mi debilidad.\nesta vez el dolor va a terminar.\n\nParece que la fiesta terminó\nperdidos en el tunel del amor\ny dicen las hojas del libro que más leo yo\nesta vez el esclavo se escapó.\n\nMe entrego al vino por que el mundo me hizo así\nno puedo cambiar\nsoy el remedio sin receta y tu amor mi enfermedad\nestoy vencido porque el cuerpo de los dos es mi debilidad.\nesta vez el dolor va a terminar.\n\nDel arbol una hoja seca yo\nen mi boca la manzana se pudrió.\ntendrías que aprender a pedir perdón!\nesta vez la cadena se rompió.\n\nTendrías que aprender a pedir perdón!\nesta vez el esclavo se escapó\nestoy vencido porque el mundo me hizo así\nno puedo cambiar.,\nsoy el remedio sin receta y tu amor mi enfermedad\nestoy vencido porque el cuerpo de los dos es mi debilidad.\nesta vez el dolor va a terminar."
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
    "genre": "Rock Nacional"
  },
  {
    "title": "Flaca",
    "artist": "Andrés Calamaro",
    "genre": "Rock Nacional",
    "lyrics": "Flaca, no me claves tus puñales por la espalda\ntan profundo, no me duelen, no me hacen mal.\n\nLejos en el centro de la tierra las raíces del amor\ndonde estaban quedarán.\n\nEntre \"no me olvides\" me dejé nuestros abriles olvidados\nen el fondo del placar del cuarto de invitados\neran tiempos dorados un pasado mejor.\n\nAunque: casi me equivoco y te digo poco a poco no me mientas\nno me digas la verdad no te quedes callada\nno levantes la voz ni me pidas perdón.\n\nAunque: casi te confieso que también he sido un perro compañero\nun perro ideal que aprendió a ladrar\ny a volver al hogar para poder comer.\n\nFlaca no me claves tus puñales\npor la espalda, tan profundo\nno me duelen no me hacen mal.\n\nLejos en el centro de la tierra las raíces\ndel amor, donde estaban\nquedarán."
  },
  {
    "title": "Loco",
    "artist": "Andrés Calamaro",
    "genre": "Rock Nacional",
    "lyrics": "Voy a salir a caminar solito\nsentarme en un parque a fumar un porrito\ny mirar a las palomas comer\nel pan que la gente les tira!\ny reprimir el instinto asesino\ndelante de un mimo o de un clown\nhoy estoy down violento, down radikal\npero tengo aprendido el papel principal\nyo soy un loco\nque se dio cuenta\nque el tiempo es muy poco\nyo soy un loco\nque se dio cuenta\nque el tiempo es muy poco\nnanananana...\n(a lo mejor resulta mejor así)\nyo soy un loco\nque se dio cuenta\nque el tiempo es muy poco\na lo mejor resulta mejor así\nque el tiempo es muy poco."
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
    "lyrics": "1, 2, 3:\n\nI don't wanna wait in vain for your love;\nI don't wanna wait in vain for your love.\nFrom the very first time I rest my eyes on you, girl,\nMy heart says follow t'rough.\nBut I know, now, that I'm way down on your line,\nBut the waitin' feel is fine:\nSo don't treat me like a puppet on a string,\n'Cause I know I have to do my thing.\nDon't talk to me as if you think I'm dumb;\nI wanna know when you're gonna come - soon.\nI don't wanna wait in vain for your love;\nI don't wanna wait in vain for your love;\nI don't wanna wait in vain for your love,\n'Cause if summer is here,\nI'm still waiting there;\nWinter is here,\nAnd I'm still waiting there.\n\n--- Guitar solo ---\n\nLike I said:\nIt's been three years since I'm knockin' on your door,\nAnd I still can knock some more:\nOoh girl, ooh girl, is it feasible?\nI wanna know now, for I to knock some more.\nYa see, in life I know there's lots of grief,\nBut your love is my relief:\nTears in my eyes burn - tears in my eyes burn\nWhile I'm waiting - while I'm waiting for my turn,\nSee!\n\nI don't wanna wait in vain for your love;\nI don't wanna wait in vain for your love;\nI don't wanna wait in vain for your love;\nI don't wanna wait in vain for your love;\nI don't wanna wait in vain for your love, oh!\nI don't wanna - I don't wanna - I don't wanna - I don't wanna -\nI don't wanna wait in vain.\nI don't wanna - I don't wanna - I don't wanna - I don't wanna -\nI don't wanna wait in vain.\nNo, I don't wanna (I don't wanna - I don't wanna - I don't wanna -\nI don't wanna - I don't wanna wait in vain) -\nNo I - no I (I don't wanna - I don't wanna - I don't wanna - I don't\nwanna - I don't wanna wait in vain) -\nNo, no-no, I, no, I (I don't wanna - I don't wanna - I don't wanna -\nI don't wanna - I don't wanna wait in vain) -\nIt's your love that I'm waiting on (I don't wanna - I don't wanna -\nI don't wanna - I don't wanna - I don't wanna wait in vain);\nIt's me love that you're running from.\nIt's Jah love that I'm waiting on (I don't wanna - I don't wanna -\nI don't wanna - I don't wanna - I don't wanna wait in vain);\nIt's me love that you're running from."
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
