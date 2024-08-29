const TelegramBot = require('node-telegram-bot-api');

const token = '7269294517:AAG1QwDqlAfUKCdXFQWBfayy_GXHCKygljk';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    await bot.sendMessage(chatId, "проПРПОПРОПРО", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Заполни форму", web_app: { url: "https://aitu--aitu-secrets.netlify.app/" } }]
        ]
      }
    });
  }
});

bot.on('web_app_data', async (msg) => {
  const chatId = msg.chat.id;
  const webAppData = msg.web_app_data.data;

  try {
    const parsedData = JSON.parse(webAppData);
    
    // Данные пользователя и текст
    const { text, user } = parsedData;

    const userInfo = `Пользователь: ${user.firstName} ${user.lastName} (@${user.username})`;
    const message = `Полученные данные:\nТекст: ${text}\n${userInfo}`;
    
    await bot.sendMessage(chatId, message);
  } catch (error) {
    await bot.sendMessage(chatId, `Ошибка при разборе данных: ${error.message}`);
  }
});
