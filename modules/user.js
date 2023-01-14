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
    .then(data => window.confirm('You were succesfully registred!'))
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
        localStorage.setItem('kaAdmin',true)
    }
}

function addToCart(){

    const userId = localStorage.getItem('CurrentID')
    const qty = document.getElementById('qty-input').value
    const prd = document.getElementsByTagName('h3')
    const price = document.getElementsByTagName('p')
    const afterFirstCut = price[2].innerHTML.substring(4)
    const afterSecondCut = afterFirstCut.substring(0,afterFirstCut.length-4)

    
    fetch(`https://63bdd688585bedcb36a2d792.mockapi.io/cart`, {
     method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        product: prd[0].innerHTML,
        userId:userId ,
        qty: qty ,
        price: afterSecondCut                   
    })
    })
    .then(response => response.json())
    .then(data => window.confirm('Product was successfully added to cart!'))
    .catch(error => alert(error))
    
}
function checkout(){

    const cart = JSON.parse(localStorage.getItem("cart"));
    for(let i = 0 ; i < cart.length;i++){
       
        fetch(`https://63bdd688585bedcb36a2d792.mockapi.io/cart/${cart[i]}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            }
        })
        
        .then(res => res.json())
        .then(data => console.log('done'))
        .catch(error => console.log(error))
  }
  

}