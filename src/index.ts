import { SapphireClient, LogLevel } from '@sapphire/framework';
import '@sapphire/plugin-logger/register';
import 'dotenv/config';
import * as Sentry from '@sentry/node';

Sentry.init({
	dsn: process.env.SENTRY_DSN,

	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 1.0
});

export const client = new SapphireClient({
	defaultPrefix: 'fps-',
	caseInsensitiveCommands: true,
	logger: {
		level: LogLevel.Trace
	},
	shards: 'auto',
	ws: {
		intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS']
	},
	presence: {
		activity: {
			name: 'fps-help | fpsmath.animafps.xyz'
		}
	}
});

async function main() {
	try {
		client.logger.info('Logging in');
		await client.login(process.env.DISCORD_TOKEN);
		client.logger.info(`Client ready; logged in as ${client.user?.username}#${client.user?.discriminator} (${client.user?.id})`);
		client.logger.info(`Running on ${client.guilds.cache.size} servers Serving ${client.users.cache.size} person`);
	} catch (err) {
		client.logger.fatal(err);
		client.destroy();
		process.exit(1);
	}
}

void main();

process.on('unhandledRejection', (reason: string) => {
	// I just caught an unhandled promise rejection,
	// since we already have fallback handler for unhandled errors (see below),
	// let throw and let him handle that
	throw Error(reason);
});

process.on('uncaughtException', (error: Error) => {
	client.logger.fatal(error);
	client.destroy();
	process.exit(1);
});
