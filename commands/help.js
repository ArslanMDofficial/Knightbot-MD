const settings = require('../settings');
const fs = require('fs');
const path = require('path');

async function helpCommand(sock, chatId, message) {
    try {
        const ytLink = global.ytch || 'https://youtube.com/@ArslanMD';
        const helpMessage = `
🤖 *${settings.botName || 'Arslan-MD'}*
📦 *Version:* ${settings.version || '2.0.2'}
👤 *Owner:* ${settings.botOwner || 'ArslanMD Official'}
📺 *YouTube:* ${ytLink}

📜 *Available Commands*

🌐 *General Commands:*
• .help / .menu
• .ping
• .alive
• .tts <text>
• .owner
• .joke
• .quote
• .fact
• .weather <city>
• .news
• .attp <text>
• .lyrics <song_title>
• .8ball <question>
• .groupinfo
• .staff / .admins 
• .vv
• .trt <text> <lang>
• .ss <link>
• .jid

👮 *Admin Commands:*
• .ban @user
• .promote @user
• .demote @user
• .mute <min>
• .unmute
• .delete
• .kick @user
• .warn @user
• .warnings @user
• .antilink
• .antibadword
• .clear
• .tag <msg>
• .tagall
• .chatbot
• .resetlink
• .welcome on/off
• .goodbye on/off

🔒 *Owner Commands:*
• .mode
• .autostatus
• .clearsession
• .antidelete
• .cleartmp
• .setpp (reply to image)
• .autoreact

🎨 *Image/Sticker:*
• .blur <image>
• .simage
• .sticker
• .tgsticker <link>
• .meme
• .take <packname>
• .emojimix 😊+🔥

🎮 *Games:*
• .tictactoe @user
• .hangman
• .guess <letter>
• .trivia
• .answer <ans>
• .truth / .dare

🤖 *AI Commands:*
• .gpt <question>
• .gemini <question>
• .imagine <prompt>
• .flux <prompt>

🎯 *Fun Commands:*
• .compliment @user
• .insult @user
• .flirt
• .shayari
• .roseday
• .goodnight
• .character @user
• .ship @user
• .simp @user
• .wasted @user
• .stupid @user <text>

🖋️ *Textmaker:*
• .metallic <text>
• .snow / .neon / .fire / .devil ...
• .hacker / .1917 / .glitch / .leaves ...

📥 *Downloader:*
• .play <song>
• .song <name>
• .instagram / .facebook / .tiktok <link>

💻 *GitHub:*
• .git / .github / .sc / .repo / .script
        `.trim();

        const imagePath = path.join(__dirname, '../assets/bot_image.jpg');
        if (fs.existsSync(imagePath)) {
            const imageBuffer = fs.readFileSync(imagePath);
            await sock.sendMessage(chatId, {
                image: imageBuffer,
                caption: helpMessage
            }, { quoted: message });
        } else {
            await sock.sendMessage(chatId, {
                text: helpMessage
            }, { quoted: message });
        }

    } catch (error) {
        console.error('❌ Error in help command:', error);
        await sock.sendMessage(chatId, {
            text: '⚠️ Help command failed. Please try again later.'
        }, { quoted: message });
    }
}

module.exports = helpCommand;
