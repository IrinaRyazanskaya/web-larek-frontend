import type { BasketItemModel, BasketModel } from "../../types/models/basket";
import { ProductModel } from "../../types/models/products";

class BasketModelImpl implements BasketModel {
  private items: BasketItemModel[];

  constructor() {
    this.items = [];
  }

  addProduct(product: ProductModel): void {
    const basketItem: BasketItemModel = {
      ...product,
      orderItemId: this.generateOrderItemId(),
    };
    this.items.push(basketItem);
  }

  removeItem(orderItemId: string): void {
    this.items = this.items.filter((item) => item.orderItemId !== orderItemId);
  }

  getItems(): BasketItemModel[] {
    return this.items;
  }

  getTotalQuantity(): number {
    return this.items.length;
  }

  getTotalPrice(): number {
    let totalPrice = 0;

    for (const item of this.items) {
      totalPrice += item.price;
    }

    return totalPrice;
  }

  clear(): void {
    this.items = [];
  }

  private generateOrderItemId(): string {
    return Math.random().toString(36).slice(2, 12);
  }
}

export { BasketModelImpl };
