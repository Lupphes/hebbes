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
        <div className="flex flex-row md:flex-col items-center justify-center">
          {/*table*/}
          <div className="w-3/4 flex flex-col items-center md:overflow-x-auto border-md">
            <table className="table-fixed items-center md:min-w-full ">
              <thead className="bg-darkolivegreen-300">
                <tr className="items-center justify-between text-black">
                  <th className="font-medium">
                    Product
                  </th>
                  <th className="font-medium">
                    Store
                  </th>
                  <th className="font-medium">
                    Price
                  </th>
                  <th className="font-medium">
                    Avg. Price
                  </th>
                  <th className="font-medium">
                    Quantity
                  </th>
                  <th className="font-medium">
                    Subtotal
                  </th>
                  <th className="font-medium">
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody>
              {
                items.map((item: CartItem, index: number) =>
                (
                    <CartRow key={item.id} item={item} result={result}/>
                ))
              }
              </tbody>
            </table>
            <div className="flex flex-col items-center justify-center">
              <p className="text-black">
                * Calculated based on average price of the products you selected
              </p>
              <p className="text-black">
                ** Calculated based on the difference between the average price and the prices you selected
              </p>
            </div>
          </div>
          {/*final cart info */}
          <div className="w-1/4 md:w-[80%] bg-silver flex flex-col items-center justify-start gap-8 text-12xl rounded-md">
            <div className="relative font-semibold">Cart Totals</div>
            <div className="justify-between">
              <div className="text-left">Select store</div>
              <div className="items-right">
                <select className="w-32 h-8 rounded-8xs border-[1px] border-solid border-darkgray">
                  <option value="AH">Albert Heijn</option>
                  <option value="JMB">Jumbo</option>
                </select>
              </div>

            </div>
            <div className="justify-between">
              <div className="text-left">Avg. Subtotal*</div>
              <div className="text-darkolivegreen-100 text-right">
                € -
              </div>
            </div>
            <div className="justify-between">
              <div className="text-left">Est. Savings**</div>
              <div className="text-red text-right">€ {result ? result.highestSum-result.lowestSum : 0}</div>
            </div>
            <div className="justify-between">
              <div className="font-medium text-left">Final Total</div>
              <div className="text-darkolivegreen-200 text-right">
                € {result ? Math.round(result.lowestSum * 100) / 100 : "Loading.."}
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
    );
};

export default Cart;