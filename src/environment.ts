import { Env } from '@baileyherbert/env';

export const Environment = Env.rules({

	/**
	 * This is the current version of the application. During development, it will equal "dev", and in production, it
	 * will automatically be set to the full SHA of the latest commit.
	 */
	VERSION: Env.schema.string().optional('dev'),

	/**
	 * The authentication token for the Discord bot.
	 * @see https://discord.com/developers/applications
	 */
	DISCORD_TOKEN: Env.schema.string(),

});
