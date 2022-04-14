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
    return innerHeight * .25
}
const DIMENSION_AREA_CAMPFIRE = () => {
    return DIMENSION_AREA() / 2
}
const DIMENSION_PLAYER = () => {
    return innerHeight * .05
}

let animateFrame
let player, area
let campfire, farm, stone, forest
let state

function setup() {
    window.addEventListener("keydown", (ev) => {
        switch (ev.key) {
            case "w": // Up
                player.speed.y = -SPEED_PLAYER
                break
            case "s": // Up
                player.speed.y = SPEED_PLAYER
                break
            case "a": // Up
                player.speed.x = -SPEED_PLAYER
                break
            case "d": // Up
                player.speed.x = SPEED_PLAYER
                break
        }
    })

    window.addEventListener("keyup", (ev) => {
        switch (ev.key) {
            case "w": // Up
                player.speed.y = 0
                break
            case "s": // Up
                player.speed.y = 0
                break
            case "a": // Up
                player.speed.x = 0
                break
            case "d": // Up
                player.speed.x = 0
                break
        }
    })

    resizeCanvas()
    initial()
}

function initial() {
    state = 0

    // Campfire
    let positionCampfire = { x: canvas.clientWidth - DIMENSION_AREA_CAMPFIRE(), y: (canvas.clientHeight - DIMENSION_AREA_CAMPFIRE()) / 2 }
    let dimensionCampfire = { width: DIMENSION_AREA_CAMPFIRE(), height: DIMENSION_AREA_CAMPFIRE() }
    let colorCampfire = "#ffff00"

    campfire = new Campfire(positionCampfire, dimensionCampfire, colorCampfire)

    // Stone
    let positionStone = { x: 0, y: canvas.clientHeight - DIMENSION_AREA() }
    let dimensionStone = { width: DIMENSION_AREA(), height: DIMENSION_AREA() }
    let colorStone = "#414177"

    stone = new Stone(positionStone, dimensionStone, colorStone)

    // Forest
    let positionForest = { x: 0, y: (canvas.clientHeight - DIMENSION_AREA()) / 2 }
    let dimensionForest = { width: DIMENSION_AREA(), height: DIMENSION_AREA() }
    let colorForest = "#008000"

    forest = new Forest(positionForest, dimensionForest, colorForest)

    // Farm
    let positionFarm = { x: 0, y: 0 }
    let dimensionFarm = { width: DIMENSION_AREA(), height: DIMENSION_AREA() }
    let colorFarm = "#00ff00"

    farm = new Forest(positionFarm, dimensionFarm, colorFarm)

    // Player
    let positionPlayer = { x: (canvas.clientWidth - DIMENSION_PLAYER()) / 2, y: (canvas.clientHeight - DIMENSION_PLAYER()) / 2 }
    let dimensionPlayer = { width: DIMENSION_PLAYER(), height: DIMENSION_PLAYER() }
    let colorPlayer = "#ff0000"
    let speedPlayer = { x: 0, y: 0 }

    player = new Player(positionPlayer, dimensionPlayer, speedPlayer, colorPlayer)
    area = new Area(campfire, forest, stone, farm)

    animate()
}

function detectCollision() {
    function detect(player, area) {
        return ((player.position.x >= area.position.x && player.position.x <= area.position.x + area.dimension.width && player.position.y >= area.position.y && player.position.y <= area.position.y + area.dimension.height) ||
            (player.position.x + player.dimension.width >= area.position.x && player.position.x + player.dimension.width <= area.position.x + area.dimension.width && player.position.y >= area.position.y && player.position.y <= area.position.y + area.dimension.height) ||
            (player.position.x + player.dimension.width >= area.position.x && player.position.x + player.dimension.width <= area.position.x + area.dimension.width && player.position.y + player.dimension.height >= area.position.y && player.position.y + player.dimension.height <= area.position.y + area.dimension.height) ||
            (player.position.x <= area.position.x + area.dimension.width && player.position.x >= area.position.x && player.position.y + player.dimension.height >= area.position.y && player.position.y + player.dimension.height <= area.position.y + area.dimension.height))
    }

    if (player.position.x > CANVAS_DIMENSION.width() / 2) {
        if (detect(player, area.campfire)) {

        }
    } else {
        if (detect(player, area.forest)) {

        }
        if (player.position.y > CANVAS_DIMENSION.height() / 2) {
            if (detect(player, area.stone)) {

            }
        } else {
            if (detect(player, area.farm)) {

            }
        }
    }
}

function resizeGame() {
    const oldWidth = canvas.clientWidth
    const oldHeight = canvas.clientHeight

    resizeCanvas()

    area.campfire.dimension = { width: DIMENSION_AREA_CAMPFIRE(), height: DIMENSION_AREA_CAMPFIRE() }
    area.forest.dimension = { width: DIMENSION_AREA(), height: DIMENSION_AREA() }
    area.stone.dimension = { width: DIMENSION_AREA(), height: DIMENSION_AREA() }
    area.farm.dimension = { width: DIMENSION_AREA(), height: DIMENSION_AREA() }
    player.dimension = { width: DIMENSION_PLAYER(), height: DIMENSION_PLAYER() }

    let positionCampfire = { x: canvas.clientWidth - DIMENSION_AREA_CAMPFIRE(), y: (canvas.clientHeight - DIMENSION_AREA_CAMPFIRE()) / 2 }
    let positionStone = { x: 0, y: canvas.clientHeight - DIMENSION_AREA() }
    let positionForest = { x: 0, y: (canvas.clientHeight - DIMENSION_AREA()) / 2 }
    let positionFarm = { x: 0, y: 0 }
    let positionPlayer = { x: (player.position.x * canvas.clientWidth) / oldWidth, y: (player.position.y * canvas.clientHeight) / oldHeight }
    area.campfire.position = positionCampfire
    area.stone.position = positionStone
    area.forest.position = positionForest
    area.farm.position = positionFarm
    player.position = positionPlayer
}

function resizeCanvas() {
    canvas.width = innerWidth
    canvas.height = innerHeight
}

function update() {
    player.update()
}

function draw() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    area.draw()
    player.draw()
}

function animate() {
    if ((innerWidth != canvas.clientWidth || innerHeight != canvas.clientHeight) && (innerWidth > innerHeight)) resizeGame()

    update()
    draw()

    detectCollision()

    if (state != 0) cancelAnimationFrame(animateFrame)
    else animateFrame = requestAnimationFrame(animate)
}

window.onload = setup
