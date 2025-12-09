import img1 from "@assets/images/banner5.jpg";
import img5 from "@assets/images/img5.jpg";
import img6 from "@assets/images/banner2.jpg";
import { Link } from "react-router-dom";
import { RatingCard } from "../RatingCard";
import { ProductsCard } from "@components/common/Products";

function ProductsSection() {
  
  return (
    <>
    

      <div className="container mt-12 ">
        <div className="flex justify-between">
          <h2 className="text-2xl font-extrabold   mb-4 uppercase">
            Top products
          </h2>
          <Link to="/products">
            <span className="text-sm underline">View all </span>
          </Link>
        </div>
        <ProductsCard limit={4}/>
      </div>
    </>
  );
}

export { ProductsSection };
