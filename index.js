const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
    console.error('Не найден токен Telegram-бота!');
    process.exit(1);
}

const bot = new TelegramBot(token, {
    polling: true
});

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(
        chatId,
        'Здорово, Паша! 🤝 Я Вася, твой кореш!\n\n' +
        'Я здесь, чтобы поддерживать тебя, обсуждать планы ' +
        'и помогать двигаться вперёд.\n\n' +
        'Напиши мне, как ты сегодня!'
    );
});

bot.on('message', (msg) => {
    if (!msg.text || msg.text.startsWith('/')) {
        return;
    }

    const chatId = msg.chat.id;
    const text = msg.text.toLowerCase();

    if (text.includes('привет')) {
        bot.sendMessage(
            chatId,
            'Здорово, кореш! 😎 Как сам? Что у тебя нового?'
        );
    } else if (
        text.includes('плохо') ||
        text.includes('грустно')
    ) {
        bot.sendMessage(
            chatId,
            'Я рядом, Паша. Рассказывай, что случилось. Разберёмся вместе. 🤝'
        );
    } else {
        bot.sendMessage(
            chatId,
            'Я тебя слушаю, кореш! Рассказывай подробнее. 💪'
        );
    }
});

bot.on('polling_error', (error) => {
    console.error('Ошибка Telegram:', error.message);
});

console.log('Вася-кореш запущен!');
