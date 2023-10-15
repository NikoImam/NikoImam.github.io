async function viewBlocks() {
    await viewHeader();
}

async function viewHeader() {
    header = document.getElementById("header");
    let response = await fetch('navbar.html');
    let body = await response.text();
    header.innerHTML = body;
}

async function viewFooter() {

}