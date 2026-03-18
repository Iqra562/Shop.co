import img1 from "@assets/images/banner5.jpg";
import img5 from "@assets/images/banner-img-2.webp";
import img6 from "@assets/images/banner-img.png";

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
      <div className="px-4 md:px-10 pt-16 rounded-sm  ">
        <div className=" flex flex-col md:flex-row rounded-lg overflowhidden space-y-2 md:space-y-0 md:space-x-3  xl:container ">
          <div className="w-full md:w-7/12 lg:w-7/12">
            <h1 className=" text-5xl lg:text-7xl font-bold uppercase text-[#1f1f1f]">
              Walk in Style with TrendWear
            </h1>
            <p className="my-5 text-gray-500 text-lg font-medium">
              Step into a world of comfort and everyday style. Discover clothing
              that fits your life perfectly—simple, stylish, and made for you.
              Whether you're dressing up or keeping it casual, we’ve got
              something for every moment.{" "}
            </p>
            <div className="mt-10 flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-3">
              <button className="bg-primary-button-gradient w-full lg:w-fit px-10 py-3 text-base font-bold text-white uppercase rounded-md">
                Shop Now
              </button>
              <button className=" border-gradient  w-full lg:w-fit px-10 py-3 text-base font-bold text-secondary uppercase rounded-md">
                View collections{" "}
              </button>
            </div>

                              <RatingCard />
          </div>
          <div className="w-full md:w-5/12 lg:w-5/12  ">
            <img src={img6} className="w-full " />
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
