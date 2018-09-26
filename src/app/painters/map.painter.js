class MapPainter {
    constructor(scale) {
        this.scale = scale || 1;
    }

    paint(x, y, data) {
        if(data.value == 0)
            return;
            
        stroke(255)
        fill(255)
        rect(x * scale, y * scale, scale, scale);
    }
}