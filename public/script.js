const form = document.getElementById("personForm");

if(form){

form.addEventListener("submit", async (e)=>{

e.preventDefault();

const data = {

name: document.getElementById("name").value,
age: document.getElementById("age").value,
email: document.getElementById("email").value,
phone: document.getElementById("phone").value

};

const response = await fetch("/addPerson",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

});

const result = await response.json();

alert(result.message);

form.reset();

});

}

const tableBody = document.getElementById("tableBody");

if(tableBody){

fetch("/getPersons")

.then(res=>res.json())

.then(data=>{

data.forEach(person=>{

tableBody.innerHTML += `

<tr>
<td>${person.name}</td>
<td>${person.age}</td>
<td>${person.email}</td>
<td>${person.phone}</td>
</tr>

`;

});

});

}