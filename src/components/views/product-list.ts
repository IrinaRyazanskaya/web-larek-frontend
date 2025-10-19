import type { ProductModel } from "../../types/models/products";
import type { ProductCardView } from "../../types/views/product-card";
import type { ProductListView } from "../../types/views/product-list";

class ProductListViewImpl implements ProductListView {
  private container: HTMLElement;
  private cardView: ProductCardView;

  constructor(container: HTMLElement, cardView: ProductCardView) {
    this.container = container;
    this.cardView = cardView;
  }

  render(products: ProductModel[], onClick: (productId: string) => void): HTMLElement {
    this.container.innerHTML = "";

    products.forEach((product) => {
      this.container.appendChild(this.cardView.render(product, onClick));
    });

    return this.container;
  }
}

export { ProductListViewImpl };
