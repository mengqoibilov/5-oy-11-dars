
document.addEventListener("DOMContentLoaded", function () {
    let form = document.querySelector("form");
    try {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            let username = e.target[0].value;
            let password = e.target[1].value;

            let response = await fetch("https://fakestoreapi.com/auth/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password,
                })
            });
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            let tokenData = await response.json();
            console.log(tokenData);

            localStorage.setItem("token", tokenData.token);

            window.location.href =("/user.html"); 
        });
    } catch (e) {
        console.error("Error fetching data:", e);
    }
});
