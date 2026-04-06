 import { useGetProducts } from "@hooks/useProducts"
import { ProductsCard } from "@components/common/Products/components/ProductsCard"
import { categoryServices } from "../../../../../../services/category.service";
import { useQuery } from "@tanstack/react-query";
import { useGetProductsByCategory } from "../../../../../../hooks/useProducts";
import { useLocation } from "react-router-dom";

function FetchProducts(){
      

console.log(categoryId)

return(
                 <ProductsCard useQueryHook={() => useGetProductsByCategory(categoryId)}/>
        
)
} 

export  {FetchProducts}