
const w = 50;
const h = 50;
const scale = 10;

let scene;

function setup() {
    colorMode(HSB);
    createCanvas(Math.floor(scale * w), Math.floor(scale * h))
    background(0);
    scene = new IslandScene(w, h, scale);
}

function draw() {
    background(0);
    scene.draw();
}

function mouseClicked() {
    scene.restart();
    loop();
}