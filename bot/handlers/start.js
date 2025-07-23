const { Markup } = require("telegraf");

module.exports = (ctx) => {
  return ctx.reply(
    "Добро пожаловать! Чем можем помочь?",
    Markup.keyboard([
      ["Что мы делаем", "Тарифы и кейсы"],
      ["Связаться с нами", "Частые вопросы"],
      ["Оставить заявку"],
    ]).resize()
  );
};
