
import { ProductsCard } from "@components/common/Products";
import { useSearchParams } from "react-router-dom";
import { useGetProducts ,useGetSaleProducts} from "@hooks/useProducts";
 
function Products() {
 
 const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const useQueryHook = 
    type === "sale"
      ? useGetSaleProducts
      : useGetProducts;
  return (
    <section className="container space-y-10 min-h-screen">
      <div className="border-b py-4 space-y-3">
        <h1 className="text-4xl text-primary font-extrabold uppercase">Products</h1>
        < p className="w-5/12 text-base text-gray-600 font-semibold">Explore our wide range of high-quality products designed to meet your everyday needs with style and reliability.</p>
      </div>
       <ProductsCard useQueryHook={useQueryHook}/>
    </section>
  );
}
export { Products };
