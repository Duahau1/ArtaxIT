
// log_out 
function logOut() {
    localStorage.clear();
    window.location.href = "../index.html";

}
     


document.addEventListener("DOMContentLoaded", function () {
   if (localStorage.getItem('token')) {
                 
            // event listers for previous button
            var pr = document.getElementById('btn_prev');
            pr.addEventListener("click", prevPage);
            // event lister for next button
            var nx = document.getElementById('btn_next');
            nx.addEventListener("click", nextPage);
            getData();
                                       
            
       } 
        
   else {

            localStorage.clear();
            window.location.href = "../index.html";
       }
      
 });

//populate first trouble ticket of the first user
async function getUser() {
   
    var elementCust = document.getElementById("cust");
    var userID = elementCust.value;
    return userID;
}

function getT(userID) {

    //end point
    //all user with open trouble tickets
    let endpoint = " https://mcval.herokuapp.com/admin/getuser_info/"+userID;
    //let endpoint = " https://mcval.herokuapp.com/admin/getAll_Users?status=open";
    //let endpoint = " https://mcval.herokuapp.com/admin/getAll_Users?status=close";
    //defining the header
    let h = new Headers;
    //h.append ('Content-Type', 'application/json');
      h.append ('authorization', localStorage.getItem('token'));
    //post request object to the endpoint
    let req = new Request(endpoint,{
        method: 'GET',
        headers: h
        //body: ftd
    });
    //execute a request

    fetch(req)
    .then((res) => res.json())
        .then((data) =>{
            console.log('Status endpoint '+ data.status);

            if(data.status==="good"){ 
                    console.log(data.status);
                    console.log(data);
                    //fillCustomers(user);
                    
            }
            else if (data.status==="err" ){
                    alert(data.message);
            }
            else {
                    console.log(data.message);
            }
            // reset form
            //form.reset();
        })
        .catch(console.warn);
    
}


//populate customers list
// u -> user[]
// cust = id element to populate
function fillCustomers(u) {

    for (let index = 0; index < u.length; index++) {
        //creating the child element
        var child = document.createElement('option');
                child.value = u[index].id;
                child.id = u[index].id;
                child.text = u[index].company_name;
        //appending element to the parent element
        document.getElementById("cust").appendChild(child);
        
    }
    return u[0].id;

}




 // variable to hold user info and trouble tickets
var user

var nfuser;

var userID =14;
 // getData

 function getData() {

    //end point
    //all user with open trouble tickets
    //let endpoint = " https://mcval.herokuapp.com/admin/getuser_info/"+userID;
    let endpoint = " https://mcval.herokuapp.com/admin/getAll_Users?status=open";
    //let endpoint = " https://mcval.herokuapp.com/admin/getAll_Users?status=close";
    //defining the header
    let h = new Headers;
    //h.append ('Content-Type', 'application/json');
      h.append ('authorization', localStorage.getItem('token'));
    //post request object to the endpoint
    let req = new Request(endpoint,{
        method: 'GET',
        headers: h
        //body: ftd
    });
    //execute a request

    fetch(req)
    .then((res) => res.json())
        .then((data) =>{
            console.log('Status endpoint '+ data.status);

            if(data.status==="good"){ 
                    console.log(data.status);
                    user = data.user;
                    //nfuser = user.length;
                    fillCustomers(user);
                    getUser();
                    return user;
            }
            else if (data.status==="err" ){
                    alert(data.message);
            }
            else {
                    console.log(data.message);
            }
            // reset form
            //form.reset();
        })
        .catch(console.warn);
     
 }




var current_page = 1; // number of tickets open
var tickets_pp = 1; // ticket shown at the time

var objJson = [ //json user
    { 'ticket_id': 0,
      'issue' : 'not internet',
      'description':'Network is fine, but it is just this pc',
      'Image': 'null'  },
    { 'ticket_id': 1,
    'issue' : 'not moneyt',
    'description':'pc not working',
    'Image': 'null'},
    {'ticket_id': 2,
    'issue' : 'not internet',
    'description':'Network is fine, but it is just this pc',
    'Image': 'null'},
    {'ticket_id': 3,
    'issue' : 'not internet',
    'description':'Network is fine, but it is just this pc',
    'Image': 'null'},
    {'ticket_id': 4,
    'issue' : 'I am student',
    'description':'I want a vacation to the bahamas',
    'Image': 'null'}
    
    

]; 

//view to update
// 0 -> ticket_id (id = tid)
// 1 -> issue (id = issue)
// 2 -> description (id = tdescription)
// 3 -> element containing picture (id = tip)

//"javascript:prevPage()" id="btn_prev"
//"javascript:nextPage()" id="btn_next"


function prevPage()
{
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage()
{
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
        
    }
}
    
function changePage(page)
{
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var ticket_details = document.getElementsByClassName("ticket");
    var page_span = document.getElementById("page");
    

    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();
 
   // if (page > 1) removeList(ticket_details); // remove elements

    // if (page > 1) removeList(ticket_details);


    //fill tags
    ticket_details[0].innerHTML = objJson[page - 1].ticket_id;
    ticket_details[0].innerHTML = objJson[page - 1].issue;
    ticket_details[0].innerHTML = objJson[page - 1].description;
    ticket_details[0].innerHTML = objJson[page - 1].Image;
    

    
    page_span.innerHTML = page;

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

function numPages()
{
    return Math.ceil(objJson.length / tickets_pp);
}

window.onload = function() {
    //changePage(current_page);
};