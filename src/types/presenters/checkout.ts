export interface CheckoutPresenter {
	openCheckoutModal(): void; // Открывает модальное окно оформления заказа
	submitOrder(): void; // Отправляет данные заказа
}
