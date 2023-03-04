import { CardCurrentProd } from "@components/CardCurrentProd";
import { RelatedItems } from "@components/RelatedItems";

import styles from "./DetailProduct.module.scss";

export const DetailProduct = () => {
  return (
    <div className={styles.product}>
      <CardCurrentProd />
      <div className={styles.product_related}>Related Items</div>
      <RelatedItems />
    </div>
  );
};
