class Cells {
	constructor({ size = 5, height, width, living = [] } = {}) {
		this.height = height || size;
		this.width = width || size;
		this.living = living;
	}

	getEmptyGrid() {
		if (!this.emptyGrid) {
			this.emptyGrid = Array(this.height)
				.fill(null)
				.map(() => Array(this.width).fill(false));
		}
		// return cloned grid
		return this.emptyGrid.map((row) => row.slice());
	}

	get grid() {
		const grid = this.getEmptyGrid();
		this.living.forEach(([x, y]) => {
			grid[x][y] = true;
		});
		return grid;
	}

	get live() {
		return this.living;
	}

	set live(newLiving) {
		this.living = newLiving;
	}
}

export default Cells;
