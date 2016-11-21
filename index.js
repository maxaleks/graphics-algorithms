
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

function drawLine() {
    const method = document.getElementById('method').value;
    const x1 = Math.round(document.getElementById('x1').value);
    const y1 = Math.round(document.getElementById('y1').value);
    const x2 = Math.round(document.getElementById('x2').value);
    const y2 = Math.round(document.getElementById('y2').value);
    const func = [DDA, BrezenhemLine, XiaolinLine];
    func[method](x1, y1, x2, y2);
}

function drawCircle() {
    const method = document.getElementById('method').value;
    const x1 = Math.round(document.getElementById('x1').value);
    const y1 = Math.round(document.getElementById('y1').value);
    const r = Math.round(document.getElementById('r').value);
    const func = [null, BrezenhemCircle, null];
    func[method](x1, y1, r);
}

function drawParabola() {
    const method = document.getElementById('method').value;
    const x1 = Math.round(document.getElementById('x1').value);
    const y1 = Math.round(document.getElementById('y1').value);
    const p = Math.round(document.getElementById('p').value);
    const func = [null, BrezenhemParabola, null];
    func[method](x1, y1, p);
}

function clearCanvas() {
    const context = getContext();
    context.clearRect(0, 0, canvas.width, canvas.height);
}
