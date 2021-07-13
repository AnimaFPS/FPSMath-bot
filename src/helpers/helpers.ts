import { getObject } from './array';

export function checkYawArgs(argument: string): number {
	let yaw: number;
	if (isNaN(Number(argument))) {
		if (getObject(argument, 'yaw')) {
			yaw = Number(getObject(argument, 'yaw'));
		} else {
			throw Error('Game not supported');
		}
	} else {
		yaw = Number(argument);
	}
	return yaw;
}
