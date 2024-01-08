var colorHeader = document.querySelector("h1")
var log = console.log
var fileInput = document.getElementById("fileInput")
var canvas = document.querySelector("canvas")
var ctx = canvas.getContext("2d")

fileInput.addEventListener("change", e => {

    var file = e.target.files[0]

    var fr = new FileReader()

    fr.onload = e => {

        renderImage(fr.result)

    }

    fr.readAsDataURL(file)

})


function renderImage(url) {

    var img = new Image()

    img.src = url

    img.onload = e => {

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, img.width, img.height)

        ctx.drawImage(img, 0, 0)

    }

}

canvas.addEventListener("mousemove", ({ buttons, offsetX, offsetY }) => {

    if (buttons != 1) return;

    var { data, colorSpace } = ctx.getImageData(offsetX, offsetY, offsetX + 1, offsetY + 1)

    var color;

    if (colorSpace == "srgb")
        color = getRGB(data[0], data[1], data[2])
    if (colorSpace == "display-p3")
        color = getRGBA(data[0], data[1], data[2], data[3])

    document.body.style.backgroundColor = color
    colorHeader.innerText = "Color : " + color;
    colorHeader.style.color = getRGB(257 - data[0], 257 - data[1], 257 - data[2])

})

var getRGB = (r, g, b) => `rgb(${r},${g},${b})`
var getRGBA = (r, g, b, a) => `rgba(${r},${g},${b},${a})`