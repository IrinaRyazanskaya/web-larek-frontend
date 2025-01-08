export interface APIProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface APIProductListResponse {
  total: number;
  items: APIProduct[];
}

export type APIProductItemResponse = APIProduct;

export interface APIOrderRequest {
  payment: string;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export interface APIOrderResponse {
  id: string;
  total: number;
}
