import type { ProductModel } from '../models/products';

export interface CartPresenter {
	addProduct(product: ProductModel): void; // Добавляет товар в корзину
	openCartModal(): void; // Открывает модальное окно корзины
}
