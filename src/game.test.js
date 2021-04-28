import { run } from './game';
import * as stillLifes from './fixtures/still-lifes';
import * as oscillators from './fixtures/oscillators';
import * as spaceships from './fixtures/spaceships';

const ordinal = ['1st', '2nd', '3rd', '4th', '5th'];
function testGenerations(h, w, gens) {
	let currentGen = gens.shift();
	gens.forEach((gen, i) => {
		test(`${ordinal[i + 1]} generation`, () => {
			currentGen = run(currentGen);
			expect(currentGen.sort()).toEqual(gen.sort());
		});
	});
}

describe('Game', () => {
	describe('run', () => {
		test('handles dead culture', () => {
			const live = [];
			const nextGen = run(live);
			expect(nextGen).toEqual([]);
		});

		test('handles single live cell', () => {
			const live = [[0, 2]];
			const nextGen = run(live);
			expect(nextGen).toEqual([]);
		});

		describe('handles still lifes', () => {
			Object.entries(stillLifes).forEach(([name, { height, width, cells }]) => {
				describe(name, () => {
					testGenerations(height, width, [cells, cells]);
				});
			});
		});

		describe('handles oscillators', () => {
			Object.entries(oscillators).forEach(([name, { height, width, gens }]) => {
				describe(name, () => {
					testGenerations(height, width, gens);
				});
			});
		});

		describe('handles spaceships', () => {
			Object.entries(spaceships).forEach(([name, { height, width, gens }]) => {
				describe(name, () => {
					testGenerations(height, width, gens);
				});
			});
		});
	});
});
