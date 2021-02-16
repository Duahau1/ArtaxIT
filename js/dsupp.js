
// create a trouble ticket



let ticket_wp = [

    "issue",
    "description",
    "priority",
    "image"

]

 //evaluate if the form have or not a picture on it
    //POST https://mcval.herokuapp.com/ticket/create_pic"

    /** It is required a form */
    // key              Value
    //issue             Wrong file
    //description       Something is wrong
    //status            1
    //priority          1
    //image             file.png/jpeg

    //response
    //status    : good / bad
    //message:  ticket created successfully
//-------------------------------------------------
    //POST https://mcval.herokuapp.com/ticket/create"
    // {
    //     "issue":"error in test5",                                    status: good
    //     "description":"something is wrong with the index file"       message : "blabla"
    // }
//----------------------------------------------------

    //GET https://mcval.herokuapp.com/ticket/view
            
        // {
        //     "status": "good",
        //         "ticket": [
        //             {
        //                 "id": 1,
        //                 "issue": "test1",
        //                 "description": "test wrong",
        //                 "datetime": "2021-02-01T08:46:52.000Z",
        //                 "priority": 0,
        //                 "status": 0,
        //                 "customer": 14,
        //                 "published_at": null,
        //                 "created_by": null,
        //                 "updated_by": null,
        //                 "created_at": "2021-02-01T08:46:52.000Z",
        //                 "updated_at": "2021-02-01T08:46:52.000Z",
        //                 "image_link": null
        //             }
        //         ]
        // }



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



const npic = 3;
var nele =1;

//functio to add more input file (image/png, image/jpeg)

function add_pic() {
/* <div id="pics">
<input id="add-img-btn" type="file"  accept="image/png, image/jpeg" name="filename">
</div> 
'<input id="add-img-btn" type="file"  accept="image/png, image/jpeg" name="filename">'
*/


if (nele < 3 ) 
    {   
        var child = document.createElement('input');
        child.name = 'file'+nele;
        child.setAttribute("id", "add-img-btn");
        child.setAttribute("type", "file");
        child.setAttribute("accept", "image/png, image/jpeg");
        child.addEventListener("click", function() {
            add_pic();
          });
        document.getElementById("pics").appendChild(child);
        nele++;
        // var a = document.getElementById('pics').children;
        // console.log(a);
        // var parent = document.getElementById("pics");
        // for (let index = 0; index < a; index++) {
        //     const element = parent.children[index].name;
        //     console.log(element);
        // }


    }


}

//lister to the input file change

// document.getElementById("add-img-btn").addEventListener("click", function() {
//     add_pic();
//   });






// Handler when the DOM is fully loaded

document.addEventListener("DOMContentLoaded", function () {
        if (localStorage.getItem('token')) {

            document
                    .getElementById('fticket')
                    .addEventListener('submit', htform);
          }
         
       else{

            localStorage.clear();
            window.location.href = "../index.html";
        }
            
        });
        
    function htform(e){

        //prevent reload
        e.preventDefault();
        //formdata 
        let fticket = e.target;
        //form ticket data = ftd
        let ftd = new FormData(fticket);
        console.log(ftd);
        for (let key of ftd.keys()) {
            console.log(key,ftd.get(key));  
        }
        //end point
        let endpoint = "https://mcval.herokuapp.com/ticket/create";
        //defining the header
        let h = new Headers;
        h.append('Content-Type', 'Multipart/form-data');
        h.append ('authorization', localStorage.getItem('token'));
        //post request object to the endpoint
        let req = new Request(endpoint,{
            headers: h,
            body: ftd,
            method: 'POST',
        });

        //execute a request

        fetch(req)
        .then((res) => res.json())
        .then((data) =>{
            console.log('Response endpoint'+ data.message);

            if(data.status==="good"){ 
                    console.log(data.message);
                             }
                    else{
                         document.getElementById('issue').value ='';
                         document.getElementById('desc').value = '';
                        //  document.getElementById("prompt").innerHTML="Something went wrong, try again";
                        //  document.getElementById("prompt").style.color="red";
                                }
        })
        .catch(console.warn);
    }

        
// // 	https://mcval.herokuapp.com/ticket/create

//         fetch(formInput.action,{
//                 method:formInput.method,
//                 headers:{
//                 'Content-Type': 'application/json',
//                 'authorization': localStorage.getItem('token')
//                 },
//                 body:JSON.stringify(req),
//             }) 
//             .then(result=>result.json())
//             .then(data=>{
//                 if(data.status==="good"){ 
//                     console.log(data.message);
//                 }
//                 else{
//                     document.getElementById('issue').value ='';
//                     document.getElementById('desc').value = '';
//                     document.getElementById("prompt").innerHTML="Something went wrong, try again";
//                     document.getElementById("prompt").style.color="red";
//                 }
//             })
//             .catch(err=>console.log(err));
    

//     }    
        

   











