class Area {
    constructor(campfire, forest, stone) {
        this.campfire = campfire
        this.forest = forest
        this.stone = stone
    }

    draw() {
        this.campfire.draw()
        this.forest.draw()
        this.stone.draw()
    }
}
