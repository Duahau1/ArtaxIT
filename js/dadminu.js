// user info
// fname-info, lname-info, email-info, phone-info, company-info 
// user subscription
// c-plan, p-plan (billing), n-billing, p-benefits 


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



function gpage() {
  return current_page -1  
} 



 function getData() {

    //end point
    //retrieve users pagination
    let endpoint = "https://mcval.herokuapp.com/admin/retrieve_users";
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
                    
                        //console.log(data);
                        if (data.next != null) {
                            user_next = true;
                            next = data.next
                        }
                        else {
                            user_next = false;
                        }
                        // console.log(data.users);
                        // console.log(data.users.length);
                        // console.log(data.users[0].user_id);
                        var id = data.users[0].user_id;
                        var info = data.users[0].info;
                        if (!userPages.has(data.users[0].user_id))
                        {
                            listuser.push(id);
                            userPages.set(id,info)
                        }  
                        id = data.users[1].user_id;
                        info = data.users[1].info;
                        if (!userPages.has(data.users[1].user_id))
                        {
                            listuser.push(id);
                            userPages.set(id,info)
                        }  
                        console.log(userPages);
                
                        //userPages.set(data.currentPage,data.users)
                        current_user = data.currentPage;
                        total_users = data.totalPage ;
                        total_users = total_users ;
                    
                    console.log(current_user);
                    changePage(current_user);
                   
                    
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


// variable to hold users and billing Info 
var userPages = new Map();
// variable to hold users
var listuser =[];
 // getData

var current_user = 1; // current user displayed
var current_page = 1; // current page / pagination
var total_users = 2; // data.totalPage
var user_next = true; // if next user in pagination exist
var next = ""; // next end point in the pagination



function prevPage()
{
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage()
{
    if (current_page < total_users){
        current_page++;
        if (current_page == total_users ) {
            btn_next.style.visibility = "hidden";
        }
        console.log(current_page);

        changePage(current_page);
        if (current_page % 2 == 0 && user_next) {
        
            pullPages(); // function to load fetch endpoint for users info to display
    
        }
    }
    
}

//get next page

function pullPages() {


    //end point
    //retrieve users pagination
    let endpoint = next;
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
                    
                        //console.log(data);
                        if (data.next != null) {
                            user_next = true;
                            next = data.next
                        }
                        else {
                            user_next = false;
                        }
                        // console.log(data.users);
                        // console.log(data.users.length);
                        // console.log(data.users[0].user_id);
                        var id = data.users[0].user_id;
                        var info = data.users[0].info;
                        if (!userPages.has(data.users[0].user_id))
                        {
                            listuser.push(id);
                            userPages.set(id,info)
                        }  
                        id = data.users[1].user_id;
                        info = data.users[1].info;
                        if (!userPages.has(data.users[1].user_id))
                        {
                            listuser.push(id);
                            userPages.set(id,info)
                        }  
                        console.log(userPages);
                
                        //userPages.set(data.currentPage,data.users)
                        current_user = data.currentPage;
                        total_users = data.totalPage * 2;
                    
                    
                    console.log(current_user);
                    changePage(current_user);
                   
                    
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
    

    
   
function changePage(page)
{
    var childe = document.getElementById("p-benefits");

    // node.removeChild(child);
    // child is the child node to be removed from the DOM.
    // node is the parent node of child.
    // oldChild holds a reference to the removed child node, i.e., oldChild === child.

    if (childe.hasChildNodes()) 
        {    
            while (childe.firstChild) {
                childe.removeChild(childe.firstChild);
                }   
        }
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var user_details = document.getElementsByClassName("info");
    var page_span = document.getElementById("page");
    console.log(user_details);

    //node.removeChild(child);


  // user info
// fname-info, lname-info, email-info, phone-info, company-info 
// user subscription
// c-plan, p-plan (billing), n-billing, p-benefits 

console.log(listuser[page -1]);
    var userPage = userPages.get( listuser[page -1]);
    //console.log('tid= '+userPage.info.tickets[page-1].ticket_id + ' currentU' + current_user );
    console.log(userPage.first_name);
    user_details[0].innerHTML = userPage.first_name;
    
    user_details[1].innerHTML = userPage.last_name;
    user_details[2].innerHTML = userPage.email;
    user_details[3].innerHTML = userPage.phone_number;
    user_details[4].innerHTML = userPage.company_name;
    //modified later [5]
    //user_details[6].innerHTML = userPage.email;
    //user_details[7].innerHTML = userPage.next_billing_day;
    if (userPage.plan_id === "1")
    {
       var plan = "Care Basic";
        user_details[5].innerHTML = plan;
        addListElement(careBasic_b,user_details[6]);
        
    }
    else if (userPage.plan_id === "2") 
    {
        var plan ="Care Plus";
        user_details[5].innerHTML = plan;
        addListElement(carePlus_b,user_details[6]);
    }
    else    
    {
        var plan ="Care Pro";
        user_details[5].innerHTML = plan;
        addListElement(carePro_b,user_details[6]);
    }
    
    
    page_span.innerHTML = page;

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == (total_users - 1 ) ) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

function addListElement(list,element) {
    for (let i = 0; i < list.length; i++) 
    {
        let child = document.createElement("li");
        child.innerHTML = list[i];
        child.dataset.name = list[i];
        child.setAttribute("class", "items_benefit");
        element.appendChild(child);
      }
}

function authenU() {

    if (localStorage.getItem('token')) {
                 
    return true;                               
        
   } 
    
else {   

    logOut();
   }
    
}



