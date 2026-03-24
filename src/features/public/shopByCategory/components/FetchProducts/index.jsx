 import { useGetProducts } from "@hooks/useProducts"
import { ProductsCard } from "@components/common/Products/components/ProductsCard"
import { categoryServices } from "../../../../../services/category.service";
import { useQuery } from "@tanstack/react-query";
function FetchProducts(){

//      const {data:getProductByCategory} =  useQuery({

//    queryKey: ["productByCategory", categoryId],
//    queryFn: ()=> categoryServices.getSubCategories(categoryId),
//   enabled: Boolean(categoryId),
// }
//     );
    // console.log(getProductByCategory)
return(
                 <ProductsCard useQueryHook={useGetProducts}/>
        
)
} 

export  {FetchProducts}