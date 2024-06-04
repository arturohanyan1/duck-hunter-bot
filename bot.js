// TELEGRAM
const { Telegraf, Markup } = require('telegraf');
const fs = require('fs');
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

//! RISE SERVER
const app = express();

//! IMPORT MIDDLEWARES
const corsHandler = require('./middlewares/handleCrossOriginRequests');

//! USE MIDDLEWARES
app.use(corsHandler);
app.use(bodyParser.json());

//! CREATE BOT
const bot = new Telegraf(process.env.BOT_TOKEN);

//! SET BOT MENU COMMANDS
bot.telegram.setMyCommands([
  { command: "start", description: "Start" },
]);

//! ON START COMMAND 
bot.start(async ctx => {
  const imageStream = fs.createReadStream('./public/images/duckhunt.webp');
  const username = ctx.message.from?.username;
  const messageText = `Hi @${username}. This is Duck Hunt Game Bot 👋\n<b>Welcome to Duck Hunt Game App</b>`
  const gameButton = Markup.button.webApp('🚀 Open Game', process.env.MINIGAMES_WEB_APP_URL);
  const keyboard = Markup.inlineKeyboard([[gameButton]]);

  await ctx.replyWithPhoto({ source: imageStream });
  await ctx.replyWithHTML(messageText, keyboard);
  return;
});

//! TEXT MESSAGE EVENTS
bot.on('text', async ctx => {
  const message = ctx.message.text;
  return ctx.reply(message);
});

//! LAUNCH BOT
bot.launch();

//! LISTEN PORT
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
})
console.log('Бот запущен');
