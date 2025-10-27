import img1 from '../../../assets/images/img.jpg'

function Orders(){
 return(
    <section className="container space-y-10">
       <div className="border-b pb-4 ">
         <h1 className="text-3xl font-bold">Your Orders</h1>
       </div>
        <div className='space-y-4'>
            <div className="bg-gray-50 px-2 py-5">
                <div className="border-b flex justify-between items-center pb-2">
                    <div className='font-bold'>
                    #123455
                    </div>
                    <div>
                        <div className='border border-green-400  bg-green-100 rounded-xl px-6'>Pay</div>
                    </div>
                    </div>
                <div className='flex px-10 py-4 space-x-5'>
                    <div className='rounded-md overflow-hidden w-20 h-20'  >
                        <img src={img1} alt="" className='w-full h-full' />
                    </div>
                    <div className='flex space-x-80 w-full'>
                        <h6>Product Name</h6>
                        <span>$87</span>
                        <span>Qty:3</span>
                    </div>
                </div>
                <div className='flex px-10 py-4 space-x-5'>
                    <div className='rounded-md overflow-hidden w-20 h-20'  >
                        <img src={img1} alt="" className='w-full h-full' />
                    </div>
                    <div className='flex space-x-80 w-full'>
                        <h6>Product Name</h6>
                        <span>$87</span>
                        <span>Qty:3</span>
                    </div>
                </div>
            </div>
           
        </div>
     </section>
 )
}
export {Orders}