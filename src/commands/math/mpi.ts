import { getObject } from "../../array";
import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";
module.exports = class MPICommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "mpi",
      aliases: ["mpi"],
      group: "math",
      memberName: "mpi",
      description: "Converts Sensitivity to MPI",
      details:
        "Converts Sensitivity to MPI(minute of arc per inch) \nTo see the Supported games use the `games` Command",
      examples: ["MPI 0.95 ow 1600"],
      format: "<sens> <game|yaw> <cpi>",

      args: [
        {
          key: "sens",
          prompt: "What Sensitivity do you want to convert from",
          type: "float",
        },
        {
          key: "yaw",
          label: "Game or yaw value",
          prompt: "What game or yaw value do you want to use",
          type: "gamename|float",
        },
        {
          key: "cpi",
          label: "cpi/dpi",
          prompt: "What CPI/DPI do you want to use",
          type: "float",
        },
      ],
    });
  }

  async run(
    message: CommandoMessage,
    args: { cpi: number; yaw: any; sens: number }
  ) {
    const output = (
      args.cpi *
      parseFloat(getObject(args.yaw, "yaw")) *
      args.sens *
      60
    ).toFixed(0);
    return message.reply(output + " MPI");
  }
};
