export interface WebLarekProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface WebLarekProductListResponse {
  total: number;
  items: WebLarekProduct[];
}

export type WebLarekProductItemResponse = WebLarekProduct;

export interface WebLarekOrderRequest {
  payment: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export interface WebLarekOrderResponse {
  id: string;
  total: number;
}

export interface WebLarekClient {
  getProductList(): WebLarekProductListResponse;
  getProductItem(id: string): WebLarekProductItemResponse;
  createOrder(body: WebLarekOrderRequest): WebLarekOrderResponse;
}
