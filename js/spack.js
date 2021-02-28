// careBasic 
document.getElementById("careBasic").addEventListener('click', () => {
    //"https://mcval.herokuapp.com/dashboard/subscription/createAgreement/1"
    fetch("https://mcval.herokuapp.com/dashboard/subscription/createAgreement/1", {
        headers: {
            'authorization': localStorage.getItem('token')
        }
    }).then(res => res.json()).then(res => window.location.href = res.url);
})

// carePlus
document.getElementById("carePlus").addEventListener('click', () => {
    //"https://mcval.herokuapp.com/dashboard/subscription/createAgreement/2"
    fetch("https://mcval.herokuapp.com/dashboard/subscription/createAgreement/2", {
        headers: {
            'authorization': localStorage.getItem('token')
        }
    }).then(res => res.json()).then(res => window.location.href = res.url);
})

// carePro
document.getElementById("carePro").addEventListener('click', () => {
    //"https://mcval.herokuapp.com/dashboard/subscription/createAgreement/3"
    fetch("https://mcval.herokuapp.com/dashboard/subscription/createAgreement/3", {
        headers: {
            'authorization': localStorage.getItem('token')
        }
    }).then(res => res.json()).then(res => window.location.href = res.url);
})

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem('token')) {
        console.log('ready')
    } else {
        localStorage.clear();
        window.location.href = "../index.html";
    }
});