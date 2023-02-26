import { useContext, useEffect, useState } from "react";

import { Card } from "@components/Card/Card";
import { ProductContext } from "@context/context";
import { randomNumberInRange } from "@func/randonNumberInRange";

import styles from "./RelatedItems.module.scss";

export const RelatedItems = () => {
  const { setIdProd, relatedI, idProd } = useContext<any>(ProductContext);
  const [randomN, setRandomN] = useState(4);
  const [numProds, setNumProds] = useState(3);

  useEffect(() => {
    setRandomN(randomNumberInRange(numProds, relatedI.length));
  }, [idProd]);

  useEffect(() => {
    setNumProds(window.innerWidth > 1000 ? 3 : 4);
  }, [window.innerWidth]);

  return (
    <div className={styles.related}>
      {relatedI
        .map((i: any) => (
          <div key={i.id} className={styles.divcard}>
            <Card
              classnames={styles.related_card}
              category={i.category}
              image={i.imgUrl}
              title={`${i.title.slice(
                0,
                window.innerWidth > 1000 ? 20 : 15
              )}...`}
              subtitle={`${i.description.slice(
                0,
                window.innerWidth > 1000 ? 30 : 20
              )}...`}
              price={i.price}
              onClick={() => {
                setIdProd(i.id);
              }}
            />
          </div>
        ))
        .slice(randomN - numProds, randomN)}
    </div>
  );
};
