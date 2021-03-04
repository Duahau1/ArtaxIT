
// create a trouble ticket

function createTroubleT(){

    fetch("https://mcval.herokuapp.com/ticket/create_pic",{
         method: 'POST',
         //credentials: 'include', it was requiered before that the credentials, now it says req to be a wild *.*
         headers:{
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('token')
         },
         body:JSON.stringify(req),
     }) 
     .then(result=>result.json())
     .then(data=>{
         if(data.status==="good"){ 
             console.log(data.message);
         }
         else{
             inputFields.reset();
             document.getElementById("prompt").innerHTML="Something went wrong, try again";
             document.getElementById("prompt").style.color="red";
         }
     })
     .catch(err=>console.log(err));

}



//functio to add more input file (image/png, image/jpeg)

function add_pic() {

    var nele = document.querySelectorAll('.photos').length;

        if (nele < 3 ) 
            {   
                var child = document.createElement('input');
                child.name = 'Image'+nele;
                child.setAttribute("id", "add-img-btn");
                child.setAttribute("type", "file");
                child.setAttribute("accept", "image/png, image/jpeg");
                child.setAttribute("class", "form photos")
                child.addEventListener("change", function() {
                    add_pic(); // add event to the new input file
                });
                document.getElementById("pics").appendChild(child);
                nele++;
                var a = document.getElementById('pics').children;
                console.log(a);
                var parent = document.getElementById("pics");
                for (let index = 0; index < a; index++) {
                    const element = parent.children[index].name;
                    console.log(element);
                }


            }


}

// lister to the input file change numbers of photos

// document.getElementById("add-img-btn").addEventListener("change", function() {

//     add_pic();
//   });

  // check for form for photos

function checkfp(e) {
    e.preventDefault();
     var faf = document.querySelectorAll('.photos');
    // var dform = document.getElementById('fticket');
    var i = 1;
    var pic = 0;
    if (faf.length){
            while ( i < faf.length) {
                // localize file var in the loop
                var file = faf[i];
                if (file['files']['length'] != 0) 
                {
                    pic+=file['files']['length'];
                }
                else
                {
                    file.removeAttribute("name"); // remove input name
                    file.remove(); // remove input
                }
                i++;
            } // end while
    }// end if


    // if statement to determine which endpoint to call
    if (faf[0]['files']['length'] != 0 && pic >= 0)
    {   
        //route with photos
           pform(e);
           
    }
    else{
        // route without photos
            eform(e);
    }


} //end checkfp


// Handler when the DOM is fully loaded

document.addEventListener("DOMContentLoaded", function () {
        if (localStorage.getItem('token')) {

            document
                    .getElementById('fticket')
                    .addEventListener('submit', checkfp);
          }
         
       else{

            localStorage.clear();
            window.location.href = "../index.html";
        }
            
    });
        
function eform(e){ // json fields * ticket without photo

        //prevent reload
        e.preventDefault();

        //formdata 
        let form = document.getElementById('fticket');
        var ftd = new FormData(form);

        //end point
        let endpoint = "https://mcval.herokuapp.com/ticket/create";
        //defining the header
        let h = new Headers;
        //h.append ('Content-Type', 'application/json');
        h.append ('authorization', localStorage.getItem('token'));
        //post request object to the endpoint
        let req = new Request(endpoint,{
            method: 'POST',
            headers: h,
            body: ftd
        });
        //execute a request

        fetch(req)
        .then((res) => res.json())
            .then((data) =>{
                console.log('Status endpoint '+ data.status +' msg'+ data.message);

                if(data.status==="good"){ 
                        console.log(data.message);
                }
                else if (data.status==="err" ){
                        alert(data.message);
                }
                else {
                        console.log(data.message);
                }
                // reset form
                form.reset();
            })
            .catch(console.warn);
    }

//function to implement the route form with pictures

function pform(e) { //photos form

    console.log('form have photos');

    //prevent reload
        e.preventDefault();

        //formdata 
        //form ticket data = ftd
        let form = document.getElementById('fticket');
        var ftd = new FormData(form); 
        
        //end point
        let endpoint = "https://mcval.herokuapp.com/ticket/create_pic";
        //defining the header
        let h = new Headers;
        h.append ('authorization', localStorage.getItem('token'));

        //h.append ('Content-Type','multipart/form-data');
        //post request object to the endpoint
        let req = new Request(endpoint,{
            method: 'POST',
            headers: h,
            body: ftd
        });

        // using fetch api, execute a request

        fetch(req)
        .then((res) => res.json())
        .then((data) =>{

                if(data.status==="good"){ 
                    console.log(data.message);
                }
                else if (data.status==="err" ){
                    alert(data.message);
                }
                else {
                    console.log(data.message);
                }
                // reset form
                form.reset();
            })
        .catch(console.warn);
        
}
   
        

   











