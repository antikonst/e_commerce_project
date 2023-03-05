import { useContext, useEffect, useState } from "react";

import { Button } from "@components/Button/Button";
import { Card } from "@components/Card/Card";
import { Input } from "@components/Input/Input";
import { MultiDropdown } from "@components/MultiDropdown/MultiDropdown";
import { PageName } from "@components/PageName";
import { ProductContext } from "@context/context";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

import styles from "./AllProducts.module.scss";
import filter from "../imgs/filter.svg";
import lupa from "../imgs/lupa.svg";

export const AllProducts = () => {
  const { toggleProduct, setIdProd, setRelatedI } =
    useContext<any>(ProductContext);

  const [inputSearch, setInputSearch] = useState("Search property");
  const [itemsInf, setItemsInf] = useState<any>([]);
  const [categorys, setCategorys] = useState<any>([]);
  const num = itemsInf.length;

  const fetch = async () => {
    const result = await axios({
      method: "get",
      url: "https://api.escuelajs.co/api/v1/products",
    });
    setItemsInf(
      result.data.map((item: any) => ({
        category: item.category.name,
        categoryId: item.category.id,
        id: item.id,
        title: item.title,
        imgUrl: item.images[0],
        price: item.price,
        description: item.description,
      }))
    );
  };

  const fetchCategorys = async () => {
    const result = await axios({
      method: "get",
      url: "https://api.escuelajs.co/api/v1/categories",
    });
    setCategorys(
      result.data.map((item: any) => ({
        key: item.name,
        value: item.name,
        id: item.id,
      }))
    );
  };

  useEffect(() => {
    fetch();
    fetchCategorys();
  }, []);

  const axProdfilter = (id: any) => {
    const elId = itemsInf?.find((i: any) => i.id === id);
    const filterAx = itemsInf?.filter((i: any) => i.category === elId.category);
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

  const [itemsForInfinity, setItemsForInfinity] = useState(
    itemsInf.map((item: any) => {
      return block(item);
    })
  );

  useEffect(() => {
    setItemsForInfinity(
      itemsInf.map((item: any) => {
        return block(item);
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

  const [resultSearch, setResultSearch] = useState<any>([]);

  const search_of_title = (input_title: string) => {
    const res = itemsInf.filter((t: any) =>
      t.title.toLowerCase().includes(input_title)
    );
    setResultSearch(
      res.map((item: any) => {
        return block(item);
      })
    );
  };

  const filter_category_id = (cat_id: string) => {
    const res = itemsInf.filter((t: any) => t.categoryId === cat_id);
    setResultSearch(
      res.map((item: any) => {
        return block(item);
      })
    );
  };

  const infinitescroll = (
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
        <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
      }
      releaseToRefreshContent={
        <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
      }
    >
      <div className={styles.products_row}>{state}</div>
    </InfiniteScroll>
  );

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
            <button onClick={() => search_of_title(inputSearch)}>
              <img src={lupa} />
            </button>
            <Input
              placeholder="Search property"
              className={styles.menu_lupa_name}
              value={inputSearch}
              onChange={(e: any) => setInputSearch(e.toLowerCase())}
              onClick={() => setInputSearch("")}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  search_of_title(inputSearch);
                }
              }}
            />
            <Button
              className={styles.button_find_now}
              onClick={() => search_of_title(inputSearch)}
            >
              <span>Find&nbsp;Now</span>
            </Button>
          </div>
          <MultiDropdown
            classnames={styles.multi}
            stylestitle={styles.multititle}
            options={categorys}
            value={[]}
            onChange={(value: any) => filter_category_id(value[0].id)}
            pluralizeOptions={() => ""}
            element={
              <div className={styles.filter}>
                <img src={filter} className={styles.menu_filter} />
                <div className={styles.menu_filter_name}>Filter</div>
              </div>
            }
          />
        </div>
        <div className={styles.total}>
          <div className={styles.total_title}>Total Product</div>
          <div className={styles.total_num}>{num}</div>
        </div>
        {resultSearch.length > 0 ? (
          <div className={styles.products_row}>{resultSearch}</div>
        ) : (
          infinitescroll
        )}
      </div>
    </div>
  );
};
