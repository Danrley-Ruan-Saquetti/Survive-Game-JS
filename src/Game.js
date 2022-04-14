class Game {
    constructor(dimension, area, player) {
        this.dimension = dimension
        this.area = area
        this.player = player
        this.state = 0 // 0 - Running Game / 1 - Victory / 2 - Game Over
    }

    draw() {
        this.area.draw()
        this.player.draw()
    }
}
