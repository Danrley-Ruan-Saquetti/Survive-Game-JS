class Area {
    constructor(campfire, forest, stone, farm) {
        this.campfire = campfire
        this.forest = forest
        this.stone = stone
        this.farm = farm
    }

    draw() {
        ctx.font = `${TEXT_FONT_SIZE()}px monospace`
        this.campfire.draw()
        this.stone.draw()
        this.farm.draw()
        this.forest.draw()
    }
}
