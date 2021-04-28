// Utility functions

/**
 * @typedef {number[][]} CoordList - Array of coordinates (e.g [[0,0], [1,2]])
 */

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

export { getEmptyGrid, grid };
