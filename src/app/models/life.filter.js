class LifeStage {
    constructor(reviveLimit, deathLimit, range, duration) {
        this.reviveLimit = reviveLimit || 4;
        this.deathLimit = deathLimit || 3;
        this.range = range || 1;
        this.duration = duration || 1;
    }
}

class LifeFilter {
    constructor() {
        this.stages = [];
    }

    withStage(stage) {
        this.stages.push(stage);
        return this;
    }

    execute(map) {
        for (const stage of this.stages) {
            this.step(map, stage);
        }
        return map;
    }

    step(map, stage) {
        for (var i = 0; i < stage.duration; i++) {
            let newData = [];

            for (var y = 0; y < map.height; y++) {                
                for (var x = 0; x < map.width; x++) {

                    let count = this.countNeighbours(map, x, y, stage.range);
                    let el = map.at(x,y);
                    let invEl = Utils.shallow(el);
                    invEl.value = el.value ? 0 : 1;
                    if (el.value == 1) {
                        if (count < stage.deathLimit) {
                            newData.push(invEl);
                        } else {
                            newData.push(el);
                        }
                    } else {
                        if (count > stage.reviveLimit) {
                            newData.push(invEl);
                        } else {
                            newData.push(el);
                        }
                    }
                }
            }
            map.data = newData;
        }
    }

    countNeighbours(map, x, y, range) {
        let count = 0;
        for (var j = -1 * range; j <= 1 * range; j++) {
            for (var i = -1 * range; i <= 1 * range; i++) {
                let nx = (x + i);
                let ny = (y + j);
                if (i == 0 && j == 0)
                    continue;
                if (nx < 0 || nx >= map.width || ny < 0 || ny >= map.height)
                    continue;
                else if (map.at(nx, ny).value == 1)
                    count++;
            }
        }
        return count;
    }
}