import type { WebLarekClient } from '../../types/clients/weblarek';
import type { ProductModel, ProductsModel } from '../../types/models/products';

class ProductsModelImpl implements ProductsModel {
	private products: ProductModel[];
	private apiClient: WebLarekClient;

	constructor(apiClient: WebLarekClient) {
    this.products = [];
		this.apiClient = apiClient;
	}

	fetchProducts(): Promise<void> {
		return this.apiClient
			.getProductList()
			.then((data) => {
				this.products = data.items;
			})
			.catch((error) => {
				console.error(error);
			});
	}

	getProducts(): ProductModel[] {
		return this.products;
	}

	getProductById(productId: string): ProductModel | undefined {
		return this.products.find((product) => product.id === productId);
	}
}

export { ProductsModelImpl };
