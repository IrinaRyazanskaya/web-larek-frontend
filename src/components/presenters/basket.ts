import type { BasketModel } from '../../types/models/basket';
import type { ProductModel } from '../../types/models/products';
import type { BasketPresenter } from '../../types/presenters/basket';
import type { CheckoutPresenter } from '../../types/presenters/checkout';
import type { BasketButtonView } from '../../types/views/basket-button';
import type { BasketModalView } from '../../types/views/basket-modal';

class BasketPresenterImpl implements BasketPresenter {
	private basketModel: BasketModel;
	private basketButtonView: BasketButtonView;
	private basketModalView: BasketModalView;
	private checkoutPresenter: CheckoutPresenter;

	constructor(
		basketModel: BasketModel,
		basketButtonView: BasketButtonView,
		basketModalView: BasketModalView,
		checkoutPresenter: CheckoutPresenter
	) {
		this.basketModel = basketModel;
		this.basketButtonView = basketButtonView;
		this.basketModalView = basketModalView;
		this.checkoutPresenter = checkoutPresenter;
		this.openNextModal = this.openNextModal.bind(this);
		this.removeProduct = this.removeProduct.bind(this);
		this.openBasketModal = this.openBasketModal.bind(this);
		this.closeBasketModal = this.closeBasketModal.bind(this);
		this.basketButtonView.setClickHandler(this.openBasketModal);
	}

	addProduct(product: ProductModel): void {
		this.basketModel.addProduct(product);
		this.basketButtonView.render(this.basketModel.getTotalQuantity());
	}

	removeProduct(orderItemId: string): void {
		this.basketModel.removeItem(orderItemId);
    this.basketModalView.removeItem(orderItemId);
		this.basketModalView.setTotalPrice(this.basketModel.getTotalPrice());
		this.basketModalView.setButtonState(this.basketModel.getTotalQuantity() > 0);
		this.basketButtonView.render(this.basketModel.getTotalQuantity());
	}

	openBasketModal(): void {
		this.basketModalView.render(
			this.basketModel.getItems(),
			this.basketModel.getTotalPrice(),
			this.openNextModal,
			this.removeProduct,
			this.closeBasketModal
		);
	}

	private closeBasketModal(): void {
		this.basketModalView.close();
	}

	private openNextModal(): void {
		this.basketModalView.close();
		this.checkoutPresenter.openCheckoutModal();
	}
}

export { BasketPresenterImpl };
