// IMPORTANT: Update this URL to your Render backend URL before deploying to Vercel
const API_BASE_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://localhost:3000"
  : "https://your-backend-app.onrender.com"; // Replace with your actual deployed Render URL

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

        try {
            const response = await fetch(`${API_BASE_URL}/addPerson`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            });

            const result = await response.json();
            alert(result.message);
            form.reset();
        } catch (error) {
            console.error("Error saving data:", error);
            alert("Error saving data. Make sure backend is running.");
        }
    });
}

const tableBody = document.getElementById("tableBody");

if(tableBody){
    fetch(`${API_BASE_URL}/getPersons`)
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
        })
        .catch(err => {
            console.error("Error fetching data:", err);
            tableBody.innerHTML = `<tr><td colspan="4">Error loading data. Backend might not be running.</td></tr>`;
        });
}