
var menuOpen = false;

function openMenu() {
    var menuLinkNode = document.getElementsByClassName("menu-link");
    var menuButtonNode = document.getElementById("menu-btn")
    if (!menuOpen) {
        var i = 0; 
        for (i = 0; i < menuLinkNode.length; i++) {
            menuLinkNode[i].classList.add("show-links");
        }
        menuButtonNode.innerHTML = "-";
        menuOpen = true;
    } else {
        var i = 0; 
        for (i = 0; i < menuLinkNode.length; i++) {
            menuLinkNode[i].classList.remove("show-links");
        }
        menuButtonNode.innerHTML = "+";
        menuOpen = false;
    }
}
