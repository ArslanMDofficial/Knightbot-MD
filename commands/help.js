const settings = require('../settings');
const fs = require('fs');
const path = require('path');

async function helpCommand(sock, chatId, message) {
    const helpMessage = `...`.trim(); // 👈 keep your command list here

    try {
        // ✅ Better connection check
        if (!sock || sock?.ev?.buffer == null || sock?.ws?.readyState !== 1) {
            console.error('❌ Socket not connected. Skipping help command.');
            return;
        }

        const imagePath = path.join(__dirname, '../assets/bot_image.jpg');

        const quotedMsg = message?.key ? message : undefined;

        if (fs.existsSync(imagePath)) {
            const imageBuffer = fs.readFileSync(imagePath);
            await sock.sendMessage(chatId, {
                image: imageBuffer,
                caption: helpMessage
            }, { quoted: quotedMsg });
        } else {
            await sock.sendMessage(chatId, {
                text: helpMessage
            }, { quoted: quotedMsg });
        }

    } catch (error) {
        console.error('⚠️ Error in help command:', error);

        // 🛡️ Send fallback message only if socket still open
        if (sock?.ws?.readyState === 1) {
            await sock.sendMessage(chatId, {
                text: helpMessage
            });
        }
    }
}

module.exports = helpCommand;
