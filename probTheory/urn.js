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

async function viewTasks() {
    document.getElementById('error').innerHTML = '';
    let type = document.querySelector('#type-select').value;
    if (type == "1") {
        document.getElementById('2').style.display = 'none';
        document.getElementById('1').style.display = 'block';
    } else if (type == "2") {
        document.getElementById('1').style.display = 'none';
        document.getElementById('2').style.display = 'block';
    }
}

async function calcUrn1() {
    let resTemplate = 'The probability that all the extracted items will be marked: ';
    let result = document.getElementById('result');
    let error = document.getElementById('error');
    result.innerHTML = resTemplate;
    error.innerHTML = '';
    let n = parseInt(document.getElementById('inp-n').value);
    let m = parseInt(document.getElementById('inp-m').value);
    let k = parseInt(document.getElementById('inp-k').value);
    let under = 1;
    let up = 1;

    if (isNaN(n)) {
        error.innerHTML = 'Error: Non-numeric parameter (n)';
        return;
    } else if (isNaN(k)) {
        error.innerHTML = 'Error: Non-numeric parameter (k)';
        return;
    } else if (n < 0) {
        error.innerHTML = 'Error: (n) less than zero';
        return;
    } else if (k < 0) {
        error.innerHTML = 'Error: (k) less than zero';
        return;
    } else if (n < k) {
        error.innerHTML = 'Error: (n) less than (k)';
        return;
    } else {
        under = await calcCombinationsNumbers(k, n);
    }

    if (isNaN(m)) {
        error.innerHTML = 'Error: Non-numeric parameter (m)';
        return;
    } else if (m < 0) {
        error.innerHTML = "Error: (m) less than zero";
        return;
    } else if (m > n) {
        error.innerHTML = "Error: (m) should be less than (n)";
        return;
    } else if (k > m) {
        error.innerHTML = "Error: (k) should be less than (m)";
        return;
    } else {
        up = await calcCombinationsNumbers(k, m);
    }

    result.innerHTML = resTemplate + '<span style="color: rgb(0, 148, 104);font-weight: bold; border: solid; border-color: grey; border-radius: 4px; border-width: 1px; padding: 0px 10px 0px 10px">' + up / under + '</span>';


}

async function calcUrn2() {
    let result = document.getElementById('result2');
    result.style.display = 'none';
    let error = document.getElementById('error');
    result.innerHTML = '';
    error.innerHTML = '';
    let n = parseInt(document.getElementById('inp-n2').value);
    let m = parseInt(document.getElementById('inp-m2').value);
    let k = parseInt(document.getElementById('inp-k2').value);
    let r = parseInt(document.getElementById('inp-r2').value);
    let under = 1;
    let up = 1;

    if (isNaN(n)) {
        error.innerHTML = 'Error: Non-numeric parameter (n)';
        return;
    } else if (isNaN(k)) {
        error.innerHTML = 'Error: Non-numeric parameter (k)';
        return;
    } else if (n < 0) {
        error.innerHTML = 'Error: (n) less than zero';
        return;
    } else if (k < 0) {
        error.innerHTML = 'Error: (k) less than zero';
        return;
    } else if (n < k) {
        error.innerHTML = 'Error: (n) less than (k)';
        return;
    } else {
        under = await calcCombinationsNumbers(k, n);
    }

    if (isNaN(m)) {
        error.innerHTML = 'Error: Non-numeric parameter (m)';
        return;
    } else if (m < 0) {
        error.innerHTML = "Error: (m) less than zero";
        return;
    } else if (m > n) {
        error.innerHTML = "Error: (m) should be less than (n)";
        return;
    } else if (k > m) {
        error.innerHTML = "Error: (k) should be less than (m)";
        return;
    } else if (isNaN(r)) {
        error.innerHTML = "Error: Non-numeric parameter (r)";
        return;
    } else if (r < 0) {
        error.innerHTML = "Error: (r) less than zero";
        return;
    } else if (r > k) {
        error.innerHTML = "Error: (r) should be less than (k)";
        return;
    } else {
        let up1 = await calcCombinationsNumbers(r, m);
        let up2 = await calcCombinationsNumbers(k - r, n - m);
        up = up1 * up2;
    }
    result.style.display = 'block';
    result.innerHTML = up / under;
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