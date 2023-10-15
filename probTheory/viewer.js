async function viewBlocks() {
    await viewHeader();
    await viewFooter();
}

async function viewHeader() {
    header = document.getElementById("header");
    let response = await fetch('navbar.html');
    let body = await response.text();
    header.innerHTML = body;
}

async function viewFooter() {
    footer = document.getElementById("footer");
    let response = await fetch('footer.html');
    let body = await response.text();
    footer.innerHTML = body;
}