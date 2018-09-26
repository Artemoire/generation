class AttractorNoiseFilter {
    constructor(attractors, spawnChance, force) {
        this.attractors = attractors;
        this.spawnChance = spawnChance;
        this.force = force;
    }

    execute(map) {
        let data = [];
        for (let y = 0; y < map.height; y++) {
            for (let x = 0; x < map.width; x++) {

                let value = 0;
                if (random() - this.calcForce(x, y) < this.spawnChance) {
                    value = 1;
                }
                data.push({ value: value });
            }
        }
        map.data = data;
        return map;
    }

    calcForce(x, y) {
        let netForce = 0;

        for (const attractor of this.attractors) {
            let val = 1.0 - this.force * (Math.abs(x - attractor.x) + Math.abs(y - attractor.y));
            if (val < 0)
                val = 0;
            netForce += val;
        }

        return netForce;
    }
}