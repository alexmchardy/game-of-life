// Conway's Game of Life game runner

/**
 * @typedef {number[][]} CoordList - Array of coordinate tuples (e.g [[0,0], [1,2]])
 */

import { getCoordString, getCoordArray, getNeighborCoords } from './util';

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
