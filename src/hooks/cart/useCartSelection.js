import { useEffect, useMemo, useState } from "react";
import { useGetCart } from "@hooks/cart/useCartData.js";

export const useCartSelection = ({cart}) => {
    const [itemsSummary, setItemsSummary] = useState([]);

 
  

    useEffect(() => {
        if (!cart.length) return;
        // update the item summary when quantity changes
        setItemsSummary((prevSummary) => {
            let updatedSummary = [...prevSummary];
            // Update or remove items
            updatedSummary = updatedSummary.filter((summaryItem) =>
                cart.some((cartItem) => cartItem._id === summaryItem._id)
            );
            cart.forEach((item) => {
                const existingIndex = updatedSummary.findIndex(
                    (summaryItem) => summaryItem._id === item._id
                );
                // console.log("existing index", existingIndex);
                if (existingIndex !== -1) {
                    updatedSummary[existingIndex] = item;
                }
            });

            return updatedSummary;
        });
        // console.log("");
    }, [cart]);
    return {
        itemsSummary,setItemsSummary
    }
}