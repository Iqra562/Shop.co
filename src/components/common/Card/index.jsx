 import { Link } from 'react-router-dom';
import product1 from '../../../assets/images/product1.jpg'
import { LiaHeart } from "react-icons/lia";

function Card({id,img,productName,description,price,addToCart=()=>{}}){

    return( 
        <>
        <div className='bg-white rounded-lg overflow-hidden shadow-lg '>
            <div className='h-28  md:h-60 lg:h-60 overflow-hidden'>
                <Link to={`/product-details/${id}`}>
                <img src={img} alt="" className='w-full h-full object-cover object-top' />
                </Link>
                </div>
            <div className='pt-3 space-y-1 p-2 md:p-4 py-3'>
                <div>

              <div className='flex justify-between items-center pr-2'>

              <p className='font-bold text-lg md:text-2xl capitalize'>{productName} </p>
              
              <LiaHeart className='text-xl text-secondary '/>
              </div>
              <p className='text-base capitalize'>{description}</p>
                </div>
              <div className='flex flex-col md:flex-row justify-between space-y-2 md:space-y-0'>

              <span className='block text-secondary font-bold text-base md:text-lg'>${price}</span>
              <button className='bg-primary-button-gradient w-fit px-2 py-1 text-xs font-bold text-white rounded-md '>
                ADD TO CART
              </button>
              </div>
              {/* <button onClick={addToCart} className='bg-black  bg-gradient-to-r from-[#3a4e66] to-[#537090] w-full text-white py-2 rounded-md'>Add to cart</button> */}
            </div>
        </div>
       
        </>
    )
}

export default Card;