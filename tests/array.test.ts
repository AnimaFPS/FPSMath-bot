import { array, games, getObject } from '../src/helpers/array';

describe('Check array api functions', () => {
	test('Check the Array is an Array', () => {
		expect(typeof array).toBe('object');
	});

	test('Check getObject FILM', () => {
		expect(getObject('bf', 'FILM')).toBe('vML');
	});

	test('Check getObject aliases', () => {
		expect(getObject('r6', 'aliases')).toStrictEqual(['r6', 'rainbow6', 'r6s', 'siege']);
	});

	test('Check getObject Yaw', () => {
		expect(getObject('dbt', 'yaw')).toBe(0.022);
	});

	test('Check games function output to be a string', () => {
		expect(typeof games()).toBe('string');
	});
});
