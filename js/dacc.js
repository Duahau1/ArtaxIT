



// Handler when the DOM is fully loaded



//populating dashboard_acc

function getData(){
    fetch("https://mcval.herokuapp.com/user/information", {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token')
                }
            })
                .then(result=> result.json())
                .then(data=> {
                    if (data.status==="good") {
                        
                        //user 

                        //My info section
                       
                            //populating view

                            document.getElementById("fname-info").innerHTML = data.first_name;
                            document.getElementById("lname-info").innerHTML = data.last_name;
                            document.getElementById("phone-info").innerHTML = data.phone_number;
                            document.getElementById("company-info").innerHTML = data.company_name;
                        
                         
                         //Subscription and trouble ticket section
                            fetch("https://mcval.herokuapp.com/dashboard", {
                                headers: {
                                    'authorization': localStorage.getItem('token')
                                }
                            }).then(res => res.json()).then(data => {
                                if (data.subscription.status == "good") {
                                    
                                //populating  view
                                

                                
                                if ( data.subscription.planName == 'none'){
                                   
                                    document.getElementById('c-plan').innerHTML = "No Plan";
                                    document.getElementById('p-plan').innerHTML = "$0.00";
                                    document.getElementById('n-billing').innerHTML = "None";
                                    
                                    for (let i = 0; i < suggestion_b.length /*&& data.subscription.planName != "none"*/; i++) {
                                        let child = document.createElement('li');
                                        child.innerHTML = suggestion_b[i];
                                        child.dataset.name = suggestion_b[i];
                                        child.setAttribute("class", "item_benefit");
                                        document.getElementById("plan_benefits").appendChild(child);
                                    }
                                                                        
                                }
                         
                                else if ( data.subscription.planName == 'careBasic' && data.subscription.planName != null ){
                                   
                                    document.getElementById('c-plan').innerHTML = data.subscription.planName;
                                    document.getElementById('p-plan').innerHTML = plan_p[0];
                                    document.getElementById('n-billing').innerHTML = data.subscription.next_billing_day;
                                    
                                    for (let i = 0; i < careBasic_b.length /*&& data.subscription.planName != "none"*/; i++) {
                                        let child = document.createElement('li');
                                        child.innerHTML = careBasic_b[i];
                                        child.dataset.name = careBasic_b[i];
                                        child.setAttribute("class", "item_benefit");
                                        document.getElementById("plan_benefits").appendChild(child);
                                    }
                                }

                                else if (data.subscription.planName == 'carePlus' ){

                                    document.getElementById('c-plan').innerHTML = data.subscription.planName;
                                    document.getElementById('p-plan').innerHTML = plan_p[1];
                                    document.getElementById('n-billing').innerHTML = data.subscription.next_billing_day;
                    
                                    for (let i = 0; i < carePlus_b.length && data.subscription.planName != "none"; i++) {
                                        let child = document.createElement('li');
                                        child.innerHTML = carePlus_b[i];
                                        child.dataset.name = carePlus_b[i];
                                        child.setAttribute("class", "item_benefit");
                                        document.getElementById("plan_benefits").appendChild(child);
                                    }
                                }

                                else if (data.subscription.planName == 'carePro' ){
                                    
                                    document.getElementById('c-plan').innerHTML = data.subscription.planName;
                                    document.getElementById('p-plan').innerHTML = plan_p[2];
                                    document.getElementById('n-billing').innerHTML = data.subscription.next_billing_day;

                                    for (let i = 0; i < carePro_b.length && data.subscription.planName != "none"; i++) {
                                        let child = document.createElement('li');
                                        child.innerHTML = carePro_b[i];
                                        child.dataset.name = carePro_b[i];
                                        child.setAttribute("class", "item_benefit");
                                        document.getElementById("plan_benefits").appendChild(child);
                                    }
                                }
                                var btn_cancel = document.getElementById('cancel');
                                var btn_purchase = document.getElementById('purchase');
                                    if ( data.subscription.planName == 'none' ){
                                        // Manipulating the buttons -> show purchase and hide cancel subcription
                                        
                                        btn_cancel.classList.add('hide');
                                        btn_purchase.classList.remove('hide');
                                    }
                                    
                                    else {
                                         // Manipulating the buttons -> show cancel and show purchase subcription
                                        
                                         btn_purchase.classList.add('hide');
                                         btn_cancel.classList.remove('hide');

                                         // adding event to cancel subscription
                                         btn_cancel.addEventListener('click', () => {
                                            fetch("https://mcval.herokuapp.com/dashboard/subscription/cancel", {
                                                headers: {
                                                    'authorization': localStorage.getItem('token')
                                                }
                                            }).then(res => res.json()).then(data => {
                                                if (data.status == "good") {
                                                    window.location.href="../dashboard.html";
                                                }
                                                else{
                                                    console.log(data.message);
                                                }
                                            })
                                        })


                                    }
                                   
                                
                                }
                                else{
                                    console.log(data.message);
                                }
                            })
                        }
                    
                    else {
                        if (data.status == "err" && data.message == "Please log in") {
                            //Just in case the token expire
                            localStorage.clear();
                            window.location.href = "../index.html";
                        }
                    }
                })
                .catch(err => console.log(err));
}

// variables for edit and save customer info


var fname_info_node = document.getElementById("fname-info");
var fname_input_node = document.getElementById('fname-input');

var lname_info_node = document.getElementById("lname-info");
var lname_input_node = document.getElementById('lname-input');

var phone_info_node = document.getElementById("phone-info");
var phone_input_node = document.getElementById('phone-input');

var company_info_node = document.getElementById("company-info");
var company_input_node = document.getElementById('company-input');

var edit_btn_node = document.getElementById("edit-btn");
var save_btn_node = document.getElementById("save-btn");


document.getElementById("save-btn").addEventListener("click", function() {
    
    sMyInfo(); //update field
    save_form(); //hide and show elements

  });

function save_form() {
     

   fname_input_node.classList.add("hide");
   fname_info_node.classList.remove("hide");

   lname_input_node.classList.add("hide");
   lname_info_node.classList.remove("hide");

   phone_input_node.classList.add("hide");
   phone_info_node.classList.remove("hide");

   company_input_node.classList.add("hide");
   company_info_node.classList.remove("hide");

   save_btn_node.classList.add("hide");
   edit_btn_node.classList.remove("hide");
   
}

function edit_info() {

    // first name = fname_ 
   fname_input_node.classList.remove("hide");
   fname_info_node.classList.add("hide");

   //manipulation existing data
   var tname = fname_info_node.innerText;
   document.getElementById('fname-input').value = tname;

   // last name  =  lname_
   lname_input_node.classList.remove("hide");
   lname_info_node.classList.add("hide");
    
   //manipulation existing data
   var tlast = lname_info_node.innerText;
   document.getElementById('lname-input').value = tlast;

   // phone number  =  phone_
   phone_input_node.classList.remove("hide");
   phone_info_node.classList.add("hide");

   //manipulation existing data
   var tphone = phone_info_node.innerText;
   document.getElementById('phone-input').value = tphone;

   // company name = company_
   company_input_node.classList.remove("hide");
   company_info_node.classList.add("hide");
   //manipulation existing data
   var tcname = company_info_node.innerText;
   document.getElementById('company-input').value = tcname;


   save_btn_node.classList.remove("hide");
   edit_btn_node.classList.add("hide");
}



document.addEventListener("DOMContentLoaded", function () {
        if (localStorage.getItem('token')) {
            getData();
        }
        else{

            localStorage.clear();
            window.location.href = "../index.html";
        }
    
   
});




// updating My info section
//edit-info-input 
/*
"first_name": "first",
 "last_name": "last",
 "phone_number": 22222,
 "company_name": "artaxIt"
*/

let titles = [

    "first_name",
    "last_name",
    "phone_number",
    "company_name"

]






function sMyInfo(){

    let inputFields=[...document.querySelectorAll('.edit-info-input')]
    let fvalues = [];
    for (let index = 0; index < inputFields.length; index++) {
        fvalues.push (inputFields[index].value);
        
    }

    //fvalues

    let req= {
        "first_name": fvalues[0],
        "last_name": fvalues[1],
        "phone_number": fvalues[2],
        "company_name": fvalues[3]
    }
    
    fetch("https://mcval.herokuapp.com/user/edit",{
         method: 'PATCH',
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
             console.log(data);
             console.log(data.first_name);
             console.log(document.getElementById('fname-info'));
            document.getElementById('fname-info').innerHTML = data.first_name;
            document.getElementById('lname-info').innerHTML = data.last_name;
            document.getElementById('phone-info').innerHTML = data.phone_number;
            document.getElementById('company-info').innerHTML = data.company_name;
         }
         else{
             inputFields.reset();
             /*document.getElementById("prompt").innerHTML="Incorrect username or password";
             document.getElementById("prompt").style.color="red";*/
         }
     })
     .catch(err=>console.log(err));

    
}





