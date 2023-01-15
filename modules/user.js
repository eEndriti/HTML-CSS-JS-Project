function addUser(){
           
    const email = document.getElementById('email-input').value
    const ps2 = document.getElementById('ps2-input').value
    const fn = document.getElementById('fn-input').value
    const ls = document.getElementById('ls-input').value
    
    fetch(`https://63bdd384e348cb0762043976.mockapi.io/user`, {
     method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: email,
        password: ps2,
        name: fn,                
        surname: ls,
        role: 'user'
    }         )
    })
    .then(response => response.json())
    .then(data => {
        alert('You were succesfully registred!');
        location.reload(true);
      }) 
    .catch(error => alert(error))
}
function signOut(){
    localStorage.clear()
    window.location.href = "/index.html"
  }
  

function checkUser(){
   
    const email = document.getElementById('email-input').value
    const ps2 = document.getElementById('ps2-input').value       
    const sakt = false
   
    fetch(`https://63bdd384e348cb0762043976.mockapi.io/user`)
        .then(response => response.json())
        .then(users => {
       
                users.forEach(user =>{
                    
                    if(`${user.email}` === email && `${user.password}` === ps2){                       
                        userLogIn(user.id,user.role,user.email)
                        sakt = true
                    }
                   
                })
               
                if(sakt === false){
                    alert('Wrong Username or Password!')
                }
        
        })
      

}

function userLogIn(id,role,email){
    window.location.href="index.html";
    localStorage.setItem('CurrentID',id)
    localStorage.setItem('hasUser','kaUser')
    localStorage.setItem('userEmail',email)
    if(role === 'admin'){
        localStorage.setItem('kaAdmin','admin')
    }else{
        localStorage.setItem('kaAdmin','user')    

    }
}

 function isUser(){
    const u = localStorage.getItem('hasUser')
    if(u === 'kaUser'){
       
        return true
    }else{
        alert('You need to log in to advance!')
        window.location.href="login.html";
        return false
    }

}
function getAllUsers(div){
    let result = ''
    fetch(`https://63bdd384e348cb0762043976.mockapi.io/user`)
    .then(response => response.json())
    .then(users => {
        let nr = 1;
         result += `

        <tr class="fs-5 bg-dark fw-bold">
          <th style="border-bottom:2px solid #f46533 !important">Nr.</th>
          <th style="border-bottom:2px solid #f46533 !important">Fist Name</th>
          <th style="border-bottom:2px solid #f46533 !important">Last Name</th>
          <th style="border-bottom:2px solid #f46533 !important">Email</th>
          <th style="border-bottom:2px solid #f46533 !important">Role</th>
          <th style="border-bottom:2px solid #f46533 !important">Options</th>
        </tr>
        `
        users.forEach(user =>{
                result+= `
                   <tr>
                    <td>${nr}</td>
                    <td>${user.name}</td> 
                    <td>${user.surname}</td>  
                    <td>${user.email}</td> 
                    <td>${user.role}</td>                                           
                    <td class="text-center">
                        <button type="button" id="deleteUser" class="btn btn-outline-danger fw-bold " style="background-color:transparent !important;color:white;border:2px solid red !important"  value="${user.id}">Delete</button>
                        <button type="button" id="editUser" class="btn btn-outline-primary fw-bold " data-bs-toggle="modal" data-bs-target="#editUserModal"style="background-color:transparent !important;color:white;border:2px solid #0a58ca !important"  value="${user.id}">Edit</button>
                    </td>
                  </tr>
                    
                   `
                   nr++  
                })
                document.getElementById(div).innerHTML = result               
               
        })
        
    
}
function deleteUser(id){
    fetch(`https://63bdd384e348cb0762043976.mockapi.io/user/${id}`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json'
        }
    }).then(res => res.json())
    .then(data => {
        alert('User with ID:'+id+' is Deleted!')
        location.reload(true)
    })
    .catch(error => console.log(error))
    
}
function getSpecificUser(id){
    fetch(`https://63bdd384e348cb0762043976.mockapi.io/user/${id}`)
        .then(response => response.json())
        .then(user => {
                      
                  document.getElementById('user-email').value = user.email
                  document.getElementById('user-fsName').value = user.name
                  document.getElementById('user-lsName').value = user.surname
                  document.getElementById('user-email').value = user.email
                  document.getElementById('user-id').value = user.id
                  var select = document.querySelector('#user-role').value = user.role;
                  
                  var modal = document.querySelector('#editUserModal');
                    modal.classList.add('show');
                    modal.setAttribute('aria-hidden', 'false');
                    
        })
}

function editSpecificUser(id){
    
    const email = document.getElementById('user-email').value
    const role = document.getElementById('user-role').value
    const fs = document.getElementById('user-fsName').value
    const ls = document.getElementById('user-lsName').value
    
    fetch(`https://63bdd384e348cb0762043976.mockapi.io/user/${id}`, {
     method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: email,
        name: fs,                
        surname: ls,
        role: role
    }         )
    })
    .then(response => response.json())
    .then(data => {
        alert('User was editet successfully!');
        location.reload(true);
      }) 
    .catch(error => alert(error))
    
}
