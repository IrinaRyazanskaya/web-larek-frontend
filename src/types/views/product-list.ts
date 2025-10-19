import type { ProductModel } from "../models/products";

export interface ProductListView {
  render(products: ProductModel[], onClick: (productId: string) => void): HTMLElement; // Отображает список товаров
}
