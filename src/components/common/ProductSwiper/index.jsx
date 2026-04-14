import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import './styles.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function ProductSwiper({product}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
   const [imgRef, setImgRef] = useState(null);

  useEffect(() => {
    if (product && product.length > 0) {
      setImgRef(product[0]);
    }
  }, [product]);
  const allImages = product
  console.log(allImages)
  return (
    <>
      <div>
        <div className="h-[30rem]">

        <img src={imgRef} alt="" className="rounded-md h-full  xl:h-full w-full object-cover object-top"/>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-4">
            {allImages?.map((image, index) => (  
                <img    
                    key={index}
                    src={image}
                    alt=""              
                    className=" object-cover cursor-pointer rounded-md"
                    onClick={() => setImgRef(image)}
                />
            ))}
        </div>
      </div>
    
    </>
  );
}
