require("dotenv").config();
const { Telegraf, session } = require("telegraf");
const startHandler = require("./handlers/start");
const menuHandler = require("./handlers/menu");
const faqHandler = require("./handlers/faq");
const formHandler = require("./handlers/form");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(session());
bot.start(startHandler);
bot.hears(["Что мы делаем", "Тарифы и кейсы", "Связаться с нами"], menuHandler);
faqHandler(bot);
formHandler(bot);

bot.launch();
console.log("Бот запущен");
