const settings = require('../settings');
const fs = require('fs');
const path = require('path');

// ✅ Socket check helper
function isSocketOpen(sock) {
    return sock && sock.ws && sock.ws.readyState === 1;
}

async function helpCommand(sock, chatId, message) {
    const helpMessage = `📜 *Help Menu*\n...`; // (Your full command list here)

    try {
        // ✅ Prevent crash if socket is closed
        if (!isSocketOpen(sock)) {
            console.error('❌ Socket is not open. Skipping help command.');
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

        if (isSocketOpen(sock)) {
            await sock.sendMessage(chatId, {
                text: helpMessage
            });
        }
    }
}

module.exports = helpCommand;
