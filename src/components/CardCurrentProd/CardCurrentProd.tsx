import { FC, useState } from "react";
import { useContext, useEffect } from "react";

import { Button } from "@components/Button/Button";
import { Slider } from "@components/Slider";
import { ProductContext } from "@context/context";
import { formatCurrency } from "@utilities/formatCurrency";
import axios from "axios";

import styles from "./CardCurrentProd.module.scss";

type CardCurrentProdProps = {
  category: string;
  id: number;
  title: string;
  imgUrl: string[];
  price: number;
  description: string;
};

export const CardCurrentProd = () => {
  const { idProd } = useContext<any>(ProductContext);
  const [prod, setProd] = useState<CardCurrentProdProps>();

  const fetch = async () => {
    const result = await axios({
      method: "get",
      url: `https://api.escuelajs.co/api/v1/products/${idProd}`,
    });
    setProd({
      category: result.data.category.name,
      id: result.data.id,
      title: result.data.title,
      imgUrl: result.data.images,
      price: result.data.price,
      description: result.data.description,
    });
  };

  useEffect(() => {
    fetch();
  }, [idProd]);

  return (
    <>
      <div className={styles.prod}>
        <Slider images={prod?.imgUrl} classnames={styles.prod_slider} />

        <div className={styles.prod_text}>
          <div className={styles.prod_title}>{prod?.title}</div>
          <div className={styles.prod_description}>{prod?.description}</div>
          <div className={styles.prod_price}>
            {formatCurrency(prod?.price || 0)}
          </div>
          <div className={styles.prod_button}>
            <Button className={styles.prod_buy}>Buy Now</Button>
            <Button className={styles.prod_add}>Add to Cart</Button>
          </div>
        </div>
      </div>
    </>
  );
};
