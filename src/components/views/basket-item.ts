import type { ProductModel } from '../../types/models/products';
import type { BasketItemView } from '../../types/views/basket-item';
import { formatPrice } from '../../utils/prices';

class BasketItemViewImpl implements BasketItemView {
	private template: HTMLTemplateElement;
	private onDelete: () => void;

	constructor(template: HTMLTemplateElement, onDelete: () => void) {
		this.template = template;
		this.onDelete = onDelete;
	}

	render(item: ProductModel, index: number): HTMLElement {
		const itemElement = this.template.content.cloneNode(true) as HTMLElement;

    const container = itemElement.querySelector('.basket__item') as HTMLElement;
		container.querySelector('.basket__item-index').textContent = (index + 1).toString();
		container.querySelector('.card__title').textContent = item.title;
		container.querySelector('.card__price').textContent = formatPrice(item.price);

    const deleteButton = container.querySelector('.basket__item-delete') as HTMLButtonElement;
		deleteButton.addEventListener('click', () => {
       this.onDelete();
       container.remove();
    });

    return container;
	}
}

export { BasketItemViewImpl };
