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
const COLLECT = {
    heartCamp: () => {
        if (player.food > 0) {
            player.food--
                player.hunger += CONSUME_FOOD
            if (player.hunger >= LIMIT_HUNGER) player.hunger = LIMIT_HUNGER
        }
        if (player.wood > 0) {
            player.wood--
                campfire.heart += CONSUME_HEART_CAMPFIRE
        }
        if (player.stone > 0) {
            player.stone--
                campfire.hunger += CONSUME_STONE
        }
        if (campfire.heart >= LIMIT_HUNGER) campfire.heart = LIMIT_HUNGER
    },
    food: () => {
        player.food += COLLECT_FOOD
    },
    wood: () => {
        player.wood += COLLECT_WOOD
        player.hunger -= CONSUME_HUNGER_FOREST
    },
    stone: () => {
        player.stone += COLLECT_STONE
        player.hunger -= CONSUME_HUNGER_STONE
    }
}
const DIMENSION_AREA = () => { return innerHeight * .25 }
const DIMENSION_AREA_CAMPFIRE = () => { return DIMENSION_AREA() / 2 }
const DIMENSION_PLAYER = () => { return innerHeight * .05 }
const TEXT_FONT_SIZE = () => { return DIMENSION_AREA() * .11 }

const COLLECT_FOOD = 1
const COLLECT_WOOD = 1
const COLLECT_STONE = 1
const CONSUME_HUNGER_FOREST = 25
const CONSUME_HUNGER_STONE = 25
const CONSUME_FOOD = 20
const CONSUME_WOOD = 25
const CONSUME_STONE = 10
const CONSUME_HEART_INTERVAL = 2
const CONSUME_HEART_CAMPFIRE = 20

const LIMIT_HUNGER = 100
const LIMIT_HEART_CAMPFIRE = 100
const LIMIT_HEART_CAMPFIRE_INTERVAL = 1000 * 1
const COLLECT_TIME = 1000 * 1
const SPEED_PLAYER = 4

let animateFrame
let state
let player, area
let campfire, farm, stone, forest
let consumeHeart
let consumeHeartInterval
let controlCollect
let collectInterval
let lastArea //0 - default / 1 - campfire / 2 - farm / 3 - forest / 4 - stone

function setup() {
    document.querySelectorAll("p").forEach((p) => p.style.fontSize = TEXT_FONT_SIZE() + "px")
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

    menu()
    resizeCanvas()
}

function menu() {
    initial()
}

function initial() {
    lastArea = 0
    controlCollect = true
    state = 0

    // Campfire
    let positionCampfire = { x: canvas.clientWidth - DIMENSION_AREA_CAMPFIRE(), y: (canvas.clientHeight - DIMENSION_AREA_CAMPFIRE()) / 2 }
    let dimensionCampfire = { width: DIMENSION_AREA_CAMPFIRE(), height: DIMENSION_AREA_CAMPFIRE() }
    let colorCampfire = "#ffff00"
    let heartCampfire = 100

    campfire = new Campfire(positionCampfire, dimensionCampfire, colorCampfire, heartCampfire)

    // Forest
    let positionForest = { x: 0, y: (canvas.clientHeight - DIMENSION_AREA()) / 2 }
    let dimensionForest = { width: DIMENSION_AREA(), height: DIMENSION_AREA() }
    let colorForest = "#008000"

    forest = new Forest(positionForest, dimensionForest, colorForest)

    // Stone
    let positionStone = { x: 0, y: canvas.clientHeight - DIMENSION_AREA() }
    let dimensionStone = { width: DIMENSION_AREA(), height: DIMENSION_AREA() }
    let colorStone = "#414177"

    stone = new Stone(positionStone, dimensionStone, colorStone)

    // Farm
    let positionFarm = { x: 0, y: 0 }
    let dimensionFarm = { width: DIMENSION_AREA(), height: DIMENSION_AREA() }
    let colorFarm = "#00ff00"

    farm = new Farm(positionFarm, dimensionFarm, colorFarm)

    // Player
    let positionPlayer = { x: (canvas.clientWidth - DIMENSION_PLAYER()) / 2, y: (canvas.clientHeight - DIMENSION_PLAYER()) / 2 }
    let dimensionPlayer = { width: DIMENSION_PLAYER(), height: DIMENSION_PLAYER() }
    let colorPlayer = "#ff0000"
    let speedPlayer = { x: 0, y: 0 }
    let woodPlayer = 0
    let foodPlayer = 0
    let stonePlayer = 0
    let hungerPlayer = 100

    player = new Player(positionPlayer, dimensionPlayer, speedPlayer, colorPlayer, woodPlayer, foodPlayer, stonePlayer, hungerPlayer)
    area = new Area(campfire, forest, stone, farm)

    consumeHeartInterval = setInterval(() => area.campfire.heart -= CONSUME_HEART_INTERVAL, LIMIT_HEART_CAMPFIRE_INTERVAL)

    animate()
}

function writeText(selector, text) {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
}

function writeUi_Player() {
    writeText("food", player.food)
    writeText("stone", player.stone)
    writeText("wood", player.wood)
    writeText("hunger", player.hunger)
    writeText("heart", area.campfire.heart)
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
            if (controlCollect) {
                lastArea = 1
                collectInterval = setInterval(() => {
                    if (!controlCollect) COLLECT.heartCamp()
                }, COLLECT_TIME)
                controlCollect = false
            }
        } else if (lastArea == 1) {
            if (!controlCollect) clearInterval(collectInterval)
            controlCollect = true
        }
    } else {
        if (detect(player, area.forest)) {
            if (controlCollect) {
                lastArea = 3
                collectInterval = setInterval(() => {
                    if (!controlCollect) COLLECT.wood()
                }, COLLECT_TIME)
                controlCollect = false
            }
        } else if (lastArea == 3) {
            if (!controlCollect) clearInterval(collectInterval)
            controlCollect = true
        }
        if (player.position.y > CANVAS_DIMENSION.height() / 2) {
            if (detect(player, area.stone)) {
                if (controlCollect) {
                    lastArea = 4
                    collectInterval = setInterval(() => {
                        if (!controlCollect) COLLECT.stone()
                    }, COLLECT_TIME)
                    controlCollect = false
                }
            } else if (lastArea == 4) {
                if (!controlCollect) clearInterval(collectInterval)
                controlCollect = true
            }
        } else {
            if (detect(player, area.farm)) {
                if (controlCollect) {
                    lastArea = 2
                    collectInterval = setInterval(() => {
                        if (!controlCollect) COLLECT.food()
                    }, COLLECT_TIME)
                    controlCollect = false
                }
            } else if (lastArea == 2) {
                if (!controlCollect) clearInterval(collectInterval)
                controlCollect = true
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

function draw() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    area.draw()
    player.draw()
}

function animate() {
    if ((innerWidth != canvas.clientWidth || innerHeight != canvas.clientHeight) && (innerWidth > innerHeight)) resizeGame()

    player.update()
    detectCollision()
    writeUi_Player()
    draw()

    if (campfire.heart <= 0 || player.hunger <= 0) state = 2

    if (state != 0) {
        cancelAnimationFrame(animateFrame)
        endGame()
    } else animateFrame = requestAnimationFrame(animate)
}

function endGame() {
    clearInterval(consumeHeartInterval)
    clearInterval(collectInterval)
    menu()
}

window.onload = setup
