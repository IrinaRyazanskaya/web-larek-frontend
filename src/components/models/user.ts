import type { UserDataModel, UserModel } from '../../types/models/user';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^\+?[0-9\s\-()]{7,}$/;

class UserModelImpl implements UserModel {
	data: UserDataModel;

	constructor() {
		this.data = {
			address: '',
			email: '',
			payment: '',
			phone: '',
		};
	}

	updateData(newData: Partial<UserDataModel>): void {
		this.data = { ...this.data, ...newData };
	}

	getData(): UserDataModel {
		return this.data;
	}

	checkAddressValid(): string | null {
		if (this.data.address === '') {
			return 'Адрес доставки не указан, заполните поле';
		}

		return null;
	}

	checkPaymentValid(): string | null {
		if (this.data.payment === '') {
			return 'Способ оплаты не выбран';
		}

		return null;
	}

	checkEmailValid(): string | null {
		if (this.data.email === '') {
			return 'Email не указан, заполните поле';
		}

		if (!emailRegex.test(this.data.email)) {
			return 'Указан некорректный email';
		}

		return null;
	}

	checkPhoneValid(): string | null {
		if (this.data.phone === '') {
			return 'Номер телефона не указан, заполните поле';
		}

		if (!phoneRegex.test(this.data.phone)) {
			return 'Указан некорректный номер';
		}

		return null;
	}

	reset(): void {
		this.data = {
			address: '',
			email: '',
			payment: '',
			phone: '',
		};
	}
}

export { UserModelImpl };
