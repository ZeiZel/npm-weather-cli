// эта библиотека красит выводы текста
import chalk from "chalk";
// эта библиотека удаляет табуляцию при использовании косых кавычек
import dedent from "dedent-js";

// выводим ошибку
const printError = (error) => {
	console.log(`${chalk.bgRed(" ERROR")} ${error}`);
};

// оповещаем об успехе
const printSuccess = (success) => {
	console.log(`${chalk.bgGreen(" Success")} ${success}`);
};

// выводим помощь
const printHelp = () => {
	console.log(
		dedent`
			${chalk.bgCyan(" HELP ")}
			Без параметров - вывод погоды
			-s [CITY] для установки города
			-t [API_KEY] для установки токена
			-h для показа помощи 
		`
	);
};

const printWeather = (res, icon) => {
	console.log(
		dedent`
			${chalk.bgMagenta(" ПОГОДА ")} погода в городе ${res.name}
			${icon}  ${res.weather[0].description}
			Температура: ${Math.round(res.main.temp)}
			Чувствуется как: ${Math.round(res.main.feels_like)}
			Влажность: ${res.main.humidity}%
			Скорость ветра: ${Math.round(res.wind.speed)} м/с
			`
	);
};

export { printError, printSuccess, printHelp, printWeather };
