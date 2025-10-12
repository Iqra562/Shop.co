// import img1 from '../../assets/images/img2.webp'
import img1 from '@assets/images/img3.jpg'
import img4 from '@assets/images/img4.jpg'
import img5 from '@assets/images/img5.jpg'
import img6 from '@assets/images/img7.jpg'
import img0 from '@assets/images/img0.jpg'
import product from '@assets/images/product.jpg'
import product1 from '@assets/images/product1.jpg'
import product2 from '@assets/images/product2.jpg'
import { RiHeartFill } from "react-icons/ri";
import Card from '@components/common/Card'
import { useMutation, useQuery } from "@tanstack/react-query";
import { productServices } from '../../../../../services/product.service'
import axios from 'axios'
import { Link } from 'react-router-dom'
 
function Banner(){
   const { data: productsData, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: productServices.getProducts,
  });
  // console.log(productsData)
    return(
  <>
  <div className="px-4 md:px-10 rounded-sm overflo-hidden ">
        <div className=" flex flex-col md:flex-row md:h-[340px]  lg:h-[380px] xl:h-[500px] rounded-lg overflowhidden space-y-2 md:space-y-0 md:space-x-3  xl:container" >
          <div className=" md:w-[40%] xl:w-[50%] h-[150px] md:h-[340px] lg:h-[380px] xl:h-full rounded-lg overflow-hidden flex">
            <img src={img1} alt="" className="w-full md:w-full h-full object-cover object-top " />
          
          </div>
          <div className="md:w-[60%] flex flex-col   space-x-3 h-full ">
           <div className="w-full  flex h-[100px] md:h-[120px] lg:h-[180px]  xl:h-1/2  space-x-2 ">
 
  <div className="w-[60%] xl:w-[65%] rounded-lg overflow-hidden ">

    <img src={img6} alt="" className="w-full h-full object-cover object-top" />
  </div>
  <div className=" w-[40%] xl:w-[35%] rounded-lg overflow-hidden ">
    <img src={img0} alt="" className="w-full h-full object-cover object-bottom" />
  </div>

</div >
           <div className="h-full space-y-3 flex flex-col justify-between ">
           <div className="space-y-2">
   <h1 className="text-black text-3xl md:text-3xl xl:text-5xl font-bold ">Discover the Latest in Fashion & Lifestyle</h1>
<div className='flex items-center'>
  <RiHeartFill color='red'/> 

   <p> Loved by fashion lovers worldwide.</p>
</div>
   <p className="text-gray-600">
    Free Shipping Over $50 | Easy 7-Day Returns | 24/7 Customer Support
   </p>
           </div>
 <button className="bg-black text-white lg:px-20 py-2 xl:py-4 rounded  lg:w-max   bg-gradient-to-r from-[#3a4e66] to-[#537090] ">Explore the Collection</button>
</div>
            

          </div>
        </div>
      </div>
      {/* <div className='bg-gray-100 w-full mt-6 py-1 flex  justify-center overflow-hidden '>
        <span className='text-gray-300  md:text-2xl font-bold'>Crafted Fashion</span>
      
      </div> */}
      {/* <div className='container mt-12'>
        <h2 className='text-2xl font-semibold capitalize mb-4'>Shop by category</h2> 
        <div className='flex flex-col md:flex-row justify-between space-y-5 md:space-x-5'>
            <div className='w-full bg-gray-100 rounded-2xl overflow-hidden'>
                 <img src={product1} alt="" />
            </div>
            <div className='w-full bg-gray-100 rounded-2xl overflow-hidden'>
                 <img src={product1} alt="" />
            </div>
            <div className='w-full bg-gray-100 rounded-2xl overflow-hidden'>
                 <img src={product1} alt="" />
            </div>
        </div>
      </div> */}
      <div className='container mt-12'>
        <div className='flex justify-between'>

        <h2 className='text-2xl font-semibold capitalize mb-4'>Top products</h2>
      <Link to='/products'>
      
       <span className='text-sm underline'>View all </span>
      </Link> 
        </div>
        <div className='grid grid-cols-4 gap-4'>
          { productsData?.data?.data?.slice(0,4).map((data)=>(
            <Card  id = {data._id} productName = {data.name}   description={data.description} price={data.price} img={data.thumbnail.url}/>

          ))

          }
       
        </div>
      </div>
              
  </>
    )
}

export default Banner;