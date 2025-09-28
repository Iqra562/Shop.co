import product1 from '../../../assets/images/product1.jpg'
import { LiaHeart } from "react-icons/lia";

function Card({img,productName,description,price}){
    return(
        <>
        <div className=' md:w-1/3 '>
            <div className='rounded-2xl overflow-hidden h-96'><img src={img} alt="" className='w-full h-full object-cover' /></div>
            <div className='py-3 space-y-1'>
              <div className='flex justify-between items-center pr-2'>

              <p className='font-bold  text-2xl'>{productName} </p>
              <LiaHeart className='text-xl'/>
              </div>
              <p>{description}</p>
              <span className='block'>${price}</span>
              <button className='bg-black w-full text-white py-2 rounded-md'>Add to cart</button>
            </div>
        </div>
       
        </>
    )
}

export default Card;