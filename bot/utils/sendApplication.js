const { appendToSheet } = require("./google");

module.exports = async (ctx) => {
  const { name, contact, task } = ctx.session;
  const from = ctx.from;

  // Сообщение для администратора
  const message = `📥 Новая заявка:\n\n👤 Имя: ${name}\n📱 Контакт: ${contact}\n📝 Задача: ${task}`;

  // 1. Отправка админу
  try {
    await ctx.telegram.sendMessage(process.env.OWNER_CHAT_ID, message);
  } catch (err) {
    console.error("Ошибка отправки админу:", err);
  }

  // 2. Запись в Google Таблицу
  try {
    await appendToSheet("Заявки", [
      new Date().toLocaleString(),
      from.id,
      from.username || "",
      from.first_name || "",
      from.last_name || "",
      name,
      contact,
      task,
    ]);
  } catch (error) {
    console.error("Ошибка записи заявки в Google Sheets:", error);
  }
};
