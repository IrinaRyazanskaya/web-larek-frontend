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
