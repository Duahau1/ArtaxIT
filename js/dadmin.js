
// log_out 
function logOut() {
    localStorage.clear();
    window.location.href = "../index.html";

}

function removeList(elms) {
    const removeElements = (elms) => elms.forEach(el => el.remove());
    removeElements(document.querySelectorAll(".ticket"));
}


document.addEventListener("DOMContentLoaded", function () {
   // if (localStorage.getItem('token')) {
                 
            // event listers for previous button
            var pr = document.getElementById('btn_prev');
            pr.addEventListener("click", prevPage);
            // event lister for next button
            var nx = document.getElementById('btn_next');
            nx.addEventListener("click", nextPage);
        
//        } 
        
//    else {

//             localStorage.clear();
//             window.location.href = "../index.html";
//        }
 });




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
    'Image': 'null'}
    

    { ticket: "ticket 1"},
    { ticket: "ticket 2"},
    { ticket: "ticket 3"},
    { ticket: "ticket 4"},
    { ticket: "ticket 5"}
    // { ticket: "ticket 6"},
    // { ticket: "ticket 7"},
    // { ticket: "ticket 8"},
    // { ticket: "ticket 9"},
    // { ticket: "ticket 10"}

]; // Can be obtained from another source, such as your objJson variable

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
 paginationB
   // if (page > 1) removeList(ticket_details); // remove elements

    // if (page > 1) removeList(ticket_details);
 main

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
    changePage(1);
};