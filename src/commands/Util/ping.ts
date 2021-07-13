import { Command, CommandOptions } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import type { Message } from 'discord.js';

@ApplyOptions<CommandOptions>({
	name: 'ping',
	aliases: ['ping'],
	description: '',
	detailedDescription: ''
})
export class UserCommand extends Command {
	public async run(message: Message): Promise<Message> {
		const sent = await message.reply('Pong!');
		const timeDiff = (sent?.editedAt?.getTime() || sent?.createdAt.getTime() || 1) - (message.editedAt?.getTime() || message.createdAt.getTime());
		return sent.edit(['Pong!', `🔂 **RTT**: ${timeDiff} ms`, `💟 **Heartbeat**: ${Math.round(this.context.client.ws.ping)} ms`]);
	}
}
