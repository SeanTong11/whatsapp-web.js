const { util } = require('chai')
const { Client, Location, Poll, List, Buttons, LocalAuth } = require('./index')


const client = new Client({
    authStrategy: new LocalAuth(),
    // proxyAuthentication: { username: 'username', password: 'password' },
    puppeteer: {
        // args: ['--proxy-server=proxy-server-that-requires-authentication.example.com'],
        headless: false
    }
})



client.initialize()

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message)
})

client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    console.log('QR RECEIVED', qr)
})

client.on('authenticated', () => {
    console.log('AUTHENTICATED')
})

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg)
})

client.on('ready', async () => {
    console.log(await client.getWWebVersion())

    client.getContacts().then(contacts => {
        console.log(contacts)

        contacts.forEach(async contact => {
            //get chat from contacts
            const chat = await contact.getChat()

            if (chat != null && chat.name === '+86 xxxx') {
                var chatId = chat.id

                // open window bt chat id
                await client.interface.openChatWindow(chatId)

            }

        })
    })


})
