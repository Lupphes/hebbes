'use client';
import Ad from '@/components/Ad';
import SingleProduct from '@/components/SingleProduct';
import CocaCola from "@/resources/CocaCola.jpg";
import AH from "@/resources/AH.jpg";

const SingleProductPage = () => {
    const singleProduct = {
      name: "Cola-Cola 1.5",
      imageSrc: CocaCola.src,
      category: "Drinks",
      tags: ["Drinks", "Soft Drinks", "Cola-Cola"],
    };

    const singlePrices = [
      // your array of prices here
      {
        price: "2.55",
        imageSrc: AH.src,
      },
      {
        price: "2.20",
        imageSrc: AH.src,
      }];
  
    return (
        <div className="bg-text-white-op-100 overflow-hidden flex flex-col items-center justify-start gap-[45px]">
            <div className="flex flex-col items-center justify-start">
            {/*<Ad/>*/}
            <SingleProduct
              singleProduct={singleProduct}
              singlePrices={singlePrices}
            />
            {/*<Ad/>*/}
            </div>
        </div>
    );
  };
  
export default SingleProductPage;