import { useMutation, useQuery } from '@tanstack/react-query'
import img1 from '../../../assets/images/img.jpg'
import { orderServices } from '../../../services/order.service.js';
import { Button, notification, Space } from "antd";

function Orders(){
      const [api, contextHolder] = notification.useNotification();
   const { data: userOrder, isPending, error } =   useQuery({
        queryKey: ["userOrders"],
        queryFn: orderServices.getOrdersById,
      }); 
    //   console.log(userOrder?.data?.data)
      const userOrderData = userOrder?.data?.data || [];
     
 return(
    <section className="container space-y-10 min-h-screen">
              {contextHolder}

       <div className="border-b py-4 ">
        <h1 className="text-2xl text-primary font-bold uppercase">My Orders</h1>
              </div>
    
       {
        userOrderData.map((orderItem,index)=>(
        
        <div key={index} className='space-y-4 '>
            <div className="bg-white rounded-md border px-2 md:px-10 py-5 ">
                <div className="border-b flex flex-col md:flex-row  md:justify-between items-center pb-2">
                    <div className='font-bold'>
                    #{orderItem._id}
                    </div>
                    <div className=' w-full flex justify-end'>
                        <div className='border border-green-400  bg-green-100 rounded-xl px-6 inline '>{orderItem.paymentStatus}</div>
                    </div>
                    </div>
                    {
                        orderItem.items.map((eachOrderData,index)=>(
                            <div key={index}>
   <div className='flex py-4 space-x-5'>
                    <div className='rounded-md overflow-hidden w-20 h-20'  >
                        <img src={eachOrderData.thumbnail} alt="" className='w-full h-full' />
                    </div>
                    <div className=' grid grid-cols-3 w-full'>
                        <h6>{eachOrderData.productName}</h6>
                        <span>${eachOrderData.price}</span>
                        <span>Qty:{eachOrderData.quantity}</span>
                    </div>
                    </div>
                   
                </div>
                        ))
                    }
             
                 <div className='border-t flex  justify-end space-x-5'>
  <div>Total Amount:</div>
  <div>${orderItem.totalAmount}</div>
                    </div>
            </div>
           
        </div>
            
        )).reverse()
       }
     </section>
 )
}
export {Orders}