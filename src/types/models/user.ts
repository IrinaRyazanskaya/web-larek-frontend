export interface UserDataModel {
	email: string;
	phone: string;
	address: string;
	payment: string;
}

export interface UserModel {
	updateData(newData: Partial<UserDataModel>): void; // Обновляет данные пользователя
	getData(): UserDataModel; // Возвращает текущие данные пользователя
  checkAddressValid(): string | null; // Проверяет правильность заполнения адреса
  checkPaymentValid(): string | null; // Проверяет выбран ли способ оплаты
  checkEmailValid(): string | null; // Проверяет правильность заполнения электронной почты
  checkPhoneValid(): string | null; // Проверяет правильность заполнения номера телефона
	reset(): void; // Очищает данные пользователя
}
