import 'source-map-support/register.js';
import { Client, GatewayIntentBits } from 'discord.js';
import { Environment } from './environment.js';
import exitHook from 'exit-hook';

console.log('Starting bot with version:', Environment.VERSION);

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	]
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user!.tag}`);
});

client.on('messageCreate', async message => {
	if (message.author.bot) {
		return;
	}

	if (message.content === '!ping') {
		await message.reply('Pong!');
	}
	
	if (message.content.match(/\bsoup/i)) {
		await message.channel.send('Soups ready ( ͡° ͜ʖ ͡°)');
	}

	if (message.content.match(/\b[g][oO][dD]\b/)) {
		let msg = message.content.match(/\b[g][oO][dD]\b/i);
		
		if (msg) {
			let msgSplit = msg[0].split("");
			msgSplit[0] = "G";
			let reply = msgSplit.join("");

			await message.reply(`${reply}**`);
		}
	}

	if(message.author.id !== '713445497846759467') {
		if (message.content.match(/^(i\'?m|i am) +([^\.\,\?\!\n]{2,})/i)) {
			const name = message.content.match(/^(i\'?m|i am) +([^\.\,\?\!\n]{2,})/i);

			if (name) {
				const isInitialCapitalized = name[1].startsWith('I');
				const isFullyCapitalized = name[1].toUpperCase() === name[1];
				const greeting = isFullyCapitalized ? 'HI' : (isInitialCapitalized ? 'Hi' : 'hi');

				await message.reply(`${greeting} ${name[2]}`);
			}
		
		}
	}
});

// Log out of the bot when the process exits
exitHook(() => client.destroy());

// Log into the bot
await client.login(Environment.DISCORD_TOKEN);
