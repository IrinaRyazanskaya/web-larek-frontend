export interface ProductModel {
  id: string;
  title: string;
  price: number | null;
  image: string;
  description: string;
}

export interface ProductsModel {
	products: ProductModel[];
	isLoading: boolean;

	fetchProducts(): Promise<void>; // Загружает товары из API
	getProducts(): ProductModel[]; // Возвращает список товаров
	getProductById(productId: string): ProductModel | undefined; // Возвращает товар по ID
}
