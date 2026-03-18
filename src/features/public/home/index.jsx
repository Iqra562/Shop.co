import {Banner} from "./components";
import BrowsByStyle from "./components/BrowsByStyle";
import { ProductCarousal } from "./components/ProductCarousal";
import { ProductOnSale } from "./components/ProductOnSale";
 
function Home(){
return(
    <div className="min-h-screen space-y-20 ">
     <Banner/>
     <ProductCarousal/>
      <ProductOnSale/>
     <BrowsByStyle/>
    </div>
)
}
export  {Home}; 