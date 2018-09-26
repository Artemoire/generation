class DistanceFilter {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    execute(map) {
        let distanceMap = [];
        // for(var i = 0; i < this.width * this.height; i++)
        //     this.distanceMap[i] = undefined;

        this.fillOutline(map, distanceMap);
        return this.fillRest(map, distanceMap)
    }

    fillOutline(map, distanceMap) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let mapValue = map[x + y * this.width];
                if (mapValue == 1) {
                    if (this.isSeaOutline(map, x, y))
                        distanceMap[x + y * this.width] = 1;
                } else {
                    distanceMap[x + y * this.width] = 0;
                }
            }
        }
    }

    isSeaOutline(map, x, y) {
        for (let j = -1; j < 2; j++) {
            for (let i = -1; i < 2; i++) {
                let xj = x + i;
                let yj = y + j;

                if(x == 0 || x == this.width - 1 || y == 0 || y == this.height - 1)
                    return true;

                if (xj < 0 || xj >= this.width || yj < 0 || yj >= this.height ||
                    (i == 0 && j == 0))
                    continue;

                if (map[xj + yj * this.width] == 0)
                    return true;

            }
        }
        return false;
    }

    fillRest(map, distanceMap) {
        let finished = false;
        let distance = 2;
        
        while (!finished) {
            finished = true;
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    if (typeof (distanceMap[x + y * this.width]) != 'undefined')
                        continue;

                    let mapValue = map[x + y * this.width];
                    if (mapValue == 1) {
                        let o = this.isOutline(distanceMap, x, y, distance);
                        if (o != -1) {                            
                            distanceMap[x + y * this.width] = o+1;
                        } else {
                            finished = false;
                        }
                    }
                }
            }

            distance++;
        };

        return { map: distanceMap, peak: distance - 1 };
    }

    isOutline(map, x, y, distance) {
        let minValue = distance;
        for (let j = -1; j < 2; j++) {
            for (let i = -1; i < 2; i++) {
                let xj = x + i;
                let yj = y + j;

                if (xj < 0 || xj >= this.width || yj < 0 || yj >= this.height ||
                    (i == 0 && j == 0))
                    continue;
                
                let mapValue = map[xj + yj * this.width]
                if(mapValue < minValue)
                    minValue = mapValue;
            }
        }
        return (minValue != distance) ? minValue : -1;
    }
}