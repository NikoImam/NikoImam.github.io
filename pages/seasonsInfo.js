async function getAllSeasonsList() {
    let response = await fetch('https://ergast.com/api/f1/seasons.json?limit=70');
    if (response.ok) {
        let json = await response.json();
        let seasons = json.MRData.SeasonTable.Seasons;
        const selectList = document.getElementById("season-select");
        for (let i = 0; i < seasons.length; i++) {
            let option = document.createElement("option");
            option.innerHTML = seasons[i].season;
            option.value = seasons[i].season;
            selectList.appendChild(option);
        }
    } else {
        alert("Ошибка: " + response.status);
    }
}

async function getAllRoundsList() {
    let selectedSeason = document.querySelector('#season-select');
    let year = selectedSeason.value;
    let response = await fetch('http://ergast.com/api/f1/' + year + '.json?limit=30');
    if (response.ok) {
        let json = await response.json();
        let races = json.MRData.RaceTable.Races;
        const selectList = document.getElementById("round-select");
        selectList.innerHTML = '<option value="" selected disabled>Choose round</option>';
        for (let i = 0; i < races.length; i++) {
            let option = document.createElement("option");
            option.innerHTML = races[i].round;
            option.value = races[i].round;
            selectList.appendChild(option);
        }
    } else {
        alert("Ошибка: " + response.status);
    }
}

async function getSeasonInfo() {
    let selectedSeason = document.querySelector('#season-select');
    let year = selectedSeason.value;
    let selectedRound = document.querySelector('#round-select');
    let round = selectedRound.value;
    let response = await fetch('http://ergast.com/api/f1/' + year + '/' + round + '/results.json');
    if (response.ok) {
        let json = await response.json();
        let info = json.MRData.RaceTable.Races[0];
        document.getElementById("info").innerHTML =
            "<p>Season: " + year + '</p>' +
            "<p>Round: " + round + '</p>' +
            "<p>Race: " + info.raceName + '</p>' +
            "<p>Circuit: " + info.Circuit.circuitName + '</p>' +
            "<p>Date: " + info.date + '</p>' +
            "<p>Winner: " + info.Results[0].Driver.givenName + ' ' + info.Results[0].Driver.familyName + '</p>' +
            "<p>Number: " + info.Results[0].number + '</p>' +
            "<p>Grid: " + info.Results[0].grid + '</p>' +
            "<p>Constructor: " + info.Results[0].Constructor.name + '</p>' +
            "<p>Time: " + info.Results[0].Time.time + '</p>';
        document.getElementById("info").style.border = "2px solid rgba(111, 106, 172, 0.788)";
    } else {
        alert("Ошибка: " + response.status);
    }
}
