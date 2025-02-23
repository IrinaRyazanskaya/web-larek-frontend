# Проектная работа "Веб-ларёк"

"Веб-ларёк" это интернет-магазин с товарами для веб-разработчиков. В нём можно посмотреть каталог товаров, добавить товары в корзину и сделать заказ.

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/clients — типы данных для взаимодействия с API
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

Архитектура проекта использует шаблон MVP. Для запросов в API будут использоваться отдельные клиенты.
Клиенты будут использовать базовый класс Api из components/base.

### Clients

Клиенты предоставляют методы для взаимодействия с API.

**Api** является базовым классом для всех клиентов. Методы класса:

- get(uri: string) - делает запросы на получение данных
- post(uri: string, data: object, method: ApiPostMethods = 'POST') - делает запросы на изменение данных

**WebLarekClient** помогает делать запросы на сервер WEB-ларька. Реализация этого интерфейса наследуется от класса Api.

```typescript
interface WebLarekClient {
	getProductList(): Promise<WebLarekProductListResponse>;
	getProductItem(id: string): Promise<WebLarekProductItemResponse>;
	createOrder(body: WebLarekOrderRequest): Promise<WebLarekOrderResponse>;
}
```

### Models

Модели хранят данные и управляют ими.

**ProductsModel** хранит список товаров, загружает их из API. Использует WebLarekClient для получения данных.

```typescript
interface ProductModel {
	id: string;
	title: string;
	price: number | null;
	image: string;
	category: string;
	description: string;
}

interface ProductsModel {
	fetchProducts(): Promise<void>; // Загружает товары из API
	getProducts(): ProductModel[]; // Возвращает список товаров
	getProductById(productId: string): ProductModel | undefined; // Возвращает товар по ID
}
```

Конструктор ProductsModel принимает следующие аргументы:

- apiClient: WebLarekClient

**BasketModel** управляет состоянием корзины: позволяет добавлять и удалять товары, считать статистику.

```typescript
interface BasketItemModel extends ProductModel {
	orderItemId: string; // Временный ID добавленного товара в корзину
}

interface BasketModel {
	addProduct(product: ProductModel): void; // Добавляет товар в корзину
	removeProduct(orderItemId: string): void; // Удаляет товар из корзины
	getItems(): BasketItemModel[]; // Возвращает список товаров в корзине
	getTotalQuantity(): number; // Возвращает общее количество товаров
	getTotalPrice(): number; // Возвращает общую стоимость корзины
	clear(): void; // Очищает корзину
}
```

Конструктор BasketModel ничего не принимает.

**UserModel** хранит данные пользователя, позволяет их обновлять и проверяет их валидность.

```typescript
interface UserDataModel {
	email: string;
	phone: string;
	address: string;
	payment: string;
}

interface UserModel {
	updateData(newData: Partial<UserDataModel>): void; // Обновляет данные пользователя
	getData(): UserDataModel; // Возвращает текущие данные пользователя
	checkAddressValid(): string | null; // Проверяет правильность заполнения адреса
	checkPaymentValid(): string | null; // Проверяет выбран ли способ оплаты
	checkEmailValid(): string | null; // Проверяет правильность заполнения электронной почты
	checkPhoneValid(): string | null; // Проверяет правильность заполнения номера телефона
	reset(): void; // Очищает данные пользователя
}
```

Конструктор UserModel не принимает аргументов. Каждый метод с префиксом check может быть вызван из представителя, чтобы проверить правильность заполнения полей.

### Views

Занимаются отбражением данных и реагируют на пользовательские действия.

**ProductListView** отображает список товаров в виде карточек. Связан с ProductPresenter, который передаёт список товаров и колбэк для обработки кликов по карточке. Внутри себя рисует галерею карточек с помощью ProductCardView.

```typescript
interface ProductListView {
	render(products: ProductModel[], onClick: (productId: string) => void): HTMLElement; // Отображает список товаров
}
```

Конструктор реализации ProductListView принимает следующие аргументы:

- container: HTMLElement
- cardTemplate: HTMLTemplateElement

**ProductCardView** отображает карточку одного товара с его названием, изображением, ценой и категорией. Реагирует на клики по карточке. Используется ProductListView для создания списка карточек. При клике вызывает onClick, который обрабатывает ProductPresenter.

```typescript
interface ProductCardView {
	render(product: ProductModel): HTMLElement; // Создаёт карточку товара
}
```

Конструктор реализации ProductCardView принимает следующие аргументы:

- container: HTMLElement
- template: HTMLTemplateElement
- onClick: (productId: string) => void

**ProductModalView** отображает подробную информацию о товаре в модальном окне. Содержит кнопку "Добавить в корзину". Связан с ProductPresenter, который вызывает это окно при клике на карточку. Передаёт действие "Добавить в корзину" через onAddToBasket в BasketPresenter.

```typescript
interface ProductModalView {
	render(
		product: ProductModel,
    isAllowedToBuy: boolean,
		onAddToBasket: (productId: string) => void,
		onClose: () => void
	): HTMLElement; // Отображает информацию о товаре

	close(): void; // Закрывает модальное окно
}
```

Конструктор реализации ProductModalView принимает следующие аргументы:

- container: HTMLElement
- template: HTMLTemplateElement

**BasketModalView** отображает содержимое корзины в модальном окне. Показывает список товаров и общую стоимость. Содержит кнопку "Оформить заказ". Связан с BasketPresenter, который передаёт содержимое корзины и обрабатывает нажатие кнопки "Оформить заказ".

```typescript
interface BasketModalView {
	render(
		items: BasketItemModel[],
    totalPrice: number,
		onCheckout: () => void,
		onItemRemove: (orderItemId: string) => void,
    onClose: () => void
	): HTMLElement; // Отображает содержимое корзины и кнопку оформления

	setButtonState(isEnabled: boolean): void; // Обновляет состояние кнопки "Оформить" (активна/неактивна)

  setTotalPrice(totalPrice: number): void; // Обновляет итоговую сумму к оплате

	close(): void; // Закрывает модальное окно
}
```

Конструктор реализации BasketModalView принимает следующие аргументы:

- container: HTMLElement
- template: HTMLTemplateElement
- itemTemplate: HTMLTemplateElement

**BasketItemView** отображает элемент корзины и кнопку удаления из неё. Связан с BasketPresenter, который передаёт элемент корзины и обрабатывает нажатие кнопки удаления.

```typescript
interface BasketItemView {
	render(item: BasketItemModel, index: number): HTMLElement; // Отображает элемент корзины и кнопку удаления из неё
}
```

Конструктор реализации BasketItemView принимает следующие аргументы:

- template: HTMLTemplateElement
- onDelete: () => void

**BasketButtonView** отображает кнопку корзины со счётчиком добавленных товаров. Связан с BasketPresenter, который передает количество товаров в корзине и обрабатывает нажатие кнопки открытия корзины в модальном окне.

```typescript
interface BasketButtonView {
	render(itemsCount: number): HTMLElement; // Отображает кнопку открытия корзины и счётчик
	clearCounter(): void; // Обнуляет счётчик товаров
	setClickHandler(handler: () => void): void; // Назначает обработчик клика на кнопку корзины
}
```

Конструктор реализации BasketButtonView принимает следующие аргументы:

- basketButton: HTMLElement

**OrderDetailsView** отвечает за форму ввода основных данных заказа, таких как адрес доставки и способ оплаты. Позволяет проставлять ошибки заполнения полей и состояние кнопки "Далее". Связан с CheckoutPresenter, который передаёт данные пользователя и вызывает методы для управления ошибками и состояниями кнопки.

```typescript
interface OrderDetailsView {
	// Отображает экран ввода данных заказа
	render(
		onNext: (data: Partial<UserDataModel>) => void,
		onInput: (data: Partial<UserDataModel>) => void,
    onClose: () => void
	): HTMLElement;

	// Обновляет состояние кнопки "Далее" (активна/неактивна)
	setButtonState(isEnabled: boolean): void;

	// Отображает ошибку при заполнении формы
	setError(error: string | null): void;

	close(): void; // Закрывает модальное окно
}
```

Конструктор реализации OrderDetailsView принимает следующие аргументы:

- container: HTMLElement
- template: HTMLTemplateElement

**OrderContactsView** отвечает за форму ввода контактной информации пользователя, такой как электронная почта и номер телефона. Позволяет проставлять ошибки заполнения полей и состояние кнопки "Оплатить". Связан с CheckoutPresenter, который передаёт данные пользователя и вызывает методы для управления ошибками и состояниями кнопки.

```typescript
interface OrderContactsView {
	// Отображает экран ввода контактной информации
	render(
		onNext: (data: Partial<UserDataModel>) => void,
		onInput: (data: Partial<UserDataModel>) => void,
    onClose: () => void
	): HTMLElement;

	// Обновляет состояние кнопки "Оплатить" (активна/неактивна)
	setButtonState(isEnabled: boolean): void;

	// Отображает ошибку при заполнении формы
	setError(error: string | null): void;

	close(): void; // Закрывает модальное окно
}
```

Конструктор реализации OrderContactsView принимает следующие аргументы:

- container: HTMLElement
- template: HTMLTemplateElement

**OrderConfirmationView** отвечает за отображение экрана подтверждения успешного завершения заказа. Связан с CheckoutPresenter, который вызывает отрисовку.

```typescript
interface OrderConfirmationView {
	// Отображает экран подтверждения успешного оформления заказа
	// totalAmount - итоговая сумма заказа
  // onClose - функция, срабатывающая при закрытии модального окна
	render(totalAmount: number, onClose: () => void): HTMLElement;

	close(): void; // Закрывает модальное окно
}
```

Конструктор реализации OrderConfirmationView принимает следующие аргументы:

- container: HTMLElement
- template: HTMLTemplateElement

### Presenters

Предназначены для связывания моделей и представлений. Получают данные из моделей и передают их представлениям. И наоборот, обрабатывают события из представлений и обновляют модели.

**ProductPresenter** управляет отображением списка товаров и открытием карточки выбранного товара. Использует модель Products для получения списка товаров и деталей конкретного товара. Передаёт данные в ProductListView для отображения. Управляет ProductModalView для отображения деталей товара. При клике на кнопку добавления товара вызывает метод addProduct у BasketPresenter для добавления в корзину.

```typescript
interface ProductPresenter {
	loadProducts(): Promise<void>; // Загружает список товаров из модели
	openProductModal(productId: string): void; // Открывает модальное окно с информацией о товаре
}
```

Конструктор реализации ProductPresenter принимает следующие аргументы:

- productsModel: ProductsModel
- productListView: ProductListView
- productModalView: ProductModalView
- basketPresenter: BasketPresenter

**BasketPresenter** управляет состоянием корзины и её отображением. Использует модель BasketModel для добавления, удаления товаров и получения их списка. Обновляет счётчик товаров в корзине у BasketButtonView. Управляет BasketModalView для отображения содержимого корзины. Отрисовывает отдельные товары в корзине с кнопками удаления с помощью BasketItemView. При нажатии на кнопку "Оформить" вызывается метод openCheckoutModal для открытия окна оформления заказа.

```typescript
interface BasketPresenter {
	addProduct(product: ProductModel): void; // Добавляет товар в корзину
	openBasketModal(): void; // Открывает модальное окно корзины
}
```

Конструктор реализации BasketPresenter принимает следующие аргументы:

- basketModel: BasketModel
- basketButtonView: BasketButtonView
- basketModalView: BasketModalView
- checkoutPresenter: CheckoutPresenter

**CheckoutPresenter** управляет процессом оформления заказа. Использует модель UserModel для хранения данных пользователя и модель BasketModel для создания заказа. Управляет OrderDetailsView, OrderContactsView и OrderConfirmationView для отображения форм ввода данных и показа экрана завершения заказа. Передаёт данные из форм обратно в модель UserModel. Вызывает у модели UserModel методы с префиксом check для валидации данных. Вызывает методы управления ошибками и состоянием кнопок в OrderDetailsView и OrderContactsView. При нажатии кнопки "Оплатить" вызывает метод createOrder у WebLarekClient и передаёт туда данные из моделей UserModel и BasketModel. После закрытия окна завершения заказа в BasketModel очищается корзина и обнуляется счетчик в BasketButtonView.

```typescript
interface CheckoutPresenter {
	openCheckoutModal(): void; // Открывает модальное окно оформления заказа
}
```

Конструктор реализации CheckoutPresenter принимает следующие аргументы:

- apiClient: WebLarekClient
- userModel: UserModel
- basketModel: BasketModel
- orderDetailsView: OrderDetailsView
- orderContactsView: OrderContactsView
- orderConfirmationView: OrderConfirmationView
- basketButtonView: BasketButtonView
