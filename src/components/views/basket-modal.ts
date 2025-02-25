import type { BasketItemModel } from '../../types/models/basket';
import type { BasketItemView } from '../../types/views/basket-item';
import type { BasketModalView } from '../../types/views/basket-modal';
import { formatPrice } from '../../utils/prices';
import { Modal } from '../base/modal';

class BasketModalViewImpl extends Modal implements BasketModalView {
	private container: HTMLElement;
	private template: HTMLTemplateElement;
	private itemView: BasketItemView;
	private checkoutButton: HTMLButtonElement | null = null;
	private totalPriceElement: HTMLElement | null = null;

	constructor(
		container: HTMLElement,
		template: HTMLTemplateElement,
		itemView: BasketItemView
	) {
		super();
		this.container = container;
		this.template = template;
		this.itemView = itemView;
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
			basketList.appendChild(this.itemView.render(items[i], i, () => {
				onItemRemove(items[i].orderItemId);
			}));
		}

		this.setTotalPrice(totalPrice);
		this.setButtonState(items.length > 0);

		this.checkoutButton.addEventListener('click', onCheckout);

		this.modalContent.appendChild(modalElement);

		return this.container;
	}

  removeItem(orderItemId: string): void {
    const itemToRemove = this.container.querySelector(`.basket__item[data-order-item-id="${orderItemId}"]`);
    itemToRemove?.remove();
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
