const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const CANVAS_DIMENSION = {
    width: () => {
        return canvas.clientWidth
    },
    height: () => {
        return canvas.clientHeight
    }
}

let animateFrame
let game

function setup() {
    resizeCanvas()
    initial()
}

function initial() {
    let position, dimension, color

    // Campfire
    position = { x: 0, y: 0 }
    dimension = { width: 0, height: 0 }
    color = "#ffff00"

    const campfire = new Campfire(position, dimension, color)

    // Stone
    position = { x: 0, y: 0 }
    dimension = { width: 0, height: 0 }
    color = "#414177"

    const stone = new Stone(position, dimension, color)

    // Forest
    position = { x: 0, y: 0 }
    dimension = { width: 0, height: 0 }
    color = "#008000"

    const forest = new Forest(position, dimension, color)

    // Player
    position = { x: 0, y: 0 }
    dimension = { width: 10, height: 10 }
    color = "#ff0000"
    let speed = { x: 0, y: 0 }

    const player = new Player(position, dimension, speed, color)

    const area = new Area(campfire, forest, stone)
    game = new Game({ width: canvas.clientWidth, height: canvas.clientHeight }, area, player)

    animate()
}

function resizeCanvas() {
    canvas.width = innerWidth
    canvas.height = innerHeight
}

function update() {
    game.player.update()
}

function draw() {
    game.draw()
}

function animate() {
    if (innerWidth != canvas.clientWidth || innerHeight != canvas.clientHeight) resizeCanvas()

    update()
    draw()

    if (game.state != 0) cancelAnimationFrame(animateFrame)
    else animateFrame = requestAnimationFrame(animate)
}

window.onload = setup
