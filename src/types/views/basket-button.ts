export interface BasketButtonView {
  render(itemsCount: number): HTMLElement; // Отображает кнопку открытия корзины и счётчик
  clearCounter(): void; // Обнуляет счётчик товаров
  setClickHandler(handler: () => void): void; // Назначает обработчик клика на кнопку корзины
}
