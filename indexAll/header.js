

// side menu hamburger
function openMenu() {
    document.getElementById("slideMenu").style.width = "250px";
}

function closeMenu() {
    document.getElementById("slideMenu").style.width = "0";
}

document.querySelectorAll('.slide-menu a').forEach(item => {
    item.addEventListener('click', event => {
        closeMenu();
    });
});

function goMain() {
    window.location.href = 'index.html';
  }
  