export interface ProductModel {
  id: string;
  title: string;
  price: number | null;
  image: string;
  category: string;
  description: string;
}

export interface ProductsModel {
  fetchProducts(): Promise<void>; // Загружает товары из API
  getProducts(): ProductModel[]; // Возвращает список товаров
  getProductById(productId: string): ProductModel | undefined; // Возвращает товар по ID
}
