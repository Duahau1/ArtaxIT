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

// populating dashboard with data

// Handler when the DOM is fully loaded

document.addEventListener("DOMContentLoaded", function(){
    
    fetch("https://mcval.herokuapp.com/dashboard",{
        //credentials: 'include', it was requiered before that the credentials, now it says req to be a wild *.*
        headers:{
           'authorization': 'bearer '+ localStorage.getItem(token)
        }
    })
    .then(result=>result.json())
    .then(data=>{
        if(!data.status){                 
            
            //last item of the array data.trouble_ticket.ticket
            data.trouble_ticket.ticket
            
            data.subcription
           
        }
        else{
            formInput.reset();
            document.getElementById("prompt").innerHTML="Incorrect username or password";
            document.getElementById("prompt").style.color="red";
        }
    })
    .catch(err=>console.log(err));
   
});


    

