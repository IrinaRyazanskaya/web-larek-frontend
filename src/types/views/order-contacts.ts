import type { UserDataModel } from "../models/user";

export interface OrderContactsView {
  // Отображает экран ввода контактной информации
  render(
    onNext: (data: Partial<UserDataModel>) => void,
    onInput: (data: Partial<UserDataModel>) => void,
    onClose: () => void,
  ): HTMLElement;

  // Обновляет состояние кнопки "Оплатить" (активна/неактивна)
  setButtonState(isEnabled: boolean): void;

  // Отображает ошибку при заполнении формы
  setError(error: string | null): void;

  // Закрывает модальное окно
  close(): void;
}
