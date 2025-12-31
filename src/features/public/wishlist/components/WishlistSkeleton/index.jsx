import { Skeleton } from "antd";

function WishlistSkeleton(){
    return(
        <div className={`flex flex-col md:flex-row  pt-3 md:space-x-5`}>
    <div className={`w-full  space-y-4`}>
        
         <div className="p-4 w-full  rounded-lg px-4 md:pr-4 lg:pr-5  space-y-4 ">
            <div className="flex w-full space-x-8 ">
  <div className="">

      <Skeleton.Image active />
  </div>
      <div className=" w-full flex flex-col">
        <Skeleton.Input active size="small" style={{ width:"100%"}} />
        <Skeleton.Input active size="small" style={{ width:"100%",marginTop: 8 }} />

      </div>
            </div>

     
     
    </div>
         <div className="p-4 w-full rounded-lg px-4  md:pr-4 lg:pr-5   space-y-4 ">
            <div className="flex w-ful space-x-8 ">
  <div className="">

      <Skeleton.Image active style={{ }} />
  </div>
      <div className=" w-full flex flex-col">
        <Skeleton.Input active size="small" style={{ width:"100%"}} />
        <Skeleton.Input active size="small" style={{ width:"100%",marginTop: 8 }} />

      </div>
            </div>

     
     
    </div>
    </div>
    {/* {isSidebar ? (
        
 <div className=" w-full flex flex-col md:pr-4 lg:pr-5 ">
        <Skeleton.Input active size="small" style={{ width:"100%"}} />
        <Skeleton.Input active size="small" style={{ width:"100%",marginTop: 8 }} />

      </div>
    ): */}
        
    
   
{/* } */}


        </div>
    )
}

export default WishlistSkeleton;