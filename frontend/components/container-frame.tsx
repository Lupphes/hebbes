import type { NextPage } from "next";

const ContainerFrame: NextPage = () => {
  return (
    <section className="absolute top-[484px] left-[95px] w-[1250px] overflow-hidden flex flex-col items-end justify-center text-left text-29xl text-black font-poppins">
      <div className="w-[1220px] h-[401px] flex flex-col items-center justify-center gap-[21px]">
        <div className="font-medium inline-block h-[72px] mr-[33px]">
          How it works?
        </div>
        <div className="w-[1220px] h-[308px] overflow-hidden shrink-0 flex flex-row items-center justify-start gap-[38px] text-13xl">
          <div className="w-[309px] h-[308px] flex flex-col items-center justify-center gap-[24px]">
            <div className="relative font-medium">We scrape the web</div>
            <img
              className="relative w-[268px] h-[236px] overflow-hidden shrink-0 object-cover"
              alt=""
              src="/frame2@2x.png"
            />
          </div>
          <div className="w-[429px] h-[308px] flex flex-col items-center justify-center gap-[24px]">
            <div className="relative font-medium">{`You search for the product `}</div>
            <div className="w-[268px] h-[236px] overflow-hidden shrink-0 flex flex-col items-start justify-center py-0 px-3 box-border bg-[url('/frame3@3x.png')] bg-cover bg-no-repeat bg-[top] ml-[15px]">
              <img
                className="relative w-[230px] h-[211px] object-cover"
                alt=""
                src="/meubel-house-logos051@2x.png"
              />
            </div>
          </div>
          <div className="w-[406px] h-[308px] flex flex-col items-center justify-center gap-[24px]">
            <div className="relative font-medium">We help save you money</div>
            <div className="w-[268px] h-[236px] overflow-hidden shrink-0 flex flex-col items-start justify-start py-[13px] px-[22px] box-border bg-[url('/frame3@3x.png')] bg-cover bg-no-repeat bg-[top]">
              <img
                className="relative w-[223px] h-[200px] object-cover"
                alt=""
                src="/meubel-house-logos052@2x.png"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContainerFrame;
