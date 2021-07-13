export interface Array {
	[index: string]: {
		yaw?: number;
		aliases: string[];
		fovt?: number;
		FILM?: string;
	};
}
export const array: Array = {
	Aimgods: { yaw: 0.0023331, aliases: ['aimgods'] },
	Source: {
		yaw: 0.022,
		aliases: ['source'],
		FILM: '4ML3'
	},
	'Counter Strike': {
		yaw: 0.022,
		aliases: ['cs', 'cs:go', 'csgo', 'counter-strike'],
		FILM: '4ML3'
	},
	Quake: { yaw: 0.022, aliases: ['quake'], FILM: '4ML3' },
	'Quake Champions': {
		aliases: ['qc', 'quake-champions'],
		FILM: '16ML9',
		yaw: 0.022
	},
	'Apex Legends': {
		yaw: 0.022,
		aliases: ['apex-legends', 'apex'],
		FILM: '4ML3'
	},
	Valorant: { yaw: 0.07, aliases: ['valorant', 'val'] },
	Overwatch: {
		yaw: 0.0066,
		aliases: ['overwatch', 'ow'],
		FILM: '16MF9'
	},
	Fortnite: {
		yaw: 0.005555,
		aliases: ['fortnite', 'fn'],
		FILM: '16ML9'
	},
	'Fortnite config': {
		yaw: 2.222,
		aliases: ['fn-config', 'fortnite-config'],
		FILM: '16ML9'
	},
	Diabotical: {
		yaw: 0.022,
		aliases: ['diabotical', 'dbt'],
		FILM: 'vML'
	},
	'Rainbow Six: Siege': {
		yaw: 0.005729577951308232,
		aliases: ['r6', 'rainbow6', 'r6s', 'siege'],
		FILM: 'vML'
	},
	'Call of Duty': {
		yaw: 0.0066,
		aliases: ['cod', 'callofduty', 'call-of-duty', 'warzone', 'wz'],
		FILM: 'hML'
	},
	Battlefield: {
		yaw: 0.6771319397,
		aliases: ['battlefield', 'bf'],
		FILM: 'vML'
	},
	Destiny: {
		yaw: 0.0066,
		aliases: ['destiny', 'd2', 'destiny2'],
		FILM: '16ML9'
	},
	Reflex: {
		yaw: 0.005729577951308232087679815481411,
		aliases: ['reflex', 'reflex-arena'],
		FILM: '4ML3'
	},
	Krunker: {
		yaw: 0.13750954927425516,
		aliases: ['krunker'],
		FILM: 'vML'
	},
	Minecraft: {
		yaw: 0.2592,
		aliases: ['mc', 'minecraft'],
		FILM: 'hML'
	},
	Palidins: {
		aliases: ['palidins'],
		FILM: 'hML'
	},
	"PlayerUnknown's: Battleground": {
		aliases: ['pubg'],
		yaw: 2.49975,
		FILM: '16ML9'
	},
	'Totally Accurate Battlegrounds': {
		aliases: ['tabg'],
		yaw: 0.001280683,
		FILM: 'hML'
	},
	'Unreal Engine 4': {
		aliases: ['ue4', 'unreal', 'unreal-engine'],
		yaw: 0.07
	},
	'Halo: Master Chief Collection': {
		yaw: 0.022222222222222223,
		aliases: ['halo', 'halo-mcc'],
		FILM: 'hML'
	}
};

export function getObject(game: string, object: 'yaw' | 'aliases' | 'FILM'): string | number | string[] | null {
	let outputObject: string | number | string[] = 'Error';
	for (const Game in array) {
		if (array.hasOwnProperty.call(array, Game)) {
			array[Game].aliases.forEach((alias) => {
				if (alias === game.toLowerCase()) {
					outputObject = (array[Game] as { [key: string]: number | string | string[] })[object];
				}
			});
			if (outputObject !== 'Error') {
				return outputObject;
			}
		}
	}
	return null;
}

export function games(): string {
	let result = '';
	for (const game in array) {
		if (array.hasOwnProperty.call(array, game)) {
			result += `${game}: \`${array[game].aliases.join(', ')}\`\n`;
		}
	}
	return result;
}
