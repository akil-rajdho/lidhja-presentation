/* =============================================================
   SLIDES — the content of the presentation.

   You can edit this file directly, OR open editor.html in your
   browser. The editor reads/writes slides.json on disk (via the
   File System Access API) and keeps THIS file in sync so the
   presentation picks up changes on its next reload. There is no
   browser storage involved — the filesystem is the source of truth.

   ── HOW TO EDIT ──

   TOPIC slides use the topic() helper:

     topic(section, slideNum, yearsBP, "YEAR LABEL",
       "Titulli në shqip",
       "English title",
       "Trupi i tekstit në shqip.",
       "Body text in English.")

     • yearsBP   = years before 2026 (e.g. 4_600_000_000, 454, 0)
     • YEAR LABEL = how it shows on the timeline ("4.6 BYA", "1572", "Today")
     • video path is automatic: videos/section<S>/slide<N>.mp4

   FRAME slides (title, toc, section divider, references, end) are
   plain objects. Edit any field directly.

   ── VIDEOS ──

   Every slide can have either:
     • video:  "path/to/clip.mp4"             — a single clip that loops, OR
     • videos: ["path/a.mp4", "path/b.mp4"]   — a playlist that loops one
                                                clip after the other.
   If neither is set (or the file is missing), the procedural starfield
   fallback takes over.
   ============================================================= */


/* -------- Topic helper (do not edit) -------- */
function topic(section, num, yearsBP, yearLabel, titleSq, titleEn, bodySq, bodyEn) {
  return {
    type: "topic",
    section, num,
    yearsBP, yearLabel,
    video: `videos/section${section}/slide${num}.mp4`,
    eyebrow: `SEKSIONI ${String(section).padStart(2,"0")} · ${String(num).padStart(2,"0")}`,
    titleSq, titleEn, bodySq, bodyEn,
    label: `SEKSIONI ${String(section).padStart(2,"0")}`
  };
}


/* -------- The slides, in order -------- */
const SLIDES = [

  /* ---------- TITLE ---------- */
  {
    type: "title",
    video: "videos/title.mp4",
    yearsBP: 4_600_000_000, yearLabel: "4.6 BYA",
    eyebrow: "ARKITEKTURA",
    titleSq: "e Universit",
    titleEn: "The Architecture of the Universe",
    ledeSq: "Një udhëtim personal nëpër kohë, hapësirë dhe yje — nga formimi i Tokës deri te përbindëshat e kozmosit.",
    ledeEn: "A personal journey through time, space and stars — from the formation of Earth to the monsters of the cosmos.",
    author: "Prepared by Akil Rajdho",
    label: "ASTROFIZIKË · LIDHJA"
  },

  /* ---------- TOC ---------- */
  {
    type: "toc",
    video: "videos/toc.mp4",
    yearsBP: null, yearLabel: "—",
    eyebrow: "PËRMBAJTJA · CONTENTS",
    titleSq: "Katër seksione, një histori.",
    titleEn: "Four sections, one story.",
    items: [
      { num: "01", sq: "Si u formua Toka",                 en: "How Earth Was Formed" },
      { num: "02", sq: "Shpikje të zgjuara",               en: "Clever Inventions" },
      { num: "03", sq: "Shpejtësia e dritës, graviteti dhe koha", en: "Speed of Light, Gravity and Time" },
      { num: "04", sq: "Përbindëshat e universit",         en: "Monsters of the Universe" }
    ],
    label: "PËRMBAJTJA"
  },

  /* ===================== SECTION 01 ===================== */
  {
    type: "section",
    section: 1,
    video: "videos/section1/section.mp4",
    yearsBP: 4_600_000_000, yearLabel: "4.6 BYA",
    numeral: "01",
    eyebrow: "SEKSIONI I PARË",
    titleSq: "Si u formua Toka",
    titleEn: "How Earth Was Formed",
    label: "SEKSIONI 01"
  },

  topic(1, 1, 4_600_000_000, "4.6 BYA",
    "4.6 miliardë vite më parë: Pikënisja",
    "4.6 billion years ago: The starting point",
    "Në një cep të një reje gjigante gazi e pluhuri kozmik, gravitiet filloi punën e tij. Materia u tërhoq bashkë rreth një ylli të ri — Diellit tonë — dhe diskut që e rrethonte i lindën embrionet e planetëve.",
    "In a corner of a giant cloud of cosmic gas and dust, gravity began its work. Matter pulled together around a new star — our Sun — and from its surrounding disk the embryos of planets were born."),

  topic(1, 2, 4_550_000_000, "4.55 BYA",
    "Lindja e planetit",
    "Birth of the planet",
    "Copa shkëmbi e metali u përplasën dhe u bashkuan për miliona vite, duke formuar një botë të shkrirë në zjarr. Toka e re ishte një top i kuq, e mbuluar nga magma dhe e bombarduar pa pushim.",
    "Pieces of rock and metal collided and merged for millions of years, forming a world molten in fire. The young Earth was a red sphere, covered in magma and ceaselessly bombarded."),

  topic(1, 3, 4_500_000_000, "4.5 BYA",
    "Ferri i parë",
    "The first hell",
    "Hadeani — emër i marrë nga Hadi, perëndia i nëntokës. Nuk kishte oqeane, nuk kishte ajër që të mund të merrej frymë, vetëm shkëmb i shkrirë dhe një qiell i kuq nga rrezatimi.",
    "The Hadean — named after Hades, god of the underworld. There were no oceans, no breathable air, only molten rock and a sky red with radiation."),

  topic(1, 4, 4_510_000_000, "4.51 BYA",
    "Përplasja që krijoi Hënën",
    "The collision that created the Moon",
    "Një planet i ri sa Marsi, i quajtur Theia, u përplas me Tokën. Materia që u shpërnda në hapësirë formoi Hënën — shoqëruesin tonë të përjetshëm.",
    "A young planet the size of Mars, called Theia, collided with Earth. The matter scattered into space formed the Moon — our eternal companion."),

  topic(1, 5, 4_100_000_000, "4.1 BYA",
    "Bombardimi që solli ujin",
    "The bombardment that brought water",
    "Kometa dhe asteroidë akulli ranë mbi Tokë gjatë 'Bombardimit të Madh të Vonshëm'. Bashkë me ta erdhi uji që do të bëhej oqeanet e botës sonë.",
    "Comets and icy asteroids fell on Earth during the Late Heavy Bombardment. With them came the water that would become our oceans."),

  topic(1, 6, 4_000_000_000, "4.0 BYA",
    "Toka fillon të ftohet",
    "Earth begins to cool",
    "Pas qindra milionave vitesh, sipërfaqja u tha mjaftueshëm sa avujt të kondensohen. Shi i pafund ra për mijëra vite — oqeanet u lindën.",
    "After hundreds of millions of years, the surface cooled enough for vapors to condense. Endless rain fell for thousands of years — oceans were born."),

  topic(1, 7, 3_800_000_000, "3.8 BYA",
    "Ishujt e parë vullkanikë",
    "The first volcanic islands",
    "Vullkanet shpërthejnë sipër ujit dhe ngrenë tokën e parë të fortë. Kjo është Toka në hapat e saj të parë drejt formës që njohim sot.",
    "Volcanoes erupt above water and raise the first solid land. This is Earth taking its first steps toward the form we know today."),

  topic(1, 8, 3_500_000_000, "3.5 BYA",
    "Jeta fillon nën dallgë",
    "Life begins under the waves",
    "Në hapësirat e ngrohta të oqeanit, molekulat e thjeshta u bashkuan dhe formuan format e para të jetës. Bakteret e thjeshta filluan një udhëtim 3.5 miliardë vjeçar.",
    "In the warm spaces of the ocean, simple molecules joined and formed the first forms of life. Simple bacteria began a 3.5-billion-year journey."),

  topic(1, 9, 2_400_000_000, "2.4 BYA",
    "Stromatolitët dhe Revolucioni i oksigjenit",
    "Stromatolites and the Oxygen Revolution",
    "Cianobakteret krijuan formacione gurore të quajtura stromatolitë dhe filluan të lëshojnë oksigjen si mbeturinë. Ky 'helm' do të ndryshonte përgjithmonë atmosferën.",
    "Cyanobacteria created stone formations called stromatolites and began releasing oxygen as waste. This poison would forever change the atmosphere."),

  topic(1, 10, 1_100_000_000, "1.1 BYA",
    "Superkontinenti Rodinia",
    "The Rodinia supercontinent",
    "Të gjitha tokat u bashkuan në një superkontinent të vetëm, Rodinia. Por toka kurrë nuk pushon — pllakat tektonike përsëri do ta ndajnë atë.",
    "All lands joined into a single supercontinent, Rodinia. But Earth never rests — tectonic plates would once again tear it apart."),

  topic(1, 11, 720_000_000, "720 MYA",
    "Toka Topi i Borës dhe Shkrirja e madhe",
    "Snowball Earth and the Great Thaw",
    "Toka u mbulua nga akulli nga poli në pol, një top i bardhë në hapësirë. Por vullkanet ngrohnë atmosferën dhe e shkrijnë akullin — jeta i shpëton zhdukjes.",
    "Earth was covered in ice from pole to pole, a white ball in space. But volcanoes warmed the atmosphere and melted the ice — life escaped extinction."),

  topic(1, 12, 600_000_000, "600 MYA",
    "Shtresa e ozonit — mburoja jonë",
    "The ozone layer — our shield",
    "Oksigjeni në lartësi u shndërrua në ozon dhe formoi një mburojë kundër rrezatimit ultravjollcë. Pa këtë shtresë, jeta në sipërfaqe nuk do të ishte e mundur.",
    "Oxygen at high altitude transformed into ozone and formed a shield against ultraviolet radiation. Without this layer, surface life would not be possible."),

  topic(1, 13, 540_000_000, "540 MYA",
    "Eksplozioni Kambrian — jeta shpërthen",
    "The Cambrian Explosion — life explodes",
    "Brenda disa milionave vitesh — një 'çast' në historinë e Tokës — u shfaqën pothuajse të gjitha llojet kryesore të kafshëve. Diversiteti shpërtheu si fishekzjarrë.",
    "Within a few million years — an instant in Earth history — almost all major animal groups appeared. Diversity exploded like fireworks."),

  topic(1, 14, 470_000_000, "470 MYA",
    "Pushtimi i tokës — bimët e para",
    "Conquering the land — the first plants",
    "Algat u thanë dhe morën formë në bimë të vogla që sulmuan tokën. Toka e zhveshur u mbulua me të gjelbër për herë të parë.",
    "Algae dried out and took form as small plants that invaded the land. The bare earth turned green for the first time."),

  topic(1, 15, 360_000_000, "360 MYA",
    "Pyjet e mbarsura dhe krijimi i qymyrit",
    "Lush forests and the creation of coal",
    "Pyje gjigante drurësh fierash mbuluan kontinentet. Kur ranë dhe u groposën, dhuruan qymyrin që do të ushqente revolucionin industrial.",
    "Giant forests of fern-trees covered the continents. When they fell and were buried, they gifted the coal that would fuel the industrial revolution."),

  topic(1, 16, 252_000_000, "252 MYA",
    "Zhdukja e Madhe Permiane",
    "The Great Permian Extinction",
    "Vullkanet e Siberisë shpërthyen për një milion vit dhe vranë 96% të të gjitha specieve detare. Toka erdhi pranë vdekjes së plotë.",
    "Siberian volcanoes erupted for a million years and killed 96% of all marine species. Earth came close to total death."),

  topic(1, 17, 230_000_000, "230 MYA",
    "Mbretëria e dinozaurëve",
    "The reign of the dinosaurs",
    "Nga reptilët e mbijetuar, dinozaurët u ngritën dhe sunduan tokën për 165 milionë vite — më gjatë se çdo grup tjetër kafshësh të mëdha në histori.",
    "From the surviving reptiles, dinosaurs rose and ruled the land for 165 million years — longer than any other group of large animals in history."),

  topic(1, 18, 66_000_000, "66 MYA",
    "Asteroidi që mbylli një epokë",
    "The asteroid that ended an era",
    "Para 66 milionë vitesh, një shkëmb 10 km i gjerë ra në Meksikë me energji prej 10 miliardë bombash atomike. Nata pushtoi botën për muaj.",
    "66 million years ago, a 10 km wide rock fell in Mexico with the energy of 10 billion atomic bombs. Night took over the world for months."),

  topic(1, 19, 66_000_000, "66 MYA",
    "Fundi i dinozaurëve",
    "The end of the dinosaurs",
    "75% e specieve u zhdukën. Vetëm zogjtë — dinozaurë të vegjël me pendë — mbijetuan. Bota u zbraz dhe priti gjeneratën e ardhshme.",
    "75% of species went extinct. Only birds — small feathered dinosaurs — survived. The world emptied and awaited the next generation."),

  topic(1, 20, 60_000_000, "60 MYA",
    "Ngrihen gjitarët",
    "The rise of mammals",
    "Gjitarët e vegjël që fshiheshin nën këmbët e dinozaurëve dolën në dritë. Ata u rritën, u diversifikuan dhe morën në zotërim planetin.",
    "Small mammals that hid under the dinosaurs feet emerged into the light. They grew, diversified, and took ownership of the planet."),

  topic(1, 21, 70_000, "70 KYA",
    "Homo sapiens lë Afrikën",
    "Homo sapiens leaves Africa",
    "Para 70,000 vjetësh, paraardhësit tanë lanë Afrikën dhe pushtuan çdo cep të planetit. Një lloj i ri po shkruante historinë e vet.",
    "70,000 years ago, our ancestors left Africa and conquered every corner of the planet. A new species was writing its own history."),

  topic(1, 22, 20_000, "20 KYA",
    "Era e fundit e akullit",
    "The final ice age",
    "Akullnajat zbritën sërish nga veriu. Njerëzit gjuetuan mamuthë dhe gdhendën vepra arti nëpër shpella — shenjat e para të një mendje që pyeste.",
    "Glaciers descended again from the north. Humans hunted mammoths and carved art in caves — the first signs of a mind that questioned."),

  topic(1, 23, 0, "Today",
    "Toka e sotme",
    "Today's Earth",
    "Një planet i ngrohtë, i lëngshëm, i mbushur me jetë. Një kornizë e brishtë në një univers ftohtë. Shtëpia jonë — për tani.",
    "A warm, liquid planet, filled with life. A fragile frame in a cold universe. Our home — for now."),

  /* ===================== SECTION 02 ===================== */
  {
    type: "section",
    section: 2,
    video: "videos/section2/section.mp4",
    yearsBP: 2266, yearLabel: "240 BCE",
    numeral: "02",
    eyebrow: "SEKSIONI I DYTË",
    titleSq: "Shpikje të zgjuara",
    titleEn: "Clever Inventions",
    label: "SEKSIONI 02"
  },

  topic(2, 1, 2266, "240 BCE",
    "Eratosteni mat Tokën (240 p.e.s.)",
    "Eratosthenes measures the Earth (240 BC)",
    "Me një kuptim të thjeshtë gjeometrie, hijesh dhe një puse në Aswan, Eratosteni llogariti perimetrin e Tokës me një gabim më pak se 2%. Asnjë teleskop. Vetëm logjikë.",
    "With a simple understanding of geometry, shadows, and a well in Aswan, Eratosthenes calculated Earth circumference with less than 2% error. No telescope. Just logic."),

  topic(2, 2, 2376, "350 BCE",
    "Hijet që zbuluan formën e planetit",
    "The shadows that revealed the planet shape",
    "Gjatë eklipseve hënore, hija e Tokës mbi Hënë është gjithmonë e rrumbullakët. Vetëm një sferë jep hije rrethore nga çdo kënd.",
    "During lunar eclipses, Earth shadow on the Moon is always round. Only a sphere casts a circular shadow from every angle."),

  topic(2, 3, 1876, "150 CE",
    "Toka në qendër — modeli i lashtë",
    "Earth at the center — the ancient model",
    "Për 1,500 vjet, njerëzimi besoi se Toka qëndronte në qendër dhe gjithçka rrotullohej rreth saj. Një ide e ngrohtë, por e gabuar.",
    "For 1,500 years, humanity believed Earth stood at the center and everything revolved around it. A comforting idea, but wrong."),

  topic(2, 4, 454, "1572",
    "Supernova e 1572",
    "The supernova of 1572",
    "Tycho Brahe vëzhgoi një yll të ri që u shfaq në qiell — diçka që nuk duhej të ndodhte në një univers 'të përsosur dhe të pandryshueshëm'. Bota e vjetër filloi të çahej.",
    "Tycho Brahe observed a new star that appeared in the sky — something that should not happen in a perfect and unchanging universe. The old world began to crack."),

  topic(2, 5, 450, "1576",
    "Thomas Digges dhe universi pa fund",
    "Thomas Digges and the infinite universe",
    "Para asnjë teleskopi, Digges sugjeroi se yjet janë diej të largët dhe se universi shtrihet pa fund. Një ide e guximshme në një kohë kur kjo dukej herezi.",
    "Before any telescope, Digges suggested that stars are distant suns and the universe extends without end. A bold idea in a time when this seemed heresy."),

  topic(2, 6, 417, "1609",
    "Galileo dhe teleskopi i parë",
    "Galileo and the first telescope",
    "Më 1609, Galileo drejtoi një tub me xhama drejt qiellit dhe pa hënat e Jupiterit. Për herë të parë, dikush dëshmoi se jo gjithçka rrotullohej rreth Tokës.",
    "In 1609, Galileo pointed a tube with lenses at the sky and saw Jupiter moons. For the first time, someone witnessed that not everything revolves around Earth."),

  topic(2, 7, 355, "1671",
    "Newton shpik teleskopin reflektues (1671)",
    "Newton invents the reflecting telescope (1671)",
    "Newton zëvendësoi xhamin me një pasqyrë. Ky është dizajni që përdoret ende sot në teleskopët më të mëdhenj në botë.",
    "Newton replaced the lens with a mirror. This is the design still used today in the largest telescopes in the world."),

  topic(2, 8, 245, "1781",
    "William dhe Caroline Herschel",
    "William and Caroline Herschel",
    "Vëlla e motër, ata ndërtuan teleskopët më të mëdhenj të kohës dhe katalogjuan mijëra objekte qiellore. Caroline u bë gruaja e parë astronome profesionale.",
    "Brother and sister, they built the largest telescopes of their time and catalogued thousands of celestial objects. Caroline became the first professional female astronomer."),

  topic(2, 9, 241, "1785",
    "Harta e parë e Rrugës së Qumështit",
    "The first map of the Milky Way",
    "Herschel numëroi yjet në çdo drejtim dhe vizatoi formën e galaktikës tonë — një disk i sheshtë me një bisht. Hera e parë që pamë veten nga jashtë.",
    "Herschel counted stars in every direction and drew the shape of our galaxy — a flat disk with a tail. The first time we saw ourselves from outside."),

  topic(2, 10, 188, "1838",
    "Bessel dhe metoda e paralaksit",
    "Bessel and the parallax method",
    "Duke matur lëvizjen e dukshme të një ylli ndërsa Toka rrotullohet rreth Diellit, Bessel llogariti distancën e tij. Universi ishte më i madh se çdo gjë e imagjinuar më parë.",
    "By measuring a star apparent motion as Earth orbits the Sun, Bessel calculated its distance. The universe was larger than anything previously imagined."),

  topic(2, 11, 118, "1908",
    "Henrietta Leavitt dhe yjet pulsuese",
    "Henrietta Leavitt and the pulsing stars",
    "Leavitt zbuloi se disa yje pulsojnë me një ritëm që tregon shkëlqimin e tyre të vërtetë. Ky ishte 'metri' që do të lejonte matjen e universit.",
    "Leavitt discovered that some stars pulse at a rhythm that reveals their true brightness. This was the ruler that would allow measuring the universe."),

  topic(2, 12, 106, "1920",
    "Debati i madh: një galaktikë apo shumë?",
    "The Great Debate: one galaxy or many?",
    "Më 1920, astronomët debatuan publikisht: a është Rruga e Qumështit i gjithë universi, apo ka galaktika të tjera? Përgjigja erdhi pak vite më vonë.",
    "In 1920, astronomers publicly debated: is the Milky Way the entire universe, or are there other galaxies? The answer came a few years later."),

  topic(2, 13, 103, "1923",
    "Hubble dhe Andromeda (1923)",
    "Hubble and Andromeda (1923)",
    "Hubble mati distancën deri tek Andromeda dhe vërtetoi se ajo është një galaktikë tjetër, e largët miliona vite drite. Universi sapo ishte rritur miliarda herë.",
    "Hubble measured the distance to Andromeda and proved it is another galaxy, millions of light-years away. The universe had just grown billions of times larger."),

  topic(2, 14, 97, "1929",
    "Universi po zgjerohet",
    "The universe is expanding",
    "Hubble vuri re se galaktikat e largëta po largoheshin nga ne — sa më larg, aq më shpejt. Universi nuk është statik; ai po fryhet si një tullumbace.",
    "Hubble noticed that distant galaxies were moving away from us — the farther, the faster. The universe is not static; it is inflating like a balloon."),

  topic(2, 15, 36, "1990",
    "Teleskopi Hapësinor Hubble (1990)",
    "The Hubble Space Telescope (1990)",
    "Mbi atmosferë, pa shtrembërim, Hubble na dha imazhet më të bukura të universit. Një dritare që ende qëndron e hapur drejt thellësive.",
    "Above the atmosphere, without distortion, Hubble gave us the most beautiful images of the universe. A window that still stands open to the depths."),

  /* ===================== SECTION 03 ===================== */
  {
    type: "section",
    section: 3,
    video: "videos/section3/section.mp4",
    yearsBP: 388, yearLabel: "1638",
    numeral: "03",
    eyebrow: "SEKSIONI I TRETË",
    titleSq: "Shpejtësia e dritës, graviteti dhe koha",
    titleEn: "Speed of Light, Gravity and Time",
    label: "SEKSIONI 03"
  },

  topic(3, 1, 388, "1638",
    "Galileo provon të masë shpejtësinë e dritës",
    "Galileo tries to measure the speed of light",
    "Me dy fenerë dhe dy kodra, Galileo u përpoq të masë sa shpejt udhëton drita. Ai dështoi — drita ishte shumë e shpejtë. Por pyetja e duhur ishte bërë.",
    "With two lanterns and two hills, Galileo tried to measure how fast light travels. He failed — light was too fast. But the right question had been asked."),

  topic(3, 2, 161, "1865",
    "Maxwell — drita është valë elektromagnetike",
    "Maxwell — light is an electromagnetic wave",
    "Më 1865, Maxwell zbuloi se drita është një valë e elektricitetit dhe magnetizmit që lëviz me një shpejtësi të caktuar. Drita kishte gjetur natyrën e saj.",
    "In 1865, Maxwell discovered that light is a wave of electricity and magnetism moving at a fixed speed. Light had found its nature."),

  topic(3, 3, 43, "1983",
    "299,792,458 m/s — kufiri kozmik",
    "299,792,458 m/s — the cosmic speed limit",
    "Asgjë me masë nuk mund të arrijë këtë shpejtësi. Drita është ligji më i shenjtë i universit — kufiri që nuk thyhet.",
    "Nothing with mass can reach this speed. Light is the most sacred law of the universe — the limit that cannot be broken."),

  topic(3, 4, 0, "Today",
    "Të shikosh larg do të thotë të shikosh prapa në kohë",
    "Looking out is looking back in time",
    "Drita e Diellit na arrin pas 8 minutash. Drita nga Andromeda — pas 2.5 milionë vjetësh. Sa më thellë shikon në univers, aq më e re sheh se ai ka qenë.",
    "Sunlight reaches us 8 minutes later. Light from Andromeda — 2.5 million years later. The deeper you look into the universe, the younger you see it."),

  topic(3, 5, 339, "1687",
    "Newton dhe ligji i gravitetit (1687)",
    "Newton and the law of gravity (1687)",
    "Një mollë, një Hënë — të dyja bien drejt Tokës. Newton tregoi se i njëjti ligj sundon nga toka deri tek qiejt. Universi u bë i njëjtë kudo.",
    "An apple, a Moon — both fall toward Earth. Newton showed that the same law rules from the ground to the heavens. The universe became the same everywhere."),

  topic(3, 6, 121, "1905",
    "Einstein dhe Relativiteti special (1905)",
    "Einstein and Special Relativity (1905)",
    "Një punonjës i ri patentash në Zvicër pyeti: çfarë ndodh nëse vrapon pas një rrezeje drite? Përgjigja shkatërroi kohën dhe hapësirën që dinim.",
    "A young patent clerk in Switzerland asked: what happens if you run after a light beam? The answer destroyed the time and space we knew."),

  topic(3, 7, 121, "1905",
    "E = mc² — energjia dhe masa janë një gjë e vetme",
    "E = mc² — energy and mass are one and the same",
    "Masa është energji e ngrirë. Energjia është masë në lëvizje. Një ekuacion i vogël që shpjegon dritën e yjeve dhe fuqinë e bombës atomike.",
    "Mass is frozen energy. Energy is mass in motion. A small equation that explains starlight and atomic bombs."),

  topic(3, 8, 121, "1905",
    "Sa më shpejt lëviz, aq më ngadalë rrjedh koha",
    "The faster you move, the slower time flows",
    "Një udhëtar në një anije kozmike që lëviz pranë shpejtësisë së dritës do të plakej më ngadalë se familja e tij në Tokë. Koha nuk është universale.",
    "A traveler in a spaceship moving near the speed of light would age slower than their family on Earth. Time is not universal."),

  topic(3, 9, 111, "1915",
    "Relativiteti i përgjithshëm (1915)",
    "General Relativity (1915)",
    "Einstein zgjeroi teorinë e tij dhe shpjegoi gravitetin si lakim të vetë hapësirës dhe kohës. Universi mori një gjeometri të re.",
    "Einstein expanded his theory and explained gravity as a curving of space and time themselves. The universe took a new geometry."),

  topic(3, 10, 111, "1915",
    "Masa lakon hapësirën-kohë",
    "Mass curves spacetime",
    "Toka ndjek lakimin e krijuar nga Dielli. Hëna ndjek lakimin e Tokës. Graviteti nuk është një forcë — është forma e hapësirës.",
    "Earth follows the curvature created by the Sun. The Moon follows Earth curvature. Gravity is not a force — it is the shape of space."),

  topic(3, 11, 55, "1971",
    "Koha ngadalësohet në gravitet të fortë",
    "Time slows down in strong gravity",
    "Pranë një vrime të zezë, një sekondë mund të zgjasë sa një vit në Tokë. Sateliti GPS duhet të rregullojë orët e tij për shkak të kësaj.",
    "Near a black hole, one second can last as long as a year on Earth. GPS satellites must adjust their clocks because of this."),

  topic(3, 12, 11, "2015",
    "Valët gravitacionale",
    "Gravitational waves",
    "Kur dy vrima të zeza përplasen, ato shkundin hapësirën-kohë si një gur që bie në ujë. Më 2015, ne dëgjuam këtë muzikë për herë të parë.",
    "When two black holes collide, they shake spacetime like a stone falling into water. In 2015, we heard this music for the first time."),

  /* ===================== SECTION 04 ===================== */
  {
    type: "section",
    section: 4,
    video: "videos/section4/section.mp4",
    yearsBP: 972, yearLabel: "1054",
    numeral: "04",
    eyebrow: "SEKSIONI I KATËRT",
    titleSq: "Përbindëshat e universit",
    titleEn: "Monsters of the Universe",
    label: "SEKSIONI 04"
  },

  topic(4, 1, 972, "1054",
    "Çfarë është një supernova dhe llojet e ndryshme?",
    "What is a supernova and its different types?",
    "Vdekja e dhunshme e një ylli. Në disa sekonda, ai lëshon më shumë energji sesa Dielli në gjithë jetën e tij. Disa lloje shkrihen nga ngjeshja; të tjerët nga vjedhja.",
    "The violent death of a star. In seconds, it releases more energy than the Sun in its entire life. Some types collapse from compression; others from theft."),

  topic(4, 2, 0, "Today",
    "Yje që shpërthejnë — pa to nuk do të ekzistonim",
    "Exploding stars — without them we wouldn't exist",
    "Hekuri në gjakun tonë, kalciumi në kockat tona, ari në unazat tona — të gjitha u krijuan në zemrat e yjeve që shpërthyen. Jemi pluhur ylli.",
    "The iron in our blood, calcium in our bones, gold in our rings — all created in the hearts of stars that exploded. We are stardust."),

  topic(4, 3, 0, "Today",
    "Çfarë mbetet pas një supernove?",
    "What remains after a supernova?",
    "Sipas masës fillestare të yllit, mund të mbetet një yll neutronik i ngjeshur, ose një vrimë e zezë që gëlltit dritën. Asnjë nga këto nuk është më yll në kuptimin e zakonshëm.",
    "Depending on the star initial mass, what remains can be a compressed neutron star, or a black hole that swallows light. Neither is a star in the usual sense."),

  topic(4, 4, 92, "1934",
    "Yjet neutronikë",
    "Neutron stars",
    "Një top me diametër 20 km që përmban masën e Diellit. Një lugë çaji prej kësaj materie do të peshonte një miliard tonë.",
    "A ball 20 km in diameter containing the mass of the Sun. A teaspoon of this matter would weigh a billion tons."),

  topic(4, 5, 59, "1967",
    "Pulsarët",
    "Pulsars",
    "Yje neutronikë që rrotullohen qindra herë në sekondë dhe lëshojnë rreze drite si fenerët e detit. Kur i zbuluam, menduam se ishin sinjale alienësh.",
    "Neutron stars spinning hundreds of times per second, emitting light beams like lighthouses. When we first detected them, we thought they were alien signals."),

  topic(4, 6, 47, "1979",
    "Magnetarët — objektet më magnetike të njohura",
    "Magnetars — the most magnetic known objects",
    "Yje neutronikë me fusha magnetike kuadrilion herë më të forta se Toka. Nga distanca e Hënës, do t'i shkriste të gjitha kartat tona të kreditit.",
    "Neutron stars with magnetic fields a quadrillion times stronger than Earth. From the Moon distance, they would erase every credit card we own."),

  topic(4, 7, 63, "1963",
    "Kuasarët — drita më e ndritshme në univers",
    "Quasars — the brightest light in the universe",
    "Vrima të zeza supermasive që gëlltisin yje të tërë, duke lëshuar dritë që mund të shihet nga skaji i universit të vrojtuar.",
    "Supermassive black holes devouring entire stars, releasing light visible from the edge of the observable universe."),

  topic(4, 8, 7, "2019",
    "Vrimat e zeza supermasive — gjigantët në qendër",
    "Supermassive black holes — giants at the center",
    "Në qendër të çdo galaktike fle një gjigant me masën e miliona apo miliarda diejve. Rruga jonë e Qumështit ka 'Sagittarius A*' — të heshtur, por jo të vdekur.",
    "At the center of every galaxy sleeps a giant with the mass of millions or billions of suns. Our Milky Way has Sagittarius A* — silent, but not dead."),

  /* ---------- REFERENCES ---------- */
  {
    type: "references",
    video: "videos/references.mp4",
    yearsBP: 0, yearLabel: "Today",
    eyebrow: "REFERENCAT · REFERENCES",
    titleSq: "Burimet që frymëzuan këtë udhëtim.",
    titleEn: "The sources that inspired this journey.",
    refs: [
      "https://www.youtube.com/watch?v=pN7VQas4OgQ",
      "https://www.youtube.com/watch?v=ViM-Uc4Ghxk",
      "https://www.youtube.com/watch?v=EPGcfFOR1gg",
      "https://www.youtube.com/watch?v=gW3vVlFRVhw",
      "https://www.youtube.com/watch?v=Rc7OHXJtWco",
      "https://www.youtube.com/watch?v=KZX_c6zfJ2w",
      "https://www.youtube.com/watch?v=g8ZO5XvHORI",
      "https://www.youtube.com/watch?v=uSMGENDH_QI",
      "https://www.youtube.com/watch?v=aICaAEXDJQQ",
      "https://www.youtube.com/watch?v=tdXyOWtf9ug",
      "https://www.youtube.com/watch?v=tpWaAESy6RE",
      "https://www.youtube.com/watch?v=yG-0ccFbCu0",
      "https://www.youtube.com/watch?v=9g01PQAEIZY",
      "https://open.spotify.com/episode/0lmJenV6c0Y55KcFZzRpdA"
    ],
    label: "REFERENCAT"
  },

  /* ---------- END ---------- */
  {
    type: "end",
    video: "videos/end.mp4",
    yearsBP: 0, yearLabel: "Today",
    eyebrow: "FUND · END",
    titleSq: "Falemënderit.",
    titleEn: "Thank you.",
    ledeSq: "— Lidhja · Arkitektura e Universit —",
    label: "FUND"
  }
];

/* Expose for the editor and for the presentation. */
if (typeof window !== "undefined") {
  window.DEFAULT_SLIDES = SLIDES;
}
