
document.addEventListener("DOMContentLoaded", function(){
    // Handler when the DOM is fully loaded

    // grap the values from LocalStorage

    var fname = localStorage.getItem('fname');
    var lname = localStorage.getItem('lname-input');
    var phone = localStorage.getItem('phone-input');
    var company = localStorage.getItem('company');


    document.addEventListener('submit',e=>{
        e.preventDefault();
        const formInput = e.target;
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
             }
             else{
                 formInput.reset();
                 document.getElementById("prompt").innerHTML="Something went wrong, please try again";
                 document.getElementById("prompt").style.color="red";
             }
         })
         .catch(err=>console.log(err));
        
    })
});

