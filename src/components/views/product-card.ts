import type { ProductModel } from '../../types/models/products';
import type { ProductCardView } from '../../types/views/product-card';
import { formatPrice } from '../../utils/prices';

class ProductCardViewImpl implements ProductCardView {
	private container: HTMLElement;
	private template: HTMLTemplateElement;
	private onClick: (productId: string) => void;

	constructor(
		container: HTMLElement,
		template: HTMLTemplateElement,
		onClick: (productId: string) => void
	) {
		this.container = container;
		this.template = template;
		this.onClick = onClick;
	}

	render(product: ProductModel): HTMLElement {
		const cardElement = this.template.content.firstElementChild.cloneNode(true) as HTMLElement;

		const titleElement = cardElement.querySelector('.card__title') as HTMLElement;
		const imageElement = cardElement.querySelector('.card__image') as HTMLImageElement;
		const priceElement = cardElement.querySelector('.card__price') as HTMLElement;
		const categoryElement = cardElement.querySelector('.card__category') as HTMLElement;

		titleElement.textContent = product.title;

		priceElement.textContent = formatPrice(product.price);

		imageElement.src = product.image;
		imageElement.alt = product.title;
		categoryElement.textContent = product.category;

		cardElement.addEventListener('click', () => this.onClick(product.id));
		this.container.appendChild(cardElement);

		return cardElement;
	}
}

export { ProductCardViewImpl };
