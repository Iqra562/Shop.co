import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useGetCart } from "@hooks/cart/useCartData.js";
import { notification, Spin } from "antd";
import { AuthContext } from "@context/AuthContext";
import { useCartActions } from "@hooks/cart/useCartActions.js";
import { useCartSelection } from "@hooks/cart/useCartSelection.js";
import { useCartSummary } from "@hooks/cart/useCartSummary.js";
import CartComponent from "../../../components/common/CartComponent";
function Cart() { 
   
   
  return ( 
    <section className="container min-h-screen ">
      

      <CartComponent/>
    </section>
  );
}
export { Cart };
