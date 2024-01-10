import type { NextPage } from 'next';
import AH from '@/resources/AH.jpg';
import JMB from '@/resources/JMB.jpg';

const findIndexOfCheapestStore = (stores: {
  [key: string]: ItemInfo;
}): string | null => {
  const keys = Object.keys(stores);

  if (keys.length === 0) {
    return null; // Return null if the object is empty
  }

  let lowestKey = keys[0];

  for (let i = 1; i < keys.length; i++) {
    const lowestPrice = stores[lowestKey].price;
    const currentPrice = stores[keys[i]].price;

    if (
      lowestPrice === null ||
      (currentPrice !== null && currentPrice < lowestPrice)
    ) {
      lowestKey = keys[i];
    }
  }

  return lowestKey;
};

const StoreListing: NextPage<{ item: Item }> = ({ item }) => {
  return (
    <div className='flex flex-row items-center justify-center gap-7 text-center text-smi md:justify-start'>
      <div className='flex flex-row'>
        {item &&
          item.item_info &&
          Object.keys(item.item_info).map((key) => {
            const store = item.item_info[key];
            return (
              <div
                key={store.price}
                className='flex flex-col place-items-center gap-4'
              >
                <div
                  className='h-10 w-12 place-items-center rounded-lg bg-darkolivegreen-300'
                  key={key}
                >
                  <img
                    className='h-8 w-8'
                    alt=''
                    src={store.store_id === 1 ? AH.src : JMB.src}
                  />
                </div>
                <div className='flex text-smi text-black'>
                  {store.price ? `€ ${store.price}` : null}
                </div>
                <div className='flex text-2xs text-darkolivegreen-100'>
                  {key === findIndexOfCheapestStore(item.item_info)
                    ? `Cheapest`
                    : null}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default StoreListing;
