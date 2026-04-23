var hamburger = document.getElementById("btn-hamburger");
var menu = document.getElementById("menu-list");

hamburger.onclick = function() {
    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "block"; // Tampilkan menu
    } else {
        menu.style.display = "none"; // Sembunyikan menu
    }
};