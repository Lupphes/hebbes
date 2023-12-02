import type { NextPage } from "next";

const Explain: NextPage = () => {
  return (
    <div className="self-stretch relative h-[300px] text-left text-13xl text-black font-poppins">
      <div className="absolute top-[0px] left-[0px] bg-darkolivegreen-100 w-[1440px] h-[300px]" />
      <div className="absolute top-[96px] left-[100px] w-[376px] flex flex-col items-start justify-start">
        <div className="self-stretch relative font-medium">Cheap Food</div>
        <div className="self-stretch relative text-xl text-text-white-op-100">
          Find the best deals in all the biggest Netherlands grocery stores
        </div>
      </div>
      <div className="absolute top-[96px] left-[522px] w-[376px] flex flex-col items-start justify-start">
        <div className="self-stretch relative font-medium">Easy to compare</div>
        <div className="self-stretch relative text-xl text-whitesmoke">
          You don’t need to stay in doubt if a product is cheaper in other
          story; just chek in the app
        </div>
      </div>
      <div className="absolute top-[96px] left-[944px] w-[376px] flex flex-col items-start justify-start">
        <div className="self-stretch relative font-medium">Personalized</div>
        <div className="self-stretch relative text-xl text-text-white-op-100">
          Find the products the best fits you and diet
        </div>
      </div>
    </div>
  );
};

export default Explain;
