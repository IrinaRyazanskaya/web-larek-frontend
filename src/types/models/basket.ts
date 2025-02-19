import type { ProductModel } from './products';

export interface BasketItemModel extends ProductModel {
	orderItemId: string;
}

export interface BasketModel {
	addProduct(product: ProductModel): void; // Добавляет товар в корзину
	removeProduct(orderItemId: string): void; // Удаляет товар из корзины
	getItems(): BasketItemModel[]; // Возвращает список товаров в корзине
	getTotalQuantity(): number; // Возвращает общее количество товаров
	getTotalPrice(): number; // Возвращает общую стоимость корзины
	clear(): void; // Очищает корзину
}
