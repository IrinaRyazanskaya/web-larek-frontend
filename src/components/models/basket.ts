import type { BasketModel } from '../../types/models/basket';
import { ProductModel } from '../../types/models/products';

class BasketModelImpl implements BasketModel {
	items: ProductModel[];

	addProduct(product: ProductModel): void {
		this.items.push(product);
	}

	removeProduct(productId: string): void {
		this.items = this.items.filter((item) => {
			return item.id !== productId;
		});
	}

	getItems(): ProductModel[] {
		return this.items;
	}

	getTotalQuantity(): number {
		return this.items.length;
	}

	getTotalPrice(): number {
		let totalPrice = 0;

		for (const item of this.items) {
			totalPrice += item.price;
		}

		return totalPrice;
	}

	clear(): void {
		this.items = [];
	}
}

export { BasketModelImpl };
