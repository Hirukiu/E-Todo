const resp = fetch("http://localhost:5000/users/" + localStorage.getItem('email'),
    {
        method: "GET",
        headers:
        {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token')
        },
        
    }
);
localStorage.setItem(resp.json().id);


const res = fetch("http://localhost:5000/users/" + localStorage.getItem('id'),
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token')
        },
    }) // endpoint API
    .then(res => res.json())
    .then(tasks => {
        const container = document.getElementById("task-container");

        tasks.forEach(task => {
            // 1. Créer un div pour la tâche
            const taskDiv = document.createElement("div");
            taskDiv.classList.add("task");

            // 2. Ajouter le contenu
            taskDiv.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>${task.due_time}</p>
                <p>${task.status}</p>
                <button class="delete-btn" data-id="${task.id}">Supprimer</button>
            `;

            // 3. Ajouter au conteneur
            container.appendChild(taskDiv);
        });
    })





const toggleButton = document.getElementById('toggle-btn')
const sidebar = document.getElementById('sidebar')

function toggleSidebar() {
    sidebar.classList.toggle('close')
    toggleButton.classList.toggle('rotate')

    closeAllSubMenus()

}


function toggleSubMenu(button) {

    if (!button.nextElementSibling.classList.contains('show')) {
        closeAllSubMenus()
    }

    button.nextElementSibling.classList.toggle('show')
    button.classList.toggle('rotate')

    if (sidebar.classList.contains('close')) {
        sidebar.classList.toggle('close')
        toggleButton.classList.toggle('rotate')
    }
}
function closeAllSubMenus() {
    Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
        ul.classList.remove('show')
        ul.previousElementSibling.classList.remove('rotate')
    })
}

let modal = document.getElementById('Folder-mod');
let btn = document.getElementById('Folder');

let span = document.getElementsByClassName("cls")[0];

btn.onclick = function () {
    modal.style.display = "block";
}
span.onclick = function (event) {
    modal.style.display = "none"
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none"
    }
}
