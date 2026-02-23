import {Banner} from "./components";
import BrowsByStyle from "./components/BrowsByStyle";
import { ProductOnSale } from "./components/ProductOnSale";
import { ProductsSection } from "./components/ProductsSection";

function Home(){
return(
    <div className="min-h-screen">
     <Banner/>
     <ProductsSection/>
     <ProductOnSale/>
     <BrowsByStyle/>
    </div>
)
}
export  {Home}; 