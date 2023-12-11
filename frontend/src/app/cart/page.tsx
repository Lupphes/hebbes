import Ad from '@/components/Ad';
import Cart from '@/components/Cart';



const CartPage = () => {
    return (
      <div className="absolute top-[480px] left-[97px] w-[1243.5px] flex flex-col items-center justify-center gap-[60px] text-left text-base text-black font-poppins">
        {/*<Ad/>*/}
          <Cart/>
        {/*<Ad/>*/}
      </div>
    );
  };
  
  export default CartPage;