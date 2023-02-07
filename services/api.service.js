// подключаем модуль по работе с ссылками
import axios from "axios";
import https from "https";
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js";

// тут мы получаем иконки по определённому числу
const getIcon = (icon) => {
	switch (icon.slice(0, -1)) {
		case "01":
			return "☀️";
		case "02":
			return "🌤️";
		case "03":
			return "☁️";
		case "04":
			return "☁️";
		case "09":
			return "🌧️";
		case "10":
			return "🌦️";
		case "11":
			return "🌩️";
		case "13":
			return "❄️";
		case "50":
			return "🌫️";
	}
};

const getWeather = async (city) => {
	// получаем из нашего словаря токен
	const token =
		process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token));
	if (!token) {
		throw new Error(
			"Токен не задан! Задайте его через команду -t [API_KEY]"
		);
	}

	// так же мы можем воспользоваться библиотекой axios, чтобы совершить быстрый запрос к нашему серверу на получение данных
	const { data } = await axios.get(
		"https://api.openweathermap.org/data/2.5/weather",
		{
			params: {
				q: city,
				appid: token,
				lang: "ru",
				units: "metric",
			},
		}
	);
	return data;
};

export { getWeather, getIcon };
