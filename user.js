
document.addEventListener("DOMContentLoaded", () => {
    let container = document.querySelector(".container");
    let searchInput = document.querySelector("input");
    let selectInput = document.querySelector("select");

    (async function () {
        let response = await fetch("https://fakestoreapi.com/users");
        let data = await response.json();
        console.log(data);
        
   
        renderUsers(data);

    
        searchInput.addEventListener("input", () => {
            filterUsers(data);
        });

      
        selectInput.addEventListener("change", () => {
            filterUsers(data);
        });

      
        function filterUsers(users) {
            let searchText = searchInput.value.toLowerCase();
            let selectedValue = selectInput.value;

         
            let filteredUsers = users.filter(user =>
                user.name.firstname.toLowerCase().includes(searchText)
            );

         
            if (selectedValue !== "All") {
                let step = parseInt(selectedValue);
                filteredUsers = filteredUsers.filter((_, index) => (index + 1) % step === 0);
            }

            renderUsers(filteredUsers); 
        }

     
        function renderUsers(users) {
            container.innerHTML = ""; 
            users.forEach(user => {
                let card = document.createElement("div");
                card.classList.add("card", "bg-success");
                card.innerHTML = `
                    <h2>${user.name.firstname}</h2>
                    <p>${user.email}</p>
                    <h2>${user.phone}</h2>
                `;
                container.appendChild(card);
            });
        }
    })();
});


