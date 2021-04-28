/**
 * @typedef {number[][]} CoordList - Array of coordinates (e.g [[0,0], [1,2]])
 */

function getCoord(x, y) {
	return `${x},${y}`;
}

function getPoint(coord) {
	return coord.split(',').map(Number);
}

function getNeighborCoords(x, y, w, h) {
	const coords = [];
	for (let i = Math.max(0, x - 1); i <= x + 1; i++) {
		for (let j = Math.max(0, y - 1); j <= y + 1; j++) {
			if (i !== x || j !== y) {
				coords.push(getCoord(i, j));
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
	live.forEach(([x, y]) => {
		const cellCoord = getCoord(x, y);
		const neighborCoords = getNeighborCoords(x, y);

		// Increase each neighboring cell's neighbor count by 1
		neighborCoords.forEach((coord) => {
			const { alive, neighbors } = tally[coord] || {};
			tally[coord] = {
				alive: alive || false,
				neighbors: (neighbors || 0) + 1,
			};
		});

		// Count this cell as alive
		tally[cellCoord] = {
			...tally[cellCoord],
			alive: true,
		};
	});

	const nextGen = Object.entries(tally).reduce(
		(acc, [coord, { alive, neighbors }]) => {
			if (neighbors === 3 || (neighbors === 2 && alive)) {
				acc.push(getPoint(coord));
			}
			return acc;
		},
		[]
	);

	return nextGen;
}

export { run };
