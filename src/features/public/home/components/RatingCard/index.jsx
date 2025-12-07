import user1 from '@assets/images/user1.jpg';
import user2 from '@assets/images/user2.jpg';
import user3 from '@assets/images/user3.jpg';
import user4 from '@assets/images/user4.jpg';
import { MdOutlineStar } from "react-icons/md";
import { MdOutlineStarHalf } from "react-icons/md";
function RatingCard(){
    return(
        <>
        <div className='w-full md:w-60 mx-auto rounded-xl  bg-black px-4 py-3 space-y-8 h-fit'>
            <div className='flex space-x-3'>
        
        <h2 className='text-white text-2xl font-bold'>150+</h2>
        <p className='text-white text-sm'>Lorem ipsum dolor sit amet </p></div>
            <div className='flex space-x-3'>
        
        <div className='flex'>
          <div className='rounded-full overflow-hidden h-6 w-6'><img src={user1} alt="" /></div>
          <div className='rounded-full overflow-hidden h-6 w-6 -ml-2'><img src={user2} alt="" /></div>
          <div className='rounded-full overflow-hidden h-6 w-6 -ml-2'><img src={user3} alt="" /></div>
          <div className='rounded-full overflow-hidden h-6 w-6 -ml-2'><img src={user4} alt="" /></div>
        </div>
        <div className='flex items-center'>
        
        <p className='text-white text-sm'>4.5 </p>
        <div className='flex'>
          <MdOutlineStar className='text-yellow-500' />
          <MdOutlineStar className='text-yellow-500' />
          <MdOutlineStar className='text-yellow-500' />
          <MdOutlineStar className='text-yellow-500' />
          <MdOutlineStarHalf className='text-yellow-500' />
        
        
        </div>
        </div>
         </div>
            </div>
        </>
    )
}
export  {RatingCard}