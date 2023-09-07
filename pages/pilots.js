async function viewPilots() {
    let response = await fetch('http://ergast.com/api/f1/drivers.json?limit=30');

    if (response.ok) {
        let json = await response.json();
        let drivers = json.MRData.DriverTable.Drivers;

        const list = document.getElementById("pilots-list");

        for (let i = 0; i < drivers.length; i++) {
            const pilotInfo = document.createElement("li");
            pilotInfo.setAttribute("class", "pilotInfo");

            const pilotInfoList = document.createElement("ul");
            pilotInfoList.setAttribute("class", "pilotInfoList");

            let name = document.createElement("li");
            name.innerHTML = drivers[i].givenName;
            name.setAttribute("class", "pilotLi")


            let familyName = document.createElement("li");
            familyName.innerHTML = drivers[i].familyName;
            familyName.setAttribute("class", "pilotLi");

            let dateOfBirth = document.createElement("li");
            dateOfBirth.innerHTML = drivers[i].dateOfBirth;
            dateOfBirth.setAttribute("class", "pilotLi");

            let wiki = document.createElement("li");
            let wikiRef = document.createElement("a");
            wikiRef.href = drivers[i].url;
            wikiRef.innerHTML = "wiki";
            wiki.setAttribute("class", "pilotLi");
            wiki.appendChild(wikiRef);

            pilotInfoList.appendChild(name);
            pilotInfoList.appendChild(familyName);
            pilotInfoList.appendChild(dateOfBirth);
            pilotInfoList.appendChild(wiki);
            pilotInfo.appendChild(pilotInfoList);
            list.appendChild(pilotInfo);
        }
    } else {
        alert("Ошибка: " + response.status);
    }
}
