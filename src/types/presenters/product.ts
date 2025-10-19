export interface ProductPresenter {
  loadProducts(): Promise<void>; // Загружает список товаров из модели
  openProductModal(productId: string): void; // Открывает модальное окно с информацией о товаре
}
