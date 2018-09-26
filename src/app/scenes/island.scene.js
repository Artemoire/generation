class IslandScene {
    constructor(width, height, scale) {
        this.width = width;
        this.height = height;
        this.renderer = new MapRenderer(new MapPainter(scale));
        this.pipeline = this.initPipeline();
    }

    initPipeline() {
        let pipeline = new Pipeline();
        let attrs = [];
        for (let i = 0; i < 3; i++) {
            attrs[i] = {
                x: Math.random() * this.width,
                y: Math.random() * this.height
            }
        }
        pipeline.register(new AttractorNoiseFilter(attrs, 0.28, 0.1));
        // pipeline.register(new ChanceNoiseFilter(0.35));
        pipeline.register(new LifeFilter()
            .withStage(new LifeStage(21, 12, 3, 1))
            .withStage(new LifeStage(10, 6, 2, 3))
            .withStage(new LifeStage(4, 3, 1, 1)));
        return pipeline;
    }

    restart(params) {
        this.map = this.pipeline.process(new MapArray(this.width, this.height, undefined));
    }

    draw() {
        if (!this.map)
            return;
        this.renderer.render(this.map);
        noLoop();
    }
}