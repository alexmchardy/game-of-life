// Utility functions

/**
 * @typedef {number[][]} CoordList - Array of coordinate tuples (e.g [[0,0], [1,2]])
 */

/**
 * Given a coordinate tuple (array), returns the coordinate as a string
 * @param {number[]} coord - Coordinate tuple with 2 values: [x, y]
 * @returns {string} String representing an x,y coordinate
 */
function getCoordString([x, y]) {
	return `${x},${y}`;
}

/**
 * Given a coordinate string, returns the coordinate tuple (array)
 * @param {string} coordStr - String representing an x,y coordinate
 * @returns {number[]} Coordinate tuple with 2 values: [x, y]
 */
function getCoordArray(coordStr) {
	return coordStr.split(',').map(Number);
}

const neighborAddends = [
	[-1, -1],
	[-1, 0],
	[-1, 1],
	[0, -1],
	[0, 1],
	[1, -1],
	[1, 0],
	[1, 1],
];
/**
 * Given a coordinate, returns all neighbor coordinates surrounding it
 * @param {number[]} coord - Coordinate tuple with 2 values: [x, y]
 * @returns {CoordList} Array of neighbor coordinates
 */
function getNeighborCoords(coord) {
	return neighborAddends.reduce((neighbors, addend) => {
		const neighborCoord = coord.map((n, i) => n + addend[i]);
		if (neighborCoord[0] >= 0 && neighborCoord[1] >= 0) {
			neighbors.push(neighborCoord);
		}
		return neighbors;
	}, []);
}

// Simple cache for the most recently generated empty grid
const cachedEmpty = {
	height: null,
	width: null,
	grid: [],
};

/**
 * Return new empty grid of specified height and width
 * @param {number} h - Desired height of grid
 * @param {number} w - Desired width of grid
 * @returns {boolean[][]} Empty h x w grid
 */
function getEmptyGrid(h, w) {
	if (cachedEmpty.height !== h || cachedEmpty.width !== w) {
		cachedEmpty.height = h;
		cachedEmpty.width = w;
		cachedEmpty.grid = Array(h)
			.fill(null)
			.map(() => Array(w).fill(false));
	}
	return cachedEmpty.grid.map((row) => row.slice());
}

/**
 * Return new grid of specified size with live cells
 * @param {Object} [opts={}]
 * @param {number} [opts.size=5] - Desired size (height and width) of grid
 * @param {number} [opts.height=5] - Desired height of grid
 * @param {number} [opts.width=5] - Desired width of grid
 * @param {CoordList} [opts.live=[]] - Array of coordinates of live cells
 * @returns {boolean[][]} Grid of h x w size with live cells populated
 */
function grid({ size = 5, height, width, live = [] } = {}) {
	const h = height || size;
	const w = width || size;
	const newGrid = getEmptyGrid(h, w);

	// Set live cells that are within the grid dimensions
	live.forEach(([x, y]) => {
		if (x < w && y < h) {
			newGrid[x][y] = true;
		}
	});

	return newGrid;
}

export { getCoordString, getCoordArray, getNeighborCoords, getEmptyGrid, grid };
