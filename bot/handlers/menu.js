const { Markup } = require("telegraf");

module.exports = async (ctx) => {
  const text = ctx.message.text;

  if (text === "Что мы делаем") {
    return ctx.reply(
      `Мы разрабатываем чат-ботов для бизнеса:\n\n📌 Боты для продаж\n📌 Поддержка клиентов\n📌 Автоматизация HR и обучения\n📌 Игровые боты\n📌 AI-боты (Dialogflow, ChatGPT API)`
    );
  }

  if (text === "Тарифы и кейсы") {
    return ctx.replyWithMarkdown(
      `📦 *Пакеты услуг:*\n\n🔹 Базовый — от 15 000 ₽\n🔹 Оптимум — от 30 000 ₽\n🔹 Премиум — от 50 000 ₽\n\nПримеры работ:\n- https://example.com/case1\n- https://example.com/case2`
    );
  }

  if (text === "Связаться с нами") {
    return ctx.reply(`📞 Менеджер: @yourmanager\n📧 Почта: bots@example.com`);
  }
};
