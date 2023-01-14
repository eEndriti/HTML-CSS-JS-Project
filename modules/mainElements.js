export function getNavbar(div){
  let active = 'pizza'
  const user = localStorage.getItem('hasUser')
    let compose_html = `
    <div class="container-fluid">
      <a class="navbar-brand " href="#">
        <img src="/assets/images/logo.png" alt="">
          <span class="p-2 ">
            FOODER
            </span>
      </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse " id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link  " id="index" aria-current="page" href="/index.html">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " id="pizza" href="/pizza.html">Pizza</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " id="burgers" href="/burgers.html" >Burgers</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " id="sushi" href="/sushi.html" >Sushi</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " id="contact" href="/contact.html" >Contact</a>
        </li>
        <li class="nav-item d-none" id="cart-li">
          <a class="nav-link " id="cart" href="/cart.html" >Cart</a>
        </li>
        <li class="nav-item d-flex ">
           <a class="nav-link log-in" id="login" href="/login.html" >Log In <i style="margin-left:5px"class="fa-solid fa-arrow-right-to-bracket"></i></a>
           <a class="nav-link d-none sign-out" id="sign-out" >Sign Out <i style="margin-left:5px; margin-top:4px"class="fa-solid fa-right-from-bracket"></i></a>
           <a class="nav-link d-none" id="admin" href="/admin/adminProducts.html">Manage Products</a>
           <a class="nav-link d-none" id="admin1" href="/admin/adminOrders.html">Manage Orders</a>
         </li>
      </ul>
                       
    </div>
  </div>
    `
    
   document.getElementById(div).innerHTML = compose_html
   setActive()

   if(localStorage.getItem('hasUser') === 'kaUser'){
      const s = document.getElementById('sign-out')
      s.classList.remove('d-none')  
      s.classList.add('d-flex')    
      const l = document.getElementById('login')
      l.classList.remove('d-flex')
      l.classList.add('d-none')
      const ad = document.getElementById('admin')
      ad.classList.remove('d-none')
      ad.classList.add('d-flex')
      const ad1 = document.getElementById('admin1')
      ad1.classList.remove('d-none')
      ad1.classList.add('d-flex')
      const a = document.getElementById('cart-li')
      a.classList.remove('d-none')
      a.classList.add('d-flex')
   }
}



function setActive() {
  let url = document.URL
  const fullName = url.split('/')[3]
  const seperatedName = fullName.split('.')[0]
  const id = document.getElementById(seperatedName)
  
  
    try{
      id.classList.add('active')
    }catch(error){
      console.log(error)
    }
  
  }
  


export function getFooter(div){
  let compose_html = `
    <div class="container ">
      <div class="row text-light ">
      <div class="col-xl-4 col-lg-4 col-md-4 col-xs-12">
        <p class="m-2">Information</p>
        <div class="lists">
          <ul class="">
            <li><a href="#" class="text-light">ABOUT</a></li>
            <li><a href="#" class="text-light">DELIVERY INFORMATION</a></li>
            <li><a href="#" class="text-light">PRIVACY POLICY</a></li>
            <li><a href="#" class="text-light">TERMS & CONDITIONS</a></li>
            <li><a href="#" class="text-light">CONTACT US</a></li>
            <li><a href="#" class="text-light">BLOG</a></li>
          </ul>
        </div>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 col-xs-12">
        <p>Categories</p>
        <div class="lists">
          <ul>
            <li><a href="#" class="text-light">ABOUT</a></li>
            <li><a href="#" class="text-light">DELIVERY INFORMATION</a></li>
            <li><a href="#" class="text-light">PRIVACY POLICY</a></li>
            <li><a href="#" class="text-light">TERMS & CONDITIONS</a></li>
            <li><a href="#" class="text-light">CONTACT US</a></li>
            <li><a href="#" class="text-light">BLOG</a></li>
          </ul>
        </div>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 col-xs-12">
        <p>Contact Us</p>
        <div class="lists">
          <ul>
            <li><a href="#" class="text-light">ABOUT</a></li>
            <li><a href="#" class="text-light">DELIVERY INFORMATION</a></li>
            <li><a href="#" class="text-light">PRIVACY POLICY</a></li>
            <li><a href="#" class="text-light">TERMS & CONDITIONS</a></li>
            <li><a href="#" class="text-light">CONTACT US</a></li>
            <li><a href="#" class="text-light">BLOG</a></li>
          </ul>
        </div>
      </div>
    </div>
    </div>
   
  `
 
 document.getElementById(div).innerHTML = compose_html
 
}


export function getItemFromURL(url, item) {
  if(!url.includes('?')) return null
  const url_sp = new URLSearchParams(url.split('?')[1])
  return url_sp.get(item)
  
}

export function getCart(div){
  let result = ''
  const currentUser = localStorage.getItem('CurrentID')
  var cartTotal = 0;
  const wholeCart = [];
    fetch(`https://63bdd688585bedcb36a2d792.mockapi.io/cart`)
        .then(response => response.json())
        .then(data => {
            const products = data
            let nr = 1;
            result += `
            <tr>
              <th>Nr.</th>
              <th>Product</th>
              <th>Price per QTY</th>
              <th>QTY</th>
              <th>Total</th>
              <th>Options</th>
            </tr>
            `
                products.forEach(product =>{
                  
                    if(product.userId ===currentUser){
                      const qty = product.qty
                      let pricePerQty = product.price
                      let total = qty*pricePerQty 
                      total = parseInt(total,10)
                      cartTotal += total
                      wholeCart.push(product.CartID)
                     result +=`
                     
                       <tr>
                        <td>${nr}</td>
                        <td>${product.product}</td>                       
                        <td>$${pricePerQty}</td>
                        <td> <input type="number" value="${qty}" min="0" max="10" class="form-control w-25 p-2 bg-transparent text-light" style="border-radius:5px;"id="qty-input"/> </td>
                        <td style="background-color:rgba(61, 61, 61,0.5)">$${total}.00</td>
                        <td class="text-center"><button type="button" id="deleteProductFromCart" class="btn btn-outline-danger fw-bold " style="background-color:transparent !important;color:white;border:2px solid red !important"  value="${product.CartID}">Delete</button></td>
                      </tr>
                        
                       `
                       nr++  
                    }
                   
            })
            
            
            document.getElementById(div).innerHTML = result
            document.getElementById('cart-total').innerHTML = 'Total: $'+cartTotal+'.00'
            localStorage.setItem('cart',JSON.stringify(wholeCart))
        })
        
}



export function emptyCart(){
  
  const userId = localStorage.getItem('CurrentID')
  const items = []

  fetch(`https://63bdd688585bedcb36a2d792.mockapi.io/cart`)
        .then(response => response.json())
        .then(data => {
          const products = data
          products.forEach(product =>{
                  if(product.userId === userId){
                    console.log(product.CartID)
                    
                    items.push(product.CartID)                 
                  }            
            })
            console.log(items)
            items.forEach(item =>{
              console.log(item+' inside')
              fetch(`https://63bdd688585bedcb36a2d792.mockapi.io/cart/${item}`, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json'
                }
            }).then(res => res.json())
            .then(data => console.log('done'))
            .catch(error => console.log(error))
             })
          })

 

}


export function checkout(){
  
const total = document.getElementById('cart-total').innerHTML.substring(8)
const user = localStorage.getItem('userEmail')
const date = getDateAndTime()
   
    fetch(`https://63bdd688585bedcb36a2d792.mockapi.io/order`, {
      method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        user: user,
        Total:total ,
        TimeOfOrder: date                   
    })
    })
    .then(response => response.json())
    .then(data => window.confirm('Your Product is on Route and it will arrive soon!'))
    .catch(error => alert(error))
    
 
}

function getDateAndTime(){
  var currentdate = new Date(); 
  var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + "  "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

                return datetime
}

export function deleteProductFromCart(id){
    fetch(`https://63bdd688585bedcb36a2d792.mockapi.io/cart/${id}`, {
      method: "DELETE",
      headers: {
          'Content-type': 'application/json'
      }
  })
  
  .then(res => res.json())
  .then(data => alert('Product Deleted!'))
  .catch(error => console.log(error))
 

}
export function getAllOrders(div){
 
    let result = ''
    let i = 0
    fetch(`https://63bdd688585bedcb36a2d792.mockapi.io/order`)
        .then(response => response.json())
        .then(orders => {
            result += `
            <tr class="fs-5 bg-dark fw-bold">
                <td style="border-bottom:2px solid #f46533 !important">Nr.</td>
                <td style="border-bottom:2px solid #f46533 !important">User</td>
                <td style="border-bottom:2px solid #f46533 !important">Amount</td>
                <td style="border-bottom:2px solid #f46533 !important">Date & Time</td>
                <td style="border-bottom:2px solid #f46533 !important">Options</td>
                
            </tr>
            `
            orders.forEach(order =>{
                        i++           
                result += `
                    <tr>
                        <td>${i}</td>
                        <td>${order.user}</td>
                        <td>$${order.Total}</td>
                        <td>${order.TimeOfOrder}</td>
                        <td><button type="button" id="deleteProduct" class="btn btn-outline-danger fw-bold " style="background-color:transparent !important;color:white;border:2px solid red !important"  value="${order.id}">Delete</button></td>
                    </tr>
                `
                
            })
            
           
            document.getElementById(div).innerHTML = result
        })
        
}
 export function deleteOrder(){
        alert('order called')
  }   