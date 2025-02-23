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
		isAllowedToBuy: boolean,
		onAddToBasket: (productId: string) => void,
		onClose: () => void
	): HTMLElement {
		super.renderModal(onClose);

		const templateContent = this.template.content.cloneNode(true) as HTMLElement;
		const cardElement = templateContent.querySelector<HTMLElement>('.card');

		this.fillCardData(cardElement, product, isAllowedToBuy, onAddToBasket);

		this.modalContent.appendChild(cardElement);

		return this.container;
	}

	private fillCardData(
		cardElement: HTMLElement,
		product: ProductModel,
		isAllowedToBuy: boolean,
		onAddToBasket: (productId: string) => void
	): void {
		const imageElement = cardElement.querySelector<HTMLImageElement>('.card__image');
		const categoryElement = cardElement.querySelector<HTMLElement>('.card__category');
		const titleElement = cardElement.querySelector<HTMLElement>('.card__title');
		const textElement = cardElement.querySelector<HTMLElement>('.card__text');
		const priceElement = cardElement.querySelector<HTMLElement>('.card__price');
		const buttonElement = cardElement.querySelector<HTMLButtonElement>('.card__button');

		imageElement.src = product.image;
		imageElement.alt = product.title;
		categoryElement.textContent = product.category;
		titleElement.textContent = product.title;
		textElement.textContent = product.description;
		priceElement.textContent = formatPrice(product.price);

		if (!isAllowedToBuy) {
			buttonElement.disabled = true;
		} else {
			buttonElement.addEventListener('click', () => onAddToBasket(product.id));
		}
	}
}

export { ProductModalViewImpl };
