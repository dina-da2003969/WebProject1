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
    document.addEventListener('DOMContentLoaded', showCart);
    function showCart() {
        let userData = JSON.parse(localStorage.user);
        const cart = document.querySelector('#cart');
        let HTMLItems = '';
    
        // Find the logged-in user
        const loggedInUser = userData.find(user => user.status === true && user.type === "customer");
        if (loggedInUser) {
            loggedInUser.cart.forEach(item => {
                HTMLItems += `
                    <div class="card">
                        <img src="${item.image}" alt="">
                        <h5>${item.description}</h5>
                        <h5>${item.price}QR</h5>
                        <div class="btn-box">
                            <button class="remove-basket" id="basket">Remove from Cart</button>
                        </div>
                    </div>
                `;
            });
        } else {
            // Handle case where no customer is logged in
            HTMLItems = "<p>No items in the cart. Please log in as a customer.</p>";
        }
    
        cart.innerHTML = HTMLItems;
        const addButtons = document.querySelectorAll('#basket');
    addButtons.forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}
    
    
    function removeFromCart(itemId) {
        let userData = JSON.parse(localStorage.user);
     // Find the logged-in customer
        const loggedInUserIndex = userData.findIndex(user => user.status === true && user.type === "customer");
        if (loggedInUserIndex !== -1) {
            // Find the item index in the cart array of the logged-in user
            const itemIndex = userData[loggedInUserIndex].cart.findIndex(item => item.id === itemId);
            if (itemIndex !== -1) {
                // Remove the item from the cart array
                userData[loggedInUserIndex].cart.splice(itemIndex, 1);
                
                // Update localStorage
                localStorage.user = JSON.stringify(userData);
    
                // Update the cart display
                showCart();
            }
        }
    }
    