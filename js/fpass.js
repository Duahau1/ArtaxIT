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

// test with other than test8 account

function fpass(e) { //get reset password link

        //prevent reload
        e.preventDefault();
        //fields data fd
        let fd = document.getElementsByClassName('input');
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
                    console.log('Response endpoint'+data.message);
                    fd.reset();
                            }
                    else{
                        console.log('ohoo!'+data.message);
                        
                                }
        })
        .catch(console.warn);
                
}
