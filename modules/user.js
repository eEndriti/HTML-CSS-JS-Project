
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