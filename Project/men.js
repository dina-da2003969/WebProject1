fetch('men.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(men) {
        localStorage.men = JSON.stringify(men);
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
    let menData = JSON.parse(localStorage.men);
    const menSection = document.querySelector('#mensection');
    let HTMLItems = '';

    menData.forEach(category => {
        Object.keys(category).forEach(categoryName => { 
            HTMLItems += category[categoryName].map(item => 
                `<div class="card">
                    <img src="${item.image}" alt="">
                    <h5>${item.description}</h5>
                    <h5>${item.price}QR</h5>
                    <div class="btn-box">
                        <button class="add-basket" id="basket" >Add to Cart</button>
                    </div>
                </div>
            `).join('')
        })
    })

    menSection.innerHTML = HTMLItems;
    const addButtons = document.querySelectorAll('#basket');
    addButtons.forEach(button => {
        button.addEventListener('click', AddCart);
    });
}



function AddCart(item) {
    
    let userData = JSON.parse(localStorage.user);
    const loggedInUser = userData.find(user => user.status === true);
    if (!loggedInUser) {
        window.location.href = "./login.html";
        return; // Stop execution
    }
    loggedInUser.cart.push(item);
    localStorage.user = JSON.stringify(userData);

   
}
