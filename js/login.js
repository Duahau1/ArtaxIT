document.addEventListener("DOMContentLoaded", function(){
    // Handler when the DOM is fully loaded

    document.addEventListener('submit',e=>{
        e.preventDefault();
        const formInput = e.target;
        let inputField=[...formInput.querySelectorAll('input')]
        let req= {
            "username":inputField[0].value,
            "password":inputField[1].value
        }
        fetch(formInput.action,{
             method:formInput.method,
             credentials: 'include',
             headers:{
                'Content-Type': 'application/json'
             },
             body:JSON.stringify(req),
         })
         .then(result=>result.json())
         .then(data=>{
             if(data.status==="good"){
                 /*var user_token = data. how can pass a Json Token to the next url?*/
                 window.location.href = "dashboard.html"

             }
             else{
                 formInput.reset();
                 document.getElementById("prompt").innerHTML="Incorrect username or password";
                 document.getElementById("prompt").style.color="red";
             }
         })
         .catch(err=>console.log(err));
        
    })

  });

   
