import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Spin } from 'antd';

// Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

// Swiper modules
import { FreeMode, Navigation } from "swiper/modules";
import { useGetProducts } from "@hooks/useProducts";
import Card from "../../../../../components/common/Card";
import Spiner from "../../../../../components/spiner";

export function ProductCarousal({ limit }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const { data: productsData, isPending, error } = useGetProducts();
  const getProducts = productsData?.data?.data ?? [];
  const products = limit ? getProducts.slice(0, limit) : getProducts;
const stylesObject = {
  indicator: {
        color: '#722ed1',
  },
};
const sharedProps = {
    spinning: true,
    percent: 0,
   };
  return (
    <div className="relative bg-white  container">
      <div>
        <h2 className="text-2xl font-extrabold   mb-4 uppercase">
          Top products
        </h2>
      </div>
      { isPending && <div className="w-full min-h-80 flex justify-center items-center">
<Spin size="large"  />
      </div>
      }
      {/* Navigation buttons */}
      <button
        ref={prevRef}
        className="absolute right-14 md:right-20 top-3  lg:-top-1 xl:-top-1 -translate-y-1/2 z-10 bg-transparent border border-gray-400 transition-all duration-200  hover:bg-primary-button-gradient hover:border-none  text-gray-400 hover:text-paragraphLight px-2 md:px-4 py-2 md:py-4 rounded-full "
      >
        <FaAngleLeft />
      </button>
      <button
        ref={nextRef}
        className="absolute right-4  md:right-4 top-3  lg:-top-1 xl:-top-1 -translate-y-1/2 z-10 bg-transparent border border-gray-400  transition-all duration-200 hover:bg-primary-button-gradient   hover:border-none  text-gray-400 hover:text-paragraphLight px-2 md:px-4 py-2 md:py-4 rounded-full "
      >
        <FaAngleRight />
      </button>

      <Swiper
        breakpoints={{
          320: { slidesPerView: 2 },
          768: { slidesPerView: 3.5 },
          1024: { slidesPerView: 4 },
        }}
        spaceBetween={20}
        freeMode={true}
        modules={[FreeMode, Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="swiper-slide"
      >
        {products.map((product, i) => (
            <div>

          <SwiperSlide
            key={i}
            className="shadow-none pb-10"
            freeMode={false} 
          >
            

            <Card
              key={i}
              id={product._id}
              productName={product.name}
              description={product.description}
              price={product.price}
              img={product.thumbnail.url}
             
              />
              
          </SwiperSlide>

       </div>
        ))}
      </Swiper>
    </div>
  );
}
