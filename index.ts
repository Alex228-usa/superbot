import TelegramBot, { Message, ReplyKeyboardMarkup, CallbackQuery } from 'node-telegram-bot-api';
import axios from 'axios';

const token = '7023230142:AAH6bPE_4dXa8jLM5da83MTSZ10x0VX0APQ';
const bot = new TelegramBot(token, { polling: true });

const apiUrl = 'https://akabab.github.io/superhero-api/api/';

// Функция для получения информации о герое по его ID
async function getHeroInfo(id: number) {
    try {
        const response = await axios.get(`${apiUrl}id/${id}.json`);
        const { name, powerstats, full_name, race } = response.data;
        return { name, powerstats, full_name, race };
    } catch (error: any) {
        console.error('Error fetching hero information:', error);
        return null;
    }
}

// Данные о героях
const heroes = [
    { id: 1, name: 'A-Bomb', INT: 38, STR: 100, SPD: 17, DUR: 80, POW: 24, CMB: 64, full_name: 'Rick Jones', race: 'Human' },
    { id: 2, name: 'Abe Sapien', INT: 88, STR: 28, SPD: 35, DUR: 65, POW: 100, CMB: 85, full_name: 'Langdon Everett Caul', race: 'Icthyo Sapien' },
    { id: 3, name: 'Abin Sur', INT: 50, STR: 90, SPD: 53, DUR: 64, POW: 99, CMB: 65, full_name: 'Abin Sur', race: 'Ungaran' },
    { id: 4, name: 'Abomination', INT: 63, STR: 80, SPD: 53, DUR: 90, POW: 62, CMB: 95, full_name: 'Emil Blonsky', race: 'Human / Gamma Mutate' },
    { id: 5, name: 'Abraxas', INT: 88, STR: 63, SPD: 83, DUR: 100, POW: 100, CMB: 55, full_name: 'Abraxas', race: 'Cosmic Entity' },
    { id: 6, name: 'Absorbing Man', INT: 38, STR: 80, SPD: 25, DUR: 100, POW: 98, CMB: 64, full_name: 'Carl "Crusher" Creel', race: 'Human' },
    { id: 7, name: 'Adam Monroe', INT: 63, STR: 10, SPD: 12, DUR: 100, POW: 100, CMB: 64, full_name: 'Adam Monroe', race: 'Immortal' },
    { id: 8, name: 'Adam Strange', INT: 69, STR: 10, SPD: 33, DUR: 40, POW: 37, CMB: 50, full_name: 'Adam Strange', race: 'Human' },
    { id: 10, name: 'Agent Bob', INT: 10, STR: 8, SPD: 13, DUR: 5, POW: 5, CMB: 20, full_name: 'Agent Bob', race: 'Human' }
];

// Обработчик команды /start
bot.onText(/\/start/, (msg: Message) => {
    const chatId = msg.chat.id;
    const message = 'Привет! Я бот супергероев. Чтобы узнать информацию о герое, напиши его ID.';
    const keyboard: ReplyKeyboardMarkup = {
        resize_keyboard: true,
        keyboard: [
            [{ text: '🔝 Показать топ 10 супергероев' }] // Добавлен эмоджи 🔝
        ]
    };
    bot.sendMessage(chatId, message, { reply_markup: keyboard });
});


// Обработчик нажатия на кнопку "Показать топ 10 супергероев"
bot.onText(/Показать топ 10 супергероев/, async (msg: Message) => {
    const chatId = msg.chat.id;
    const topHeroes = heroes.slice(0, 10); // Получаем первые 10 героев
    const message = 'Топ 10 супергероев:';
    const heroMessages = topHeroes.map(hero => {
        return `
            Имя: ${hero.name}
            Полное имя: ${hero.full_name}
            Раса: ${hero.race}
            Статистика:
            - Интеллект: ${hero.INT}
            - Сила: ${hero.STR}
            - Скорость: ${hero.SPD}
            - Выносливость: ${hero.DUR}
            - Сила удара: ${hero.POW}
            - Комбат: ${hero.CMB}
        `;
    });
    bot.sendMessage(chatId, `${message}\n\n${heroMessages.join('\n\n')}`);
});

// Обработчик ошибок
bot.on('polling_error', (error: any) => {
    console.error('Polling error:', error);
});

console.log('Бот запущен!');


