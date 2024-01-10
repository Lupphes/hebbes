import type { NextPage } from 'next';

const Explain: NextPage = () => {
  return (
    <div
      className='flex flex-row items-center gap-[5%] bg-darkolivegreen-100 px-[10%] py-[10%]
                    text-center font-poppins
                    text-13xl text-black md:flex-col
                    md:gap-[5%] md:px-[5%]
                    md:py-[5%]'
    >
      <div className='flex w-1/3 flex-col text-center md:h-1/3 md:w-[90%] sm:w-[90%]'>
        <div className='item-center font-medium'>Cheap Food</div>
        <div className='text-xl text-text-white-op-100'>
          Find the best deals in all the biggest Netherlands grocery stores
        </div>
      </div>
      <div className='flex w-1/3 flex-col text-center md:h-1/3 md:w-[90%] sm:w-[90%]'>
        <div className='item-center font-medium'>Easy to compare</div>
        <div className='text-xl text-text-white-op-100'>
          You don’t need to stay in doubt if a product is cheaper in other
          story; just check in the app
        </div>
      </div>
      <div className='flex w-1/3 flex-col text-center md:h-1/3 md:w-[90%] sm:w-[90%]'>
        <div className='item-center font-medium'>Personalized</div>
        <div className='text-xl text-text-white-op-100'>
          Find the products the best fits you and diet
        </div>
      </div>
    </div>
  );
};

export default Explain;
