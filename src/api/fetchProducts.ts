export const fetchProducts = async () => {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/products");
    return response.json();
  } catch (e) {
    console.error(e);
  }
};
