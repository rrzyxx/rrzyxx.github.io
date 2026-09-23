// =========================
// MOBILE MENU
// =========================

function toggleMenu() {

    const nav = document.querySelector(".navbar nav");

    nav.classList.toggle("active");

}


// =========================
// GAME SEARCH
// =========================

function searchGames() {

    const input =
        document.getElementById("searchInput");

    const search =
        input.value.toLowerCase();

    const cards =
        document.querySelectorAll(".game-card");

    cards.forEach(function(card) {

        const text =
            card.innerText.toLowerCase();

        if (text.includes(search)) {

            card.style.display = "grid";

        } else {

            card.style.display = "none";

        }

    });

}


// =========================
// CLOSE MOBILE MENU
// =========================

document.querySelectorAll(".navbar nav a")
.forEach(function(link) {

    link.addEventListener("click", function() {

        document
            .querySelector(".navbar nav")
            .classList.remove("active");

    });

});
