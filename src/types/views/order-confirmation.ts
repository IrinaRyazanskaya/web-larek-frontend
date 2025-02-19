export interface OrderConfirmationView {
	// Отображает экран подтверждения успешного оформления заказа
  // totalAmount - итоговая сумма заказа
  // onClose - функция, срабатывающая при закрытии модального окна
	render(totalAmount: number, onClose: () => void): HTMLElement;

  // Закрывает модальное окно
  close(): void;
}
