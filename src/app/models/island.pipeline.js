class IslandPipeline {
    constructor(width, height) {
        this.life = new LifeModel(width, height, 0.35);
        this.life.addStage(new LifeStage(21, 12, 3, 1));
        this.life.addStage(new LifeStage(10, 6, 2, 3));
        this.life.addStage(new LifeStage(4, 3, 1, 1));
        this.distanceFilter = new DistanceFilter(width, height);
    }

    execute() {
        this.life.execute();
        return this.distanceFilter.execute(this.life.map);
    }
}