import type { ProductModel } from '../models/products';

export interface ProductModalView {
	render(
		product: ProductModel,
		onAddToBasket: (productId: string) => void
	): HTMLElement; // Отображает информацию о товаре
}
