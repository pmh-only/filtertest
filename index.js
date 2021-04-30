const { Client } = require('discord.js')
const { writeFileSync } = require('fs')

const client = new Client()
const filters = require('./filters.json')

client.on('ready', () => {
  client.api.applications(client.user.id).guilds('830037161461153823').commands.post({data: {
    name: 'add',
    description: '필터할 단어를 추가합니다',
    options: [
      {
        type: 3,
        name: 'word',
        description: '필터할 단어',
        required: true
      }
    ]
  }})

  client.api.applications(client.user.id).guilds('836846504056193055').commands.post({data: {
    name: 'add',
    description: '필터할 단어를 추가합니다',
    options: [
      {
        type: 3,
        name: 'word',
        description: '필터할 단어',
        required: true
      }
    ]
  }})
})

client.ws.on('INTERACTION_CREATE', async interaction => {
  if (interaction.data.name === 'clear') {
    await client.channels.resolve(interaction.channel_id).bulkDelete(interaction.data.options[0].value).catch(console.log)
    client.api.interactions(interaction.id, interaction.token).callback.post({data: {
      type: 4,
      data: {
        content: 'ㅇㅋ 추가됨'
      }
    }})
  }

  if (interaction.data.name === 'add') {
    filters.push(interaction.data.options[0].value)
    client.api.interactions(interaction.id, interaction.token).callback.post({data: {
      type: 4,
      data: {
        content: 'ㅇㅋ 추가됨'
      }
    }})
  }
})

client.on('message', (msg) => {
  if (msg.author.id === '836772740659937331') return msg.delete()
  if (msg.author.bot) return

  if (filters.find((filter) => msg.content.split(' ').join('').includes(filter))) {
    if (msg.deletable) msg.delete().catch(() => {})
    msg.reply('욕, 일베 안돼')
  }
})

client.login('ODM2ODAzMzAwODYyNTkxMDE3.YIjTzQ.hJf-Regd7X8ffFhudGTGbvtDT5I')

setInterval(() => {
  writeFileSync('./filters.json', JSON.stringify(filters, null, 2))
}, 1000)
