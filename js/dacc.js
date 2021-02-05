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
function logOut(){  

    localStorage.clear();
    window.location.href ="artaxit.com";

}

// populating dashboard with data

// Handler when the DOM is fully loaded

document.addEventListener("DOMContentLoaded", function(){
    
    fetch("https://mcval.herokuapp.com/dashboard",{
        //credentials: 'include', it was requiered before that the credentials, now it says req to be a wild *.*
        headers:{
          
           'authorization': 'bearer '+ localStorage.getItem('token')
        }
    })
    .then(result=>result.json())
    .then(data=>{
        if(data.subcription.status === "good"){                 
            
            //last item of the array data.trouble_ticket.ticket
            var last = data.trouble_ticket.ticket.length;
            document.getElementById("tid").innerHTML = data.trouble_ticket.ticket[last].id;
            if (!data.trouble_ticket.ticket[last].status > 0)
            { document.getElementById("tstatus").innerHTML = 'Open'; }
            else{ document.getElementById("tstatus").innerHTML = 'Close'; }            
            
            //populate subcription info    
            document.getElementById("splan").innerHTML = data.subcription.planName;
        }
        else{
            
            console.log(data.status);
        }
    })
    .catch(err=>console.log(err));
   
});


    

