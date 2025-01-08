import type { UserDataModel } from '../models/user';

export interface CheckoutPresenter {
	openCheckoutModal(): void; // Открывает модальное окно оформления заказа
	submitOrder(formData: UserDataModel): void; // Отправляет данные заказа
}
