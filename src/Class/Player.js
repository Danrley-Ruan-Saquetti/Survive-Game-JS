class Player {
    constructor(position, dimension, speed, color) {
        this.position = position
        this.dimension = dimension
        this.speed = speed
        this.color = color
        this.wood = 0
        this.food = 0
        this.stone = 0
        this.hunger = 0
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.dimension.width, this.dimension.height)
    }

    update() {
        this.position.x += this.speed.x
        this.position.y += this.speed.y
        if (this.position.x < 0) {
            this.position.x = 0
        } else if (this.position.x + this.dimension.width > canvas.clientWidth) {
            this.position.x = canvas.clientWidth - this.dimension.width
        }
        if (this.position.y < 0) {
            this.position.y = 0
        } else if (this.position.y + this.dimension.height > canvas.clientHeight) {
            this.position.y = canvas.clientHeight - this.dimension.height
        }
    }
}
