import type { ProductModel } from '../models/products';

export interface ProductModalView {
	render(
		product: ProductModel,
    isAllowedToBuy: boolean,
		onAddToBasket: (productId: string) => void,
		onClose: () => void
	): HTMLElement; // Отображает информацию о товаре
	close(): void; // Закрывает модальное окно
}
