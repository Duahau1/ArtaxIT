// after Dom Conntent loaded, listen to this events

  document.addEventListener("DOMContentLoaded", function () {
        document
                .getElementById('fpf')
                .addEventListener('submit', fpass);    
    });

//implementing end point
// endpoint https://mcval.herokuapp.com/user/forgotpassword
// { //required to for forgot password endpoint
//     "email": "juan@mcval.net,
//     "username": "juanmcval"
//    }

//

// reset fields tag elements with property of value
function resetf() {
    let fields = document.getElementsByClassName('input');

   
    fields[0].value = '';
    //fields[0].classList.add('class','not');
    //fields[0].addEventListener('change', trya);

    fields[1].value = '';
    //fields[1].classList.add('class','not');
    //fields[1].addEventListener('change', trya);
    
    fields[0].focus();
}

// try again reset bg color

function trya() {
    let fields = document.getElementsByClassName("input");

    
    fields[0].classList.remove('class','not');
    fields[0].removeEventListener('change', trya);

   
    fields[1].classList.remove('class','not');
    fields[1].removeEventListener('change', trya);
}

// test with other than test8 account

function fpass(e) { //get reset password link

        //prevent reload
        e.preventDefault();
        //fields data fd
        let fd = document.getElementsByClassName("input");
        //body field expected by the end point
        let bf ={
            "email":fd[1].value,
            "username":fd[0].value
        }
        //end point
        let endpoint = "https://mcval.herokuapp.com/user/forgotpassword";
        //defining the header
        let h = new Headers;
        h.append ('Content-Type', 'application/json');
        //post request object
        let req = new Request(endpoint,{
            method: 'POST',
            headers: h,
            body:JSON.stringify(bf)
        });
        //execute a request

        fetch(req)
        .then((res) => res.json())
        .then((data) =>{
            console.log('Response endpoint'+ data.message);

            if(data.status==="good"){ 
                    fd[0].value ='';
                    fd[1].value ='';
                    location = 'https://user.artaxit.com/reset_ty.html';
                            }
                    else{
                        alert( data.message + ", please verify and try again");
                        resetf();

                                }
        })
        .catch(console.warn);
                
}
