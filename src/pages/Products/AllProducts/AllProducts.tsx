import { useContext, useEffect, useState } from "react";

import { Button } from "@components/Button/Button";
import { Card } from "@components/Card/Card";
import { Input } from "@components/Input/Input";
import { PageName } from "@components/PageName";
import { ProductContext } from "@context/context";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import styles from "./AllProducts.module.scss";
import filter from "../imgs/filter.svg";
import lupa from "../imgs/lupa.svg";

export const AllProducts = () => {
  const { toggleProduct, setIdProd, setRelatedI } =
    useContext<any>(ProductContext);

  const [inputSearch, setInputSearch] = useState("Search property");
  const [itemsInf, setItemsInf] = useState<any>([]);
  const num = itemsInf.length;

  const fetch = async () => {
    const result = await axios({
      method: "get",
      url: "https://api.escuelajs.co/api/v1/products",
    });

    setItemsInf(
      result.data.map((item: any) => ({
        category: item.category.name,
        id: item.id,
        title: item.title,
        imgUrl: item.images[0],
        price: item.price,
        description: item.description,
      }))
    );
  };

  useEffect(() => {
    fetch();
  }, []);

  const axProdfilter = (id: any) => {
    const elId = itemsInf?.find((i: any) => i.id === id);
    const filterAx = itemsInf?.filter((i: any) => i.category === elId.category);
    setRelatedI(filterAx);
  };

  const [itemsForInfinity, setItemsForInfinity] = useState(
    itemsInf.map((item: any) => {
      return (
        <div key={item.id} className={`${styles.products_row_col} `}>
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
              toggleProduct();
              setIdProd(item.id);
              axProdfilter(item.id);
            }}
          />
        </div>
      );
    })
  );

  useEffect(() => {
    setItemsForInfinity(
      itemsInf.map((item: any) => {
        return (
          <div key={item.id} className={`${styles.products_row_col} `}>
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
                toggleProduct();
                setIdProd(item.id);
                axProdfilter(item.id);
              }}
            />
          </div>
        );
      })
    );
  }, [itemsInf]);

  const [state, setState] = useState(itemsForInfinity.slice(0, 6));

  useEffect(() => {
    setState(itemsForInfinity.slice(0, state.length + 6));
  }, [itemsForInfinity]);

  const fetchData = () => {
    setTimeout(() => {
      setState(itemsForInfinity.slice(0, state.length + 6));
    }, 1500);
  };

  return (
    <div>
      <PageName />
      <div className={styles.products}>
        <div className={styles.top_text}>
          We display products based on the latest products we have, if you want
          to see our old products please enter the name of the item
        </div>
        <div className={styles.menu}>
          <div className={styles.search}>
            <button>
              <img src={lupa} />
            </button>
            <Input
              placeholder="Search property"
              className={styles.menu_lupa_name}
              value={inputSearch}
              onChange={(e: any) => setInputSearch(e)}
              onClick={() => setInputSearch("")}
            />
            <Button className={styles.button_find_now}>
              <span>Find&nbsp;Now</span>
            </Button>
          </div>
          <div className={styles.filter}>
            <img src={filter} className={styles.menu_filter} />
            <div className={styles.menu_filter_name}>Filter</div>
          </div>
        </div>
        <div className={styles.total}>
          <div className={styles.total_title}>Total Product</div>
          <div className={styles.total_num}>{num}</div>
        </div>
        <InfiniteScroll
          dataLength={state.length}
          next={fetchData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          refreshFunction={fetchData}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: "center" }}>
              &#8595; Pull down to refresh
            </h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
          }
        >
          <div className={styles.products_row}>{state}</div>
        </InfiniteScroll>
      </div>
    </div>
  );
};
