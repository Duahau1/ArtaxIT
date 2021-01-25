<table>

<tr>
<th>
HTTP Method
</th>
 <th>
Endpoint
</th>
 <th>
Request Body
</th>
<th>
Request Param
</th>
<th>
Example
</th>
</tr>
<tr>

<td>POST</td>
<td>/sign_up</td>
<td>:heavy_check_mark:</td>
<td>:x:</td>
<td>
<pre>
json
  {
    "first_name":"test5",
    "last_name":"test5",
    "phone_number":2087418523,
    "company_name":"myCompany",
    "username":"test8",
    "password":"secured",
    "email":"myemail@gmail.com"
}
</pre>
</td>

</tr>
<tr>

<td>POST</td>
<td>/log_in</td>
<td>:heavy_check_mark:</td>
<td>:x:</td>
<td>
<pre>
json
  {
   "username":"test8",
   "password":"secured"
}
</pre>
</td>

</tr>
<tr>

<td>GET</td>
<td>/log_out</td>
<td>:x:</td>
<td>:x:</td>
<td>
<pre>
null
</pre>
</td>

</tr>
</table>
