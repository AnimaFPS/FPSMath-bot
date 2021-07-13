import { Args, Command, CommandOptions } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import type { Message } from 'discord.js';
import { checkYawArgs } from '../../helpers/helpers';

@ApplyOptions<CommandOptions>({
	name: 'cm',
	generateDashLessAliases: true,
	aliases: ['cm', 'cm/rev', 'cm/360', 'cm-rev', 'cm-360'],
	description: 'Converts a sensitivity value to cm/rev (cm/360)',
	detailedDescription: '<sens> <game|yaw> <cpi>',
	strategyOptions: {
		flags: ['dp']
	}
})
export default class extends Command {
	public async run(message: Message, args: Args): Promise<Message> {
		if (!args.toJSON().commandContext)
			return message.reply(
				`Invalid command usage. The \`cm\` command's accepted format is \`cm <sens> <game|yaw> <cpi>\`. Use \`help cm\` for more information`
			);
		try {
			const sensitivity = Number(args.next());
			const yaw = checkYawArgs(args.next());
			const cpi = Number(args.next());
			return message.reply(`${((2.54 * 360) / (cpi * yaw * sensitivity)).toPrecision(5)} cm/rev`);
		} catch (err) {
			return message.reply(`Error: ${err}`);
		}
	}
}
