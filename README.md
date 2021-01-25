The endpoint is https://mcval.herokuapp.com/
Content-type should all be JSON
Route:

POST request: /sign_up  
Things that are needed to send in request body

Example:
{
    "first_name":"test5",
    "last_name":"test5",
    "phone_number":2087418523,
    "company_name":"myCompany",
    "username":"test8",
    "password":"secured",
    "email":"myemail@gmail.com"
}

POST request: /log_in 
Things that are needed to send in the request body
Example:
{
    "username":"test8",
    "password":"secured"
}
GET request: /log_out

GET request: /dashboard
Will be developed as soon as we have a paypal business account to manage subscription

