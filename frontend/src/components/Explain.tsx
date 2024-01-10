import type { NextPage } from 'next';

const Explain: NextPage = () => {
  return (
    <div
      className='text-4xl md:text-3xl lg:text-4xl flex flex-col items-center gap-5
                 bg-darkolivegreen-100 p-10
                 text-center font-poppins text-black md:flex-row
                 sm:px-5 sm:py-5'
    >
      <div className='flex flex-1 flex-col items-center text-center'>
        <div className='font-medium'>Cheap Food</div>
        <div className='text-xl text-white'>
          Find the best deals in all the biggest Netherlands grocery stores
        </div>
      </div>
      <div className='flex flex-1 flex-col items-center text-center'>
        <div className='font-medium'>Easy to compare</div>
        <div className='text-xl text-white'>
          You don’t need to stay in doubt if a product is cheaper in other
          story; just check in the app
        </div>
      </div>
      <div className='flex flex-1 flex-col items-center text-center'>
        <div className='font-medium'>Personalized</div>
        <div className='text-xl text-white'>
          Find the products the best fits you and diet
        </div>
      </div>
    </div>
  );
};

export default Explain;
