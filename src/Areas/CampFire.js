class Campfire {
    constructor(position, dimension, color, heart) {
        this.position = position
        this.dimension = dimension
        this.color = color
        this.heart = heart
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.dimension.width, this.dimension.height)

        ctx.fillStyle = "#000"
        ctx.fillText(`1 Food -> +${CONSUME_FOOD} Hunger - Player`, this.position.x - TEXT_FONT_SIZE() * 13, this.position.y - TEXT_FONT_SIZE() * 4)
        ctx.fillText(`1 Wood -> +${CONSUME_WOOD} HEART - Campfire`, this.position.x - TEXT_FONT_SIZE() * 13, this.position.y - TEXT_FONT_SIZE() * 2.5)
        ctx.fillText(`1 Stone -> +${CONSUME_STONE} HEART - Campfire`, this.position.x - TEXT_FONT_SIZE() * 13, this.position.y - TEXT_FONT_SIZE())
    }
}
