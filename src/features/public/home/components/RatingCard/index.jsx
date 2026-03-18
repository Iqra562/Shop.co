import user1 from '@assets/images/user1.jpg';
import user2 from '@assets/images/user2.jpg';
import user3 from '@assets/images/user3.jpg';
import user4 from '@assets/images/user4.jpg';
import user5 from '@assets/images/user5.jpg';
import { MdOutlineStar } from "react-icons/md";
import { MdOutlineStarHalf } from "react-icons/md";
function RatingCard(){
    return(
        <>
        <div className='w-full   rounded-xl  py-3 space-y-8 h-fit my-10 md:my-8 xl:mt-14'>
            <div className='flex flex-col md:flex-row  space-y-2 md:space-x-2 '>
        
        <div className='flex justify-center md:justify-start'>
          <div className='rounded-full overflow-hidden h-11 w-11'><img src={user1} alt="" /></div>
          <div className='rounded-full overflow-hidden h-11 w-11 -ml-4 '><img src={user2} alt="" /></div>
          <div className='rounded-full overflow-hidden h-11 w-11 -ml-4'><img src={user3} alt="" /></div>
          <div className='rounded-full overflow-hidden h-11 w-11 -ml-4'><img src={user5} alt="" /></div>
          <div className='rounded-full overflow-hidden h-11 w-11 -ml-4'><img src={user4} alt="" /></div>
        </div>
        <div className=''>
        <div className='flex items-center justify-center md:justify-start '>

        <div className='flex'>
          <MdOutlineStar className='text-black text-lg' />
          <MdOutlineStar className='text-black text-lg' />
          <MdOutlineStar className='text-black text-lg' />
          <MdOutlineStar className='text-black text-lg' />
          <MdOutlineStarHalf className='text-black text-lg' />
        
        
        </div>
        <p className='text-black text-xs font-semibold'>(4.5k reviews) </p>
        </div>
           <div className=''>
        
         <p className='text-black text-sm font-semibold text-center md:text-start'>Trusted by over 200+ customers worldwide.
 </p></div>
        </div>
         </div>
         
            </div>
        </>
    )
}
export  {RatingCard}