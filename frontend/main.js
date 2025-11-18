js


// On récupère la modale
const modal = document.getElementById("userForm");

// Quand l'utilisateur clique en dehors de la modale → on la ferme
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});



document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("userForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // empêche la soumission classique

        // On récupère les données du formulaire
        const user = {
            email: document.getElementById("email").value,
            name: document.getElementById("name").value,
            firstname: document.getElementById("fname").value,
            password: document.getElementById("pwd").value
        };

        // Envoi au backend
        const res = await fetch("/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });

        const result = await res.json();
        console.log("Réponse du serveur :", result);
    });
});