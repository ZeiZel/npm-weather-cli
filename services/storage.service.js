// os - это библиотека для работы с операционной системой
// homedir - выведет домашнюю директорию (учитывая ОС)
import { homedir } from "os";
// path - это библиотека для работы с путями
// join - позволяет из нескольких аргументов строить ПРАВИЛЬНЫЙ путь
import { join } from "path";
// fs - это модуль по работе с файловой системой нашего ПК
import { promises } from "fs";

// создаём путь до нашего файла, в который мы будем сохранять данные
const filePath = join(homedir(), "weather-data.json");

// тут мы создаём словарь, который будет хранить названия наших ключей в файле storage
const TOKEN_DICTIONARY = {
	token: "token",
	city: "city",
};

// это функция сохранения наших данных в отдельном файле
const saveKeyValue = async (key, value) => {
	// это наши данные из файла, поэтому они должны быть изменяемыми (let)
	let data = {};

	// если файл по данному пути существует, то мы можем сохранить его данные в ОЗУ
	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath);
		data = JSON.parse(file);
	}

	// Далее занести новые данные в data
	data[key] = value;

	// и теперь мы можем перезаписать наш файл
	await promises.writeFile(filePath, JSON.stringify(data));
};

// далее мы получаем ключ нашего значения
const getKeyValue = async (key) => {
	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath);
		const data = JSON.parse(file);
		// вернёт ключ данных, если они существуют
		return data[key];
	}
	// и ничего не вернёт, если проверка не прошла
	return undefined;
};

// Эта функция проверит, существует ли данный файл
const isExist = async (path) => {
	try {
		// stat возвращает статистику по файлу, но если файла нет, то он падает
		await promises.stat(path);
		// да, так как он смог вернуть статистику
		return true;
	} catch (e) {
		// и нет, так как статистику не вернул и функция упала
		return false;
	}
};

export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };
