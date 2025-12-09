
import { ProductsCard } from "@components/common/Products";

function Products() {
 

  return (
    <section className="container space-y-10 min-h-screen">
      <div className="border-b py-4 ">
        <h1 className="text-2xl text-primary font-bold uppercase">Products</h1>
      </div>
       <ProductsCard/>
    </section>
  );
}
export { Products };
