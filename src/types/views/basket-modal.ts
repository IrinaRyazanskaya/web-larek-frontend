import type { ProductModel } from '../models/products';

export interface BasketModalView {
	render(
		items: ProductModel[],
    totalPrice: number,
		onCheckout: () => void,
		onItemRemove: (orderItemId: string) => void,
    onClose: () => void
	): HTMLElement; // Отображает содержимое корзины и кнопку оформления

  removeItem(orderItemId: string): void; // Удаляет товар из корзины

  setButtonState(isEnabled: boolean): void; // Обновляет состояние кнопки "Оформить" (активна/неактивна)

  setTotalPrice(totalPrice: number): void; // Обновляет итоговую сумму к оплате

  close(): void; // Закрывает модальное окно
}
