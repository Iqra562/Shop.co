import { Banner, FetchProducts, Filter } from "./components";
 function ShopByCategory() {
  return (
    <section className="container space-y-10 min-h-screen">
      <Banner />
      <Filter/>
      <FetchProducts />{" "}
    </section>
  );
}

export default ShopByCategory;
