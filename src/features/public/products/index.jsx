
import { ProductsCard } from "@components/common/Products";
import { useSearchParams } from "react-router-dom";
import { useGetProducts } from "@hooks/useProducts";

function Products() {
 
 const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const useQueryHook = 
    type === "sale"
      ? useGetProducts
      : useGetProducts;
  return (
    <section className="container space-y-10 min-h-screen">
      <div className="border-b py-4 ">
        <h1 className="text-2xl text-primary font-bold uppercase">Products</h1>
      </div>
       <ProductsCard useQueryHook={useQueryHook}/>
    </section>
  );
}
export { Products };
