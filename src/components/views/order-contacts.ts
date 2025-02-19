import type { UserDataModel } from '../../types/models/user';
import type { OrderContactsView } from '../../types/views/order-contacts';
import { Modal } from '../base/modal';

class OrderContactsViewImpl extends Modal implements OrderContactsView {
	private container: HTMLElement;
	private template: HTMLTemplateElement;
	private form: HTMLFormElement | null = null;
	private emailInput: HTMLInputElement | null = null;
	private phoneInput: HTMLInputElement | null = null;
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
		this.emailInput = content.querySelector('input[name="email"]');
		this.phoneInput = content.querySelector('input[name="phone"]');
		this.submitButton = content.querySelector('.button');
		this.errorSpan = content.querySelector('.form__errors');

		this.form.addEventListener('input', () => {
			onInput({
				email: this.emailInput.value,
				phone: this.phoneInput.value,
			});
		});

		this.form.addEventListener('submit', (event) => {
			event.preventDefault();

			const email = this.emailInput.value.trim();
			const phone = this.phoneInput.value.trim();

			if (email && phone) {
				onNext({ email, phone });
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

export { OrderContactsViewImpl };
