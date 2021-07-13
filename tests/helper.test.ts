import { checkYawArgs } from '../src/helpers/helpers';

describe('Check Yaw Arguments', () => {
	test('Check game name parsing', () => {
		expect(checkYawArgs('cs')).toBe(0.022);
	});

	test('Check number parsing', () => {
		expect(checkYawArgs('0.1')).toBe(0.1);
	});

	test("Check wrong game name parsing, Should throw Error('Game not supported')", () => {
		expect(() => {
			checkYawArgs('duhuwda');
		}).toThrowError('Game not supported');
	});
});
