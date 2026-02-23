import img1 from "@assets/images/banner5.jpg";
import img5 from "@assets/images/img5.jpg";
import img6 from "@assets/images/banner2.jpg";
import { Link } from "react-router-dom";
import { RatingCard } from "../RatingCard";
import { ProductsCard } from "@components/common/Products";
import { useGetProducts } from "@hooks/useProducts";

function ProductOnSale() {
  
  return (
    <>
    

      <div className="container mt-12  ">
        <div className="flex justify-between">
          <h2 className="text-2xl font-extrabold   mb-4 uppercase">
            On Sale
          </h2>
<Link to="/products?type=sale">
            <span className="text-sm underline">View all </span>
          </Link>
        </div>
        <ProductsCard limit={4} useQueryHook={useGetProducts}/>
      </div>
    </> 
  );
}

export { ProductOnSale };
