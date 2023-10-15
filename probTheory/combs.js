async function evalCombPre() {
    let select = document.querySelector('#type-select');
    let type = select.value;
    const k = '<input class="input" type="text" id="inp-k" placeholder="k"/>';
    const n = '<input type="text" id="inp-n" placeholder="n"/>';
    let description = '';
    if (type == 'placements') {
        description = '<p>k: ' + k + '</p><p>n: ' + n + '</p>';
    } else if (type == 'permutations') {

    } else if (type == 'combinations') {

    }
    document.getElementById('description').innerHTML = description;
    let repet = document.getElementById('repet').checked;
    let kk = document.getElementById('inp-k').value;
    let nn = document.getElementById('inp-n').value;
    if (Number.isInteger(kk) && Number.isInteger(nn) && kk >= 0 && nn >= 0 && nn >= kk) {
        await evalComb(kk, nn, type, repet);
    } else {
        document.getElementById('result').innerHTML = "Please, input correct values"
    }
}

async function evalComb(k, n, type, withRepet) {
    let res = 1;
    if (type == 'placements') {
        if (withRepet) {
            for (let i = 0; i < k; i++) {
                res *= n;
            }
        } else {
            for (let i = n; i > n - k; i--) {
                res *= i;
            }
        }
    } else if (type == 'permutations') {
        if (withRepet) {
            for (let i = 0; i < k; i++) {
                res *= n;
            }
        } else {
            for (let i = 1; i <= n; i++) {
                res *= i;
            }
        }
    } else if (type == 'combinations') {
        if (withRepet) {
            for (let i = 0; i < k; i++) {
                res *= n;
            }
        } else {
            for (let i = n; i > n - k; i--) {
                res *= i;
            }
        }
    }
}