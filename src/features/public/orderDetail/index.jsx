import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { orderServices } from "../../../services/order.service";
import { useParams } from "react-router-dom";

function OrderDetail() {
   const {id} = useParams();
  console.log(id)
 const { data } = useQuery({
  queryKey: ["getOrder", id],
  queryFn: () => orderServices.getOrderById(id),
  enabled: !!id,
});
   const orderData = data?.data?.data;

   console.log(orderData)
  return (
   <div className="px-2 py-10 w-full">
    <div className="mb-10 text-gray-900 "><span>Order ID</span> <span>#{id}</span> </div>
    <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
     {
      orderData?.items.map((item,i)=>{
        return(
     <div key={i}
                             className={`md:h-36 px-4 py-4 flex items-start space-x-2 md:space-x-3 border-slate-100 border shadow-sm shadow-slate-200 rounded-lg  w-full cursor-pointer bg-white`}
                           >
                            <div className="flex  w-full h-full">
                              <div className={`w-6/12 md:w-3/12 h-full rounded-md overflow-hidden`}>
                                   <img
                                    src={item?.thumbnail}
                                    alt=""
                                    className={`w-full h-20 md:h-full object-cover object-top `}
                                  />
                               </div>
    
                              <div className={`pl-2 md:pl-8  w-full flex flex-col justify-between `}>
                                <div className="flex justify-between  w-full items-start">
                                  <h2 className={`text-base md:text-xl  font-bold`}>
{item?.productName}                                   </h2>
                                 
                                </div>
                                <div className="flex justify-between ">
                                  <h3 className={`text-base md:text-xl  font-bold text-secondary`}>
                                    ${item?.price}
                                  </h3>
                                 <div className="flex">
                                  <span className="font-semibold">Qty:</span> <span>{item?.quantity}</span>
                                 </div>
                                </div>
                              </div>
                            </div>
                          </div>
        )
      })
     }
   
     
    </div>
    <div className="mt-10">
       <div className=" h-80 border-2  rounded-md p-4 flex flex-col justify-between">
                    <div className="flex flex-col">
                      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <h5 className="text-lg text-gray-500">
                            Subtotal ({orderData?.items?.length} items):
                          </h5>
                          <span>${orderData?.totalAmount}</span>
                        </div>
                        <div className="flex justify-between">
                          <h5 className="text-lg text-gray-500">
                            Shipping fee:
                          </h5>
                          {/* <span>${shippingFee}</span> */}
                          <span>Free</span> 
                        </div>
                       
                      </div>
                    </div>
                     <div className="flex flex-col justify-between border-t">
                          <h5 className="text-base text-gray-500 font-semibold" >
                            Shipping Address:
                          </h5>
                          {/* <span>${shippingFee}</span> */}
                         <div className="mt-2 flex flex-col">
                          <span>Name: {orderData?.shippingAddress?.fullName}</span>
                          <span>Phone: {orderData?.shippingAddress?.phone}</span>
                          <span>Address: {orderData?.shippingAddress?.city}, {orderData?.shippingAddress?.state}, {orderData?.shippingAddress?.postalCode}, {orderData?.shippingAddress?.street}</span>
                         </div>
                        </div>
                    <div className="space-y-3">
                      <div className="flex justify-between border-t pt-5">
                        <h6 className="text-xl font-bold">Total:</h6>
                        <span className="">${orderData?.totalAmount}</span>
                      </div>
                    
                    </div>
                  </div>
    </div>
    </div>
  );
}

export default OrderDetail;
