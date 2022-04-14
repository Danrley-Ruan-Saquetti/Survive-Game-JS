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

const SPEED_PLAYER = 4
const DIMENSION_AREA = () => {
    return innerHeight * .2
}
const DIMENSION_AREA_CAMPFIRE = () => {
    return DIMENSION_AREA() / 2
}
const DIMENSION_PLAYER = () => {
    return innerHeight * .05
}

let animateFrame
let game

function setup() {
    window.addEventListener("keydown", (ev) => {
        switch (ev.key) {
            case "w": // Up
                game.player.speed.y = -SPEED_PLAYER
                break
            case "s": // Up
                game.player.speed.y = SPEED_PLAYER
                break
            case "a": // Up
                game.player.speed.x = -SPEED_PLAYER
                break
            case "d": // Up
                game.player.speed.x = SPEED_PLAYER
                break
        }
    })

    window.addEventListener("keyup", (ev) => {
        switch (ev.key) {
            case "w": // Up
                game.player.speed.y = 0
                break
            case "s": // Up
                game.player.speed.y = 0
                break
            case "a": // Up
                game.player.speed.x = 0
                break
            case "d": // Up
                game.player.speed.x = 0
                break
        }
    })

    resizeCanvas()
    initial()
}

function initial() {

    // Campfire
    let positionCampfire = { x: canvas.clientWidth - DIMENSION_AREA_CAMPFIRE(), y: (canvas.clientHeight - DIMENSION_AREA_CAMPFIRE()) / 2 }
    let dimensionCampfire = { width: DIMENSION_AREA_CAMPFIRE(), height: DIMENSION_AREA_CAMPFIRE() }
    let colorCampfire = "#ffff00"

    const campfire = new Campfire(positionCampfire, dimensionCampfire, colorCampfire)

    // Stone
    let positionStone = { x: 0, y: canvas.clientHeight - DIMENSION_AREA() }
    let dimensionStone = { width: DIMENSION_AREA(), height: DIMENSION_AREA() }
    let colorStone = "#414177"

    const stone = new Stone(positionStone, dimensionStone, colorStone)

    // Forest
    let positionForest = { x: 0, y: (canvas.clientHeight - DIMENSION_AREA()) / 2 }
    let dimensionForest = { width: DIMENSION_AREA(), height: DIMENSION_AREA() }
    let colorForest = "#008000"

    const forest = new Forest(positionForest, dimensionForest, colorForest)

    // Farm
    let positionFarm = { x: 0, y: 0 }
    let dimensionFarm = { width: DIMENSION_AREA(), height: DIMENSION_AREA() }
    let colorFarm = "#00ff00"

    const farm = new Forest(positionFarm, dimensionFarm, colorFarm)

    // Player
    let positionPlayer = { x: (canvas.clientWidth - DIMENSION_PLAYER()) / 2, y: (canvas.clientHeight - DIMENSION_PLAYER()) / 2 }
    let dimensionPlayer = { width: DIMENSION_PLAYER(), height: DIMENSION_PLAYER() }
    let colorPlayer = "#ff0000"
    let speedPlayer = { x: 0, y: 0 }

    const player = new Player(positionPlayer, dimensionPlayer, speedPlayer, colorPlayer)

    const area = new Area(campfire, forest, stone, farm)
    game = new Game({ width: canvas.clientWidth, height: canvas.clientHeight }, area, player)


    animate()
}

function resizeGame() {
    const oldWidth = canvas.clientWidth
    const oldHeight = canvas.clientHeight

    resizeCanvas()

    game.area.campfire.dimension = { width: DIMENSION_AREA_CAMPFIRE(), height: DIMENSION_AREA_CAMPFIRE() }
    game.area.forest.dimension = { width: DIMENSION_AREA(), height: DIMENSION_AREA() }
    game.area.stone.dimension = { width: DIMENSION_AREA(), height: DIMENSION_AREA() }
    game.area.farm.dimension = { width: DIMENSION_AREA(), height: DIMENSION_AREA() }
    game.player.dimension = { width: DIMENSION_PLAYER(), height: DIMENSION_PLAYER() }

    let positionCampfire = { x: canvas.clientWidth - DIMENSION_AREA_CAMPFIRE(), y: (canvas.clientHeight - DIMENSION_AREA_CAMPFIRE()) / 2 }
    let positionStone = { x: 0, y: canvas.clientHeight - DIMENSION_AREA() }
    let positionForest = { x: 0, y: (canvas.clientHeight - DIMENSION_AREA()) / 2 }
    let positionFarm = { x: 0, y: 0 }
    let positionPlayer = { x: (game.player.position.x * canvas.clientWidth) / oldWidth, y: (game.player.position.y * canvas.clientHeight) / oldHeight }
    game.area.campfire.position = positionCampfire
    game.area.stone.position = positionStone
    game.area.forest.position = positionForest
    game.area.farm.position = positionFarm
    game.player.position = positionPlayer
}

function resizeCanvas() {
    canvas.width = innerWidth
    canvas.height = innerHeight
}

function update() {
    game.player.update()
}

function draw() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    game.draw()
}

function animate() {
    if ((innerWidth != canvas.clientWidth || innerHeight != canvas.clientHeight) && (innerWidth > innerHeight)) resizeGame()

    update()
    draw()

    game.detectCollision()

    if (game.state != 0) cancelAnimationFrame(animateFrame)
    else animateFrame = requestAnimationFrame(animate)
}

window.onload = setup
