// apparence 
var menuOpen = false;

function openMenu() {
    var menuLinkNode = document.getElementsByClassName("menu-link");
    var menuButtonNode = document.getElementById("menu-btn")
    if (!menuOpen) {
        var i = 0;
        for (i = 0; i < menuLinkNode.length; i++) {
            menuLinkNode[i].classList.add("show-links");
        }
        menuButtonNode.innerHTML = "-";
        menuOpen = true;
    } else {
        var i = 0;
        for (i = 0; i < menuLinkNode.length; i++) {
            menuLinkNode[i].classList.remove("show-links");
        }
        menuButtonNode.innerHTML = "+";
        menuOpen = false;
    }
}

// log_out 
function logOut() {

    localStorage.clear();
    window.location.href = "../index.html";

}

// populating dashboard with data

// Handler when the DOM is fully loaded
let careBasic_benefits = [
    "Basic Troubleshooting",
    "Windows/iMac",
    "Remote Desktop",
    "Installation of AntiVirus",
    "Virus, Malware & Spyware Removal",
]

document.addEventListener("DOMContentLoaded", function () {
  
        if (localStorage.getItem('token')) {
            getData();
        }
        else{

            localStorage.clear();
            window.location.href = "../index.html";
        }
    
   
});

//populating dashboard_acc

function getData(){
    fetch("https://mcval.herokuapp.com/user/information", {
                //credentials: 'include', it was requiered before that the credentials, now it says req to be a wild *.*
                headers: {

                    'authorization': localStorage.getItem('token')
                }
            })
                .then(result => result.json())
                .then(data => {
                    if (data.status === "good") {
                        
                        //user 

                        //My info section
                       
                            //populating view

                            console.log(data)

                            document.getElementById("fname-info").innerHTML = data.first_name;
                            document.getElementById("lname-info").innerHTML = data.last_name;
                            document.getElementById("phone-info").innerHTML = data.phone_number;
                            document.getElementById("company-info").innerHTML = data.company_name;
                        
                         
                         //Subscription section
                            fetch("https://mcval.herokuapp.com/dashboard", {
                                headers: {
                                    'authorization': localStorage.getItem('token')
                                }
                            }).then(res => res.json()).then(data => {
                                if (data.subscription.status == "good") {
                                    
                                //populating  view
                                document.getElementById("c-plan").innerHTML = data.subscription.planName;
                                document.getElementById("n-billing").innerHTML = data.subscription.next_billing_day;

                                }
                                else{
                                    console.log(data.message);
                                }
                            })
                        }
                    
                    else {
                        if (data.status == "err" && data.message == "Please log in") {
                            //Just in case the token expire
                            localStorage.clear();
                            window.location.href = "../index.html";
                        }
                    }
                })
                .catch(err => console.log(err));
}


