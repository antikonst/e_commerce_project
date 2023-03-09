import axios from "axios";
import {
  action,
  makeAutoObservable,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

class CategorysStore {
  categorys = [];
  constructor() {
    makeObservable(this, {
      fetch: action,
      categorys: observable.ref,
    });
  }

  fetch = async () => {
    const result = await axios({
      method: "get",
      url: "https://api.escuelajs.co/api/v1/categories",
    });
    runInAction(() => {
      this.categorys = result.data.map((item: any) => ({
        key: item.id,
        value: item.name,
        id: item.id,
      }));
    });
  };
}

export default new CategorysStore();
