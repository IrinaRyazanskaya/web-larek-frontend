import type { BasketButtonView } from '../../types/views/basket-button';

class BasketButtonViewImpl implements BasketButtonView {
  private basketButton: HTMLElement;
  private onBasketOpen: () => void;
  private counterElement: HTMLElement;

  constructor(basketButton: HTMLElement) {
    this.basketButton = basketButton;
    this.counterElement = basketButton.querySelector('.header__basket-counter');
  }

	render(itemsCount: number): HTMLElement {
		this.counterElement.textContent = String(itemsCount);

    return this.basketButton;
	}

	clearCounter(): void {
		this.counterElement.textContent = '0';
	}

  setClickHandler(handler: () => void): void {
    this.onBasketOpen = handler;
    this.basketButton.addEventListener('click', handler);
  }
}

export { BasketButtonViewImpl };
