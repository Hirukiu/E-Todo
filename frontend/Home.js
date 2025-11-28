

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
                        <div class="align">
                        <p class="status">${task.status}</p>
                        <button class="edit-btn" data-id="${task.id}">Edit</button>
                        <button class="delete-btn" data-id="${task.id}">Delete</button>
                        </div>
                    </div>
                </div>`;

                    // 3. Ajouter au conteneur
                    container.appendChild(taskDiv);
                });

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
                        const result = await res.json();
                        console.log(result);
                        //si j'ai une reponse serv je delete
                        if (res.ok) {
                            window.location.href = "http://localhost:8080/Home.html"
                        }
                        else {
                            console.error("Erreur lors de la suppression");
                        }
                    })

                })
            });

    }
});




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




document.getElementById("closeEditModal").onclick = () => {
    document.getElementById("editModal").style.display = "none";
};


document.getElementById("saveEditBtn").addEventListener("click", function () {
    document.addEventListener("click", function (e) {


        if (e.target.classList.contains("edit-btn")) {
            const taskId = e.target.dataset.id;
            const title = document.getElementById("editTitle").value;
            const desciption = document.getElementById("editDescription").value;
            const due_time = document.getElementById("task-time-to_edit").value;
            const status = document.getElementById("editStatus").value;
            const user_id = localStorage.getItem("id");
            document.getElementById("saveEditBtn").dataset.id = taskId;
            UpdateTodo(taskId, title, desciption, due_time, user_id, status);




            document.getElementById("editModal").style.display = "block";


        }
    });
});




document.getElementById("add-task-btn").addEventListener("click", async () => {
    console.log("hello world")
    const title = document.getElementById("task-name").value
    const description = document.getElementById("task-description").value
    const due_time = document.getElementById("task-time-to").value
    const status = document.getElementById("task-priority").value

    const user_id = localStorage.getItem("id");

    const res = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers:
        {
            "Authorization": localStorage.getItem('token'),
            "Content-Type": "application/json"
        },

        body: JSON.stringify
            ({
                title: title,
                description: description,
                due_time: due_time,
                user_id: localStorage.getItem("id"),
                status: status
            })
    })
        .then(() => {
            window.location.href = "http://localhost:8080/Home.html";
        })
});

//------------------------------------------------------ fonction pour la route delete ----------------------------------------------------//
//
// pour l'utiliser appeler DeleteUser sans paramétre supprimera l'utilisateur actuel et avec un parametre supprimera l'utilisateur a l'id  //
//
// DeleteUser(int id);
// DeleteUser(); 
// Return {"msg": "Successfully deleted record number: ${id}"} si c'est bon ou un message d'erreur classique

async function DeleteUser() {
    const res = await fetch(`http://localhost:5000/users/${localStorage.getItem("id")}`,
        {
            method: "DELETE",
            headers:
            {
                "Authorization": localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
        });
    return res;
}

async function DeleteUser(id) {
    const res = await fetch(`http://localhost:5000/users/${id}`,
        {
            method: "DELETE",
            headers:
            {
                "Authorization": localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
        });
    return res.json();
}

//---------------------------------------- fonction pour update user ---------------------------------------------------------//
//  
//  met a jour un user peut s'appeler avec ou sans id        
//                                                                                                                  
//  UpdateUser(id, email, password, firstname, name)
//  UpdateUser(email, password, firstname, name)
//
//
//  return {
//      "id": 1,
//      "email": email ,
//      "password":  hashed password  ,
//      "create _at": "XXXX-XX-XX XX:XX:XX" ,
//      "firstname": firstname ,
//      "name": name
//  }
//----------------------------------------------------------------------------------------------------------------------------//

async function UpdateUser(id, email, password, firstname, name) {
    const res = await fetch(`http://localhost:5000/users/${id}`,
        {
            method: "PUT",
            headers:
            {
                "Authorization": localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify
                ({
                    "email": email,
                    "password": password,
                    "firstname": firstname,
                    "name": name
                })
        }
    );
    return res.json();
}

async function UpdateUser(email, password, firstname, name) {
    const res = await fetch(`http://localhost:5000/users/${localStorage.getItem("id")}`,
        {
            method: "PUT",
            headers:
            {
                "Authorization": localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify
                ({
                    "email": email,
                    "password": password,
                    "firstname": firstname,
                    "name": name
                })
        }
    );
    return res.json();
}

//---------------------------------------- fonction pour put todo ---------------------------------------------------------//
//  
//  met a jour un todo       
//    
//  Update le todo par les valeur en parametres:                                                                                                              
//  UpdateTodo(id, title, description, due_time, user_id, status)
//  
//  modifier seulement le status :
//  UpdateTodo(id, status)
//
//  modifer le update par la value 
//  UpdateTodo(id, Update, Value)
// 
//  ex:
//  Update(1, "desciption", "faire une fonction put todo");
//  Update(5, "user_id", 3);
//
//
//  return the Updated Todo
//
//-------------------------------------------------------------------------------------------------------------------------//

async function UpdateTodo(id, title, description, due_time, user_id, status) {
    const res = await fetch(`http://localhost:5000/todos/${id}`,
        {
            method: "PUT",
            headers:
            {
                "Authorization": localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify
                ({
                    "title": title,
                    "description": description,
                    "due_time": due_time,
                    "user_id ": user_id,
                    "status": status
                })
        }
    );
    return res.json();
}

// async function UpdateTodo(id, status) {
//
//     const resp = await fetch(`http://localhost:5000/todos/${id}`,
//         {
//             method: "GET",
//             headers:
//             {
//                 "Authorization": localStorage.getItem('token'),
//                 "Content-Type": "application/json"
//             },
//         }
//     );
//     const result = resp.json();

//     const res = await fetch(`http://localhost:5000/todos/${id}`,
//         {
//             method: "PUT",
//             headers:
//             {
//                 "Authorization": localStorage.getItem('token'),
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify
//                 ({
//                     "title": result.title,
//                     "description": result.description,
//                     "due_time": result.due_time,
//                     "user_id ": result.user_id,
//                     "status": status
//                 })
//         }
//     );
//     return res.json();
// }

// async function UpdateTodo(id, Update, value) {

//     const resp = await fetch(`http://localhost:5000/todos/${id}`,
//         {
//             method: "GET",
//             headers:
//             {
//                 "Authorization": localStorage.getItem('token'),
//                 "Content-Type": "application/json"
//             },
//         }
//     );
//     const result = resp.json();
//     let res
//     switch (Update) {
//         case "title":
//             res = await fetch(`http://localhost:5000/todos/${id}`,
//                 {
//                     method: "PUT",
//                     headers:
//                     {
//                         "Authorization": localStorage.getItem('token'),
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify
//                         ({
//                             "title": value,
//                             "description": result.description,
//                             "due_time": result.due_time,
//                             "user_id ": result.user_id,
//                             "status": result.status
//                         })
//                 }
//             );
//             return res.json();
//         case "description":
//             res = await fetch(`http://localhost:5000/todos/${id}`,
//                 {
//                     method: "PUT",
//                     headers:
//                     {
//                         "Authorization": localStorage.getItem('token'),
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify
//                         ({
//                             "title": result.title,
//                             "description": value,
//                             "due_time": result.due_time,
//                             "user_id ": result.user_id,
//                             "status": result.status
//                         })
//                 }
//             );
//             return res.json();
//         case "due_time":
//             res = await fetch(`http://localhost:5000/todos/${id}`,
//                 {
//                     method: "PUT",
//                     headers:
//                     {
//                         "Authorization": localStorage.getItem('token'),
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify
//                         ({
//                             "title": result.title,
//                             "description": result.description,
//                             "due_time": value,
//                             "user_id ": result.user_id,
//                             "status": result.status
//                         })
//                 }
//             );
//             return res.json();
//         case "user_id ":
//             res = await fetch(`http://localhost:5000/todos/${id}`,
//                 {
//                     method: "PUT",
//                     headers:
//                     {
//                         "Authorization": localStorage.getItem('token'),
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify
//                         ({
//                             "title": result.title,
//                             "description": result.description,
//                             "due_time": result.due_time,
//                             "user_id ": value,
//                             "status": result.status
//                         })
//                 }
//             );
//             return res.json();
//         case "status":
//             res = await fetch(`http://localhost:5000/todos/${id}`,
//                 {
//                     method: "PUT",
//                     headers:
//                     {
//                         "Authorization": localStorage.getItem('token'),
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify
//                         ({
//                             "title": result.title,
//                             "description": result.description,
//                             "due_time": result.due_time,
//                             "user_id ": result.user_id,
//                             "status": status
//                         })
//                 }
//             );
//             return res.json();
//         default:
//             console.log("truc a update pas bon")
//     }

// }




