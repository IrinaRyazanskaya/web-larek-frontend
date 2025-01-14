export interface OrderConfirmationView {
	// Отображает экран подтверждения успешного оформления заказа
	// onClose - колбэк для закрытия модального окна
	render(onClose: () => void): HTMLElement;
}
