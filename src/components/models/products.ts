import type { WebLarekClient } from '../../types/clients/weblarek';
import type { ProductModel, ProductsModel } from '../../types/models/products';

class ProductsModelImpl implements ProductsModel {
	products: ProductModel[];
	isLoading: boolean;
	apiClient: WebLarekClient;

	constructor(apiClient: WebLarekClient) {
		this.apiClient = apiClient;
	}

	fetchProducts(): Promise<void> {
		this.isLoading = true;

		return this.apiClient
			.getProductList()
			.then((data) => {
				this.isLoading = false;
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
