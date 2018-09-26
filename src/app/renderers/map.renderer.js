class MapRenderer {
    constructor(painter) {     
        this.painter = painter;
    } 

    render(map) {
        for(let y = 0; y < map.height; y++) {
            for(let x = 0; x < map.width; x++) {
                this.painter.paint(x, y, map.at(x, y));
            }
        }
    }
}