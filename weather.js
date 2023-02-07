#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { getWeather, getIcon } from "./services/api.service.js";
import {
	printHelp,
	printError,
	printSuccess,
	printWeather,
} from "./services/log.service.js";
import {
	saveKeyValue,
	getKeyValue,
	TOKEN_DICTIONARY,
} from "./services/storage.service.js";

process.env.TOKEN = "73c01bc1e6a6771ddfdf3b7402beb7a1";
process.env.CITY = "moscow";

// сохранение токена и уведомление о завершении операции
const saveToken = async (token) => {
	// проверяем наличие токена
	if (!token.length) {
		printError("Не передан токен");
		return;
	}

	// само выполнение сохранения и уведомления
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess("Токен сохранён");
	} catch (e) {
		printError("Токен не удалось сохранить :( " + e.message);
	}
};

// сохранение токена и уведомление о завершении операции
const saveCity = async (city) => {
	// проверяем наличие токена
	if (!city.length) {
		printError("Не передан город");
		return;
	}

	// само выполнение сохранения и уведомления
	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printSuccess("Город сохранён");
	} catch (e) {
		printError("Город не удалось сохранить " + e.message);
	}
};

const getForecast = async () => {
	try {
		const city = process.env.CITY ?? getKeyValue(TOKEN_DICTIONARY.city);
		// получаем погоду
		const weather = await getWeather(city);
		// выводим погоду в консоль
		printWeather(weather, getIcon(weather.weather[0].icon));
	} catch (e) {
		// если мы не получили город, то получим ошибку
		if (e?.response?.status === 404) {
			printError("Неверно указан город");
			return;
			// если мы не получили город, то получим ошибку
		} else if (e.response.status === 401) {
			printError("Неверно указан токен");
			return;
			// и в остальных случаях просто получим ошибку
		} else {
			printError(e.message);
		}
	}
};

const initCLI = () => {
	const args = getArgs(process.argv);

	// console.log(process.env.TOKEN);

	if (args.h) {
		// вывод помощи
		return printHelp();
	}

	if (args.s) {
		// сохранить город
		return saveCity(args.s);
	}

	if (args.t) {
		// сохранение токена
		return saveToken(args.t);
	}

	// вызовем метод получения данных о погоде
	return getForecast();
};

initCLI();
