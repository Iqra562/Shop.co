import { createContext, useEffect, useState } from "react";

export const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
const [products, setProducts] = useState([]);
const [address, setAddress] = useState(null);
// const [products, setProducts] = useState(() => {
//   const saved = sessionStorage.getItem("products");
//   return saved ? JSON.parse(saved) : [];
// });
  // useEffect(()=>{
  //   sessionStorage.setItem("orderSummary", JSON.stringify(products)); 
  // },[products])
  return (
    <OrderContext.Provider value={{ products, setProducts, address, setAddress }}>
      {children}
    </OrderContext.Provider>
  );
};
export default OrderContextProvider;
