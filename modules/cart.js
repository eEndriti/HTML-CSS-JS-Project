
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
    .then(data => {
        alert('Product was successfully added to cart!');
        location.reload(true);
      })
    .catch(error => alert(error))
    
}
 function checkout(){
  
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
        .then(data => {
            alert('Your Product is on Route and it will arrive soon!');
            emptyCart()
          })
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
    
 function emptyCart(){
   
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
             
              items.forEach(item =>{
                
                fetch(`https://63bdd688585bedcb36a2d792.mockapi.io/cart/${item}`, {
                  method: "DELETE",
                  headers: {
                      'Content-type': 'application/json'
                  }
              }).then(res => res.json())
              .catch(error => console.log(error))
               })
            }).then(data => {
                alert('Cart Deleted!');
                location.reload(true);
              }) 
  
   
  
  }
  
 function getCart(div){
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
              <tr class="fs-5 bg-dark fw-bold">
                <th style="border-bottom:2px solid #f46533 !important">Nr.</th>
                <th style="border-bottom:2px solid #f46533 !important">Product</th>
                <th style="border-bottom:2px solid #f46533 !important">Price per QTY</th>
                <th style="border-bottom:2px solid #f46533 !important">QTY</th>
                <th style="border-bottom:2px solid #f46533 !important">Total</th>
                <th style="border-bottom:2px solid #f46533 !important">Options</th>
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
  
  
 function deleteProductFromCart(id){
    fetch(`https://63bdd688585bedcb36a2d792.mockapi.io/cart/${id}`, {
      method: "DELETE",
      headers: {
          'Content-type': 'application/json'
      }
  })
  
  .then(res => res.json())
  .then(data => {
    alert('Product Deleted!');
    location.reload(true);
  })
  .catch(error => console.log(error))
  

}