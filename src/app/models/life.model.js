// class LifeStage {
//     constructor(reviveLimit, deathLimit, range, duration) {
//         this.reviveLimit = reviveLimit || 4;
//         this.deathLimit = deathLimit || 3;
//         this.range = range || 1;
//         this.duration = duration || 1;
//     }
// }

// class LifeModel {
//     constructor(width, height, chanceToStart) {
//         this.width = width;
//         this.height = height;
//         this.chanceToStart = chanceToStart;
//         this.stages = [];
//     }

//     init() {
//         this.map = [];
//         for (var y = 0; y < this.height; y++) {
//             for (var x = 0; x < this.width; x++) {
//                 if (random() < this.chanceToStart) {
//                     this.map.push(1);
//                 } else {
//                     this.map.push(0);
//                 }
//             }
//         }
//     }

//     addStage(stage) {
//         this.stages.push(stage);
//     }

//     execute() {
//         this.init();
//         for (const stage of this.stages) {
//             this.step(stage);
//         }
//     }

//     step(stage) {
//         for (var i = 0; i < stage.duration; i++) {
//             let newMap = [];
//             for (var y = 0; y < this.height; y++) {
//                 for (var x = 0; x < this.width; x++) {
//                     let count = this.countNeighbours(x, y, stage.range);
//                     if (this.map[x + y * this.width]) {
//                         if (count < stage.deathLimit) {
//                             newMap.push(0);
//                         } else {
//                             newMap.push(1);
//                         }
//                     } else {
//                         if (count > stage.reviveLimit) {
//                             newMap.push(1);
//                         } else {
//                             newMap.push(0);
//                         }
//                     }
//                 }
//             }
//             this.map = newMap;
//         }
//     }

//     countNeighbours(x, y, range) {
//         let count = 0;
//         for (var j = -1 * range; j <= 1 * range; j++) {
//             for (var i = -1 * range; i <= 1 * range; i++) {
//                 let nx = (x + i);
//                 let ny = (y + j);
//                 if (i == 0 && j == 0)
//                     continue;
//                 if (nx < 0 || nx >= this.width || ny < 0 || ny >= this.height)
//                     continue;
//                 else if (this.map[nx + ny * this.width] == 1)
//                     count++;
//             }
//         }
//         return count;
//     }


// }