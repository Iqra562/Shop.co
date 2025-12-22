import { Skeleton } from "antd";

function CartSkeleton({isSidebar}){
    return(
        <div className={`flex flex-col ${isSidebar ? 'md:flex-col justify-between h-full':'md:flex-row'}   pt-3 md:space-x-5`}>
    <div className={`w-full ${isSidebar ? 'w-full ': 'md:w-8/12'}    space-y-4`}>

         <div className="p-4 w-full  rounded-lg px-4 md:pr-4 lg:pr-5  space-y-4 ">
            <div className="flex w-full space-x-8 ">
  <div className="">

      <Skeleton.Image active style={{ }} />
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
    {isSidebar ? (
        
 <div className=" w-full flex flex-col md:pr-4 lg:pr-5 ">
        <Skeleton.Input active size="small" style={{ width:"100%"}} />
        <Skeleton.Input active size="small" style={{ width:"100%",marginTop: 8 }} />

      </div>
    ):
        
    
   ( <div className="md:pl-2 lg:pl-8 space-y-14 w-full md:w-5/12 self-start ">
        <div className="flex w-ful space-x-8 flex-col ">
  
        <div className="rounded-md flex flex-col justify-between p-4 space-y-20 ">
        <div className="flex flex-col space-y-5">

        <Skeleton.Button active size="large" shape="square" style={{ width: "100%" }} />
        <div className="flex justify-between w-full space-x-5">

        <Skeleton.Input active size="small" shape="square" block={true}   />
        <Skeleton.Button active size="small" shape="square"  block={true}   />

        </div>
        {/* <div className="flex justify-between w-full space-x-5">

        <Skeleton.Input active size="small" shape="square" block={true}   />
        <Skeleton.Button active size="small" shape="square"  block={true}   />

        </div> */}
        </div>
        <div className="flex flex-col space-y-4">

        <Skeleton.Button active size="large" shape="square" style={{ width: "100%"}} />
        </div>
      </div>
            </div>
    </div>)
}


        </div>
    )
}

export default CartSkeleton;