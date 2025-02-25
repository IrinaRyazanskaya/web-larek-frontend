import type { ProductModel } from '../../types/models/products';
import type { ProductListView } from '../../types/views/product-list';
import { ProductCardViewImpl } from './product-card';

class ProductListViewImpl implements ProductListView {
	private container: HTMLElement;
	private cardTemplate: HTMLTemplateElement;

	constructor(container: HTMLElement, cardTemplate: HTMLTemplateElement) {
		this.container = container;
		this.cardTemplate = cardTemplate;
	}

	render(products: ProductModel[], onClick: (productId: string) => void): HTMLElement {
		this.container.innerHTML = '';

		const productCardView = new ProductCardViewImpl(this.cardTemplate, onClick);

		products.forEach((product) => {
			this.container.appendChild(productCardView.render(product));
		});

		return this.container;
	}
}

export { ProductListViewImpl };
