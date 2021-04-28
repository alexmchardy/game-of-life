// Conway's Game of Life game runner

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

/**
 * Given a coordinate, returns all neighbor coordinates surrounding it
 * @param {number[]} coord - Coordinate tuple with 2 values: [x, y]
 * @returns {CoordList} Array of neighbor coordinates
 */
function getNeighborCoords([x, y]) {
	const coords = [];
	for (let i = Math.max(0, x - 1); i <= x + 1; i++) {
		for (let j = Math.max(0, y - 1); j <= y + 1; j++) {
			if (i !== x || j !== y) {
				coords.push([i, j]);
			}
		}
	}
	return coords;
}

/**
 * Run one generation of game-of-life on the given array of live cells
 * @param {CoordList} live - Array of live cell coordinates
 * @returns {Coordlist} Next generation of live cells
 */
function run(live) {
	const tally = {};

	live.forEach((coord) => {
		const cellCoordString = getCoordString(coord);
		const neighborCoords = getNeighborCoords(coord);

		// Increase each neighboring cell's neighbor count by 1
		neighborCoords.forEach((neighborCoord) => {
			const neighborCoordString = getCoordString(neighborCoord);
			const { alive, neighbors } = tally[neighborCoordString] || {};
			tally[neighborCoordString] = {
				alive: alive || false,
				neighbors: (neighbors || 0) + 1,
			};
		});

		// Mark this cell as alive
		tally[cellCoordString] = {
			...tally[cellCoordString],
			alive: true,
		};
	});

	// Build up new array of live cells based on neighbor counts
	const nextGen = Object.entries(tally).reduce(
		(acc, [coordString, { alive, neighbors }]) => {
			if (neighbors === 3 || (neighbors === 2 && alive)) {
				acc.push(getCoordArray(coordString));
			}
			return acc;
		},
		[]
	);

	return nextGen;
}

export { run };
