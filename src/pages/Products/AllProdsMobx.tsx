import { useContext, useEffect } from "react";

import { Card } from "@components/Card/Card";
import { ProductContext } from "@context/context";
import { prodStore } from "@store/index";
import { Link } from "react-router-dom";

import styles from "./AllProducts/AllProducts.module.scss";

export const AllProdsMobx = () => {
  const { setIdProd, setRelatedI } = useContext<any>(ProductContext);

  useEffect(() => {
    prodStore.loadProds();
    console.log(prodStore.prods);
  }, []);

  const axProdfilter = (id: any) => {
    const elId = prodStore.prods?.find((i: any) => i.id === id);
    const filterAx = prodStore.prods?.filter(
      (i: any) => i.category === elId?.category
    );
    setRelatedI(filterAx);
  };

  const block = (item: any) => {
    return (
      <div key={item.id} className={`${styles.products_row_col} `}>
        <Link to={"/:" + item.id}>
          <Card
            classnames={styles.proucts_card}
            category={item.category}
            image={item.imgUrl}
            title={
              item.title.slice(0, window.innerWidth > 1000 ? 20 : 15) + "..."
            }
            subtitle={
              item.description.slice(0, window.innerWidth > 1000 ? 30 : 20) +
              "..."
            }
            price={item.price}
            onClick={() => {
              setIdProd(item.id);
              axProdfilter(item.id);
            }}
          />
        </Link>
      </div>
    );
  };

  return (
    <div>
      {prodStore.prods.map((item: any) => {
        return block(item);
      })}
    </div>
  );
};
