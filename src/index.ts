import 'source-map-support/register.js';
import { Client, GatewayIntentBits } from 'discord.js';
import { Environment } from './environment.js';
import exitHook from 'exit-hook';

console.log('Starting bot with version:', Environment.VERSION);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

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
});

// Log out of the bot when the process exits
exitHook(() => client.destroy());

// Log into the bot
await client.login(Environment.DISCORD_TOKEN);
