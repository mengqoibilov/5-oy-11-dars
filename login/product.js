
document.addEventListener("DOMContentLoaded", () => {
    let container = document.querySelector(".container");
    let searchInput = document.querySelector("input");
    let selectInput = document.querySelector("#limit-select");

    (async function () {
        let response = await fetch("https://fakestoreapi.com/products");
        let data = await response.json();

        renderProducts(data);

       
        searchInput.addEventListener("input", () => {
            filterAndRenderProducts(data);
        });

      
        selectInput.addEventListener("change", () => {
            filterAndRenderProducts(data);
        });

        function filterAndRenderProducts(products) {
            let searchText = searchInput.value.toLowerCase();
            let selectedValue = selectInput.value;

            let filteredData = products.filter(product =>
                product.title.toLowerCase().includes(searchText)
            );

           
            if (selectedValue !== "All") {
                filteredData = filteredData.slice(0, parseInt(selectedValue));
            }

            renderProducts(filteredData);
        }

        function renderProducts(products) {
            container.innerHTML = "";
            products.forEach(product => {
                let card = document.createElement("div");
                card.innerHTML = `
                    <div class="card" style="width: 18rem; margin: 10px;">
                        <img src="${product.image}" class="card-img-top" alt="${product.title}">
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">${product.description}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Rate: ${product.rating.rate}</li>
                            <li class="list-group-item">Count: ${product.rating.count}</li>
                            <li class="list-group-item">Price: $${product.price}</li>
                        </ul>
                    </div>
                `;
                container.appendChild(card);
            });
        }
    })();
});
