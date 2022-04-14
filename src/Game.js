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

    detectCollision() {
        function detect(player, area) {
            return ((player.position.x >= area.position.x && player.position.x <= area.position.x + area.dimension.width && player.position.y >= area.position.y && player.position.y <= area.position.y + area.dimension.height) ||
                (player.position.x + player.dimension.width >= area.position.x && player.position.x + player.dimension.width <= area.position.x + area.dimension.width && player.position.y >= area.position.y && player.position.y <= area.position.y + area.dimension.height) ||
                (player.position.x + player.dimension.width >= area.position.x && player.position.x + player.dimension.width <= area.position.x + area.dimension.width && player.position.y + player.dimension.height >= area.position.y && player.position.y + player.dimension.height <= area.position.y + area.dimension.height) ||
                (player.position.x <= area.position.x + area.dimension.width && player.position.x >= area.position.x && player.position.y + player.dimension.height >= area.position.y && player.position.y + player.dimension.height <= area.position.y + area.dimension.height))
        }

        if (this.player.position.x > this.dimension.width / 2) {
            if (detect(this.player, this.area.campfire)) {

            }
        } else {
            if (detect(this.player, this.area.forest)) {

            }
            if (this.player.position.y > this.dimension.height / 2) {
                if (detect(this.player, this.area.stone)) {

                }
            } else {
                if (detect(this.player, this.area.farm)) {

                }
            }
        }
    }
}
