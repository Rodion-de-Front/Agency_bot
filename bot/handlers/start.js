const { Markup } = require("telegraf");
const { appendToSheet } = require("../utils/google");

module.exports = async (ctx) => {
  const from = ctx.from;

  try {
    await appendToSheet("Пользователи", [
      new Date().toLocaleString(),
      from.id,
      from.username || "",
      from.first_name || "",
      from.last_name || "",
      ctx.chat?.type || "",
    ]);
  } catch (error) {
    console.error("Ошибка записи пользователя в Google Sheets:", error);
  }

  return ctx.reply(
    "Добро пожаловать! Чем можем помочь?",
    Markup.keyboard([
      ["Что мы делаем", "Тарифы и кейсы"],
      ["Связаться с нами", "Частые вопросы"],
      ["Оставить заявку"],
    ]).resize()
  );
};
