import { action, makeObservable, observable } from "mobx";
import { fetchProducts } from "src/api/fetchProducts";

export interface prodItem {
  id: string;
  category: string;
  categoryId: number;
  title: string;
  imgUrl: string;
  price: number;
  description: string;
}

class ProdStore {
  prods: Array<prodItem> = [];

  async loadProds() {
    const prods = await fetchProducts();
    this.prods = prods;
  }

  constructor() {
    makeObservable(this, {
      prods: observable,
      loadProds: action,
    });
  }
}

export default ProdStore;
