import {
	getCoordString,
	getCoordArray,
	getNeighborCoords,
	grid,
	getEmptyGrid,
} from './util';

describe('getCoordString', () => {
	test('returns comma separated string', () => {
		expect(getCoordString([42, 7])).toEqual('42,7');
	});
});

describe('getCoordArray', () => {
	test('splits comma separated string into array', () => {
		expect(getCoordArray('0,77')).toEqual([0, 77]);
	});
});

describe('getNeighborCoords', () => {
	test('returns 8 neighbors for a coordinate', () => {
		expect(getNeighborCoords([9998, 7]).sort()).toEqual([
			[9997, 6],
			[9997, 7],
			[9997, 8],
			[9998, 6],
			[9998, 8],
			[9999, 6],
			[9999, 7],
			[9999, 8],
		]);
	});

	test('returns 3 neighbors for [0,0]', () => {
		expect(getNeighborCoords([0, 0]).sort()).toEqual([
			[0, 1],
			[1, 0],
			[1, 1],
		]);
	});
});

describe('grid', () => {
	test('returns default grid', () => {
		const g = grid();
		expect(g).toMatchSnapshot();
	});

	test('returns grid with one specified dimension', () => {
		const g = grid({ size: 3 });
		expect(g).toHaveLength(3);
		expect(g[0]).toHaveLength(3);
	});

	test('returns g with both specified dimensions', () => {
		const g = grid({ height: 3, width: 2 });
		expect(g).toHaveLength(3);
		expect(g[0]).toHaveLength(2);
	});

	test('returns grid initialized with live cells', () => {
		const g = grid({
			live: [
				[2, 2],
				[3, 4],
			],
		});
		expect(g[2][2]).toEqual(true);
		expect(g[3][4]).toEqual(true);
	});
});

describe('getEmptyGrid', () => {
	test('returns empty grid', () => {
		const g = getEmptyGrid(4, 5);
		expect(g).toHaveLength(4);
		expect(g[0]).toHaveLength(5);
		expect(g[0][0]).toEqual(false);
	});

	test('caches and reuses empty grid when called twice with same dimensions', () => {
		const fillSpy = jest.spyOn(Array.prototype, 'fill');
		const g1 = getEmptyGrid(2, 3);
		expect(fillSpy).toHaveBeenCalledTimes(3);
		fillSpy.mockClear();
		const g2 = getEmptyGrid(2, 3);
		// Cached grid was used so Array.fill() should not be called again
		expect(fillSpy).toHaveBeenCalledTimes(0);
		expect(g2).toHaveLength(2);
		expect(g2[0]).toHaveLength(3);
		// Make sure cached grid was cloned (not a ref to same array)
		expect(g2).not.toBe(g1);
	});
});
