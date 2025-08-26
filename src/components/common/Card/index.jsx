import product1 from '../../../assets/images/product1.jpg'
import { LiaHeart } from "react-icons/lia";

function Card(){
    return(
        <>
        <div className=' md:w-1/3 '>
            <div className='rounded-2xl overflow-hidden h-96'><img src={product1} alt="" className='w-full h-full object-cover' /></div>
            <div className='py-3 space-y-1'>
              <div className='flex justify-between items-center pr-2'>

              <p className='font-bold  text-2xl'>Product name </p>
              <LiaHeart className='text-xl'/>
              </div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim saepe numquam</p>
              <span className='block'>$23</span>
              <button className='bg-black w-full text-white py-2 rounded-md'>Add to cart</button>
            </div>
        </div>
       
        </>
    )
}

export default Card;