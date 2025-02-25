import type { UserDataModel } from '../models/user';

export interface OrderDetailsView {
	// Отображает экран ввода данных заказа
	render(
		onNext: (data: Partial<UserDataModel>) => void,
		onInput: (data: Partial<UserDataModel>) => void,
    onClose: () => void
	): HTMLElement;

	// Обновляет состояние кнопки "Далее" (активна/неактивна)
	setButtonState(isEnabled: boolean): void;

	// Отображает ошибку при заполнении формы
	setError(error: string | null): void;

  // Меняет выбранный способ оплаты
  changePaymentMethod(method: string): void;

  // Закрывает модальное окно
  close(): void;
}
