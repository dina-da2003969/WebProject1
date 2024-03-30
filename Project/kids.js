fetch('kids.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(kids) {
        localStorage.kids = JSON.stringify(kids);
    })
    .catch(function(error) {
        console.error('Something went wrong');
        console.log(error);
    });

    fetch('login.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(obj) {
        localStorage.user = JSON.stringify(obj);
    })
    .catch(function(error) {
        console.error('Something went wrong');
        console.log(error);
    });

    


document.addEventListener('DOMContentLoaded', showItems);

function showItems() {
    let kidsData = JSON.parse(localStorage.kids);
    const kidsSection = document.querySelector('#kidssection');
    let HTMLItems = '';

    kidsData.forEach(category => {
        Object.keys(category).forEach(categoryName => { 
            HTMLItems += category[categoryName].map(item => 
                `<div class="card">
                    <img src="${item.image}" alt="">
                    <h5>${item.description}</h5>
                    <h5>${item.price}QR</h5>
                    <div class="btn-box">
                        <button class="add-basket" id="basket"  onclick = "AddCart(${item})" >Add to Cart</button>
                    </div>
                </div>
            `).join('')
        })
    })

    kidsSection.innerHTML=HTMLItems;
    const addButtons = document.querySelectorAll('#basket');
    addButtons.forEach(button => {
        button.addEventListener('click', AddCart);
    });
}






function AddCart(item){
    let userData =JSON.parse(localStorage.user)
    const loggedIn= userData.find(user=>user.status==true && user.type=="customer")
    if(!loggedIn){
        window.location.href="./login.html"
        return
    }
    loggedIn.cart.push(item)
    localStorage.user=JSON.stringify(userData)

}
