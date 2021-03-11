
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

               rpage();//reset page, navigation trouble tickets

            });
            getData();
                                       
            
       } 
        
   else {

            localStorage.clear();
            window.location.href = "../index.html";
       }
      
 });

//reset page user trouble tickets
function rpage() {
    var page_span = document.getElementById("page");
    current_page = 1;
    page_span.innerHTML = current_page;
    console.log('current page'+ current_page);
    return current_page;
}

function gpage() {
  return current_page -1  
} 

function getT(userID) {


    //userID = 49; 

//alert(userID);
    //userID = 50; 

                            let endpoint = " https://mcval.herokuapp.com/admin/getuser_info/"+userID+"?status=open";
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


                                        if (!userIT.has(userID))
                                            { userIT.set(userID,data[0]); }
                                            current_user = userID;
                                                console.log(userIT.get(userID));
                                                console.log('userID: '+userID);
                                                console.log(userIT);
                                                
                                                changePage(rpage());

                                           
                                                

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

let user = new Array();
// variable to hold users Info and trouble tickets
var userIT = new Map();



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
    var tid = document.getElementById('tid').innerHTML;
    console.log('Ticke Id to be remove is: '+ tid);
    let ftd = {
        "ticket_id": tid
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
                    var u = getUser();
                    console.log('remove from Map: '+userIT.delete(u));
                    console.log('endpoint '+ data.message);
                     console.log ('user no.: '+u);
                      getT(u);
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

    



var current_user = 1;
var current_page = 1; // number of tickets open
var tickets_pp = 1; // ticket shown at the time


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

// return current user selected on the dropdowm menu
function getUser() {
    var val = document.getElementById("cust");
    var userID = val.options[val.selectedIndex].value;
    return userID;
}


    


var uid = null;    
function changePage(page)
{
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var ticket_details = document.getElementsByClassName("ticket");
    var user_details = document.getElementsByClassName("custI");
    var page_span = document.getElementById("page");
    

    // Validate page
    if (page < 1) page = 1;
    if (page > numTickets()) page = numTickets();
 
   // if (page > 1) removeList(ticket_details); // remove elements

    // if (page > 1) removeList(ticket_details);


    //fill deatails about trouble ticket
  
    var currentTicket = userIT.get(current_user);
    //console.log('tid= '+currentTicket.info.tickets[page-1].ticket_id + ' currentU' + current_user );
    ticket_details[0].innerHTML = currentTicket.info.tickets[page-1].ticket_id;
    ticket_details[1].innerHTML = currentTicket.info.tickets[page-1].issue;
    ticket_details[2].innerHTML = currentTicket.info.tickets[page-1].description;
    //ticket_details[0].innerHTML = .Image;

    //fill details about user info
    var userInf = userIT.get(current_user);
    if (uid != userInf.user_id  )
        {
            uid = userInf.user_id; 
            user_details[0].innerHTML = userInf.info.company_name;
            user_details[1].innerHTML = userInf.info.first_name + userInf.info.last_name;
            user_details[2].innerHTML = userInf.info.phone_number;
            user_details[3].innerHTML = userInf.info.email;
        }
    
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
   //return 5;
    return userIT.get(current_user).info.tickets.length;
    
}
