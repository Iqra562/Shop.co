import Card from "@components/common/Card";
import { useGetProducts } from "../../../hooks/useProducts";
import { Link } from "react-router-dom";
function Products() {
  const { data: productsData, isPending, error } = useGetProducts();
  const products = productsData?.data?.data ?? [];

  return (
    <section className="container space-y-10">
      <div className="border-b pb-4 ">
        <h1 className="text-3xl font-bold">Products</h1>
      </div>
      <div className=" grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-0">
        {products.map((data, i) => (
          <Card
            id={data._id}
            productName={data.name}
            description={data.description}
            price={data.price}
            img={data.thumbnail.url}
          />
        ))}
      </div>
    </section>
  );
}
export { Products };
