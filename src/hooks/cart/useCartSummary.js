import { OrderContext } from "@context/OrderContext";
import { useContext, useEffect, useMemo, useState } from "react";
 

export const useCartSummary = ({itemsSummary,setItemsSummary,cart,onNotify,onNavigate}) => {
  const { setProducts } = useContext(OrderContext);
      const [loader, setLaoder] = useState(false);
 
     

     const { subTotal, totalItems, grandTotal } = useMemo(() => {
    if (itemsSummary.length === 0) {
      return { subTotal: 0, totalItems: 0, total: 0, grandTotal: 0 };
    }
    const subTotal = itemsSummary.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
    const totalItems = itemsSummary.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    const shippingFee = 0;
    const grandTotal = subTotal + shippingFee;
    return { subTotal, totalItems, grandTotal };
  }, [itemsSummary, cart]);

  const totalProductSummaryHandler = (id) => {
    //  console.log(id)
    const items = cart.find((item) => item._id === id);
    const isItemInSummaryArray = itemsSummary.find((item) => item._id === id);
    if (isItemInSummaryArray) {
      setItemsSummary((prev) =>
        prev.filter((summaryItem) => summaryItem._id !== id)
      );
    } else {
      setItemsSummary((pre) => [...pre, items]);
    }
    // console.log(itemsSummary, "items summary");
  };
  useEffect(() => {
    setProducts(itemsSummary);
  }, [itemsSummary, cart]);

  const proceedToCheckout = () => {
    if (!itemsSummary.length) {
      onNotify("warning", "Please select items");
      return;
    }
    setLaoder(true);
    setTimeout(() => {
      setLaoder(false);
      onNavigate("/order-summary");
    }, 3000);
  };

  return{
    subTotal, totalItems, grandTotal,
    totalProductSummaryHandler,
    proceedToCheckout,
    loader, setLaoder
    

  }
}