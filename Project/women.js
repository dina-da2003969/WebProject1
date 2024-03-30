
fetch('women.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(women) {
        localStorage.women = JSON.stringify(women);
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
    fetch('items.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(item) {
        localStorage.item = JSON.stringify(item);
    })
    .catch(function(error) {
        console.error('Something went wrong');
        console.log(error);
    });
    


document.addEventListener('DOMContentLoaded', showItems);

function showItems() {
    let WomenData = JSON.parse(localStorage.women);
    const womenSection = document.querySelector('#womensection');
    let HTMLItems = '';

    WomenData.forEach(category => {
        Object.keys(category).forEach(categoryName => { 
            HTMLItems += category[categoryName].map(item => 
                `<div class="card">
                    <img src="${item.image}" alt="">
                    <h5>${item.description}</h5>
                    <h5>${item.price}QR</h5>
                    <div class="btn-box">
                   <button class="add-basket" id="basket" onclick="AddCart(${item.id})" >Add to Cart</button>
                    </div>
                </div>
            `).join('')
        })
    })

    womenSection.innerHTML = HTMLItems;
    const addButtons = document.querySelectorAll('#basket');
    addButtons.forEach(button => {
        button.addEventListener('click', AddCart);
    });
}





function AddCart(id){
   let WomenData=JSON.parse(localStorage.women)
    let userData =JSON.parse(localStorage.user)
    const loggedIn= userData.find(user=>user.status==true && user.type=="customer")
    if(!loggedIn){
        window.location.href="./login.html"
        return
    }
    const item=WomenData.find(ele=>ele.id==id)
    loggedIn.cart.push(item)
    localStorage.user=JSON.stringify(userData)

}


    searchBar=document.querySelector('#search')
    searchBar.addEventListener("keyup", searchItems)
    function searchItems(searchBar){
        let availableItems = []
        const itemsData = JSON.parse(localStorage.item)
        if(!searchBar)
            return
        const filteredItems = itemsData.reduced(item.forEach(ele => ele.description.toLowerCase().includes(searchBar) && item.amount > 0))
        availableItems.push(filteredItems)
        displayItems(availableItems) 
    }
    
    // searchBar.addEventListener('keyup', (e) => {
    //     const searchData = e.target.value.toLowerCase();
    //     const filteredData = itemsData.filter((item) => {
    //         return (
    //             item.description.toLowerCase().includes(searchData)
    //         );
    //     });
    //     displayItem(filteredData);
    // });

// let itemsData = JSON.parse(localStorage.item)
//   // Get unique categories
//   const categories = [...new Set(itemsData.map(item => item.category))];
  
//   document.getElementById('searchBar').addEventListener('keyup', (e) => {

//     const searchData = e.target.value.toLowerCase();
//     const filteredData = itemsData.filter(item => item.description.toLowerCase().includes(searchData));
//     displayItem(filteredData);
//   });
  
    function displayItems(availableItems){
    document.getElementById('main').innerHTML = availableItems.map(item => {
      return `
        <div class="card">
          <img src="${item.image}" alt="">
          <h5>${item.description}</h5>
          <h5>${item.price}QR</h5>
          <div class="btn-box">
            <button class="add-basket" onclick="AddCart(${JSON.stringify(item)})">Add to Cart</button>
          </div>
        </div>
      `;
    }).join('');
  };
  
  displayItem(availableItems); 