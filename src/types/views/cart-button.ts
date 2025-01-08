export interface CartButtonView {
	render(itemsCount: number, onCartOpen: () => void): HTMLElement; // Отображает кнопку открытия корзины и счётчик
}
