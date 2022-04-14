class Area {
    constructor(campfire, forest, stone, farm) {
        this.campfire = campfire
        this.forest = forest
        this.stone = stone
        this.farm = farm
    }

    draw() {
        this.campfire.draw()
        this.forest.draw()
        this.stone.draw()
        this.farm.draw()
    }
}
