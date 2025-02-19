import type {
	WebLarekClient,
	WebLarekOrderRequest,
	WebLarekOrderResponse,
	WebLarekProductItemResponse,
	WebLarekProductListResponse,
} from '../../types/clients/weblarek';
import { API_URL, CDN_URL } from '../../utils/constants';
import { Api } from '../base/api';

class WebLarekClientImpl extends Api implements WebLarekClient {
	constructor() {
		super(API_URL);
	}

	getProductList(): Promise<WebLarekProductListResponse> {
		return (this.get('/product/') as Promise<WebLarekProductListResponse>).then((response) => {
			for (const item of response.items) {
				item.image = CDN_URL + item.image;
			}

			return response;
		});
	}

	getProductItem(id: string): Promise<WebLarekProductItemResponse> {
		return (this.get(`/product/${id}`) as Promise<WebLarekProductItemResponse>).then((response) => {
			response.image = CDN_URL + response.image;

			return response;
		});
	}

	createOrder(body: WebLarekOrderRequest): Promise<WebLarekOrderResponse> {
		return this.post('/order', body, 'POST') as Promise<WebLarekOrderResponse>;
	}
}

export { WebLarekClientImpl };
