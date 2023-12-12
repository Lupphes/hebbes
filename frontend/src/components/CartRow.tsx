import type { NextPage } from "next";
import AH from "@/resources/AH.jpg";
import JMB from "@/resources/JMB.jpg";

const findAveragePrice = (stores: { [key: string]: ItemInfo }): number => {
    const keys = Object.keys(stores);
    if (keys.length === 0) {
      return 0; // or throw an error, depending on your use case
    }
    let sum = 0;
    for (let i = 0; i < keys.length; i++) {
      sum = stores[keys[i]].price + sum;
    };
    // Calculate the average
    const average = sum / keys.length;
    return average;
  };

const CartRow: NextPage<{item: CartItem, result: LowestHighest}> = ({ item, result}) => {
    const keysArray = Object.keys(item.item_info);


    return (
    <tr>
        <td className="relative pr-[21px] pb-[21px]">
        <div className="relative w-full h-[106px] flex flex-col items-start justify-end pt-0 px-0 pb-[6.989016532897949px] box-border relative w-full h-[106px] flex flex-col items-start justify-end pt-0 px-0 pb-[6.989016532897949px] box-border">
            <div className="relative rounded-3xs bg-silver w-[106px] h-[106px] relative rounded-3xs bg-silver w-[106px] h-[106px]" />
            <img
            className="relative w-[113px] h-[92px] object-cover mt-[-99px] relative w-[113px] h-[92px] object-cover mt-[-99px]"
            alt=""
            src={item.picture_link ? item.picture_link.url : "/"}
            />
        </div>
        </td>
        <td className="relative pr-[21px] pb-[21px]">
        <div className="relative w-[594px] h-8 overflow-hidden relative w-[594px] h-8 overflow-hidden">
            <input
            className="font-poppins text-base bg-[transparent] absolute top-[0px] left-[456px] rounded-8xs box-border w-8 h-8 flex flex-col items-center justify-center border-[1px] border-solid border-darkgray font-poppins text-base bg-[transparent] absolute top-[0px] left-[456px] rounded-8xs box-border w-8 h-8 flex flex-col items-center justify-center border-[1px] border-solid border-darkgray"
            placeholder="10"
            type="text"
            />
            <div className=" left-[0px] w-[594px] h-8 overflow-hidden absolute top-[0px] left-[0px] w-[594px] h-8 overflow-hidden">
                <div className=" left-[0px] w-[594px] h-[25px] absolute top-[4px] left-[0px] w-[594px] h-[25px]">
                    <div className=" left-[0px] absolute top-[1px] left-[0px]">
                    {item.name}
                    </div>
                    <div className=" left-[249px] text-black text-center inline-block w-[79px] absolute top-[1px] left-[249px] text-black text-center inline-block w-[79px]">
                    € {item.item_info[result.lowestKey].price ? item.item_info[result.lowestKey].price : item.item_info[keysArray[0]].price}
                    </div>
                    <div className=" left-[534px] text-black absolute top-[0px] left-[534px] text-black">
                    € {item.item_info[result.lowestKey].price ? item.item_info[result.lowestKey].price * item.cartQuantity : item.item_info[keysArray[0]].price * item.cartQuantity}
                    </div>
                    <div className=" left-[354px] text-center inline-block w-16 absolute top-[1px] left-[354px] text-center inline-block w-16">
                    € {item.item_info && findAveragePrice(item.item_info)}
                    </div>
                </div>
                <div className=" left-[147px] rounded-8xs box-border w-[71px] h-8 flex flex-row items-center justify-start pt-0 pb-[5px] pr-[5px] pl-[9px] border-[1px] border-solid border-darkgray absolute top-[0px] left-[147px] rounded-8xs box-border w-[71px] h-8 flex flex-row items-center justify-start pt-0 pb-[5px] pr-[5px] pl-[9px] border-[1px] border-solid border-darkgray">
                    <img
                    className="relative w-[37px] h-[23px] object-cover relative w-[37px] h-[23px] object-cover"
                    alt=""
                    src={item.item_info[result.lowestKey].store_id && item.item_info[result.lowestKey].store_id == 1 ? AH.src : JMB.src}
                    />
                    {/*
                    <img
                    className="relative w-5 h-5 overflow-hidden shrink-0 relative w-5 h-5 overflow-hidden shrink-0"
                    alt=""
                    src="/dashiconsarrowdownalt2.svg"
                    />*/}
                </div>
            </div>
        </div>
        </td>
        <td className="relative pb-[21px]">
        <img
            className="relative w-7 h-7 overflow-hidden relative w-7 h-7 overflow-hidden"
            alt=""
            src="/antdesigndeletefilled.svg"
        />
        </td>
    </tr>
    );
};

export default CartRow;