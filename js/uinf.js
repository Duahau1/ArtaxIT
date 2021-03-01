document.addEventListener("DOMContentLoaded", function(){
    // Handler when the DOM is fully loaded

    function store(){
        
        //get info from the form
            var fname = document.getElementById("fname-input");
            var lname = document.getElementById("lname-input");
            var phone = document.getElementById("phone-input");
            var company = document.getElementById("company-input");

        //store uinfo in localStora
            localStorage.setItem("fname", fname.value);
            localStorage.setItem("lname", lname.value);
            localStorage.setItem("phone", phone.value);
            localStorage.setItem("company", company.value);

        //directs to provide more info and create the account
            window.location.href = "../createaccount.html"

    }

});