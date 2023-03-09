import axios from "axios";
import {
  action,
  makeAutoObservable,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

class AllProductsStore {
  allProds = [];
  constructor() {
    makeObservable(this, {
      allProds: observable.ref,
      fetch: action,
    });
    //makeAutoObservable(this);
  }

  fetch = async () => {
    const result = await axios({
      method: "get",
      url: "https://api.escuelajs.co/api/v1/products",
    });
    runInAction(() => {
      this.allProds = result.data.map((item: any) => ({
        category: item.category.name,
        categoryId: item.category.id,
        id: item.id,
        title: item.title,
        imgUrl: item.images[0],
        price: item.price,
        description: item.description,
      }));
    });
  };
}

export default new AllProductsStore();
