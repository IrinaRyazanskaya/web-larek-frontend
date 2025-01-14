import type { UserDataModel } from '../models/user';

export interface OrderContactsView {
	// Отображает экран ввода контактной информации
	render(onNext: (data: Partial<UserDataModel>) => void): HTMLElement;

	// Обновляет состояние кнопки "Оплатить" (активна/неактивна)
	setButtonState(isEnabled: boolean): void;

	// Отображает ошибку для электронной почты
	setEmailError(error: string | null): void;

	// Отображает ошибку для номера телефона
	setPhoneError(error: string | null): void;
}
