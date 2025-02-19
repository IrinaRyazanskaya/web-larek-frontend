import type { BasketItemModel } from '../../types/models/basket';
import type { BasketModalView } from '../../types/views/basket-modal';
import { formatPrice } from '../../utils/prices';
import { Modal } from '../base/modal';
import { BasketItemViewImpl } from './basket-item';

class BasketModalViewImpl extends Modal implements BasketModalView {
	private container: HTMLElement;
	private template: HTMLTemplateElement;
	private itemTemplate: HTMLTemplateElement;
	private checkoutButton: HTMLButtonElement | null = null;
	private totalPriceElement: HTMLElement | null = null;

	constructor(
		container: HTMLElement,
		template: HTMLTemplateElement,
		itemTemplate: HTMLTemplateElement
	) {
		super();
		this.container = container;
		this.template = template;
		this.itemTemplate = itemTemplate;
	}

	render(
		items: BasketItemModel[],
		totalPrice: number,
		onCheckout: () => void,
		onItemRemove: (orderItemId: string) => void,
		onClose: () => void
	): HTMLElement {
		super.renderModal(onClose);

		const modalElement = this.template.content.cloneNode(true) as HTMLElement;
		const basketList = modalElement.querySelector<HTMLElement>('.basket__list');
		this.totalPriceElement = modalElement.querySelector<HTMLElement>('.basket__price');
		this.checkoutButton = modalElement.querySelector<HTMLButtonElement>('.basket__button');

		for (let i = 0; i < items.length; i++) {
			const basketItemView = new BasketItemViewImpl(this.itemTemplate, () => {
				onItemRemove(items[i].orderItemId);
			});

			basketList.appendChild(basketItemView.render(items[i], i));
		}

		this.setTotalPrice(totalPrice);
		this.setButtonState(items.length > 0);

		this.checkoutButton.addEventListener('click', () => onCheckout());

		this.modalContent.appendChild(modalElement);

		return this.container;
	}

	setButtonState(isEnabled: boolean): void {
		if (this.checkoutButton) {
			this.checkoutButton.disabled = !isEnabled;
		}
	}

	setTotalPrice(totalPrice: number): void {
		this.totalPriceElement.textContent = formatPrice(totalPrice);
	}
}

export { BasketModalViewImpl };
