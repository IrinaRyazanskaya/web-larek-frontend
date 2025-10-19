import { WebLarekClientImpl } from "./components/clients/weblarek";
import { BasketModelImpl } from "./components/models/basket";
import { ProductsModelImpl } from "./components/models/products";
import { BasketItemViewImpl } from "./components/views/basket-item";
import { BasketModalViewImpl } from "./components/views/basket-modal";
import { ProductCardViewImpl } from "./components/views/product-card";
import { ProductListViewImpl } from "./components/views/product-list";
import { ProductModalViewImpl } from "./components/views/product-modal";
import { BasketButtonViewImpl } from "./components/views/basket-button";
import { OrderDetailsViewImpl } from "./components/views/order-details";
import { OrderContactsViewImpl } from "./components/views/order-contacts";
import { OrderConfirmationViewImpl } from "./components/views/order-confirmation";
import { ProductPresenterImpl } from "./components/presenters/product";
import { BasketPresenterImpl } from "./components/presenters/basket";
import { CheckoutPresenterImpl } from "./components/presenters/checkout";
import { UserModelImpl } from "./components/models/user";
import "./scss/styles.scss";

const modalContainer = document.querySelector<HTMLElement>("#modal-container");

const client = new WebLarekClientImpl();

const productsModel = new ProductsModelImpl(client);
const basketModel = new BasketModelImpl();
const userModel = new UserModelImpl();

const galleryElement = document.querySelector<HTMLElement>(".gallery");
const cardCatalogTemplate = document.querySelector<HTMLTemplateElement>("#card-catalog");
const productCardView = new ProductCardViewImpl(cardCatalogTemplate);
const productListView = new ProductListViewImpl(galleryElement, productCardView);

const cardPreviewTemplate = document.querySelector<HTMLTemplateElement>("#card-preview");
const productModalView = new ProductModalViewImpl(modalContainer, cardPreviewTemplate);

const basketTemplate = document.querySelector<HTMLTemplateElement>("#basket");
const basketItemTemplate = document.querySelector<HTMLTemplateElement>("#card-basket");
const basketItemView = new BasketItemViewImpl(basketItemTemplate);
const basketModalView = new BasketModalViewImpl(modalContainer, basketTemplate, basketItemView);

const basketButton = document.querySelector<HTMLElement>(".header__basket");
const basketButtonView = new BasketButtonViewImpl(basketButton);

const orderDetailsTemplate = document.querySelector<HTMLTemplateElement>("#order");
const orderDetailsView = new OrderDetailsViewImpl(modalContainer, orderDetailsTemplate);

const orderContactsTemplate = document.querySelector<HTMLTemplateElement>("#contacts");
const orderContactsView = new OrderContactsViewImpl(modalContainer, orderContactsTemplate);

const orderConfirmationTemplate = document.querySelector<HTMLTemplateElement>("#success");
const orderConfirmationView = new OrderConfirmationViewImpl(
  modalContainer,
  orderConfirmationTemplate,
);

const checkoutPresenter = new CheckoutPresenterImpl(
  client,
  userModel,
  basketModel,
  orderDetailsView,
  orderContactsView,
  orderConfirmationView,
  basketButtonView,
);

const basketPresenter = new BasketPresenterImpl(
  basketModel,
  basketButtonView,
  basketModalView,
  checkoutPresenter,
);

const productPresenter = new ProductPresenterImpl(
  productsModel,
  basketModel,
  productListView,
  productModalView,
  basketPresenter,
);

productPresenter.loadProducts();
