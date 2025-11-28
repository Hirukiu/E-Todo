

// On récupère la modale 
const modal = document.getElementById("userFormRegister");

// Quand l'utilisateur clique en dehors de la modale → on la ferme
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});




document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("userFormRegister");

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
        const res = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });

        const result = await res.json();
        if (result == { "msg": "Account already exists"} ) 
            {
             messageDiv.textContent = "Cet utilisateur existe deja";
             messageDiv.style.color = 'red'; 
            }
        else {
             window.location.href = "http://localhost:8080/index.html";
            }
    });
});
const btnforregister = document.querySelector(".btnforregister");

btnforregister.addEventListener("click", function (event) {
    const form = document.getElementById('userFormRegister');
    form.style.display = 'block';
    form.style.width = 'auto';
});

const closeElement = document.querySelector(".close");

closeElement.addEventListener("click", function () {
    const form = document.getElementById("userFormRegister");
    form.style.display = "none";
});