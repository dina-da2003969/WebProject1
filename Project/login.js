fetch('login.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(user) {
        localStorage.user = JSON.stringify(user);
    })
    .catch(function(error) {
        console.error('Something went wrong');
        console.log(error);
    });

  
const form = document.querySelector("#login-form");
const username = document.querySelector('#username');
const password = document.querySelector('#password');

form.addEventListener("submit", checkInfo);


function checkInfo(e) {
    e.preventDefault();
    const userValue = username.value;
    const passValue = password.value;
    const userData = JSON.parse(localStorage.user);
    const userFound = userData.findIndex(user => user.username === userValue && user.password === passValue);

    if (userFound!==-1) {
        userData[userFound].status = true; 
        localStorage.user = JSON.stringify(userData);
        window.location.href = "./home.html";
    } else {
        alert("Username or password is incorrect");
    }

    form.reset();
}

