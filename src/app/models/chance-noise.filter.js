class ChanceNoiseFilter {
    constructor(spawnChance) {
        this.spawnChance = spawnChance;
    }

    execute(map) {
        let data = [];
        for (let i = 0; i < map.width * map.height; i++) {
            let value = 0;
            if (random() < this.spawnChance) {
                value = 1;
            }
            data.push({ value: value });
        }
        map.data = data;
        return map;
    }
}