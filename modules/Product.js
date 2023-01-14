export function getProduct(div,category,limit){
    let result = ''
    fetch(`https://63bdd384e348cb0762043976.mockapi.io/products`)
        .then(response => response.json())
        .then(data => {
            const products = data
           
            let i = 0
                products.forEach(product =>{
                    if((i < limit || limit === null) && product.category === category){
                        result +=`
                        
                    <div class="card bg-transparent m-2 " style="width: 18rem;">
                        <img src="${product.image}" class="card-img-top img-fluid" alt="...">
                        <div class="card-body ">
                            <h5 class="card-title  text-light">${product.name}</h5>
                            <p class="card-text text-warning fw-bold">$${product.price}</p>
                            <a href="product.html?ctg=${category}&id=${product.id}" class="btn btn-primary float-start">View Details</a>
                        </div>
                    </div>
                    </div>       `
                            i++
                    }
            })
            
           
            document.getElementById(div).innerHTML = result
        })
        
}

export function getAllProducts(div){
    let result = ''
    let i = 0
    fetch(`https://63bdd384e348cb0762043976.mockapi.io/products`)
        .then(response => response.json())
        .then(products => {
            result += `
            <tr class="fs-5 bg-dark fw-bold">
                <td style="border-bottom:2px solid #f46533 !important">Nr.</td>
                <td style="border-bottom:2px solid #f46533 !important">Name</td>
                <td style="border-bottom:2px solid #f46533 !important">Description</td>
                <td style="border-bottom:2px solid #f46533 !important">Price</td>
                <td style="border-bottom:2px solid #f46533 !important">QTY</td>
                <td style="border-bottom:2px solid #f46533 !important">Category</td>
                <td style="border-bottom:2px solid #f46533 !important">Image</td>
                <td style="border-bottom:2px solid #f46533 !important">Options</td>
            </tr>
            `
            products.forEach(product =>{
                        i++           
                result += `
                    <tr>
                        <td>${i}</td>
                        <td>${product.name}</td>
                        <td>${product.description}</td>
                        <td>$${product.price}</td>
                        <td>${product.qty}</td>
                        <td>${product.category}</td>
                        <td><img src="${product.image}" class="img-fluid" style="width:20vh"/></td>
                        <td><button type="button" id="deleteProduct" class="btn btn-outline-danger fw-bold " style="background-color:transparent !important;color:white;border:2px solid red !important"  value="${product.id}">Delete</button></td>
                    </tr>
                `
                
            })
            
           
            document.getElementById(div).innerHTML = result
        })
        
}

export function getOneProduct(table,id,div){
    let result = ''
    fetch(`https://63bdd384e348cb0762043976.mockapi.io/products/${id}`)
        .then(response => response.json())
        .then(product => {
                 
                        if(isUser()){
                            result +=`
                        
                        <div class="row m-5 d-flex flex-row justify-content-center">
                        <div class="col-xl-4 col-lg-4 col-md-4 col-xs-12 ">
                            <img src="${product.image}" class="img-fluid w-75 float-center" alt="...">
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-6 col-xs-12 text-light" >
                        <h3 style="border-bottom:1px solid white; id="product-name">${product.name}</h3>
                        <p><span class="badge bg-warning text-dark">${table}</span></p>
                        <p>${product.description}</p>
                        <p class="mt-4"><b>$ ${product.price}</p>                     
                           <div class="d-flex flex-row">
                                <input type="number" value="1" min="0" max="10" class="form-control w-25 me-2" id="qty-input"/>                           
                                <button class="btn btn-sm btn-primary" onClick="addToCart()">Add to cart</button> 
                           </div>         
                        </div>
                    </div>      `
                          
                    
                        }
           
            
           
            document.getElementById(div).innerHTML = result
        })
        
}



export function addProduct(name,desc,price,qty,ctg,image){
    fetch(`https://63bdd384e348cb0762043976.mockapi.io/products`, {
        method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
            name: name,
            description: desc,
            price: price,                
            image: image,
            qty: qty,
            category: ctg
       }         )
       })
       .then(response => response.json())
       .then(data =>{
        alert('Product succesfully registred!');
        location.reload(true);
      }) 
       .catch(error => alert(error))
}
export function deleteProduct(id){

        fetch(`https://63bdd384e348cb0762043976.mockapi.io/products/${id}`, {
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
 





