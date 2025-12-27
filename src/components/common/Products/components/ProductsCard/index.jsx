import Card from "@components/common/Card";
import { useGetProducts } from "@hooks/useProducts";
import ProductCardSkeleton from "../ProductCardSkeleton";
 function ProductsCard({limit}) {
  const { data: productsData, isPending, error } = useGetProducts();
  const getProducts = productsData?.data?.data ?? [];
    const products = limit ? getProducts.slice(0, limit) : getProducts;

  return (
   <>
        {
            isPending ?  <ProductCardSkeleton/> :(
                <div className=" grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-8 gap-x-3 md:gap-y-8 md:gap-x-4">
{ products.map((data, i) => (
          <Card
          key={i}
            id={data._id}
            productName={data.name}
            description={data.description}
            price={data.price}
            img={data.thumbnail.url}
          />
        ))}
      </div>
            )
        }
       
      
</>
   );
}
export { ProductsCard };
