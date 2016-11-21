
function getContext() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext("2d");
    return context;
}

function drawWithAnimation(x, y, grad = []) {
    const context = getContext();
    let i = 0;
    const time = 30;
    const L = x.length;
    setTimeout((function draw(i) {
        context.fillStyle = grad[i] ? `rgba(0, 0, 0, ${grad[i]})` : '#000000';
        context.fillRect(Math.floor(x[i]), Math.floor(y[i]), 1, 1);
        if (i < L) {
            i++;
            setTimeout(() => draw(i), time);
        }
    })(i), time);
}


function DDA(x1, y1, x2, y2) {
    const L = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
    const dX = (x2 - x1) / L;
    const dY = (y2 - y1) / L;
    const arrX = [];
    const arrY = [];

    let i = 0;
    arrX[i] = x1;
    arrY[i] = y1;
    i++;
    while (i < L) {
        arrX[i] = arrX[i-1] + dX;
        arrY[i] = arrY[i-1] + dY;
        i++;

    }
    arrX[i] = x2;
    arrY[i] = y2;
    drawWithAnimation(arrX, arrY);
}

function Brezenhem(x1, y1, x2, y2) {
    const arrX = [];
    const arrY = [];
    const deltax = Math.abs(x2 - x1);
    const deltay = Math.abs(y2 - y1);
    let error = 2 * deltay - deltax;
    let y = y1;
    let x = x1;
    arrX.push(x);
    arrY.push(y);
    let i = 1;
    while (i < deltax) {
        if (error >= 0) {
            y = y + 1;
            error = error - 2 * deltax;
        } else {
            x = x + 1;
            error = error + 2 * deltay;
            i++;
        }
        arrX.push(x);
        arrY.push(y);
    }
    drawWithAnimation(arrX, arrY);
}

function fpart(x) {
    return x - Math.floor(x);
}

function Xiaolin(x1, y1, x2, y2) {
    if (x2 < x1) {
        x2 = [x1, x1 = x2][0];
        y2 = [y1, y1 = y2][0];
    }
    const arrX = [];
    const arrY = [];
    const arrGrad = [];
    const dx = x2 - x1;
    const dy = y2 - y1;
    const gradient = dy / dx;
    let xend = 0;
    let yend = 0;
    let xgap = 0;
    let intery = 0;

    xend = Math.round(x1);
    yend = y1 + gradient * (xend - x1);
    xgap = 1 - fpart(x1 + 0.5);
    const xpxl1 = xend;
    const ypxl1 = Math.floor(yend);
    arrX.push(xpxl1);
    arrX.push(xpxl1);
    arrY.push(ypxl1);
    arrY.push(ypxl1 + 1);
    arrGrad.push(1 - fpart(yend) * xgap);
    arrGrad.push(fpart(yend) * xgap);
    intery = yend + gradient;

    xend = Math.round(x2);
    yend = y2 + gradient * (xend - x2);
    xgap = fpart(x2 + 0.5);
    const xpxl2 = xend;
    const ypxl2 = Math.floor(yend);
    arrX.push(xpxl2);
    arrX.push(xpxl2);
    arrY.push(ypxl2);
    arrY.push(ypxl2 + 1);
    arrGrad.push(1 - fpart(yend) * xgap);
    arrGrad.push(fpart(yend) * xgap);

    for (let x = xpxl1 + 1; x < xpxl2; x++) {
        arrX.push(x);
        arrX.push(x);
        arrY.push(Math.floor(intery));
        arrY.push(Math.floor(intery) + 1);
        arrGrad.push(1 - fpart(intery));
        arrGrad.push(fpart(intery));
        intery = intery + gradient;
    }
    drawWithAnimation(arrX, arrY, arrGrad);
}


function run() {
    const method = document.getElementById('method').value;
    const x1 = Math.round(document.getElementById('x1').value);
    const y1 = Math.round(document.getElementById('y1').value);
    const x2 = Math.round(document.getElementById('x2').value);
    const y2 = Math.round(document.getElementById('y2').value);
    const func = [DDA, Brezenhem, Xiaolin];
    func[method](x1, y1, x2, y2);
}

function clearCanvas() {
    const context = getContext();
    context.clearRect(0, 0, canvas.width, canvas.height);
}
