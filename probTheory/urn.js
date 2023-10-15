let globI = 2;
async function addGroup() {
    let div = document.getElementById('groups');
    let newP = document.createElement('p');
    newP.id = 'p' + globI;
    newP.innerHTML = 'm<sub>' + globI + '</sub>: <input class="input" type="text" id="m' + globI + '" placeholder="m' + globI + '" value="0"/> r<sub>' + globI + '</sub>: <input class="input" type="text" id="r' + globI + '" placeholder="r' + globI + '" value="0"/>';
    div.appendChild(newP);
    globI++;
}

async function deleteGroup() {
    document.getElementById('p' + (globI - 1)).remove();
    globI--;
}

async function calcUrn() {
    let result = document.getElementById('result');
    let n = parseInt(document.getElementById('inp-n').value);
    let k = parseInt(document.getElementById('inp-k').value);
    let under = 1;

    if (n != NaN && k != NaN && n >= 0 && k >= 0 && n >= k) {
        under = await calcCombinationsNumbers(k, n);
    } else {
        result.innerHTML = 'Incorrect input data';
        return;
    }
    let up = 1;
    let sumM = 0;
    let sumR = 0;
    for (let j = 1; j < globI; j++) {
        let m = parseInt(document.getElementById('m' + j).value);
        let r = parseInt(document.getElementById('r' + j).value);

        if (m != NaN && r != NaN && m >= 0 && r >= 0 && m >= r) {
            sumM += m;
            sumR += r;
            if (sumM > n || sumR > k) {
                result.innerHTML = 'Incorrect input data';
                return;
            }
            up *= await calcCombinationsNumbers(r, m);
        } else {
            result.innerHTML = 'Incorrect input data';
            return;
        }
    }

    if (sumR == k)
        result.innerHTML = 'Result: ' + up / under;
    else
        result.innerHTML = 'Incorrect input data';
}

async function calcCombinationsNumbers(k, n) {
    let a = 1;
    for (let j = n; j > n - k; j--) {
        a *= j;
    }
    let b = 1;
    for (let j = 1; j <= k; j++) {
        b *= j;
    }
    return a / b;
}