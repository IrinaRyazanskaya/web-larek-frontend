import type { BasketItemModel } from '../../types/models/basket';
import type { BasketItemView } from '../../types/views/basket-item';
import { formatPrice } from '../../utils/prices';

class BasketItemViewImpl implements BasketItemView {
	private template: HTMLTemplateElement;

	constructor(template: HTMLTemplateElement) {
		this.template = template;
	}

	render(item: BasketItemModel, index: number, onDelete: () => void): HTMLElement {
		const itemElement = this.template.content.cloneNode(true) as HTMLElement;

		const container = itemElement.querySelector<HTMLElement>('.basket__item');
		container.querySelector('.basket__item-index').textContent = (index + 1).toString();
		container.querySelector('.card__title').textContent = item.title;
		container.querySelector('.card__price').textContent = formatPrice(item.price);

		const deleteButton = container.querySelector<HTMLButtonElement>('.basket__item-delete');
		deleteButton.addEventListener('click', onDelete);

    container.dataset.orderItemId = item.orderItemId;

		return container;
	}
}

export { BasketItemViewImpl };
