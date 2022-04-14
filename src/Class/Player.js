class Player {
    constructor(position, dimension, speed, color) {
        this.position = position
        this.dimension = dimension
        this.speed = speed
        this.color = color
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.dimension.width, this.dimension.height)
    }

    update() {
        this.position.x = this.speed.x
        this.position.y = this.speed.y
    }
}
