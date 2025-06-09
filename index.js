// ✅ Arslan-MD Custom index.js File (Crash-Free with Channel Link) require('./settings') const { Boom } = require('@hapi/boom') const fs = require('fs') const chalk = require('chalk') const pino = require("pino") const NodeCache = require("node-cache") const readline = require("readline") const PhoneNumber = require('awesome-phonenumber') const { join } = require('path')
require('./settings')
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, jidDecode, jidNormalizedUser, makeCacheableSignalKeyStore, delay } = require("@whiskeysockets/baileys")

const { handleMessages, handleGroupParticipantUpdate, handleStatus } = require('./main') const { smsg } = require('./lib/myfunc')

// === CONFIGURATION === global.botname = "Arslan-MD" global.themeemoji = "🤖" global.owner = ["923237045919"] global.channelLink = "https://whatsapp.com/channel/0029VarfjW04tRrmwfb8x306"

const pairingCode = true const useMobile = false

const rl = process.stdin.isTTY ? readline.createInterface({ input: process.stdin, output: process.stdout }) : null const question = (text) => rl ? new Promise(resolve => rl.question(text, resolve)) : Promise.resolve(global.owner[0])

async function startBot() { let { version } = await fetchLatestBaileysVersion() const { state, saveCreds } = await useMultiFileAuthState('./session') const msgRetryCounterCache = new NodeCache()

const client = makeWASocket({
    version,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: !pairingCode,
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }))
    },
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    msgRetryCounterCache,
    getMessage: async (key) => ""
})

client.ev.on('connection.update', async ({ connection, lastDisconnect }) => {
    if (connection === 'open') {
        const id = client.user.id.split(':')[0] + '@s.whatsapp.net'
        await client.sendMessage(id, {
            text: `🤖 *${global.botname} Connected!*

📢 Join our WhatsApp Channel: ${global.channelLink}, contextInfo: { forwardingScore: 999, isForwarded: true } }) console.log(chalk.green(\n✅ ${global.botname} is now connected.`)) }

if (connection === 'close' && lastDisconnect?.error?.output?.statusCode !== 401) {
        console.log(chalk.red("🔁 Reconnecting..."))
        startBot()
    }
})

client.ev.on('messages.upsert', async (chatUpdate) => {
    try {
        const mek = chatUpdate.messages[0]
        if (!mek.message) return
        mek.message = mek.message.ephemeralMessage?.message || mek.message
        if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
        await handleMessages(client, chatUpdate, true)
    } catch (err) {
        console.error("❌ Message Handler Error:", err)
    }
})

client.ev.on('group-participants.update', async (update) => {
    await handleGroupParticipantUpdate(client, update)
})

client.ev.on('status.update', async (status) => {
    await handleStatus(client, status)
})

client.ev.on('creds.update', saveCreds)

// Pairing Code logic
if (pairingCode && !client.authState.creds.registered && !useMobile) {
    const number = (await question("📱 Enter your WhatsApp number: ")).replace(/[^0-9]/g, '')
    try {
        let code = await client.requestPairingCode(number)
        code = code?.match(/.{1,4}/g)?.join("-") || code
        console.log(chalk.green(`\n🔗 Pairing Code: ${code}`))
    } catch (e) {
        console.error(chalk.red("❌ Failed to get pairing code."), e)
    }
}

}

startBot().catch(err => console.error("Fatal Error:", err))

process.on('uncaughtException', console.error) process.on('unhandledRejection', console.error)

let file = require.resolve(__filename) fs.watchFile(file, () => { fs.unwatchFile(file) console.log(chalk.redBright("Reloading index.js...")) delete require.cache[file] require(file) })

            
