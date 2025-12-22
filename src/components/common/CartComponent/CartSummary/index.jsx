
 import {  Spin } from "antd";
 import { LoadingOutlined } from "@ant-design/icons";

 
 function CartSummary({totalItems,subTotal,grandTotal,proceedToCheckout,loader}){
  return (
      <div className=" h-80 border-2  rounded-md p-4 flex flex-col justify-between">
                    <div className="flex flex-col">
                      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <h5 className="text-lg text-gray-500">
                            Subtotal ({totalItems} items):
                          </h5>
                          <span>${subTotal}</span>
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
                    <div className="space-y-3">
                      <div className="flex justify-between border-t pt-5">
                        <h6 className="text-xl font-bold">Total:</h6>
                        <span className="">${grandTotal}</span>
                      </div>
                      {/* <Link to="/order-summary"> */}
                      <button
                        className="bg-primary-button-gradient w-full text-white py-2 rounded-md   "
                        onClick={proceedToCheckout}
                        disabled={loader}
                      >
                        {loader ? (
                          <Spin
                            indicator={
                              <LoadingOutlined
                                style={{
                                  fontSize: 15,
                                  color: "white",
                                  marginRight: "10px",
                                }}
                                spin
                              />
                            }
                            size="small  "
                            colorPrimary="#000"
                            dotSizeSM={50}
                            spinning={loader}
                          />
                        ) : (
                          "Proceed To Checkout"
                        )}
                      </button>
                      {/* </Link>
                       */}
                    </div>
                  </div>
  )
 }

 export default CartSummary;