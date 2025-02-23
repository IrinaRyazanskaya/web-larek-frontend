import type { BasketModel } from '../../types/models/basket';
import type { ProductsModel } from '../../types/models/products';
import type { BasketPresenter } from '../../types/presenters/basket';
import type { ProductPresenter } from '../../types/presenters/product';
import type { ProductListView } from '../../types/views/product-list';
import type { ProductModalView } from '../../types/views/product-modal';

class ProductPresenterImpl implements ProductPresenter {
	private productsModel: ProductsModel;
  private basketModel: BasketModel;
	private productListView: ProductListView;
	private productModalView: ProductModalView;
	private basketPresenter: BasketPresenter;

	constructor(
		productsModel: ProductsModel,
    basketModel:  BasketModel,
		productListView: ProductListView,
		productModalView: ProductModalView,
		basketPresenter: BasketPresenter
	) {
		this.productsModel = productsModel;
    this.basketModel = basketModel;
		this.productListView = productListView;
		this.productModalView = productModalView;
		this.basketPresenter = basketPresenter;
    this.openProductModal = this.openProductModal.bind(this);
    this.closeBasketModal = this.closeBasketModal.bind(this);
    this.addProductToBasket = this.addProductToBasket.bind(this);
	}

	loadProducts(): Promise<void> {
		return this.productsModel.fetchProducts().then(() => {
			const products = this.productsModel.getProducts();

			this.productListView.render(products, this.openProductModal);
		});
	}

	openProductModal(productId: string): void {
		const product = this.productsModel.getProductById(productId);
    const basketItems = this.basketModel.getItems();
    const isAllowedToBuy = product.price !== null && !basketItems.find((item) => item.id === product.id);
		this.productModalView.render(product, isAllowedToBuy, this.addProductToBasket, this.closeBasketModal);
	}

  private closeBasketModal(): void {
    this.productModalView.close();
  }

  private addProductToBasket(productId: string): void {
    this.basketPresenter.addProduct(this.productsModel.getProductById(productId));
    this.productModalView.close();
  }
}

export { ProductPresenterImpl };
