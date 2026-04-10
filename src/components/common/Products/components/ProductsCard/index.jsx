import Card from "@components/common/Card";
import ProductCardSkeleton from "../ProductCardSkeleton";
import { FaBasketShopping } from "react-icons/fa6";

function ProductsCard({onsale, limit,useQueryHook }) {
  const { data: productsData, isPending, error } = useQueryHook();
  const getProducts = productsData?.data?.data ?? [];
  const products = limit ? getProducts.slice(0, limit) : getProducts;
   if (isPending) {
    return <ProductCardSkeleton />;
  }
    if (error || products.length === 0) {
    return (
    <div className="w-full flex flex-col justify-center items-center pt-16 ">
  <FaBasketShopping className="text-9xl text-gray-300" />
<h2 className="text-gray-300 text-2xl md:text-4xl font-bold  text-center">No products available right now.</h2></div>
    );
  }

  return (
    <>
     
        <div className=" grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-8 gap-x-3 md:gap-y-8 md:gap-x-4">
          {products.map((data, i) => (
            <Card
              key={data._id}
              id={data._id}
              productName={data.name}
              description={data.description}
              price={data.price}
              onsale={data.onsale}
              img={data.thumbnail.url}
               discount={data.discountPrice}
             />
          ))}
        </div>
    
    </>
  );
}
export { ProductsCard };
