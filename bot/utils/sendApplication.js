module.exports = async (ctx) => {
  const { name, contact, task } = ctx.session;
  const message = `📥 Новая заявка:\n\n👤 Имя: ${name}\n📱 Контакт: ${contact}\n📝 Задача: ${task}`;

  await ctx.telegram.sendMessage(process.env.OWNER_CHAT_ID, message);
};
