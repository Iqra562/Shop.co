import { WishlistCard } from "./components";

function Wishlist(){
    return(
     <div className="w-full space-y-10">
     <div className="px-3 w-full  ">

        <div className="border-b py-4 ">
        <h1 className="text-2xl text-primary font-bold uppercase">My Wishlist</h1>
              </div>
    
     </div>
     <WishlistCard/>
                   </div>
    )
}
export default Wishlist;