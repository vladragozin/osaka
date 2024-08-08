import 'source-map-support/register.js';
import { Client, GatewayIntentBits } from 'discord.js';
import { Environment } from './environment.js';
import exitHook from 'exit-hook';
import { randomInt } from 'crypto';
import { RandomFile } from './random.js';
import fs from 'fs';

console.log('Starting bot with version:', Environment.VERSION);

// Read in text files
const dadJokes = new RandomFile(fs.readFileSync('data/dad_jokes.txt', 'utf8'), /\r?\n\r?\n/g);
const catFacts = new RandomFile(fs.readFileSync('data/cat_facts.txt', 'utf8'), /\r?\n/g);
const catJokes = new RandomFile(fs.readFileSync('data/cat_jokes.txt', 'utf8'), /\r?\n/g);
const fortunes = new RandomFile(fs.readFileSync('data/fortunes.txt', 'utf8'), /\r?\n/g);

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

	 if(message.content.match(/\boh my god/i)) {
		await message.react('<:omg:1270593453230919751>');
	}


	// Dad joke probability currently at 30% + new stumbling mechanics!
	if (message.content.match(/^(i\'?m|i am) +([^\.\,\?\!\n]{2,})/i) || message.content.match(/^(i) +([^\.\,\?\!\n]{2,})/i)) {
		const name = message.content.match(/^(i\'?m|i am) +([^\.\,\?\!\n]{2,})/i);
		const stumble = message.content.match(/^(i) +([^\.\,\?\!\n]{2,})/i);
		let rand = randomInt(1,1000);
		console.log(`User rolled ${rand}`);

		if (name && rand >= 800) { // 80%
			const isInitialCapitalized = name[1].startsWith('I');
			const isFullyCapitalized = name[1].toUpperCase() === name[1];
			const greeting = isFullyCapitalized ? 'HI' : (isInitialCapitalized ? 'Hi' : 'hi');

			await message.reply(`${greeting} ${name[2]}`);
			console.log("Get dadded daddio");
		}

		if (stumble && rand <= 10) { // 1%
			await message.reply(`Hi -- wait shit`);
			console.log("Oops");
		}
	}

	// The REAL dad joke command
	if (message.content.match(`!dadjoke`)){
		const joke = dadJokes.next();
		await message.reply(joke);
		console.log("Dad joked on them kids!");
	}

	// Cat facts
	if (message.content.match(`!catfact`)){
		const fact = catFacts.next();
		await message.reply(fact);
		console.log("Miau meow miau meow mow meiaow 🐱");
	}

	// Cat jokes
	if (message.content.match(`!catjoke`)){
		const joke = catJokes.next();
		await message.reply(joke);
		console.log("Meow meow meow	meow meow meow (Meow meow meow) 😹");
	}

	// Fortunes
	if (message.content.match(`!fortune`)){
		const fortune = fortunes.next();
		await message.reply(fortune);
		console.log("Fortunes are in order");
	}
});

// Log out of the bot when the process exits
exitHook(() => client.destroy());

// Log into the bot
await client.login(Environment.DISCORD_TOKEN);
