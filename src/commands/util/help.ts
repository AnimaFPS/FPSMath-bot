import { stripIndents, oneLine } from "common-tags";
import {
  Command,
  CommandoClient,
  CommandoMessage,
} from "discord.js-commando";
const { disambiguation } = require("discord.js-commando");
const discord = require("discord.js");
function generalHelp(
  commands: {
    examples: any[];
    name: string;
    description: string;
    guildOnly: boolean;
    nsfw: boolean;
    format: string;
    aliases: string[];
    memberName: string;
    group: { name: string };
    groupID: string;
    details: string;
  }[],
  msg: CommandoMessage
) {
  const commandHelpEmbed = new discord.MessageEmbed()
    .setTitle(`Command Help - ${commands[0].name}`)
    .setColor("#0099ff")
    .setDescription(
      stripIndents`${oneLine`
                ${commands[0].description}
                ${commands[0].guildOnly ? " (Usable only in servers)" : ""}
                ${commands[0].nsfw ? " (NSFW)" : ""}
                
            `}
            Key: <required|alternative option> [optional] \"exact\"`
    )
    .addField(
      "Format",
      stripIndents`${`\`\`${commands[0].name}${
        commands[0].format ? ` ${commands[0].format}` : ""
      }`}\`\``
    );
  if (commands[0].aliases.length > 0) {
    commandHelpEmbed.addField("Aliases", commands[0].aliases.join(", "));
  }
  commandHelpEmbed.addField(
    "Group",
    stripIndents`${oneLine`
                    ${commands[0].group.name}
                    (\`${commands[0].groupID}:${commands[0].memberName}\`)
                `}`
  );
  if (commands[0].details) {
    commandHelpEmbed.addField("Details", commands[0].details);
  }
  if (commands[0].examples) {
    commandHelpEmbed.addField(
      "Examples",
      `\`${msg.guild ? msg.guild.commandPrefix : ""}${commands[0].examples.join(
        `\`\n\`${msg.guild ? msg.guild.commandPrefix : ""}`
      )}\``
    );
  }
  commandHelpEmbed.addField(
    "Quick Links",
    // prettier-ignore
    '[**Documentation/ Github**](https://github.com/animafps/fpsmath) | [**Invite or Upvote the bot**](https://top.gg/bot/792712521546465301/)'
  );
  return commandHelpEmbed;
}

function commandHelp(
  msg: CommandoMessage,
  showAll: string | boolean | undefined,
  groups: any,
  client: CommandoClient
) {
  const generalHelpEmbed = new discord.MessageEmbed()
    .setTitle("FPSMath Help")
    .setColor("#0099ff")
    .setDescription(
      stripIndents`
                        Global Prefix: **${client.commandPrefix}**
                        ${oneLine`
                            To run a command in ${
                              msg.guild ? msg.guild.name : "any server"
                            },
                            use \`\`${
                              msg.guild ? msg.guild.commandPrefix : ""
                            }<command>\`\`.
                            For example, \`\`${
                              msg.guild ? msg.guild.commandPrefix : ""
                            }prefix\`\`.
                        `}
                        ${
                          msg.guild
                            ? "To run a command in this DM, simply use ``command`` with no prefix"
                            : ""
                        }
                        Use \`\`${
                          msg.guild ? msg.guild.commandPrefix : ""
                        }help <command>\`\` to view detailed information about a specific command.
                        Use \`\`${
                          msg.guild ? msg.guild.commandPrefix : ""
                        }help all\`\` to view a list of *all* commands, not just available ones.
                        \n
                        __**${
                          showAll
                            ? "All commands"
                            : `Available commands in ${msg.guild || "this DM"}:`
                        }**__
                    `
    );
  groups
    .filter(
      (grp: { commands: { hidden: any; isUsable: (arg0: any) => any }[] }) =>
        grp.commands.some(
          (cmd: { hidden: any; isUsable: (arg0: any) => any }) =>
            !cmd.hidden && (showAll || cmd.isUsable(msg))
        )
    )
    .forEach((grp: { name: any; commands: any[] }) =>
      generalHelpEmbed.addField(
        grp.name,
        `\`\`\`${grp.commands
          .filter(
            (cmd: { hidden: any; isUsable: (arg0: any) => any }) =>
              !cmd.hidden && (showAll || cmd.isUsable(msg))
          )
          .map(
            (cmd: { name: any; description: any; nsfw: any }) =>
              `${cmd.name}: ${cmd.description}${cmd.nsfw ? " (NSFW)" : ""}`
          )
          .join("\n")}\`\`\``
      )
    );
  generalHelpEmbed.addField(
    "Quick Links",
    // prettier-ignore
    '[**Documentation/ Github**](https://github.com/animafps/fpsmath) | [**Invite or Upvote the bot**](https://top.gg/bot/792712521546465301/)'
  );
  return generalHelpEmbed;
}
module.exports = class HelpCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "help",
      group: "util",
      memberName: "help",
      aliases: ["commands"],
      description:
        "Displays a list of available commands, or detailed information for a specified command.",
      details: oneLine`
				The command may be part of a command name or a whole command name.
				If it isn't specified, all available commands will be listed.
			`,
      examples: ["help", "help prefix"],
      format: "[command]",

      guarded: true,

      args: [
        {
          key: "command",
          prompt: "Which command would you like to view the help for?",
          type: "string",
          default: "",
        },
      ],
    });
  }

  async run(msg: CommandoMessage, args: { command?: string }) {
    const groups = this.client.registry.groups;
    const commands = this.client.registry.findCommands(
      args.command,
      false,
      msg
    );
    const showAll = args.command && args.command.toLowerCase() === "all";
    if (args.command && !showAll) {
      if (commands.length === 1) {
        const messages = [];
        try {
          messages.push(await msg?.direct(generalHelp(commands, msg)));
          if (msg?.channel.type !== "dm") {
            messages.push(await msg?.reply("Sent you a DM with information."));
          }
        } catch (err) {
          messages.push(
            await msg?.reply(
              "Unable to send you the help DM. You probably have DMs disabled."
            )
          );
        }
        return messages;
      } else if (commands.length > 15) {
        return msg.reply("Multiple commands found. Please be more specific.");
      } else if (commands.length > 1) {
        return msg.reply(disambiguation(commands, "commands"));
      } else {
        return msg.reply(
          `Unable to identify command. Use \`\`${
            msg.guild ? msg.guild.commandPrefix : ""
          } to view the list of all commands.`
        );
      }
    } else {
      const messages = [];
      try {
        messages.push(
          await msg.direct(commandHelp(msg, showAll, groups, this.client))
        );

        if (msg.channel.type !== "dm") {
          messages.push(await msg.reply("Sent you a DM with information."));
        }
      } catch (err) {
        console.log(err);
        messages.push(
          await msg.reply(
            "Unable to send you the help DM. You probably have DMs disabled."
          )
        );
      }
      return messages;
    }
  }
};
