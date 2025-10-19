# Web Larek Frontend 🛒

Одностраничное приложение интернет-магазина товаров. Проект демонстрирует, как на чистом **HTML5**,
**TypeScript** и **SCSS** построить удобную витрину с корзиной и пошаговым оформлением заказа.

## ✨ Ключевая функциональность

- Динамический каталог товаров с карточками, категориями и ценой, полученными из типизированного
  API-клиента.
- Модальное окно предпросмотра с подробностями товара, проверкой доступности покупки и добавлением в
  корзину.
- Корзина с пересчётом итоговой суммы, нумерацией позиций и мгновенным удалением элементов.
- Счётчик товаров в шапке, синхронизированный с состоянием корзины.
- Пошаговый checkout: выбор оплаты и адреса, контактные данные, подтверждение заказа.
- Встроенная валидация адреса, email и телефона с подсказками в интерфейсе.
- Базовый Mock API, имитирующий ответы сервера и готовый к замене на реальный backend.

## 🛠️ Технологический стек

- **Фронтенд:** HTML5, TypeScript, SCSS, BEM, HTML Template Elements.
- **Архитектура и состояние:** Model-View-Presenter (MVP), TypeScript interfaces, модульное
  разделение `models / views / presenters`.
- **Сборка и DevOps:** Node.js, Webpack, Babel, PostCSS, Sass Loader.
- **Качество кода:** ESLint, Stylelint, Prettier, TypeScript.
- **Данные и API:** Собственный `WebLarekMockClient`, форматирование цен, шаблон для подключения
  REST API.

## 🚀 Установка и запуск

1. Установите Node.js версии 22 или новее и клонируйте репозиторий.
2. Установите зависимости:

   ```bash
   npm install
   ```

3. Запустите проект в режиме разработки:

   ```bash
   npm run start
   ```

   По умолчанию приложение открывается на `http://localhost:8080`.

4. Соберите production-версию:

   ```bash
   npm run build
   ```

5. Дополнительные команды для повседневной работы:

   ```bash
   npm run format      # автоматическое форматирование кода
   npm run lint        # запуск линтеров для проверки качества кода
   npm run lint-fix    # автоматическое исправление ошибок линтинга
   ```

## 📂 Структура проекта

```text
web-larek-frontend/
├── src/
│   ├── index.ts                 # Точка входа, связывает модели, отображения и презентеры
│   ├── pages/
│   │   └── index.html           # Разметка страницы и HTML-шаблоны интерфейса
│   ├── components/
│   │   ├── base/                # Базовые классы, например Modal
│   │   ├── clients/             # WebLarekMockClient и адаптеры API
│   │   ├── models/              # Логика данных: товары, корзина, пользователь
│   │   ├── presenters/          # Связка данных и UI (Product, Basket, Checkout)
│   │   └── views/               # Отрисовка модалей, карточек и форм
│   ├── utils/                   # Форматирование цен и вспомогательные функции
│   └── scss/                    # SCSS-компоненты и общие стили
├── dist/                        # Сборка production
├── package.json                 # Скрипты npm и зависимости
├── webpack.config.js            # Конфигурация сборки Webpack
├── dist/                        # production-сборка
├── .editorconfig                # единые правила оформления кода
├── .gitignore                   # игнорируемые Git-ом файлы
├── .prettierignore              # исключения для Prettier
├── .prettierrc.json             # конфигурация Prettier
├── .stylelintrc.json            # конфигурация Stylelint
├── eslint.config.mjs            # конфигурация ESLint
├── postcss.config.js            # конфигурация PostCSS
├── package-lock.json            # зафиксированные версии зависимостей
├── package.json                 # зависимости и npm-скрипты
└── tsconfig.json                # настройки TypeScript
```

## 💡 Что реализовано и изучено

- Освоена архитектура MVP на фронтенде: презентеры управляют состоянием и событиями, отображения
  отвечают только за DOM.
- Настроена модульная сборка с Webpack, обеспечивающая hot reload и оптимизацию.
- Разработан собственный API-клиент с mock-данными и строгими типами для безопасной интеграции с
  backend.
- Реализованы многошаговые формы с управлением состоянием пользователя и валидацией без сторонних
  библиотек.
- Отработаны практики поддержки качества: единые линтеры и форматтер, предсказуемый стиль кода.

## 📚 Решённые проблемы и технические челленджи

- Устранено дублирование логики модальных окон через базовый класс `Modal`, что упростило поддержку
  всех модальных окон.
- Организована синхронизация корзины и счётчика в шапке: презентер корзины обновляет UI при каждом
  изменении модели.
- Настроена гибкая валидация форм: `UserModel` хранит состояние и возвращает тексты ошибок, а
  представления показывают подсказки.
- Обработаны нестандартные цены (например, `Бесценно`) через функцию форматирования, чтобы интерфейс
  оставался дружелюбным.
- Продумана изоляция бизнес-логики от API: достаточно заменить `WebLarekMockClient` на реальную
  реализацию, не меняя остальной код.

## 🏗️ Архитектура приложения

## Архитектура приложения

Архитектура проекта использует шаблон MVP. Для запросов в API будут использоваться отдельные
клиенты. Клиенты будут использовать базовый класс Api из components/base.

### Clients

Клиенты предоставляют методы для взаимодействия с API.

**Api** является базовым классом для всех клиентов. Методы класса:

- get(uri: string) - делает запросы на получение данных
- post(uri: string, data: object, method: ApiPostMethods = 'POST') - делает запросы на изменение
  данных

**WebLarekClient** помогает делать запросы на сервер WEB-ларька. Реализация этого интерфейса
наследуется от класса Api.

```typescript
interface WebLarekClient {
  getProductList(): Promise<WebLarekProductListResponse>;
  getProductItem(id: string): Promise<WebLarekProductItemResponse>;
  createOrder(body: WebLarekOrderRequest): Promise<WebLarekOrderResponse>;
}
```

> Прямо сейчас используется Mock вариант клиента – WebLarekMockClient.

### Models

Модели хранят данные и управляют ими.

**ProductsModel** хранит список товаров, загружает их из API. Использует WebLarekClient для
получения данных.

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

**BasketModel** управляет состоянием корзины: позволяет добавлять и удалять товары, считать
статистику.

```typescript
interface BasketItemModel extends ProductModel {
  orderItemId: string; // Временный ID добавленного товара в корзину
}

interface BasketModel {
  addProduct(product: ProductModel): void; // Добавляет товар в корзину
  removeItem(orderItemId: string): void; // Удаляет товар из корзины
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

Конструктор UserModel не принимает аргументов. Каждый метод с префиксом check может быть вызван из
представителя, чтобы проверить правильность заполнения полей.

### Views

Занимаются отбражением данных и реагируют на пользовательские действия.

**ProductListView** отображает список товаров в виде карточек. Связан с ProductPresenter, который
передаёт список товаров и колбэк для обработки кликов по карточке. Внутри себя рисует галерею
карточек с помощью ProductCardView.

```typescript
interface ProductListView {
  render(products: ProductModel[], onClick: (productId: string) => void): HTMLElement; // Отображает список товаров
}
```

Конструктор реализации ProductListView принимает следующие аргументы:

- container: HTMLElement
- cardView: ProductCardView

**ProductCardView** отображает карточку одного товара с его названием, изображением, ценой и
категорией. Реагирует на клики по карточке. Используется ProductListView для создания списка
карточек. При клике вызывает onClick, который обрабатывает ProductPresenter.

```typescript
interface ProductCardView {
  render(product: ProductModel, onClick: (productId: string) => void): HTMLElement; // Создаёт карточку товара
}
```

Конструктор реализации ProductCardView принимает следующие аргументы:

- template: HTMLTemplateElement

**ProductModalView** отображает подробную информацию о товаре в модальном окне. Содержит кнопку
"Добавить в корзину". Связан с ProductPresenter, который вызывает это окно при клике на карточку.
Передаёт действие "Добавить в корзину" через onAddToBasket в BasketPresenter.

```typescript
interface ProductModalView {
  render(
    product: ProductModel,
    isAllowedToBuy: boolean,
    onAddToBasket: (productId: string) => void,
    onClose: () => void,
  ): HTMLElement; // Отображает информацию о товаре

  close(): void; // Закрывает модальное окно
}
```

Конструктор реализации ProductModalView принимает следующие аргументы:

- container: HTMLElement
- template: HTMLTemplateElement

**BasketModalView** отображает содержимое корзины в модальном окне. Показывает список товаров и
общую стоимость. Содержит кнопку "Оформить заказ". Связан с BasketPresenter, который передаёт
содержимое корзины и обрабатывает нажатие кнопки "Оформить заказ".

```typescript
interface BasketModalView {
  render(
    items: BasketItemModel[],
    totalPrice: number,
    onCheckout: () => void,
    onItemRemove: (orderItemId: string) => void,
    onClose: () => void,
  ): HTMLElement; // Отображает содержимое корзины и кнопку оформления

  removeItem(orderItemId: string): void; // Удаляет товар из корзины

  setButtonState(isEnabled: boolean): void; // Обновляет состояние кнопки "Оформить" (активна/неактивна)

  setTotalPrice(totalPrice: number): void; // Обновляет итоговую сумму к оплате

  close(): void; // Закрывает модальное окно
}
```

Конструктор реализации BasketModalView принимает следующие аргументы:

- container: HTMLElement
- template: HTMLTemplateElement
- itemView: BasketItemView

**BasketItemView** отображает элемент корзины и кнопку удаления из неё. Связан с BasketPresenter,
который передаёт элемент корзины и обрабатывает нажатие кнопки удаления.

```typescript
interface BasketItemView {
  // Отображает элемент корзины и кнопку удаления из неё
  render(item: ProductModel, index: number, onDelete: () => void): HTMLElement;
}
```

Конструктор реализации BasketItemView принимает следующие аргументы:

- template: HTMLTemplateElement

**BasketButtonView** отображает кнопку корзины со счётчиком добавленных товаров. Связан с
BasketPresenter, который передает количество товаров в корзине и обрабатывает нажатие кнопки
открытия корзины в модальном окне.

```typescript
interface BasketButtonView {
  render(itemsCount: number): HTMLElement; // Отображает кнопку открытия корзины и счётчик
  clearCounter(): void; // Обнуляет счётчик товаров
  setClickHandler(handler: () => void): void; // Назначает обработчик клика на кнопку корзины
}
```

Конструктор реализации BasketButtonView принимает следующие аргументы:

- basketButton: HTMLElement

**OrderDetailsView** отвечает за форму ввода основных данных заказа, таких как адрес доставки и
способ оплаты. Позволяет проставлять ошибки заполнения полей и состояние кнопки "Далее". Связан с
CheckoutPresenter, который передаёт данные пользователя и вызывает методы для управления ошибками и
состояниями кнопки.

```typescript
interface OrderDetailsView {
  // Отображает экран ввода данных заказа
  render(
    onNext: (data: Partial<UserDataModel>) => void,
    onInput: (data: Partial<UserDataModel>) => void,
    onClose: () => void,
  ): HTMLElement;

  // Обновляет состояние кнопки "Далее" (активна/неактивна)
  setButtonState(isEnabled: boolean): void;

  // Отображает ошибку при заполнении формы
  setError(error: string | null): void;

  // Меняет выбранный способ оплаты
  changePaymentMethod(method: string): void;

  close(): void; // Закрывает модальное окно
}
```

Конструктор реализации OrderDetailsView принимает следующие аргументы:

- container: HTMLElement
- template: HTMLTemplateElement

**OrderContactsView** отвечает за форму ввода контактной информации пользователя, такой как
электронная почта и номер телефона. Позволяет проставлять ошибки заполнения полей и состояние кнопки
"Оплатить". Связан с CheckoutPresenter, который передаёт данные пользователя и вызывает методы для
управления ошибками и состояниями кнопки.

```typescript
interface OrderContactsView {
  // Отображает экран ввода контактной информации
  render(
    onNext: (data: Partial<UserDataModel>) => void,
    onInput: (data: Partial<UserDataModel>) => void,
    onClose: () => void,
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

**OrderConfirmationView** отвечает за отображение экрана подтверждения успешного завершения заказа.
Связан с CheckoutPresenter, который вызывает отрисовку.

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

Предназначены для связывания моделей и представлений. Получают данные из моделей и передают их
представлениям. И наоборот, обрабатывают события из представлений и обновляют модели.

**ProductPresenter** управляет отображением списка товаров и открытием карточки выбранного товара.
Использует модель Products для получения списка товаров и деталей конкретного товара. Передаёт
данные в ProductListView для отображения. Управляет ProductModalView для отображения деталей товара.
При клике на кнопку добавления товара вызывает метод addProduct у BasketPresenter для добавления в
корзину.

```typescript
interface ProductPresenter {
  loadProducts(): Promise<void>; // Загружает список товаров из модели
  openProductModal(productId: string): void; // Открывает модальное окно с информацией о товаре
}
```

Конструктор реализации ProductPresenter принимает следующие аргументы:

- productsModel: ProductsModel
- basketModel: BasketModel
- productListView: ProductListView
- productModalView: ProductModalView
- basketPresenter: BasketPresenter

**BasketPresenter** управляет состоянием корзины и её отображением. Использует модель BasketModel
для добавления, удаления товаров и получения их списка. Обновляет счётчик товаров в корзине у
BasketButtonView. Управляет BasketModalView для отображения содержимого корзины. Отрисовывает
отдельные товары в корзине с кнопками удаления с помощью BasketItemView. При нажатии на кнопку
"Оформить" вызывается метод openCheckoutModal для открытия окна оформления заказа.

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

**CheckoutPresenter** управляет процессом оформления заказа. Использует модель UserModel для
хранения данных пользователя и модель BasketModel для создания заказа. Управляет OrderDetailsView,
OrderContactsView и OrderConfirmationView для отображения форм ввода данных и показа экрана
завершения заказа. Передаёт данные из форм обратно в модель UserModel. Вызывает у модели UserModel
методы с префиксом check для валидации данных. Вызывает методы управления ошибками и состоянием
кнопок в OrderDetailsView и OrderContactsView. При нажатии кнопки "Оплатить" вызывает метод
createOrder у WebLarekClient и передаёт туда данные из моделей UserModel и BasketModel. После
закрытия окна завершения заказа в BasketModel очищается корзина и обнуляется счетчик в
BasketButtonView.

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
