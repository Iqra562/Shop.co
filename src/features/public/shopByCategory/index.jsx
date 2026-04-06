import { Banner, FetchProducts, Filter } from "./components";
import { useLocation } from "react-router-dom";

 function ShopByCategory() {
  const location = useLocation();
  const categoryId = location.state?.categoryId;
  
  return (
    <section className="container space-y-10 min-h-screen">
      <Banner />
      <Filter/>
      <FetchProducts />{" "}
    </section>
  );
}

export default ShopByCategory;
