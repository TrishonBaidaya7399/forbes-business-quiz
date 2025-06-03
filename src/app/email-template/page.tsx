import React from "react";

function page() {
  return (
    <div className="bg-black p-12 ">
      <div className="max-w-[1200px] flex flex-col items-center">
        <div className="flex flex-col items-center justify-center pb-5 border-b-3 border-[#D39865] mb-[50px]">
          <p className="text-[20px] text-white text-center">Forbes</p>
          <p className="text-[30px] text-white text-center">BUSINESS</p>
          <p className="text-[30px] text-white text-center">CLUB</p>
        </div>
        <div className="text-[28px] text-white pb-4">Kedves Trishon!</div>
        <div className="text-[14px] text-[#D4D4D4] text-center max-w-[500px] border-b border-[#f5f5f5] pb-12">
          Köszönjük, hogy időt szántál az adaptív vezetői önértékelés
          kitöltésére. Az alábbi eredményt kaptad, amely bemutatja, hogyan
          teljesítesz a különböző vezetői dimenziókban:
        </div>
        {/* bar chart part */}
        <div className="py-[60px] border-b border-t border-[#f5f5f5] grid grid-cols-8 gap-3 w-[90%]">
          <div className="bar_part flex flex-col gap-2 items-center ">
            <div className="percentage text-[#D4D4D4] text-lg">86.7%</div>
            <div className="w-full min-h-[calc(240px-50px)] bg-orange-500"></div>
            <div className="percentage text-[#D4D4D4] text-lg -rotate-50 text-nowrap w-fit mt-[50px]">
              Category name
            </div>
          </div>
          <div className="bar_part flex flex-col gap-2 items-center ">
            <div className="percentage text-[#D4D4D4] text-lg">86.7%</div>
            <div className="w-full min-h-[calc(240px-50px)] bg-orange-500"></div>
            <div className="percentage text-[#D4D4D4] text-lg -rotate-50 text-nowrap w-fit mt-[50px]">
              Category name
            </div>
          </div>
          <div className="bar_part flex flex-col gap-2 items-center ">
            <div className="percentage text-[#D4D4D4] text-lg">86.7%</div>
            <div className="w-full min-h-[calc(240px-50px)] bg-orange-500"></div>
            <div className="percentage text-[#D4D4D4] text-lg -rotate-50 text-nowrap w-fit mt-[50px]">
              Category name
            </div>
          </div>
          <div className="bar_part flex flex-col gap-2 items-center ">
            <div className="percentage text-[#D4D4D4] text-lg">86.7%</div>
            <div className="w-full min-h-[calc(240px-50px)] bg-orange-500"></div>
            <div className="percentage text-[#D4D4D4] text-lg -rotate-50 text-nowrap w-fit mt-[50px]">
              Category name
            </div>
          </div>
          <div className="bar_part flex flex-col gap-2 items-center ">
            <div className="percentage text-[#D4D4D4] text-lg">86.7%</div>
            <div className="w-full min-h-[calc(240px-50px)] bg-orange-500"></div>
            <div className="percentage text-[#D4D4D4] text-lg -rotate-50 text-nowrap w-fit mt-[50px]">
              Category name
            </div>
          </div>
          <div className="bar_part flex flex-col gap-2 items-center ">
            <div className="percentage text-[#D4D4D4] text-lg">86.7%</div>
            <div className="w-full min-h-[calc(240px-50px)] bg-orange-500"></div>
            <div className="percentage text-[#D4D4D4] text-lg -rotate-50 text-nowrap w-fit mt-[50px]">
              Category name
            </div>
          </div>
          <div className="bar_part flex flex-col gap-2 items-center ">
            <div className="percentage text-[#D4D4D4] text-lg">86.7%</div>
            <div className="w-full min-h-[calc(240px-50px)] bg-orange-500"></div>
            <div className="percentage text-[#D4D4D4] text-lg -rotate-50 text-nowrap w-fit mt-[50px]">
              Category name
            </div>
          </div>
          <div className="bar_part flex flex-col gap-2 items-center ">
            <div className="percentage text-[#D4D4D4] text-lg">86.7%</div>
            <div className="w-full min-h-[calc(240px-50px)] bg-orange-500"></div>
            <div className="percentage text-[#D4D4D4] text-lg -rotate-50 text-nowrap w-fit mt-[50px]">
              Category name
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
