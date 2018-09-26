class PointsRenderer {

    constructor(points, painter) {
        this.points = points;
        if (!painter)
            this.painter = new BasicPointPainter();
        else
            this.painter = painter;
    }

    render() {
        for (var i = 0; i < this.points.length; i++) {
            this.painter.paint(i, this.points[i]);
        }
    }

}