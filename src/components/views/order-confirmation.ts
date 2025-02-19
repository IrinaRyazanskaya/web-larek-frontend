import type { OrderConfirmationView } from '../../types/views/order-confirmation';
import { formatPrice } from '../../utils/prices';
import { Modal } from '../base/modal';

class OrderConfirmationViewImpl extends Modal implements OrderConfirmationView {
	private container: HTMLElement;
	private template: HTMLTemplateElement;

	constructor(container: HTMLElement, template: HTMLTemplateElement) {
    super();
		this.container = container;
		this.template = template;
	}

	render(totalAmount: number, onClose: () => void): HTMLElement {
		super.renderModal(onClose);

		const content = this.template.content.cloneNode(true) as HTMLElement;
		const successButton = content.querySelector('.order-success__close');
		const orderSummaryElement = content.querySelector('.order-success__description');

		orderSummaryElement.textContent = `Списано ${formatPrice(totalAmount)}`;

		successButton.addEventListener('click', () => {
      onClose();
    });

		this.modalContent.appendChild(content);

		return this.container;
	}
}

export { OrderConfirmationViewImpl };
