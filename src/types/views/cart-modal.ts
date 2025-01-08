import type { ProductModel } from '../models/products';

export interface CartModalView {
	render(items: ProductModel[], onCheckout: () => void): HTMLElement; // Отображает содержимое корзины и кнопку оформления
}
