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
function removeList() {
    const removeElements = (elms) => elms.forEach(el => el.remove());
    removeElements(document.querySelectorAll(".item_benefit"));
}
function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
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
        if (getParameterByName("token") == null) {
            getData();
        }
        else{
            let token = getParameterByName("token");
            let ba_token = getParameterByName("ba_token");
            fetch(`https://mcval.herokuapp.com/dashboard/subscription/purchase?token=${token}&ba_token=${ba_token}`,{
                headers: {

                    'authorization': localStorage.getItem('token')
                }
            }).then(res=>res.json()).then(data=>{
                if(data.status=="good"){
                    window.location.href="../dashboard.html";
                }
                else{
                    console.log("data payment did not go through")
                }
            })
        }
    }
    else {
        localStorage.clear();
        window.location.href = "../index.html";
    }
});

function getData(){
    fetch("https://mcval.herokuapp.com/dashboard", {
                //credentials: 'include', it was requiered before that the credentials, now it says req to be a wild *.*
                headers: {

                    'authorization': localStorage.getItem('token')
                }
            })
                .then(result => result.json())
                .then(data => {
                    if (data.hasOwnProperty("trouble_ticket")) {
                        //last item of the array data.trouble_ticket.ticket

                        var last = data.trouble_ticket.ticket.length - 1;
                        if (last >= 0) {
                            document.getElementById("tid").innerHTML = data.trouble_ticket.ticket[last].id;
                            document.getElementById("tdescription").innerHTML = data.trouble_ticket.ticket[last].description;
                            if (!data.trouble_ticket.ticket[last].status > 0)
                                document.getElementById("tstatus").innerHTML = 'Open';
                            else
                                document.getElementById("tstatus").innerHTML = 'Close';
                        }
                    }
                    if (data.hasOwnProperty("subscription")) {
                        //populate subcription info    
                        document.getElementById("splan").innerHTML = data.subscription.planName;
                        for (let i = 0; i < careBasic_benefits.length && data.subscription.planName != "none"; i++) {
                            let child = document.createElement('li');
                            child.innerHTML = careBasic_benefits[i];
                            child.dataset.name = careBasic_benefits[i];
                            child.setAttribute("class", "item_benefit");
                            document.getElementById("plan_benefits").appendChild(child);
                        }
                        if (data.subscription.planName != "none") {
                            let child = document.createElement('button');
                            child.innerHTML = "Cancel Subscription";
                            child.setAttribute("class", "info info-btn");
                            let sub_panel = document.querySelectorAll(".overview-item")[1]
                            document.getElementById("purchase").style.visibility = "hidden";
                            sub_panel.appendChild(child);
                            child.addEventListener('click', () => {
                                fetch("https://mcval.herokuapp.com/dashboard/subscription/cancel", {
                                    headers: {
                                        'authorization': localStorage.getItem('token')
                                    }
                                }).then(res => res.json()).then(data => {
                                    if (data.status == "good") {
                                        window.location.href="../dashboard.html";
                                    }
                                    else{
                                        console.log(data.message);
                                    }
                                })
                            })

                        }

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


