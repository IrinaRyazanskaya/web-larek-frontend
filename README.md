# Проектная работа "Веб-ларёк"

"Веб-ларёк" это интернет-магазин с товарами для веб-разработчиков. В нём можно посмотреть каталог товаров, добавить товары в корзину и сделать заказ. 

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```shell
npm install
npm run start
```

или

```shell
yarn
yarn start
```

## Сборка

```shell
npm run build
```

или

```shell
yarn build
```

## Архитектура приложения

Архитектура проекта использует шаблон MVP.

### Models

Модели хранят данные и управляют ими.

**Products** хранит список товаров, загружает их из API.

```typescript
interface Product {
  id: number;
  title: string;
  price: {
    amount: number;
    currency: string;
  };
  image: string;
  description: string;
}

export class Products {
	products: Product[];
	isLoading: boolean;

	async fetchProducts(): Promise<void>; // Загружает товары из API
	getProducts(): Product[]; // Возвращает список товаров
	getProductById(productId: number): Product | undefined; // Возвращает товар по ID
}
```

**Cart** управляет состоянием корзины: позволяет добавлять и удалять товары, считать статистику.

```typescript
import { Product } from "./product";

export class Cart {
  items: Product[];

  addProduct(product: Product): void; // Добавляет товар в корзину
  removeProduct(productId: number): void; // Удаляет товар из корзины
  getItems(): Product[]; // Возвращает список товаров в корзине
  getTotalQuantity(): number; // Возвращает общее количество товаров
  getTotalPrice(): number; // Возвращает общую стоимость корзины
  clear(): void; // Очищает корзину
}
```

**User** хранит данные пользователя, позволяет их обновлять и проверяет их валидность.

```typescript
export interface UserData {
  email: string;
  phone: string;
  address: string;
  paymentMethod: "online" | "cash";
}

export class User {
  data: UserData;

  updateData(newData: Partial<UserData>): void; // Обновляет данные пользователя
  getData(): UserData; // Возвращает текущие данные пользователя
  isValid(): boolean; // Проверяет валидность данных пользователя
  reset(): void; // Очищает данные пользователя
}
```

### Views

Занимаются отбражением данных и реагируют на пользовательские действия.

**ProductListView** отображает список товаров в виде карточек. Связан с ProductPresenter, который передаёт список товаров и колбэк для обработки кликов по карточке.

```typescript
export interface ProductListView {
  render(products: Product[], onClick: (productId: number) => void): HTMLElement; // Отображает список товаров
}
```

**ProductCardView** отображает карточку одного товара с его названием, изображением, ценой и категорией. Реагирует на клики по карточке. Используется ProductListView для создания списка карточек. При клике вызывает onClick, который обрабатывает ProductPresenter.

```typescript
export interface ProductCardView {
  render(product: Product, onClick: (productId: number) => void): HTMLElement; // Создаёт карточку товара
}
```

**ProductModalView** отображает подробную информацию о товаре в модальном окне. Содержит кнопку "Добавить в корзину". Связан с ProductPresenter, который вызывает это окно при клике на карточку. Передаёт действие "Добавить в корзину" через onAddToCart в CartPresenter.

```typescript
export interface ProductModalView {
  render(product: Product, onAddToCart: (productId: number) => void): HTMLElement; // Отображает информацию о товаре
}
```

**CartModalView** отображает содержимое корзины в модальном окне. Показывает список товаров и общую стоимость. Содержит кнопку "Оформить заказ". Связан с CartPresenter, который передаёт содержимое корзины и обрабатывает нажатие кнопки "Оформить заказ".

```typescript
export interface CartModalView {
  render(items: Product[], onCheckout: () => void): HTMLElement; // Отображает содержимое корзины и кнопку оформления
}
```

**CartButtonView** отображает кнопку корзины со счётчиком добавленных товаров. Связан с CartPresenter, который передает количество товаров в корзине и обрабатывает нажатие кнопки открытия корзины в модальном окне.

```typescript
export interface CartButtonView {
  render(itemsCount: number, onCartOpen: () => void): HTMLElement; // Отображает кнопку открытия корзины и счётчик
}
```

**CheckoutModalView** отображает форму ввода данных для оформления заказа. Связан с CheckoutPresenter, который передаёт данные пользователя и обрабатывает их отправку.

```typescript
export interface CheckoutModalView {
  render(
    onSubmit: (formData: UserData) => void // Колбэк для отправки формы
  ): HTMLElement; // Отображает форму
}
```

### Presenters 

Предназначены для связывания моделей и представлений. Получают данные из моделей и передают их представлениям. И наоборот, обрабатывают события из представлений и обновляют модели. 

**ProductPresenter** управляет отображением списка товаров и открытием карточки выбранного товара. Использует модель Products для получения списка товаров и деталей конкретного товара. Передаёт данные в ProductListView для отображения. Управляет ProductModalView для отображения деталей товара.

```typescript
export interface ProductPresenter {
  loadProducts(): Promise<void>; // Загружает список товаров из модели
  openProductModal(productId: number): void; // Открывает модальное окно с информацией о товаре
}
```

**CartPresenter** управляет состоянием корзины и её отображением. Использует модель Cart для добавления, удаления товаров и получения их списка. Обновляет счётчик товаров в корзине у CartButtonView. Управляет CartModalView для отображения содержимого корзины.

```typescript
export interface CartPresenter {
  addProduct(product: Product): void; // Добавляет товар в корзину
  openCartModal(): void; // Открывает модальное окно корзины
}
```

**CheckoutPresenter** управляет процессом оформления заказа. Использует модель User для хранения данных пользователя.
Управляет CheckoutModalView для отображения формы ввода данных. Передаёт данные формы обратно в модель User.

```typescript
export interface CheckoutPresenter {
  openCheckoutModal(): void; // Открывает модальное окно оформления заказа
  submitOrder(formData: UserData): void; // Отправляет данные заказа
}
```
