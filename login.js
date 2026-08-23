const loginForm = document.querySelector(".login-form");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = loginForm.querySelector('input[name="email"]').value;
    const password = loginForm.querySelector('input[name="password"]').value;

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert(`Hi ${data.name}!`);
            window.location.href = "index.html";
        } else {
            alert(data.message);
        }

    } catch (error) {
        console.error(error);
        alert("Something went wrong. Please try again.");
    }
});