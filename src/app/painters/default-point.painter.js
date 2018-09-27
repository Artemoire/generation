class DefaultPointPainter {
    constructor(weight, color, zoom) {
        this.weight = weight || 1;
        if (typeof (color) == 'undefined')
            this.color = 255;
        else
            this.color = color;
        this.zoom = zoom || 1;
    }

    paint(i, p) {
        strokeWeight(this.weight);
        stroke(this.color);
        point(p.x * this.zoom, p.y * this.zoom);
    }
}