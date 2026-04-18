import { useEffect, useState } from "react";
import { Banner, FetchProducts, Filter } from "./components";
import { useNavigate, useLocation } from "react-router-dom";

function ShopByCategory() {
  const [category, setCategory] = useState("");
  const location = useLocation();
  const categoryId = location.state?.categoryId;
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    setCategory(categoryId);
  }, [categoryId]);

  const filters = {
    onSale: searchParams.get("onSale"),
    minPrice: searchParams.get("minPrice"),
    maxPrice: searchParams.get("maxPrice"),
    sortBy: searchParams.get("sortBy"),
  };

  return (
    <section className="container space-y-10 min-h-screen">
      <Banner />
      <Filter
        categoryId={categoryId}
        category={categoryId}
        setCategory={setCategory}
      />
      <FetchProducts category={category} filters={filters} />{" "}
    </section>
  );
}

export default ShopByCategory;
