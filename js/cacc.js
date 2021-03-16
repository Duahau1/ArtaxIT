// JS file for create_account.html

// getting URL paramenter

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }


document.addEventListener("DOMContentLoaded", function(){
    // Handler when the DOM is fully loaded
    

    document.addEventListener('submit',e=>{
        e.preventDefault();
        const formInput = e.target;
        // grap the values from LocalStorage
        var fname = getParameterByName('fname');
        var lname = getParameterByName('lname');
        var phone = getParameterByName('phone');
        var company = getParameterByName('company');
        console.log (fname);
        console.log (lname);
        console.log (phone);
        console.log (company);
        let inputField=[...formInput.querySelectorAll('input')]
        
        let req= { 
            // fname 
            "first_name":fname,
            // lname 
            "last_name":lname,
            // phone 
            "phone_number":phone,
            // company 6
            "company_name":company,
            // username 1
            "username":inputField[1].value,
            // password 2
            "password":inputField[2].value,
            //email 
            "email":inputField[0].value
        }
    
       fetch(formInput.action,{
            method:formInput.method,
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(req),
        })
        .then(result=>result.json())
        .then(data=>{
            if(data.status==="good"){
                //user is redirected to login
                localStorage.clear();
                window.location.href= "../index.html";
            } else {
                formInput.reset();
                document.getElementById("prompt").innerHTML=data.message;
                document.getElementById("prompt").style.color="red";
            }
        })
        .catch(err=>console.log(err));
     })
});