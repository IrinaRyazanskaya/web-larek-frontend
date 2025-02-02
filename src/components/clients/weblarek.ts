import type {
	WebLarekClient,
	WebLarekOrderRequest,
	WebLarekOrderResponse,
	WebLarekProductItemResponse,
	WebLarekProductListResponse,
} from '../../types/clients/weblarek';

import { Api } from '../base/api';

const apiBaseUrl = 'https://larek-api.nomoreparties.co';

class WebLarekClientImpl extends Api implements WebLarekClient {
  constructor() {
    super(apiBaseUrl);
  }

	getProductList(): Promise<WebLarekProductListResponse> {
		return this.get('/api/weblarek/product/') as Promise<WebLarekProductListResponse>;
	}

	getProductItem(id: string): Promise<WebLarekProductItemResponse> {
		return this.get(`/api/weblarek/product/${id}`) as Promise<WebLarekProductItemResponse>;
	}

	createOrder(body: WebLarekOrderRequest): Promise<WebLarekOrderResponse> {
		return this.post('/api/weblarek/order', body, 'POST') as Promise<WebLarekOrderResponse>;
	}
}

export { WebLarekClientImpl };
