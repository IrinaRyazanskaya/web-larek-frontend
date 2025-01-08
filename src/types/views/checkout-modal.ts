import type { UserDataModel } from '../models/user';

export interface CheckoutModalView {
	render(
		onSubmit: (formData: UserDataModel) => void // Колбэк для отправки формы
	): HTMLElement; // Отображает форму
}
