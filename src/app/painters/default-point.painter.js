class BasicPointPainter {
    constructor(weight, color) {
        if (typeof (weight) == 'undefined')
            this.weight = 1;
        else
            this.weight = weight;
        if (typeof (color) == 'undefined')
            this.color = 255;
        else
            this.color = color;
    }

    paint(i, p) {
        strokeWeight(this.weight);
        stroke(this.color);
        point(p.x, p.y);
    }
}