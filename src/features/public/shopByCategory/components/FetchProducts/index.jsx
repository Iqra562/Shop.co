import { useGetProducts } from "@hooks/useProducts";
import { ProductsCard } from "@components/common/Products/components/ProductsCard";
// import { categoryServices } from "../../../../../services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useGetProductsByCategory } from "../../../../../hooks/useProducts";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function FetchProducts({category,filters}) {
//   console.log(categoryId);
const [searchParams] = useSearchParams();

 
  return (
    <ProductsCard useQueryHook={() => useGetProductsByCategory(category,filters)} />
  );
}

export { FetchProducts };
