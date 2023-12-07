import type { NextPage } from "next";

const Explain: NextPage = () => {
  return (
    <div className="relative
                    flex flex-row md:flex-col px-[10%] md:px-[5%] py-[10%] md:py-[5%]
                    gap-[5%] md:gap-[5%]
                    text-center text-13xl text-black
                    font-poppins bg-darkolivegreen-100">
      <div className="w-[33%] md:w-[90%] md:h-[33%] text-center flex flex-col items-center ">
        <div className="item-center relative font-medium">Cheap Food</div>
        <div className="item-center relative text-xl text-text-white-op-100">
          Find the best deals in all the biggest Netherlands grocery stores
        </div>
      </div>
      <div className="w-[33%] md:w-[90%] md:h-[33%] text-center flex flex-col items-center ">
        <div className="item-center relative font-medium">Easy to compare</div>
        <div className="relative text-xl text-whitesmoke">
          You don’t need to stay in doubt if a product is cheaper in other story; just check in the app
        </div>
      </div>
      <div className="w-[33%] md:w-[90%] md:h-[33%] text-center flex flex-col items-center ">
        <div className="item-center relative font-medium">Personalized</div>
        <div className="relative text-xl text-text-white-op-100">
          Find the products the best fits you and diet
        </div>
      </div>
    </div>
  );
};

export default Explain;
