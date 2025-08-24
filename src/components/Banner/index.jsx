// import img1 from '../../assets/images/img2.webp'
import img2 from '../../assets/images/img.jpg'
import img1 from '../../assets/images/img3.jpg'
import img4 from '../../assets/images/img4.jpg'
import img5 from '../../assets/images/img5.jpg'
import img6 from '../../assets/images/img7.jpg'
import img0 from '../../assets/images/img0.jpg'

function Banner(){
    return(
  <>
  <div className="px-4 md:px-10 rounded-sm overflo-hidden">
        <div className=" flex flex-col md:flex-row md:h-[500px] rounded-lg overflowhidden space-y-2 md:space-y-0 md:space-x-3 " >
          <div className=" md:w-[40%] lg:w-[50%] h-[150px] md:h-full rounded-lg overflow-hidden flex">
            <img src={img1} alt="" className="w-full md:w-full h-full object-cover object-top " />
          
          </div>
          <div className="md:w-[50%] flex flex-col  md:space-x-3 h-full ">
           <div className="w-full  flex h-[100px] md:h-1/2 space-x-2">
 
  <div className="w-full md:w-[65%] rounded-lg overflow-hidden">

    <img src={img6} alt="" className="w-full h-full object-cover object-top" />
  </div>
  <div className=" w-full md:w-[35%] rounded-lg overflow-hidden">
    <img src={img0} alt="" className="w-full h-full object-cover object-bottom" />
  </div>

</div >
           <div className="w-full    h-1/2 space-y-3 flex flex-col justify-between">
           <div className="space-y-2">
   <h1 className="text-black text-3xl md:text-5xl font-bold ">Discover the Latest in Fashion & Lifestyle</h1>

   <p>❤Loved by fashion lovers worldwide.</p>
   <p className="text-gray-600">
    Free Shipping Over $50 | Easy 7-Day Returns | 24/7 Customer Support
   </p>
           </div>
 <button className="bg-black text-white md:px-20 py-2 md:py-4 rounded  md:w-max">Explore New Arrivals</button>
</div>
            

          </div>
        </div>
      </div>
  
  </>
    )
}

export default Banner;