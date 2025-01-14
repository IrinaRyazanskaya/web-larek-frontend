import type { ProductModel } from './products';

export interface BasketModel {
	items: ProductModel[];

	addProduct(product: ProductModel): void; // Добавляет товар в корзину
	removeProduct(productId: string): void; // Удаляет товар из корзины
	getItems(): ProductModel[]; // Возвращает список товаров в корзине
	getTotalQuantity(): number; // Возвращает общее количество товаров
	getTotalPrice(): number; // Возвращает общую стоимость корзины
	clear(): void; // Очищает корзину
}
