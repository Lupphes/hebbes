import type { NextPage } from "next";
import CartRow from '@/components/CartRow';

const findKeyWithLowestSum = (adjustedSumByItemInfoKey: SumByItemInfoKey): LowestHighest => {
  let lowestKey: string = "";
  let lowestSum: number = 0;
  let highestSum: number= 0;
  let unchanged: boolean = true;

  Object.keys(adjustedSumByItemInfoKey).forEach((key) => {
    const sum = adjustedSumByItemInfoKey[key].sum;
    if(unchanged)
    {
      unchanged = false
      lowestSum = sum;
      lowestKey = key;
      highestSum = sum;
    }
    if (sum < lowestSum) {
      lowestSum = sum;
      lowestKey = key;
    }
    if (sum > highestSum){
      highestSum= sum

    }
  });
    const item: LowestHighest = {
      lowestKey, 
      lowestSum, 
      highestSum,
    };
  return item
};

const Cart: NextPage<{items: CartItem[], sumByItemInfoKey:SumByItemInfoKey, adjustedSum:SumByItemInfoKey}> = ({ items, sumByItemInfoKey, adjustedSum}) => {
  const result: LowestHighest = findKeyWithLowestSum(adjustedSum);
  const itemInfoKeys = Object.keys(sumByItemInfoKey);

  if(itemInfoKeys.length == 1)
  {
    result.lowestSum = sumByItemInfoKey[itemInfoKeys[0]].sum;
    result.highestSum = sumByItemInfoKey[itemInfoKeys[0]].sum;
    result.lowestKey = itemInfoKeys[0];
  }

    return (
        <div className="self-stretch overflow-hidden flex flex-col items-center justify-center">
          <div className="w-[1243.5px] flex flex-row items-start justify-between h-auto gap-[30px] hover:flex hover:w-[1243.5px] hover:h-auto hover:flex-row hover:gap-[30px] hover:items-start hover:justify-between lg:flex-col lg:gap-[30px] lg:items-start lg:justify-start md:flex-col md:gap-[30px] md:items-start md:justify-start sm:flex-col sm:gap-[30px] sm:items-start sm:justify-start">
            <div className="relative w-[820.5px] h-[308px]">
              <div className=" w-[820.5px] overflow-hidden flex flex-col items-start justify-center">
                <table className="self-stretch">
                  <tbody>
                  {
                    items.map((item: CartItem, index: number) => 
                    (
                        <CartRow key={item.id} item={item} result={result}/>
                    ))
                  }
                  </tbody>
                </table>
              </div>
              <div className="absolute top-[0px] left-[0px] w-[820.5px] overflow-hidden flex flex-col items-end justify-center">
                <div className="self-stretch relative bg-silver h-[55px] overflow-hidden shrink-0">
                  <div className="absolute top-[15px] left-[141.5px] font-medium">
                    Product
                  </div>
                  <div className="absolute top-[15px] left-[298px] font-medium">
                    Store
                  </div>
                  <div className="absolute top-[15px] left-[411px] font-medium">
                    Price
                  </div>
                  <div className="absolute top-[15px] left-[488px] font-medium">
                    Avg. Price
                  </div>
                  <div className="absolute top-[15px] left-[675px] font-medium">
                    Subtotal
                  </div>
                  <div className="absolute top-[15px] left-[579px] font-medium">
                    Quantity
                  </div>
                </div>
              </div>
              <div className="absolute top-[342px] left-[3.5px] w-[813.5px] overflow-hidden flex flex-col items-start justify-center text-darkgray">
                <div className="self-stretch relative whitespace-pre-wrap">
                  <p className="m-0">
                    * Calculated based on average price of the products you
                    selected
                  </p>
                  <p className="m-0">
                    ** Calculated based on the difference between the average
                    price and the prices you selected
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-silver w-[393px] flex flex-col items-center justify-start py-[15px] px-[75px] box-border gap-[42px] text-13xl">
              <div className="w-[243px] overflow-hidden flex flex-col items-center justify-start gap-[4px]">
                <div className="self-stretch overflow-hidden flex flex-col items-center justify-center gap-[61px]">
                  <div className="self-stretch overflow-hidden flex flex-col items-start justify-center">
                    <div className="relative font-semibold">Cart Totals</div>
                  </div>
                  <div className="self-stretch overflow-hidden flex flex-col items-center justify-start gap-[3px] text-base">
                    <div className="self-stretch overflow-hidden flex flex-row items-center justify-between">
                      <div className="relative font-medium">Avg. Subtotal*</div>
                      <div className="relative text-darkolivegreen-100 text-right">
                        € -
                      </div>
                    </div>
                    <div className="self-stretch overflow-hidden flex flex-row items-center justify-between">
                      <div className="relative font-medium">Est. Savings**</div>
                      <div className="relative text-red text-right">€ {result ? result.highestSum-result.lowestSum : 0}</div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch overflow-hidden flex flex-row items-start justify-between text-base">
                  <div className="relative font-medium">Final Total</div>
                  <div className="relative text-xl font-medium text-darkolivegreen-200">
                    € {result ? result.lowestSum : "Loading.."}
                  </div>
                </div>
              </div>
              {/* <Button
                className="[align-self:start] h-[59px] ml-2.5"
                color="success"
                variant="outlined"
              >
                Check Out
              </Button>*/}
            </div>
          </div>
        </div>
    );
};

export default Cart;