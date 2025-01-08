# Проектная работа "Веб-ларёк"

"Веб-ларёк" это интернет-магазин с товарами для веб-разработчиков. В нём можно посмотреть каталог товаров, добавить товары в корзину и сделать заказ.

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/api — типы данных для клиента
- src/types/models - типы, описывающие модели данных
- src/types/presenters - типы, описывающие интерфейсы представителей
- src/types/views - типы, описывающие интерфейсы отображений
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

**ProductsModel** хранит список товаров, загружает их из API.

```typescript
interface ProductModel {
	id: string;
	title: string;
	price: number | null;
	image: string;
	description: string;
}

export interface ProductsModel {
	products: ProductModel[];
	isLoading: boolean;

	fetchProducts(): Promise<void>; // Загружает товары из API
	getProducts(): ProductModel[]; // Возвращает список товаров
	getProductById(productId: string): ProductModel | undefined; // Возвращает товар по ID
}
```

**CartModel** управляет состоянием корзины: позволяет добавлять и удалять товары, считать статистику.

```typescript
export interface CartModel {
	items: ProductModel[];

	addProduct(product: ProductModel): void; // Добавляет товар в корзину
	removeProduct(productId: string): void; // Удаляет товар из корзины
	getItems(): ProductModel[]; // Возвращает список товаров в корзине
	getTotalQuantity(): number; // Возвращает общее количество товаров
	getTotalPrice(): number; // Возвращает общую стоимость корзины
	clear(): void; // Очищает корзину
}
```

**UserModel** хранит данные пользователя, позволяет их обновлять и проверяет их валидность.

```typescript
export interface UserDataModel {
	email: string;
	phone: string;
	address: string;
	payment: string;
}

export interface UserModel {
	data: UserDataModel;

	updateData(newData: Partial<UserDataModel>): void; // Обновляет данные пользователя
	getData(): UserDataModel; // Возвращает текущие данные пользователя
	isValid(): boolean; // Проверяет валидность данных пользователя
	reset(): void; // Очищает данные пользователя
}
```

### Views

Занимаются отбражением данных и реагируют на пользовательские действия.

**ProductListView** отображает список товаров в виде карточек. Связан с ProductPresenter, который передаёт список товаров и колбэк для обработки кликов по карточке.

```typescript
export interface ProductListView {
	render(
		products: ProductModel[],
		onClick: (productId: string) => void
	): HTMLElement; // Отображает список товаров
}
```

**ProductCardView** отображает карточку одного товара с его названием, изображением, ценой и категорией. Реагирует на клики по карточке. Используется ProductListView для создания списка карточек. При клике вызывает onClick, который обрабатывает ProductPresenter.

```typescript
export interface ProductCardView {
	render(
		product: ProductModel,
		onClick: (productId: string) => void
	): HTMLElement; // Создаёт карточку товара
}
```

**ProductModalView** отображает подробную информацию о товаре в модальном окне. Содержит кнопку "Добавить в корзину". Связан с ProductPresenter, который вызывает это окно при клике на карточку. Передаёт действие "Добавить в корзину" через onAddToCart в CartPresenter.

```typescript
export interface ProductModalView {
	render(
		product: ProductModel,
		onAddToCart: (productId: string) => void
	): HTMLElement; // Отображает информацию о товаре
}
```

**CartModalView** отображает содержимое корзины в модальном окне. Показывает список товаров и общую стоимость. Содержит кнопку "Оформить заказ". Связан с CartPresenter, который передаёт содержимое корзины и обрабатывает нажатие кнопки "Оформить заказ".

```typescript
export interface CartModalView {
	render(items: ProductModel[], onCheckout: () => void): HTMLElement; // Отображает содержимое корзины и кнопку оформления
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
		onSubmit: (formData: UserDataModel) => void // Колбэк для отправки формы
	): HTMLElement; // Отображает форму
}
```

### Presenters

Предназначены для связывания моделей и представлений. Получают данные из моделей и передают их представлениям. И наоборот, обрабатывают события из представлений и обновляют модели.

**ProductPresenter** управляет отображением списка товаров и открытием карточки выбранного товара. Использует модель Products для получения списка товаров и деталей конкретного товара. Передаёт данные в ProductListView для отображения. Управляет ProductModalView для отображения деталей товара.

```typescript
export interface ProductPresenter {
	loadProducts(): Promise<void>; // Загружает список товаров из модели
	openProductModal(productId: string): void; // Открывает модальное окно с информацией о товаре
}
```

**CartPresenter** управляет состоянием корзины и её отображением. Использует модель CartModel для добавления, удаления товаров и получения их списка. Обновляет счётчик товаров в корзине у CartButtonView. Управляет CartModalView для отображения содержимого корзины.

```typescript
export interface CartPresenter {
	addProduct(product: ProductModel): void; // Добавляет товар в корзину
	openCartModal(): void; // Открывает модальное окно корзины
}
```

**CheckoutPresenter** управляет процессом оформления заказа. Использует модель UserModel для хранения данных пользователя. Управляет CheckoutModalView для отображения формы ввода данных. Передаёт данные формы обратно в модель UserModel.

```typescript
export interface CheckoutPresenter {
	openCheckoutModal(): void; // Открывает модальное окно оформления заказа
	submitOrder(formData: UserDataModel): void; // Отправляет данные заказа
}
```
