
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
            var sc = document.getElementById("cust");
            sc.addEventListener("change", function() {
                cuser(); // add event to the new input file
            });
            getData();
                                       
            
       } 
        
   else {

            localStorage.clear();
            window.location.href = "../index.html";
       }
      
 });

//populate first trouble ticket of the first user
async function getUser() {
   
    
}

function getT(userID) {

    //userID = 49; 
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
                                   // console.log('Status endpoint '+ data.user_id);
                        
                                    if(data[0].user_id){ 
                                            userIT.push(data[0]);
                                                console.log(userIT.length);
                                                console.log(userIT);
                                                
                                            return userIT; // user_id , info [first_name, last_name,
                                                        // email, company_name, phone_number, plan_id ]
                                        //ticket[ticket_id, issue?, priority, description, status]                                            
                                    }
                                    else if (data[0].user_id == null){
                                            alert(data);
                                    }
                                    else {
                                            console.log(data);
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
                child.text = u[index].email;
                // child.addEventListener("change", function() {
                //     cuser(); // add event to the new input file
                // });
        //appending element to the parent element
        document.getElementById("cust").appendChild(child);
        
    }
    return u[0].id;

}




 // variable to hold users 
 var user = new Array();
// variable to hold users Info and trouble tickets
var userIT = new Array();


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
            //console.log('Status endpoint '+ data.status);

            if(data.status==="good"){ 
                    //console.log(data.status);
                    user.push(data.user);
                    console.log(user);
                    
                   
                    console.log(fillCustomers(user[0]));
                    cuser();

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
//close a ticket

function closeT() {

    //end point
    //adm close trouble ticket
    let endpoint = " https://mcval.herokuapp.com/admin/close_ticket";
    //defining the header
    let h = new Headers;
    //h.append ('Content-Type', 'application/json');
    h.append ('authorization', localStorage.getItem('token'));
    //json required body = ftd
    let ftd = {
        "ticket_id": document.getElementById('tid')
    }
    //post request object to the endpoint
   
    let req = new Request(endpoint,{
        method: 'POST',
        headers: h,
        body: JSON.stringify(ftd)
    });
    //execute a request

    fetch(req)
    .then((res) => res.json())
        .then((data) =>{
            //console.log('Status endpoint '+ data.status);

            if(data.status==="good"){ 
                    console.log('endpoint '+ data.message);
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



var current_page = 0; // number of tickets open
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
    if (current_page < numTickets()) {
        current_page++;
        changePage(current_page);
        
    }
}
//change select option
function cuser() {
    var val = document.getElementById("cust");
    var userID = val.options[val.selectedIndex].value;
    
    getT(userID);
   
}


    
function changePage(page)
{
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var ticket_details = document.getElementsByClassName("ticket");
    var page_span = document.getElementById("page");
    

    // Validate page
    if (page < 1) page = 1;
    if (page > numTickets()) page = numTickets();
 
   // if (page > 1) removeList(ticket_details); // remove elements

    // if (page > 1) removeList(ticket_details);


    //fill tags
    console.log (ticket_details);
    ticket_details[0].innerHTML = userIT[0].info.tickets[page-1].ticket_id;
    console.log(userIT[0].info.tickets[page-1].ticket_id);
    ticket_details[1].innerHTML = userIT[0].info.tickets[page-1].issue;
    ticket_details[2].innerHTML = userIT[0].info.tickets[page-1].description;
    //ticket_details[0].innerHTML = objJson[page - 1].Image;
    

    
    page_span.innerHTML = page;

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numTickets()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}
//how many ticket user.length
function numTickets()
{
   return 5;
   // return userIT[0].info.tickets.length;
    
}
