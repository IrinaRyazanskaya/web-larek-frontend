import type { ProductModel } from '../models/products';

export interface BasketModalView {
	render(items: ProductModel[], onCheckout: () => void): HTMLElement; // Отображает содержимое корзины и кнопку оформления
}
