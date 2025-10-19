import type { ProductModel } from "../models/products";

export interface BasketPresenter {
  addProduct(product: ProductModel): void; // Добавляет товар в корзину
  openBasketModal(): void; // Открывает модальное окно корзины
}
