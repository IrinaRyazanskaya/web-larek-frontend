import type {
  WebLarekClient,
  WebLarekOrderRequest,
  WebLarekOrderResponse,
  WebLarekProduct,
  WebLarekProductItemResponse,
  WebLarekProductListResponse,
} from "../../types/clients/weblarek";

const MOCK_PRODUCTS: WebLarekProduct[] = [
  {
    id: "3b0b71a3-63d9-4ebf-a218-0024fc8f9f6e",
    title: "Питчер LAREK 350 мл",
    description: "Небольшой питчер из нержавеющей стали с мерной шкалой и яркой термокраской.",
    price: 1990,
    category: "accessory",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "f56cb3c0-0ca7-4e29-9af4-3bb0a78a2591",
    title: "Набор зерна Kenya AA",
    description: "Фермерское зерно из Кении средней обжарки, ягоды и тростниковый сахар во вкусе.",
    price: 2590,
    category: "coffee",
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "d4450f86-5612-4fdd-b3ce-e5569008b232",
    title: "Чашка LAREK 220 мл",
    description: "Керамическая чашка с двойными стенками, удерживающими тепло.",
    price: 1490,
    category: "tableware",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "b09e58b1-2a8a-4ff7-95f4-2877ea019c0d",
    title: "Подписка на кофе на месяц",
    description: "Еженедельная доставка свежей обжарки от обжарщиков LAREK.",
    price: null,
    category: "subscription",
    image:
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4f5c823f-a9f4-4a86-8444-e26058fe3182",
    title: "Кофемолка LAREK Mini",
    description: "Компактная керамическая кофемолка с плавной регулировкой помола.",
    price: 3290,
    category: "equipment",
    image:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "d64f5abf-77a3-4a1e-83a5-18dcef8dc2be",
    title: "Термокружка LAREK 450 мл",
    description: "Стальная термокружка с вакуумной изоляцией, сохраняющей температуру до 6 часов.",
    price: 2490,
    category: "accessory",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "5a729184-4c3d-4f76-b04d-2f0f5e4a4170",
    title: "Сироп кардамон LAREK 250 мл",
    description: "Ароматный сироп с пряным оттенком кардамона для латте и капучино.",
    price: 690,
    category: "addon",
    image:
      "https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "a1c7c42e-25b6-4ef8-836f-61df1f6760a5",
    title: "Набор зерна Ethiopia Guji",
    description: "Яркое эфиопское зерно с нотами жасмина и косточковых фруктов.",
    price: 2790,
    category: "coffee",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
  },
];

class WebLarekMockClient implements WebLarekClient {
  private readonly products: WebLarekProduct[];

  constructor(products: WebLarekProduct[] = MOCK_PRODUCTS) {
    this.products = products.map((item) => ({ ...item }));
  }

  getProductList(): Promise<WebLarekProductListResponse> {
    return Promise.resolve({
      total: this.products.length,
      items: this.products.map((product) => ({ ...product })),
    });
  }

  getProductItem(id: string): Promise<WebLarekProductItemResponse> {
    const product = this.products.find((item) => item.id === id);

    if (!product) {
      return Promise.reject(new Error(`Product with id "${id}" not found`));
    }

    return Promise.resolve({ ...product });
  }

  createOrder(body: WebLarekOrderRequest): Promise<WebLarekOrderResponse> {
    return Promise.resolve({
      id: `order-${Date.now()}`,
      total: body.total,
    });
  }
}

export { WebLarekMockClient };
