import type { ProductModel } from '../models/products';

export interface BasketItemView {
  render(item: ProductModel, index: number): HTMLElement; // Отображает элемент корзины и кнопку удаления из неё
}
