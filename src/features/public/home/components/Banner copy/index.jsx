import img1 from "@assets/images/banner5.jpg";
import img5 from "@assets/images/banner-img-2.webp";
import img6 from "@assets/images/img-banner.png";

import Card from "@components/common/Card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { productServices } from "../../../../../services/product.service";
import { Link } from "react-router-dom";
import { RatingCard } from "../RatingCard";

function Banner() {
  const {
    data: productsData,
    isPending,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: productServices.getProducts,
  });
  // console.log(productsData)
  return (
    <>
      <div className="px-4 md:px-10 rounded-sm " >
        <div className=" flex flex-col md:flex-row rounded-lg overflowhidden space-y-2 md:space-y-0 md:space-x-3  xl:container ">
          <div className="w-full">
            <h1 className="text-center text-6xl md:text-8xl font-bold uppercase text-[#1f1f1f]">
              Shop.CO
            </h1>
            <p className="text-center  mb-5 text-gray-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.{" "}
            </p>
            <div className="">
              <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-7 ">
                <div className="overflow-hidden rounded-xl  md:w-4/12">
                  <div className="mx-auto rounded-md  flex justify-center md:justify-start py-2 md:py-10 lg:py-12">
                    <span>INSTAGRAM | FACEBOOK | TWITTER</span>
                  </div>
                  <div className="overflow-hidden rounded-2xl w-full h-[15rem]  md:h-[18rem] lg:h-[26rem]">
                    <img
                      src={img1}
                      alt=""
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
                <div className=" md:w-4/12 ">
                  <div className="overflow-hidden rounded-2xl h-[15rem] md:h-[18rem] lg:h-[26rem]  relative">
                    <img
                      src={img6}
                      alt=""
                      className="w-full h-full object-cover object-top "
                    />
                    <button className="bg-white text-primary z-10 absolute h-10  bottom-0 px-10 rounded-full text-center bg-opacity-80 backdrop:blur-3xl mx-auto left-0 right-0 w-8/12 md:w-11/12 xl:w-6/12 mb-5 font-bold">
                      Explore More
                    </button>
                  </div>
                </div>
                <div className=" md:w-4/12  flex  flex-col-reverse  md:flex-col space-y-3">
                <div className="mt-5 md:mt-0">

                  <RatingCard />
                </div>
                  <div className="overflow-hidden rounded-2xl h-[15rem] md:h-[18rem] lg:h-[26rem] mb-3 md:mb-0 order-1">
                    <img
                      src={img5}
                      alt=""
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="container mt-12 ">
        <div className="flex justify-between">
          <h2 className="text-2xl font-extrabold   mb-4 uppercase">
            Top products
          </h2>
          <Link to="/products">
            <span className="text-sm underline">View all </span>
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0">
           
          {productsData?.data?.data?.slice(0, 4).map((data) => (
            <Card
              id={data._id}
              productName={data.name}
              description={data.description}
              price={data.price}
              img={data.thumbnail.url}
            />
          ))}
        </div>
      </div> */}
    </>
  );
}

export { Banner };
