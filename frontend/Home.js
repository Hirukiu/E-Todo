

document.addEventListener("DOMContentLoaded", async () => {
    const res = await fetch("http://localhost:5000/users/" + localStorage.getItem('email'),
        {
            method: "GET",
            headers:
            {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
            },

        }
    );
    const result = await res.json();



    localStorage.setItem('id', result[0].id);


    if (result.msg === "Token is not valid" || result.msg === "No token, authorization denied") {
        console.log("Token not valid");
        console.log(result.msg);
        window.location.href = "http://localhost:8080/index.html";
    }
    else {
        localStorage.setItem('id', result[0].id);


        fetch("http://localhost:5000/user/todos",
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



                    // 1. Créer une div pour la tâche
                    const taskDiv = document.createElement("div");
                    taskDiv.classList.add("task");

                    // 2. Ajouter le contenu
                    taskDiv.innerHTML = `
                <div class="tasks">
                    <div class="task">
                        <div class="title">
                        <h3 class="task-title">${task.title}</h3>
                        </div>
                        <p class="description">${task.description}</p>
                        <p class="task-time">${task.due_time}</p>
                        <p>${task.status}</p>
                        <button class="edit-btn" data-id="${task.id}">Edit</button>
                        <button class="delete-btn" data-id="${task.id}">Delete</button>
                    </div>
                </div>`;

                    // 3. Ajouter au conteneur
                    container.appendChild(taskDiv);
                });

            });

    }});


document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", async function () {
        console.log("hello world");
        const taskId = this.dataset.id;
        const res = await fetch(`http://localhost:5000/todos/${taskId}`, {
            method: "DELETE",
            headers:
            {
                "Authorization": localStorage.getItem('token'),
                "Content-Type": "application/json"
            }
        });

        //si j'ai une reponse serv je delete
        if (res.ok) {
            this.closest(".task").remove();
            const result = await res.json();
            console.log(result);
        }
        else {
            console.error("Erreur lors de la suppression");
        }
    })
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



const eventsArr = [
    {
        day: 26,
        month: 11,
        year: 2025,
        events: [
            {
                title: "Task 1 lorem ipsum e-todo",
                time: "09:45 AM",
            },
            {
                title: "Task 2",
                time: "10:30 AM",
            },
        ],
    },
];






const addEventTitle = document.querySelector(".task-name"),
    addEventFrom = document.querySelector(".task-time-from"),
    addEventTo = document.querySelector(".task-time-to");


addEventTitle.addEventListener("input", (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 50);
});

addEventFrom.addEventListener("input", (e) => {
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
    if(addEventFrom.value.length === 2) {
        addEventFrom.value += ":";
    }
    if(addEventFrom.value.length > 5) {
        addEventFrom.value = addEventFrom.value.slice(0, 5);
    }
});

addEventTo.addEventListener("input", (e) => {
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
    if(addEventTo.value.length === 2) {
        addEventTo.value += ":";
    }
    if(addEventTo.value.length > 5) {
        addEventTo.value = addEventTo.value.slice(0, 5);
    }
});

const addEventSubmit = document.querySelector(".add-task-btn");

addEventSubmit.addEventListener("click", () => {
    const eventTitle = addEventTitle.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value;


    if(eventTitle === "" || eventTimeFrom === "" || eventeventTimeToTimeFrom === ""){
        alert("Please fill all the fields");
        return
    }
    const timeFromArr = eventTimeFrom.split(":");
    const timeToArr = eventTimeTo.split(":");

    if(
        timeFromArr.length !== 2 ||
        timeToArr.length !== 2 ||
        timeFromArr[0] > 23 ||
        timeFromArr[1] > 59 ||
        timeToArr[0] > 23 ||
        timeToArr[1] > 59 
    ) {
        alert("Invalid Time Format");
    }

    const timeFrom = convertTime(eventTimeFrom);
    const timeTo = convertTime(eventTimeTo);

    const newEvent = {
        title: eventTitle,
        time: timeFrom + " - " + timeTo,
    };
    let eventAdded = false;
    
});

function convertTime(time) {
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}