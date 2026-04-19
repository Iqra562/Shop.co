function DetailSkeleton() {
  return (
    <div className="animate-pulse flex flex-col md:flex-row gap-6 py-20">     


        <div className="w-full md:w-6/12 rounded-md bg-gray-300 h-96"></div>        
        <div className="md:pl-8 pt-2 md:pt-0 space-y-4 md:space-y-14 w-full md:w-6/12">                     
            <div className="space-y-4"> 
                <div className="flex justify-between items-center ">
                    <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/12"></div>  
                </div>      
                <div className="flex flex-col-reverse items-start ">
                    <div className="flex space-x-1 items-center">
                        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/12"></div> 
                    </div>
                    <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                </div>
            </div>
          <div>
            <h3 className="text-base font-bold">Description:</h3>
            <div className="h-6 bg-gray-300 rounded w-full mt-1"></div>
            <div className="h-6 bg-gray-300 rounded w-full mt-1"></div>
            <div className="h-6 bg-gray-300 rounded w-3/4 mt-1"></div>           
            </div>
            <div>



                <div className="flex space-x-4 items-center">
                    <h3 className="text-base font-bold">Quantity:</h3>
                    <div className="space-x-4 flex items-center">
                        <div className="h-6 bg-gray-300 rounded w-20"></div>
                     </div>
                </div>

                         <div className="h-6 bg-gray-300 rounded w-full mt-5"></div>
               
            </div>
        </div>
    </div>
  );
}

export default DetailSkeleton;