import type { WebLarekClient } from '../../types/clients/weblarek';
import type { BasketModel } from '../../types/models/basket';
import type { UserDataModel, UserModel } from '../../types/models/user';
import type { CheckoutPresenter } from '../../types/presenters/checkout';
import type { BasketButtonView } from '../../types/views/basket-button';
import type { OrderConfirmationView } from '../../types/views/order-confirmation';
import type { OrderContactsView } from '../../types/views/order-contacts';
import type { OrderDetailsView } from '../../types/views/order-details';

class CheckoutPresenterImpl implements CheckoutPresenter {
	private apiClient: WebLarekClient;
	private userModel: UserModel;
	private basketModel: BasketModel;
	private orderDetailsView: OrderDetailsView;
	private orderContactsView: OrderContactsView;
	private orderConfirmationView: OrderConfirmationView;
	private basketButtonView: BasketButtonView;

	constructor(
		apiClient: WebLarekClient,
		userModel: UserModel,
		basketModel: BasketModel,
		orderDetailsView: OrderDetailsView,
		orderContactsView: OrderContactsView,
		orderConfirmationView: OrderConfirmationView,
		basketButtonView: BasketButtonView
	) {
		this.apiClient = apiClient;
		this.userModel = userModel;
		this.basketModel = basketModel;
		this.orderDetailsView = orderDetailsView;
		this.orderContactsView = orderContactsView;
		this.orderConfirmationView = orderConfirmationView;
		this.basketButtonView = basketButtonView;
		this.openCheckoutModal = this.openCheckoutModal.bind(this);
		this.closeOrderDetails = this.closeOrderDetails.bind(this);
		this.closeOrderContacts = this.closeOrderContacts.bind(this);
		this.closeOrderConfirmation = this.closeOrderConfirmation.bind(this);
		this.handleDetailsClickNext = this.handleDetailsClickNext.bind(this);
		this.handleContactsClickNext = this.handleContactsClickNext.bind(this);
		this.handleDetailsFormInput = this.handleDetailsFormInput.bind(this);
		this.handleContactsFormInput = this.handleContactsFormInput.bind(this);
	}

	openCheckoutModal(): void {
		this.orderDetailsView.render(
			this.handleDetailsClickNext,
			this.handleDetailsFormInput,
			this.closeOrderDetails
		);
	}

	private closeOrderDetails(): void {
		this.userModel.reset();
		this.orderDetailsView.close();
	}

	private closeOrderContacts(): void {
		this.userModel.reset();
		this.orderContactsView.close();
	}

	private closeOrderConfirmation(): void {
		this.orderConfirmationView.close();
	}

	private handleDetailsClickNext(data: Partial<UserDataModel>): void {
		this.orderDetailsView.close();
		this.userModel.updateData(data);
		this.orderContactsView.render(
			this.handleContactsClickNext,
			this.handleContactsFormInput,
			this.closeOrderContacts
		);
	}

	private handleContactsClickNext(data: Partial<UserDataModel>): void {
		this.userModel.updateData(data);
		const userData = this.userModel.getData();

		this.apiClient
			.createOrder({
				payment: userData.payment,
				address: userData.address,
				email: userData.email,
				phone: userData.phone,
				total: this.basketModel.getTotalPrice(),
				items: this.basketModel.getItems().map((item) => item.id),
			})
			.then(() => {
				this.orderContactsView.close();
				this.orderConfirmationView.render(
					this.basketModel.getTotalPrice(),
					this.closeOrderConfirmation
				);
				this.basketModel.clear();
				this.basketButtonView.clearCounter();
			})
			.catch((error) => {
				console.error(error);
			});
	}

	private handleDetailsFormInput(data: Partial<UserDataModel>): void {
		this.userModel.updateData(data);
		const addressValidationError = this.userModel.checkAddressValid();
		const paymentValidationError = this.userModel.checkPaymentValid();

		if (addressValidationError) {
			this.orderDetailsView.setError(addressValidationError);
		} else if (paymentValidationError) {
			this.orderDetailsView.setError(paymentValidationError);
		} else {
			this.orderDetailsView.setError(null);
		}

		this.orderDetailsView.setButtonState(!addressValidationError && !paymentValidationError);
	}

	private handleContactsFormInput(data: Partial<UserDataModel>): void {
		this.userModel.updateData(data);
		const emailValidationError = this.userModel.checkEmailValid();
		const phoneValidationError = this.userModel.checkPhoneValid();

		if (emailValidationError) {
			this.orderContactsView.setError(emailValidationError);
		} else if (phoneValidationError) {
			this.orderContactsView.setError(phoneValidationError);
		} else {
			this.orderContactsView.setError(null);
		}

		this.orderContactsView.setButtonState(!emailValidationError && !phoneValidationError);
	}
}

export { CheckoutPresenterImpl };
