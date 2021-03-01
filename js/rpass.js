// after Dom Conntent loaded, listen to this events

document.addEventListener("DOMContentLoaded", function () {
    document
            .getElementById('rpf')
            .addEventListener('submit', rpass);    
});

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

//implementing end point
// endpoint https://mcval.herokuapp.com/user/forgotpassword
// { //required to for forgot password endpoint
//     "email": "juan@mcval.net,
//     "username": "juanmcval"
//    }

// test with other than test8 account

function rpass(e) { //get reset password link

    //prevent reload
    e.preventDefault();
    //fields data fd
    let fd = document.getElementsByClassName('input');
    if (valid()) {
        //body field expected by the end point
    let bf ={
        "password":fd[0].value
    }
    //end point
    let pa = getParameterByName('au');
    let endpoint = 'https://mcval.herokuapp.com/user/resetpassword?au='+pa;
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
                console.log('Please '+data.message);
                fd[0].value ='';
                fd[1].value ='';
                location = 'https://artax-it.vercel.app'
                        }
                else{
                    alert(data.message);
                    
                            }
    })
    .catch(console.warn);
    }
    else {

    } // end form validation
            
}

//validate password
function valid() {
    //password
    let param = document.getElementsByClassName('input');

    if (param[0].value == param[1].value){
        return true; // passwords are equals :)
    }
    else {
        return false; // passwords are not equals :/
    }
}
