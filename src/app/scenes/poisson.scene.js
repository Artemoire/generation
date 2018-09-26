class PoissonScene {
    constructor() {
        this.poisson = new PoissonDiskSampler(width, height, 1, 30);
        this.renderer = new PointsRenderer(this.poisson.points, new BasicPointPainter(1, 0));
    }

    draw() {
        while (this.poisson.step());
        this.renderer.render();
    }
}