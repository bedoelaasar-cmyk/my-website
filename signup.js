const signupForm = document.querySelector(".signup-form");

signupForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = signupForm.querySelector('input[name="name"]').value;
    const email = signupForm.querySelector('input[name="email"]').value;
    const password = signupForm.querySelector('input[name="password"]').value;

    try {
        const response = await fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        const message = await response.text();

        if (response.ok) {
            alert("Account created successfully!");
            window.location.href = "login.html";
        } else {
            alert(message);
        }

    } catch (error) {
        console.error(error);
        alert("Something went wrong. Please try again.");
    }
});