const toggleButton = document.getElementById('toggle-btn')
const sidebar = document.getElementById('sidebar')

function toggleSidebar() {
    sidebar.classList.toggle('close')
    toggleButton.classList.toggle('rotate')
}

async function loadUserInfo() {
   
    const res = await getCurrentUser();
    
    const user = res[0];
    console.log(user)
    const dateObject = new Date(user.created_at);

    document.querySelector('.name').textContent = user.name;
    document.querySelector('.firstname').textContent = user.firstname;
    document.querySelector('.create_at').textContent = dateObject.toLocaleString('fr-FR');
    document.querySelector('.email').textContent = user.email;
}

document.addEventListener('DOMContentLoaded', loadUserInfo);




//------------------------------------------------------ fonction pour get l'user ----------------------------------------------------//
//

async function getCurrentUser() {
    const res = await fetch(`http://localhost:5000/users/${localStorage.getItem("id")}`,
        {
            method: "GET",
            headers:
            {
                "Authorization": localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
        });
    return await res.json();
}


//------------------------------------------------------ fonction pour la route delete ----------------------------------------------------//
//
// pour l'utiliser appeler DeleteUser sans paramétre supprimera l'utilisateur actuel et avec un parametre supprimera l'utilisateur a l'id  //
//
// DeleteUser(int id);
// DeleteUser(); 
// Return {"msg": "Successfully deleted record number: ${id}"} si c'est bon ou un message d'erreur classique

async function DeleteCurrUser() {
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

async function UpdateCurrUser(email, password, firstname, name) {
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