import type { ProductModel } from '../models/products';

export interface ProductCardView {
	render(product: ProductModel, onClick: (productId: string) => void): HTMLElement; // Создаёт карточку товара
}
