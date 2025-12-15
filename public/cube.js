var canvas;

var A = 0
var B = 0
var C = 0

var cubeX;
var cubeY = 0;
var cubeZ = 0;

const delay = 65;

const canvasWidth = 83;
const canvasHeight = 36;

const cubeWidth = 18;
const distanceFromCam = 100;
const K1 = 40;
const horizontalOffset = 0;
const incrementSpeed = 0.5;

var buffer = new Array(canvasHeight);
for (var y = 0; y < canvasHeight; y++) {
    buffer[y] = new Array(canvasWidth).fill(' ');
}

var zbuffer = new Array(canvasHeight);
for (var y = 0; y < canvasHeight; y++) {
    zbuffer[y] = new Array(canvasWidth).fill(0);
}

// console.log(zbuffer)
for (let i = 0; i < buffer.length; i++) {
    var row = buffer[i]
    for (let j = 0; j < row.length; j++) {
        buffer[i][j] = 'e';
    }
}

export function main () {
    canvas = document.getElementById("canvas");
    console.log('main2')
    setInterval(update, delay);
}

const render = () => {
    var t = '';
    buffer.forEach((row) => {
        row.forEach((cell) => {
            t += cell;
        });
        t += "\n";
    });
    canvas.appendChild(document.createTextNode(t));
}

const clear = () => {
    for (let i = 0; i < buffer.length; i++) {
        var row = buffer[i]
        for (let j = 0; j < row.length; j++) {
            buffer[i][j] = ' ';
            zbuffer[i][j] = -99999;
        }
    }
    while (canvas.childNodes.length > 0) {
        canvas.removeChild(canvas.firstChild);
    }
}

const calculateX = (i, j, k) => {
    return j * Math.sin(A) * Math.sin(B) * Math.cos(C) - k * Math.cos(A) * Math.sin(B) * Math.cos(C) +
        j * Math.cos(A) * Math.sin(C) + k * Math.sin(A) * Math.sin(C) + i * Math.cos(B) * Math.cos(C);
}

const calculateY = (i, j, k) => {
    return j * Math.cos(A) * Math.cos(C) + k * Math.sin(A) * Math.cos(C) -
        j * Math.sin(A) * Math.sin(B) * Math.sin(C) + k * Math.cos(A) * Math.sin(B) * Math.sin(C) -
        i * Math.cos(B) * Math.sin(C);
}

const calculateZ = (i, j, k) => {
    return k * Math.cos(A) * Math.cos(B) - j * Math.sin(A) * Math.cos(B) + i * Math.sin(B);
}

const calculateForSurface = (cubeX, cubeY, cubeZ, ch) => {
    const x = calculateX(cubeX, cubeY, cubeZ);
    const y = calculateY(cubeX, cubeY, cubeZ);
    const z = calculateZ(cubeX, cubeY, cubeZ) + distanceFromCam;
    const ooz = 1 / z;
    // console.log(ooz)

    const xp = Math.round(canvasWidth / 2 + horizontalOffset + K1 * ooz * x * 2);
    const yp = Math.round(canvasHeight / 2 + K1 * ooz * y);
    // console.log({xp, yp})
    // console.log(zbuffer[19][20])

    if (xp >= 0 && xp < canvasWidth && yp >= 0 && yp < canvasHeight) {
        if (zbuffer[yp][xp] !== null) {
            // console.log(zbuffer[yp][xp])
            if (ooz > zbuffer[yp][xp]) {
                zbuffer[yp][xp] = ooz;
                buffer[yp][xp] = ch;
            }
        }
    }
}

const update = () => {
    clear()
    for (cubeX = -cubeWidth; cubeX<cubeWidth; cubeX += incrementSpeed) {
        for (cubeY = -cubeWidth; cubeY<cubeWidth; cubeY += incrementSpeed) {
            calculateForSurface(cubeX, cubeY, -cubeWidth, '@');
            calculateForSurface(cubeWidth, cubeY, cubeX, '$');
            calculateForSurface(-cubeWidth, cubeY, -cubeX, '~');
            calculateForSurface(-cubeX, cubeY, cubeWidth, '#');
            calculateForSurface(cubeX, -cubeWidth, -cubeY, ';');
            calculateForSurface(cubeX, cubeWidth, cubeY, '+');
        }
    }
    A += 0.05;
    B += 0.05;
    C += 0.01;
    render()
}

