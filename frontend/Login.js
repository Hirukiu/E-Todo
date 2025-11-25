

// On récupère la modale 
const modal = document.getElementById("userFormLogin");

// Quand l'utilisateur clique en dehors de la modale → on la ferme
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("userFormLogin");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // empêche la soumission classique

        // On récupère les données du formulaire
        const user = {
            email: document.getElementById("email").value,
            password: document.getElementById("pwd").value
        };

        // Envoi au backend
        const res = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
    });
});
const btnforregister = document.querySelector(".btnforlogin");

btnforregister.addEventListener("click", function (event) {
    const form = document.getElementById('userFormLogin');
    form.style.display = 'block';
    form.style.width = 'auto';
});

const closeElement = document.querySelector(".close");

closeElement.addEventListener("click", function () {
    const form = document.getElementById("userFormLogin");
    form.style.display = "none";
});

const cancelBtn = document.querySelector(".cancelbtn");

cancelBtn.addEventListener("click", function () {
    const form = document.getElementById("userFormLogin");
    form.style.display = "none";
});


