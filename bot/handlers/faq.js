const { Markup } = require("telegraf");

const faqs = {
  "Сколько стоит бот?": "Цена зависит от функциональности: от 15 000 ₽",
  "За сколько вы сделаете?": "Обычно 3–7 рабочих дней",
  "Какие технологии используете?": "Node.js, Python, AI, CRM, Telegraf",
  "Можете ли сделать под ключ?": "Да, полный цикл — от идеи до запуска",
  "Работаете с юр. лицами?": "Да, есть ИП и ООО",
};

// Показываем меню FAQ (список вопросов + кнопка назад)
async function faqMenu(ctx) {
  const buttons = Object.keys(faqs).map((q) => [
    Markup.button.callback(q, `faq_${q}`),
  ]);

  if (ctx.callbackQuery && ctx.callbackQuery.message) {
    try {
      await ctx.editMessageText(
        "Выберите вопрос:",
        Markup.inlineKeyboard(buttons)
      );
    } catch {
      await ctx.reply("Выберите вопрос:", Markup.inlineKeyboard(buttons));
    }
  } else {
    await ctx.reply("Выберите вопрос:", Markup.inlineKeyboard(buttons));
  }
}

module.exports = (bot) => {
  bot.hears("Частые вопросы", (ctx) => {
    faqMenu(ctx);
  });

  bot.on("callback_query", async (ctx) => {
    const data = ctx.callbackQuery.data;

    if (data.startsWith("faq_")) {
      const question = data.slice(4);
      const answer = faqs[question];
      if (answer) {
        try {
          await ctx.editMessageText(
            `${question}\n\n${answer}`,
            Markup.inlineKeyboard([
              Markup.button.callback("Назад", "back_to_faq"),
            ])
          );
        } catch {
          await ctx.reply(
            `${question}\n\n${answer}`,
            Markup.inlineKeyboard([
              Markup.button.callback("Назад", "back_to_faq"),
            ])
          );
        }
      } else {
        await ctx.answerCbQuery("Вопрос не найден.");
      }
      return ctx.answerCbQuery();
    }

    if (data === "back_to_faq") {
      await faqMenu(ctx);
      return ctx.answerCbQuery();
    }

    await ctx.answerCbQuery();
  });
};
