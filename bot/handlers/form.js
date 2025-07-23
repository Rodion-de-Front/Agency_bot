const sendApplication = require("../utils/sendApplication");

module.exports = (bot) => {
  bot.hears("Оставить заявку", (ctx) => {
    if (!ctx.session) ctx.session = {};
    ctx.session.step = "name";
    ctx.reply("Как вас зовут?");
  });

  bot.on("text", async (ctx) => {
    if (!ctx.session) ctx.session = {};

    const step = ctx.session.step;

    if (!step) return;

    if (step === "name") {
      ctx.session.name = ctx.message.text;
      ctx.session.step = "contact";
      return ctx.reply("Оставьте телефон или @username:");
    }

    if (step === "contact") {
      ctx.session.contact = ctx.message.text;
      ctx.session.step = "task";
      return ctx.reply("Опишите задачу:");
    }

    if (step === "task") {
      ctx.session.task = ctx.message.text;
      await sendApplication(ctx);
      ctx.session = null;
      return ctx.reply("Спасибо! Мы свяжемся в течение 1 рабочего дня.");
    }
  });
};
