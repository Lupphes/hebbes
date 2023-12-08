'use client';
import Ad from '@/components/Ad';
import SingleProduct from '@/components/SingleProduct';
import Navbar from '../../components/Navbar';
//import Header from '@/components/Header';
//import Explain from '@/components/Explain';

const SingleProductPage = () => {
    const singleProducts = [
      // your array of products here
      {
        price: "2.55",
        imageSrc: "/asgaard-sofa-312@2x.png",
      },
      {
        price: "2.20",
        imageSrc: "/asgaard-sofa-312@2x.png",
      }];
  
    return (
        <div className="bg-text-white-op-100 overflow-hidden flex flex-col items-center justify-start gap-[45px]">
            <div className="flex flex-col items-center justify-start">
            {/*<Ad/>*/}
            <SingleProduct singleProducts={singleProducts}/>
            {/*<Ad/>*/}
            </div>
        </div>
    );
  };
  
export default SingleProductPage;