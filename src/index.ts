import 'source-map-support/register.js';
import { Client, GatewayIntentBits } from 'discord.js';
import { Environment } from './environment.js';
import exitHook from 'exit-hook';
import { randomInt } from 'crypto';

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

	// something something 
	if (message.content === '!ping') {
		await message.reply('69 ms');
		console.log("Nice");
	}

	// Classic soup joke
	if (message.content.match(/\bsoup/i)) {
		await message.channel.send('Soups ready ( ͡° ͜ʖ ͡°)');
		console.log("I hope it is tasty!");
	}

	// Auto correct those who think it is alright to not respect God's name 🙏
	if (message.content.match(/\b[g][oO][dD]\b/)) {
		let msg = message.content.match(/\b[g][oO][dD]\b/i);
		// Making sure it catches different variations of improprer use
		if (msg) {
			let msgSplit = msg[0].split("");
			msgSplit[0] = "G";
			let reply = msgSplit.join("");

			await message.reply(`${reply}**`);
			console.log("Infidel vanquished and converted");
		}
	}
/*
	 if(message.content.match(/\boh my god/i)) {
		await message.react(message.guild.emojis.cache.get('1269759184396619857'));
	}
*/

	// Dad joke (but making sure it does not target mtc)
	if (randomInt(1,100) > 75 && message.content.match(/^(i\'?m|i am) +([^\.\,\?\!\n]{2,})/i)) {
		const name = message.content.match(/^(i\'?m|i am) +([^\.\,\?\!\n]{2,})/i);
	
		if (name) {
			const isInitialCapitalized = name[1].startsWith('I');
			const isFullyCapitalized = name[1].toUpperCase() === name[1];
			const greeting = isFullyCapitalized ? 'HI' : (isInitialCapitalized ? 'Hi' : 'hi');

			await message.reply(`${greeting} ${name[2]}`);
			console.log("Get dadded daddio");
		}		
		}
});

// Log out of the bot when the process exits
exitHook(() => client.destroy());

// Log into the bot
await client.login(Environment.DISCORD_TOKEN);
