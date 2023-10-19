async function evalComb(canCalculate) {
    let type = document.querySelector('#type-select').value;
    let repet = document.getElementById('repet').checked;
    let result = document.getElementById('result');
    let description = document.getElementById('description');

    if (!canCalculate) {
        result.innerHTML = '';
        document.getElementById('repet').disabled = false;
        description.innerHTML = '';

        if (type == 'placements') {
            const k = '<input class="input" type="text" id="inp-k" placeholder="k"/>';
            const n = '<input type="text" id="inp-n" placeholder="n"/>';
            description.innerHTML = '<p>k: ' + k + '</p><p>n: ' + n + '</p>';

        } else if (type == 'permutations') {
            const n = '<input class="input" type="text" id="inp-k" placeholder="n"/>';
            const nList = '<input type="text" id="inp-n" placeholder="n1,n2,..."/>';

            if (repet) {
                description.innerHTML = '<p>n: ' + n + '</p><p>n<sub>i</sub> parameters: ' + nList + '</p>';
            } else {
                description.innerHTML = '<p>n: ' + n;
            }
        } else if (type == 'combinations') {
            const k = '<input class="input" type="text" id="inp-k" placeholder="k"/>';
            const n = '<input type="text" id="inp-n" placeholder="n"/>';
            description.innerHTML = '<p>k: ' + k + '</p><p>n: ' + n + '</p>';
        }
    } else {
        if (type == 'placements') {
            const k = parseInt(document.getElementById('inp-k').value);
            const n = parseInt(document.getElementById('inp-n').value);
            if (repet) {
                if (k >= 0 && n >= 0) {
                    result.innerHTML = 'Result: ' + '<span style="color: rgb(0, 148, 104);font-weight: bold; border: solid; border-color: grey; border-radius: 4px; border-width: 1px; padding: 0px 10px 0px 10px">' + await calcPlacementsNumber(k, n, repet) + "</span>";
                } else {
                    result.innerHTML = 'Incorrect input data';
                }
            } else {
                if (k >= 0 && n >= 0 && n >= k) {
                    result.innerHTML = 'Result: ' + '<span style="color: rgb(0, 148, 104);font-weight: bold; border: solid; border-color: grey; border-radius: 4px; border-width: 1px; padding: 0px 10px 0px 10px">' + await calcPlacementsNumber(k, n, repet) + "</span>";
                } else {
                    result.innerHTML = 'Incorrect input data';
                }
            }

        } else if (type == 'permutations') {
            const n = parseInt(document.getElementById('inp-k').value);
            if (repet) {
                const nList = document.getElementById('inp-n').value;
                if (n >= 0 && await checkList(n, nList)) {
                    result.innerHTML = 'Result: ' + '<span style="color: rgb(0, 148, 104);font-weight: bold; border: solid; border-color: grey; border-radius: 4px; border-width: 1px; padding: 0px 10px 0px 10px">' + await calcPermutionsNumber(n, nList, repet) + "</span>";
                } else {
                    result.innerHTML = 'Incorrect input data';
                }
            } else {
                if (n >= 0) {
                    result.innerHTML = 'Result: ' + '<span style="color: rgb(0, 148, 104);font-weight: bold; border: solid; border-color: grey; border-radius: 4px; border-width: 1px; padding: 0px 10px 0px 10px">' + await calcPermutionsNumber(n, NaN, repet) + "</span>";
                } else {
                    result.innerHTML = 'Incorrect input data';
                }
            }

        } else if (type == 'combinations') {
            const k = parseInt(document.getElementById('inp-k').value);
            const n = parseInt(document.getElementById('inp-n').value);
            if (k >= 0 && n >= 0 && (repet == false && n >= k || repet == true && n + k - 1 >= k)) {
                result.innerHTML = 'Result: ' + '<span style="color: rgb(0, 148, 104);font-weight: bold; border: solid; border-color: grey; border-radius: 4px; border-width: 1px; padding: 0px 10px 0px 10px">' + await calcCombinationsNumbers(k, n, repet) + "</span>";
            } else {
                result.innerHTML = 'Incorrect input data';
            }
        }
    }
}

async function checkList(n, nList) {
    let sum = 0;
    let list = nList.split(',');
    let flag = false;
    for (let i = 0; i < list.length; i++) {
        if (parseInt(list[i]) != NaN) {
            sum += parseInt(list[i]);
            flag = true;
        } else {
            flag = false;
            break;
        }
    }

    flag = n == sum;

    return flag;
}

async function calcPlacementsNumber(k, n, isRepet) {
    let res = 1;
    if (isRepet) {
        for (let i = 0; i < k; i++) {
            res *= n;
        }
    } else {
        for (let i = n; i > n - k; i--) {
            res *= i;
        }
    }

    return res;
}

async function calcPermutionsNumber(n, nList, isRepet) {
    let res = 1;

    let a = 1;
    for (let i = 1; i <= n; i++) {
        a *= i;
    }

    if (isRepet) {
        let b = 1;
        for (let i = 0; i < nList.length; i++) {
            let c = 1;
            for (let j = 1; j <= nList[i]; j++) {
                c *= j;
            }
            b *= c;
        }
        res = a / b;
    } else {
        res = a;
    }

    return res;
}

async function calcCombinationsNumbers(k, n, isRepet) {
    let res = 1;
    if (isRepet) {
        let a = 1;
        for (let i = n + k - 1; i > n - 1; i--) {
            a *= i;
        }
        let b = 1;
        for (let i = 1; i <= k; i++) {
            b *= i;
        }
        res = a / b;
    } else {
        let a = 1;
        for (let i = n; i > n - k; i--) {
            a *= i;
        }
        let b = 1;
        for (let i = 1; i <= k; i++) {
            b *= i;
        }
        res = a / b;
    }
    return res;
}