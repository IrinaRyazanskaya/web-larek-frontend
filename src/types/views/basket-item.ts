import type { ProductModel } from '../models/products';

export interface BasketItemView {
  render(item: ProductModel): HTMLElement; // Отображает элемент корзины и кнопку удаления из неё
}
