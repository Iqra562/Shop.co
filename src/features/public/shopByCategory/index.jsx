import { useEffect, useState } from "react";
import { Banner, FetchProducts, Filter } from "./components";
import { useLocation } from "react-router-dom";

 function ShopByCategory() {
  const [category,setCategory] = useState('');
  const location = useLocation();
  const categoryId = location.state?.categoryId;
   useEffect(()=>{
 setCategory(categoryId)

   },[categoryId])
  return (
    <section className="container space-y-10 min-h-screen">
      <Banner />
      <Filter categoryId={categoryId} category={categoryId} setCategory={setCategory}/>
      <FetchProducts category={category}/>{" "}
    </section>
  );
}

export default ShopByCategory;
