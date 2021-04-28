import Cells from './cells';

describe('Cells', () => {
	test('gives a new instance', () => {
		const game = new Cells();
		expect(game).toBeInstanceOf(Cells);
	});

	describe('grid', () => {
		test('returns default grid', () => {
			const game = new Cells();
			expect(game.grid).toMatchSnapshot();
		});

		test('returns grid with one specified dimension', () => {
			const game = new Cells({ size: 3 });
			const grid = game.grid;
			expect(grid).toHaveLength(3);
			expect(grid[0]).toHaveLength(3);
		});

		test('returns grid with both specified dimensions', () => {
			const game = new Cells({ height: 3, width: 2 });
			const grid = game.grid;
			expect(grid).toHaveLength(3);
			expect(grid[0]).toHaveLength(2);
		});

		test('returns grid initialized with live cells', () => {
			const game = new Cells({
				living: [
					[2, 2],
					[3, 4],
				],
			});
			const grid = game.grid;
			expect(grid[2][2]).toEqual(true);
			expect(grid[3][4]).toEqual(true);
		});
	});

	describe('live', () => {
		test('getter defaults to empty array', () => {
			const game = new Cells();
			expect(game.live).toEqual([]);
		});

		test('setter updates the grid', () => {
			const game = new Cells();
			game.live = [[2, 2]];
			const grid = game.grid;
			expect(grid[2][2]).toEqual(true);
			expect(grid[2][3]).toEqual(false);
		});
	});
});
