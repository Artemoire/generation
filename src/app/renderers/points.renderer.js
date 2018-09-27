class PointsRenderer {

    constructor(painter) {
        if (!painter)
            this.painter = new DefaultPointPainter();
        else
            this.painter = painter;
    }

    render(points) {
        for (var i = 0; i < points.length; i++) {
            this.painter.paint(i, points[i]);
        }
    }

}