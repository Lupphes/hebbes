import type { NextPage } from "next";

interface SingleProductProps {
    price: string;
    imageSrc: string;
  }
  
  interface SingleProductList{
    singleProducts: SingleProductProps[];
  }

const findIndexOfCheapestProduct = (products: SingleProductProps[]): number => {
    if (products.length === 0) {
        return -1; // Return -1 if the list is empty
    }

    let lowestIndex = 0;

    for (let i = 1; i < products.length; i++) {
        const lowestPrice = parseFloat(products[lowestIndex].price || "");
        const currentPrice = parseFloat(products[i].price || "");

        if (isNaN(lowestPrice) || currentPrice < lowestPrice) {
            lowestIndex = i;
        }
    }

    return lowestIndex;
    };

const StoreListingContainer: NextPage<SingleProductList> = ({ singleProducts }) => {
    const indexOfCheapest = findIndexOfCheapestProduct(singleProducts);

    return (
        <div className="absolute top-[115px] left-[0px] w-[816px] h-[175px] flex flex-row items-center justify-start gap-[28px] text-center text-smi">
            <div className="relative inline-block w-[57.8px] h-[22.3px] shrink-0">
                Shops
            </div>
            {singleProducts.map((product, index) => (
              <div>
                <div className="relative w-14 h-[116.6px]" key={index}>
      
                    <img
                      className="absolute top-[0px] left-[0px] rounded-8xs w-[55.3px] h-[43.4px]"
                      alt=""
                      src="/rectangle-421.svg"
                    />
                    <img
                      className="absolute top-[7.6px] left-[7.9px] w-[40.1px] h-[28.2px] object-cover"
                      alt=""
                      src={product.imageSrc}
                    />
                  
                  <div className="absolute top-[0px] left-[0px] text-smi text-black flex items-center justify-center w-[55.6px] h-[28.2px]">
                    {product.price ? `€ ${product.price}`: null}
                  </div>
                  <div className="absolute top-[27px] left-[0px] text-2xs flex items-center justify-center w-[55.6px] h-[18.4px]">
                    {!product.price ? ("No option") : (index == indexOfCheapest ? `Cheapest` : null)}
                  </div>
                  
                  <img
                    className="absolute top-[88.3px] left-[7.8px] w-[40.1px] h-[28.2px] object-cover"
                    alt=""
                    src="/asgaard-sofa-313@2x.png"
                  />
                </div>
              </div>
            ))}
          </div>
    );
};

export default StoreListingContainer;
