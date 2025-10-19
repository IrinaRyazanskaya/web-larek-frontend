import type { ProductModel } from "../models/products";

export interface BasketItemView {
  // Отображает элемент корзины и кнопку удаления из неё
  render(item: ProductModel, index: number, onDelete: () => void): HTMLElement;
}
