class Forest {
    constructor(position, dimension, color) {
        this.position = position
        this.dimension = dimension
        this.color = color
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.dimension.width, this.dimension.height)

        ctx.fillStyle = "#fff"
        ctx.fillText("+1 Wood", this.position.x + TEXT_FONT_SIZE() * 2, this.position.y + TEXT_FONT_SIZE() * 4.7)
    }
}
