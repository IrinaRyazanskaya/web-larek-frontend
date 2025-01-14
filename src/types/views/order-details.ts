import type { UserDataModel } from '../models/user';

export interface OrderDetailsView {
	// Отображает экран ввода данных заказа
	render(onNext: (data: Partial<UserDataModel>) => void): HTMLElement;

	// Обновляет состояние кнопки "Далее" (активна/неактивна)
	setButtonState(isEnabled: boolean): void;

	// Отображает ошибку для адреса доставки
	setAddressError(error: string | null): void;

	// Отображает ошибку для метода оплаты
	setPaymentError(error: string | null): void;
}
