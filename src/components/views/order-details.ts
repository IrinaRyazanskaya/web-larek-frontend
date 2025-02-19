import type { UserDataModel } from '../../types/models/user';
import type { OrderDetailsView } from '../../types/views/order-details';
import { Modal } from '../base/modal';

class OrderDetailsViewImpl extends Modal implements OrderDetailsView {
	private container: HTMLElement;
	private template: HTMLTemplateElement;
	private form: HTMLFormElement | null = null;
	private addressInput: HTMLInputElement | null = null;
	private submitButton: HTMLButtonElement | null = null;
	private errorSpan: HTMLSpanElement | null = null;

	constructor(container: HTMLElement, template: HTMLTemplateElement) {
		super();
		this.container = container;
		this.template = template;
	}

	render(
		onNext: (data: Partial<UserDataModel>) => void,
		onInput: (data: Partial<UserDataModel>) => void,
		onClose: () => void
	): HTMLElement {
		super.renderModal(onClose);

		const content = this.template.content.cloneNode(true) as HTMLElement;
		this.form = content.querySelector('.form');
		this.addressInput = content.querySelector('input[name="address"]');
		this.submitButton = content.querySelector('.order__button');
		this.errorSpan = content.querySelector('.form__errors');
		const paymentButtons = content.querySelectorAll<HTMLButtonElement>('.order__buttons .button');

		for (const paymentButton of paymentButtons) {
			paymentButton.addEventListener('click', () => {
				const currentActiveButton = this.form?.querySelector('.button_alt-active');
				currentActiveButton?.classList.remove('button_alt-active');

				paymentButton.classList.add('button_alt-active');

				onInput({
					payment: paymentButton.name,
					address: this.addressInput.value,
				});
			});
		}

		this.form.addEventListener('input', () => {
			const activeButton = this.form.querySelector<HTMLButtonElement>('.button_alt-active');
			const paymentMethod = activeButton?.name || '';

			onInput({
				payment: paymentMethod,
				address: this.addressInput.value,
			});
		});

		this.form.addEventListener('submit', (event) => {
			event.preventDefault();

			const activeButton = this.form.querySelector<HTMLButtonElement>('.button_alt-active');
			const paymentMethod = activeButton?.name;

			if (paymentMethod && this.addressInput.value.trim()) {
				onNext({
					payment: paymentMethod,
					address: this.addressInput.value.trim(),
				});
			}
		});

		this.modalContent.appendChild(content);

		return this.container;
	}

	setButtonState(isEnabled: boolean): void {
		if (this.submitButton) {
			this.submitButton.disabled = !isEnabled;
		}
	}

	setError(error: string | null): void {
		if (this.errorSpan) {
			this.errorSpan.textContent = error || '';
		}
	}
}

export { OrderDetailsViewImpl };
