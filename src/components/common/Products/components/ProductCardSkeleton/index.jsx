    import { Skeleton } from "antd";

    function ProductCardSkeleton(){
        return( 
               <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                   {Array.from({ length: 4 }).map((_, i) => (

          <div key={i} className="border border-gray-100 rounded-lg p-4 flex flex-col space-y-3 w-full">
      <div className="w-full h-48 rounded-md overflow-hidden ">
        <Skeleton.Image active     style={{  }}
 />
      </div>

      <div className="flex flex-col space-y-2">
        <Skeleton.Input active size="default" style={{ width: "80%" }} />
        <Skeleton.Input active size="small" style={{ width: "60%" }} />
        <Skeleton.Input active size="small" style={{ width: "40%" }} />
      </div>
    </div>

)  )}
    </div>
        )
    }

    export default ProductCardSkeleton;