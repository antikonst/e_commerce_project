import { useContext } from "react";

import { CardCurrentProd } from "@components/CardCurrentProd";
import { RelatedItems } from "@components/RelatedItems";
import { ProductContext } from "@context/context";

import styles from "./DetailProduct.module.scss";

export const DetailProduct = () => {
  const { toggleProduct, idProd } = useContext<any>(ProductContext);

  return (
    <div className={styles.product}>
      <CardCurrentProd />
      <div className={styles.product_related}>Related Items</div>
      <RelatedItems />
    </div>
  );
};
