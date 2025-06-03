"use client";

export default function Page() {
  return (
    <div className="bg-black p-6 md:p-12 min-h-screen flex justify-center">
      <div className="max-w-[800px] w-full flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-col items-center justify-center pb-5 border-b border-[#D39865] mb-[50px] w-full">
          <p className="text-[20px] text-white text-center font-light">
            Forbes
          </p>
          <p className="text-[30px] text-white text-center font-bold tracking-wider">
            BUSINESS
          </p>
          <p className="text-[30px] text-white text-center font-bold tracking-wider">
            CLUB
          </p>
        </div>

        {/* Greeting */}
        <div className="text-[28px] text-white pb-4 font-light">Kedves X!</div>

        {/* Introduction */}
        <div className="text-[14px] text-[#D4D4D4] text-center max-w-[600px] border-b border-[#333333] pb-12">
          Köszönjük, hogy időt szántál az adaptív vezetői önértékelés
          kitöltésére. Az alábbi eredményt kaptad, amely bemutatja, hogyan
          teljesítesz a különböző vezetői dimenziókban:
        </div>

        {/* Bar chart part */}
        <div className="py-[60px] border-b border-[#333333] w-full">
          <div className="grid grid-cols-8 gap-3 w-full h-[320px]">
            {/* Bar 1 */}
            <div className="bar_part flex flex-col items-center h-full">
              <div className="percentage text-[#D4D4D4] text-sm md:text-base mb-2">
                86.7%
              </div>
              <div className="flex-1 w-full flex flex-col justify-end">
                <div
                  className="w-full bg-[#C69C6D]"
                  style={{ height: `${190 * 0.867}px` }}
                ></div>
              </div>
              <div className="percentage text-[#D4D4D4] text-[10px] md:text-xs -rotate-45 text-nowrap w-fit mt-[30px]">
                Inspiráló víziónárius
              </div>
            </div>

            {/* Bar 2 */}
            <div className="bar_part flex flex-col items-center h-full">
              <div className="percentage text-[#D4D4D4] text-sm md:text-base mb-2">
                73.3%
              </div>
              <div className="flex-1 w-full flex flex-col justify-end">
                <div
                  className="w-full bg-[#C69C6D]"
                  style={{ height: `${190 * 0.733}px` }}
                ></div>
              </div>
              <div className="percentage text-[#D4D4D4] text-[10px] md:text-xs -rotate-45 text-nowrap w-fit mt-[30px]">
                Elemző stratégia
              </div>
            </div>

            {/* Bar 3 */}
            <div className="bar_part flex flex-col items-center h-full">
              <div className="percentage text-[#D4D4D4] text-sm md:text-base mb-2">
                80.0%
              </div>
              <div className="flex-1 w-full flex flex-col justify-end">
                <div
                  className="w-full bg-[#C69C6D]"
                  style={{ height: `${190 * 0.8}px` }}
                ></div>
              </div>
              <div className="percentage text-[#D4D4D4] text-[10px] md:text-xs -rotate-45 text-nowrap w-fit mt-[30px]">
                Új technológiákat
              </div>
            </div>

            {/* Bar 4 */}
            <div className="bar_part flex flex-col items-center h-full">
              <div className="percentage text-[#D4D4D4] text-sm md:text-base mb-2">
                66.7%
              </div>
              <div className="flex-1 w-full flex flex-col justify-end">
                <div
                  className="w-full bg-[#C69C6D]"
                  style={{ height: `${190 * 0.667}px` }}
                ></div>
              </div>
              <div className="percentage text-[#D4D4D4] text-[10px] md:text-xs -rotate-45 text-nowrap w-fit mt-[30px]">
                Operatív kiválóság
              </div>
            </div>

            {/* Bar 5 */}
            <div className="bar_part flex flex-col items-center h-full">
              <div className="percentage text-[#D4D4D4] text-sm md:text-base mb-2">
                93.3%
              </div>
              <div className="flex-1 w-full flex flex-col justify-end">
                <div
                  className="w-full bg-[#C69C6D]"
                  style={{ height: `${190 * 0.933}px` }}
                ></div>
              </div>
              <div className="percentage text-[#D4D4D4] text-[10px] md:text-xs -rotate-45 text-nowrap w-fit mt-[30px]">
                Kapcsolatvarázló
              </div>
            </div>

            {/* Bar 6 */}
            <div className="bar_part flex flex-col items-center h-full">
              <div className="percentage text-[#D4D4D4] text-sm md:text-base mb-2">
                60.0%
              </div>
              <div className="flex-1 w-full flex flex-col justify-end">
                <div
                  className="w-full bg-[#C69C6D]"
                  style={{ height: `${190 * 0.6}px` }}
                ></div>
              </div>
              <div className="percentage text-[#D4D4D4] text-[10px] md:text-xs -rotate-45 text-nowrap w-fit mt-[30px]">
                Kultúraépítő
              </div>
            </div>

            {/* Bar 7 */}
            <div className="bar_part flex flex-col items-center h-full">
              <div className="percentage text-[#D4D4D4] text-sm md:text-base mb-2">
                80.0%
              </div>
              <div className="flex-1 w-full flex flex-col justify-end">
                <div
                  className="w-full bg-[#C69C6D]"
                  style={{ height: `${190 * 0.8}px` }}
                ></div>
              </div>
              <div className="percentage text-[#D4D4D4] text-[10px] md:text-xs -rotate-45 text-nowrap w-fit mt-[30px]">
                Csapatépítő
              </div>
            </div>

            {/* Bar 8 */}
            <div className="bar_part flex flex-col items-center h-full">
              <div className="percentage text-[#D4D4D4] text-sm md:text-base mb-2">
                86.7%
              </div>
              <div className="flex-1 w-full flex flex-col justify-end">
                <div
                  className="w-full bg-[#C69C6D]"
                  style={{ height: `${190 * 0.867}px` }}
                ></div>
              </div>
              <div className="percentage text-[#D4D4D4] text-[10px] md:text-xs -rotate-45 text-nowrap w-fit mt-[30px]">
                Döntéshozó
              </div>
            </div>
          </div>
        </div>

        {/* Dimension descriptions */}
        <div className="w-full mt-8">
          <div className="text-center mb-8">
            <h2 className="text-white text-xl border-b border-[#D39865] inline-block pb-1">
              A dimenziók leírása
            </h2>
          </div>

          {/* Dimension 1 */}
          <div className="mb-12">
            <h3 className="text-white text-center mb-4">
              Inspiráló víziónárius
            </h3>
            <p className="text-[#D4D4D4] text-sm text-justify">
              A jövőkép meghatározása - Ez a vezetői minőség azt méri, mennyire
              képes Ön megfogalmazni és életben tartani egy olyan szervezeti
              célt, amely valódi értelmet ad az érdekelt felek számára.
              Értékeli, hogy mennyire tudja a jövőképet világosan és személyre
              szabottan kialakítani minden munkatárs számára. Megmutatja, hogy
              döntéshozatalában következetesen helyezi-e előtérbe a hosszú távú
              célt a rövid távú haszonnal szemben. Ez a dimenzió az ösztönző
              vezetői terület alapját képezi, mivel minden más tevékenység innen
              nyeri el az értelmét és az irányt.
            </p>
          </div>

          {/* Dimension 2 */}
          <div className="mb-12">
            <h3 className="text-white text-center mb-4">Elemző stratégia</h3>
            <p className="text-[#D4D4D4] text-sm text-justify">
              Az út kijelölése - Ez a vezetői minőség azt vizsgálja, mennyire
              képes Ön a célok és a világos jövőkép alapján tudatos tervezésre
              és stratégiai döntéshozatalra. Méri, hogy mennyire alaposan elemzi
              a jelenlegi helyzetet és mennyire bátran hoz döntéseket arra
              vonatkozóan, hogy mire koncentráljon és mivel ne foglalkozzon a
              szervezet. Értékeli, hogy mennyire sikerül minden szervezeti
              erőforrást és tevékenységet a választott stratégia szolgálatába
              állítani. A stratégia gondolkodás az a képesség, amely a vízióból
              megvalósítható cselekvési tervet készít.
            </p>
          </div>

          {/* Dimension 3 */}
          <div className="mb-12">
            <h3 className="text-white text-center mb-4">
              Új technológiákat sikerrel adaptáló
            </h3>
            <p className="text-[#D4D4D4] text-sm text-justify">
              A versenyképesség növelő technológiák integrálása - Ez a vezetői
              minőség azt méri, mennyire stratégiai alapon használja az
              eszközöket, rendszereket és technológiákat az emberi képességek
              kiegészítésére, támogatására. Értékeli, hogy a technológiával
              kapcsolatos befektetési döntések stratégiai megfontolás, vagy
              inkább a technológiai újdonságok vonzereje vezérli. Megmutatja,
              mennyire képes integrált technológiai ökoszisztémát építeni
              elszigetelt megoldások helyett.
            </p>
          </div>

          {/* Dimension 4 */}
          <div className="mb-12">
            <h3 className="text-white text-center mb-4">
              Operatív kiválóság bajnoka
            </h3>
            <p className="text-[#D4D4D4] text-sm text-justify">
              Az kiválóság folyamatokba szervezése - Ez a vezetői minőség azt
              vizsgálja, mennyire képes Ön a stratégiai és üzleti nagy számú,
              ismételt tevékenységre, végrehajtásra fordítani. Méri, hogy
              mennyire hatékonyan tervezi meg a munkafolyamatokat, szerepköröket
              és felelősségeket a maximális eredményesség érdekében. Értékeli,
              hogy rendelkezik-e olyan rendszerekkel, amelyek biztosítják az
              előállíthatóságot és a folyamatos fejlődést.
            </p>
          </div>

          {/* Dimension 5 */}
          <div className="mb-12">
            <h3 className="text-white text-center mb-4">Kapcsolatvarázsló</h3>
            <p className="text-[#D4D4D4] text-sm text-justify">
              Személyes network menedzsment - Ez a vezetői minőség azt méri,
              mennyire értékes és bizalmi kapcsolatokat működtet, amelyek minden
              vezetői munka alapját képezik. Értékeli bizalomépítő képességét,
              kommunikációs flexibilitását és konfliktuskezelési készségét.
              Megmutatja, hogy mennyire ismeri fel, hogy a személyes eredmények
              természetesen befolyásolják személyes viselkedését. Méri, hogy
              mennyire képes másokat befolyásolni és inspirálni a közös
              munkához.
            </p>
          </div>

          {/* Dimension 6 */}
          <div className="mb-12">
            <h3 className="text-white text-center mb-4">Kultúraépítő</h3>
            <p className="text-[#D4D4D4] text-sm text-justify">
              A kultúra a láthatatlan architektúra szervezése - Ez a vezetői
              minőség azt vizsgálja, mennyire tudatosan alakos közösségi
              értékeket és normákat kialakítani a szervezetben, amelyek
              természetesen befolyásolják a döntéshozatalt, a viselkedést és a
              végrehajtást. Értékeli, hogy rendelkezik-e olyan közös
              rituálékkal, eseményekkel, amelyek megerősítik a szervezeti
              identitást. Megmutatja, hogy mennyire képes az egyéni teljesítmény
              kollektív értelmezése helyett.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-[#666666] text-xs text-center">
          by Viktor Lenartson, Copyright ZEL Group
        </div>
      </div>
    </div>
  );
}
