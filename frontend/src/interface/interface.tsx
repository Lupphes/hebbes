interface Item {
    id: number;
    name: string;
    brand: string;
    description: string;
    gln: string;
    gtin: string;

    measurements_units: string;
    measurements_amount: string;
    measurements_label: string;

    picture_link: Picture | null;
    item_info: { [key: string]: ItemInfo };
    stores?: Store[];
    categories?: Category[];
}

interface Picture {
    id: number;
    item_id: number | null;
    category_id: number | null;
    width: number | null;
    height: number | null;
    url: string | undefined;

    item?: Item | null;
    category?: Category | null;
}

interface ItemInfo {
    id: number;
    item_id: number;
    store_id: number;
    product_link: string | null;
    price: number;
    discount_info: Array<{ [key: string]: any }> | null;

    item: Item;
    store: Store;
}

interface Store {
    id: number;
    name: string | null;
    store_link: string | null;
    items: Item[];
}

interface Category {
    id: number;
    category_id: number | null;
    name: string | null;
    parent_id: number | null;

    subcategories: Category[];
    pictures: Picture[];
    items: Item[];
}

//Interfaces for the cart
interface ItemInfoSum {
    sum: number;
    itemIdPricesList: Array<[number, number]>; // Tuple array with item id and price
  }
  
  interface SumByItemInfoKey {
    [key: string]: ItemInfoSum;
  }

  interface LowestHighest {
    lowestKey: string;
    lowestSum: number;
    highestSum: number;
  }

//

interface CartItem {
    id: number;
    name: string;
    brand: string;
    description: string;
    gln: string;
    gtin: string;
    cartQuantity: number;

    measurements_units: string;
    measurements_amount: string;
    measurements_label: string;

    picture_link: Picture | null;
    item_info: { [key: string]: ItemInfo };
    stores?: Store[];
    categories?: Category[];
}