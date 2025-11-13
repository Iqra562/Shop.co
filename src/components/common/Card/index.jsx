import { Link } from 'react-router-dom';
import product1 from '../../../assets/images/product1.jpg'
import { LiaHeart } from "react-icons/lia";

function Card({id,img,productName,description,price,addToCart=()=>{}}){

    return(
        <>
        <div className='bg-white drop--md p-2 rounded-md '>
            <div className='rounded-md h-40  md:h-60 lg:h-72 overflow-hidden'>
                <Link to={`/product-details/${id}`}>
                <img src={img} alt="" className='w-full h-full ' />
                </Link>
                </div>
            <div className='pt-3 space-y-1'>
              <div className='flex justify-between items-center pr-2'>

              <p className='font-bold  text-2xl capitalize'>{productName} </p>
              
              <LiaHeart className='text-xl'/>
              </div>
              <p>{description}</p>
              <span className='block text-[#537090] font-bold text-lg'>${price}</span>
              {/* <button onClick={addToCart} className='bg-black  bg-gradient-to-r from-[#3a4e66] to-[#537090] w-full text-white py-2 rounded-md'>Add to cart</button> */}
            </div>
        </div>
       
        </>
    )
}

export default Card;