import type { ProductModel } from '../models/products';

export interface ProductCardView {
	render(product: ProductModel): HTMLElement; // Создаёт карточку товара
}
