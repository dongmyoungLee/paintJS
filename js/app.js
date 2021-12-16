const canvas = document.getElementById('jsCanvas')
const ctx = canvas.getContext('2d')
const colors = document.getElementsByClassName('jsColor')
const ColorsArray = Array.from(colors)
const range = document.getElementById('jsRange')
const mode = document.getElementById('jsMode')
const saveBtn = document.getElementById('jsSave')
const ResetBtn = document.getElementById('jsReset')
const Eraser = document.getElementById('jsEraser')

const INITIAL_COLOR = '#2c2c2c'
const CANVAS_SIZE = 700

canvas.width = CANVAS_SIZE
canvas.height = CANVAS_SIZE

ctx.fillStyle = '#ffffff'
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
ctx.strokeStyle = INITIAL_COLOR
ctx.fillStyle = INITIAL_COLOR
ctx.lineWidth = 2.5;

let painting = false
let filling = false

function startPainting() {
    painting = true
}

function stopPainting() {
    painting = false
}

function onMouseMove(e) {
    const x = e.offsetX
    const y = e.offsetY
    if (!painting) {
        ctx.beginPath()
        ctx.moveTo(x, y)
    } else {
        ctx.lineTo(x, y)
        ctx.stroke()
    }
    
}


function onMouseup(e) {
    stopPainting()
}

function handleColorClick(e) {
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color
    ctx.fillStyle = color

    this.classList.add('ColorActive')

    ColorsArray.forEach((item, index) => {
        if (ColorsArray[index].getAttribute('style').substr(18, 7) !== ctx.strokeStyle) {
            ColorsArray[index].classList.remove('ColorActive')
        }
    })
}

function handleRangeChange(e) {
    const size = e.target.value
    ctx.lineWidth = size
}

function handleModeClick(e) {
    if (filling === true) {
        filling = false
        mode.innerText = 'Fill'
        canvas.classList.remove('ClickIcon')
    } else {
        filling = true
        mode.innerText= 'Paint'
        canvas.classList.add('ClickIcon')
    }
    
}

function handleCanvasClick(e) {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    }
}

function handleCM(e) {
    e.preventDefault()
}

function handleSaveClick() {
    const image = canvas.toDataURL()
    const link = document.createElement('a')
    link.href = image
    link.download = 'PaintJS[EXPORT]'
    link.click()
}

function handleResetClick() {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    range.value = 2.5
    ColorsArray.forEach((item, index) => {
        ColorsArray[index].classList.remove('ColorActive')
    })
}

function handleEraserClick() {
    ctx.strokeStyle = '#ffffff'
}

if (canvas) {
    canvas.classList.remove('ClickIcon')
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mousedown', startPainting)
    canvas.addEventListener('mouseup', stopPainting)
    canvas.addEventListener('mouseleave', stopPainting)
    canvas.addEventListener('click', handleCanvasClick)
    canvas.addEventListener('contextmenu', handleCM)
    
}

Array.from(colors).forEach(e => e.addEventListener('click', handleColorClick))

if (range) {
    range.addEventListener('input', handleRangeChange)
}

if (mode) {
    mode.addEventListener('click', handleModeClick)
}

if (saveBtn) {
    saveBtn.addEventListener('click', handleSaveClick)
}

if (ResetBtn) {
    ResetBtn.addEventListener('click', handleResetClick)
}

if (Eraser) {
    Eraser.addEventListener('click', handleEraserClick)
}