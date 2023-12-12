import type { NextPage } from "next";
import AH from "@/resources/AH.jpg";
import JMB from "@/resources/JMB.jpg";

const findIndexOfCheapestStore = (stores: { [key: string]: ItemInfo }): string | null => {
  const keys = Object.keys(stores);

  if (keys.length === 0) {
    return null; // Return null if the object is empty
  }

  let lowestKey = keys[0];

  for (let i = 1; i < keys.length; i++) {
    const lowestPrice = stores[lowestKey].price;
    const currentPrice = stores[keys[i]].price;

    if (lowestPrice === null || (currentPrice !== null && currentPrice < lowestPrice)) {
      lowestKey = keys[i];
    }
  }

  return lowestKey;
};

const StoreListing: NextPage<{ item: Item }> = ({ item }) => {

  return (
    <div className="flex flex-row items-center justify-start md:justify-center gap-7 text-center text-smi">
      <div className="overflow-x-auto flex flex-row">
      {item && item.item_info && Object.keys(item.item_info).map((key) => {
        const store = item.item_info[key];
        return (
          <div key={store.price} className="flex flex-col place-items-center gap-4">
            <div className="rounded-8xs w-12 h-10 bg-darkolivegreen-300 place-items-center" key={key}>
              <img className="w-8 h-8" alt="" src= { store.store_id === 1 ? AH.src : JMB.src} />
            </div>
            <div className="text-smi text-black flex">
              {store.price ? `€ ${store.price}` : null}
            </div>
            <div className="text-2xs text-darkolivegreen-100 flex">
              {key === findIndexOfCheapestStore(item.item_info) ? `Cheapest` : null}
            </div>
            <svg className="w-6 h-6 text-darkolivegreen-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              {/* SVG path here */}
            </svg>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default StoreListing;