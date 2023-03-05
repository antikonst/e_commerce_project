import { useContext, useState } from "react";
import { useEffect } from "react";

import { ProductContext } from "@context/context";

import { AllProducts } from "./AllProducts";
import { DetailProduct } from "./DetailProduct";

export const Products = () => {
  const { productState } = useContext<any>(ProductContext);

  const [currentProd, setCurrentProd] = useState(<AllProducts />);

  const setProd = () => {
    productState
      ? setCurrentProd(<AllProducts />)
      : setCurrentProd(<DetailProduct />);
  };

  useEffect(() => {
    setProd();
  }, [productState]);

  return currentProd;
};
