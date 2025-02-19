import type { ProductModel } from '../../types/models/products';
import type { ProductModalView } from '../../types/views/product-modal';
import { formatPrice } from '../../utils/prices';
import { Modal } from '../base/modal';

class ProductModalViewImpl extends Modal implements ProductModalView {
	private container: HTMLElement;
	private template: HTMLTemplateElement;

	constructor(container: HTMLElement, template: HTMLTemplateElement) {
    super();
		this.container = container;
		this.template = template;
	}

	render(
		product: ProductModel,
		onAddToBasket: (productId: string) => void,
		onClose: () => void
	): HTMLElement {
    super.renderModal(onClose)

		const templateContent = this.template.content.cloneNode(true) as HTMLElement;
		const cardElement = templateContent.querySelector('.card');

		const imageElement = cardElement.querySelector<HTMLImageElement>('.card__image');
		imageElement.src = product.image;
		imageElement.alt = product.title;

		const categoryElement = cardElement.querySelector<HTMLElement>('.card__category');
		categoryElement.textContent = product.category;

		const titleElement = cardElement.querySelector<HTMLElement>('.card__title');
		titleElement.textContent = product.title;

		const textElement = cardElement.querySelector<HTMLElement>('.card__text');
		textElement.textContent = product.description;

		const priceElement = cardElement.querySelector<HTMLElement>('.card__price');
		priceElement.textContent = formatPrice(product.price);

		const buttonElement = cardElement.querySelector<HTMLButtonElement>('.card__button');
		buttonElement.addEventListener('click', () => onAddToBasket(product.id));

    this.modalContent.appendChild(cardElement);

		return this.container;
	}
}

export { ProductModalViewImpl };
