class PoissonDiskSampler {

    constructor(maxX, maxY, minDist, numOfTries) {
        this.maxX = maxX;
        this.maxY = maxY;
        this.r = minDist;
        this.k = numOfTries;
        this.w = this.r / Math.sqrt(2);
        this.gridCols = floor(maxX / this.w);
        this.gridRows = floor(maxY / this.w);
        this.grid = [];

        for (var i = 0; i < this.gridCols * this.gridRows; i++)
            this.grid[i] = -1;

        // var x = random(0, this.maxX);
        // var y = random(0, this.maxY);
        var x = this.maxX / 2;
        var y = this.maxY / 2;
        var i = floor(x / this.w);
        var j = floor(y / this.w);
        this.grid[i + j * this.gridCols] = 0;
        this.active = [0];
        this.points = [new Vec2(x, y)];
    }

    step() {
        if (this.active.length == 0) {
            return false;
        }

        var ri = floor(random(this.active.length));
        this.steps++;

        if (!this.findValidSample(ri)) {
            this.active.splice(ri, 1);
        }

        return true;
    }


    findValidSample(ri) {
        var pos = this.points[this.active[ri]];
        for (var n = 0; n < this.k; n++) {
            var sample = Vec2.random();
            var mag = random(this.r, 2 * this.r);
            sample.setMag(mag);
            sample.add(pos);

            var gridCol = floor(sample.x / this.w);
            var gridRow = floor(sample.y / this.w);
            if (this.grid[gridCol + gridRow * this.gridCols] == -1) {
                if (this.isValidSample(sample, gridCol, gridRow)) {
                    this.grid[gridCol + gridRow * this.gridCols] = this.points.length;
                    this.active.push(this.points.length);
                    this.points.push(sample);
                    return true;
                }
            }
        }

        return false;
    }

    isValidSample(sample, gridCol, gridRow) {
        var r2 = this.r * this.r;
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                var gridIndex = (gridCol + i) + (gridRow + j) * this.gridCols;
                var pointIndex = this.grid[gridIndex];
                if (typeof (pointIndex) != 'undefined' && pointIndex != -1) {
                    if (sample.sqDist(this.points[pointIndex]) < r2) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

}