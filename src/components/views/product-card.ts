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

		this.fillCardData(cardElement, product);

		cardElement.addEventListener('click', () => this.onClick(product.id));
		this.container.appendChild(cardElement);

		return cardElement;
	}

	private fillCardData(cardElement: HTMLElement, product: ProductModel): void {
		const titleElement = cardElement.querySelector<HTMLElement>('.card__title');
		const imageElement = cardElement.querySelector<HTMLImageElement>('.card__image');
		const priceElement = cardElement.querySelector<HTMLElement>('.card__price');
		const categoryElement = cardElement.querySelector<HTMLElement>('.card__category');

		titleElement.textContent = product.title;
		priceElement.textContent = formatPrice(product.price);
		imageElement.src = product.image;
		imageElement.alt = product.title;
		categoryElement.textContent = product.category;
	}
}

export { ProductCardViewImpl };
