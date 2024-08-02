
document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        // Collect form data
        const formData = new FormData(event.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Send form data to the server
        fetch("http://localhost:3000/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.success) {
                    document.querySelector(".success").style.display = "block";
                    document.querySelector(".error").style.display = "none";

                    // Reset the form fields
                    document.getElementById("contact-form").reset();

                    // Hide the success message after 5 seconds
                    setTimeout(() => {
                        document.querySelector(".success").style.display = "none";
                    }, 5000);
                } else {
                    document.querySelector(".success").style.display = "none";
                    document.querySelector(".error").style.display = "block";

                    // Hide the error message after 5 seconds
                    setTimeout(() => {
                        document.querySelector(".error").style.display = "none";
                    }, 5000);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                document.querySelector(".success").style.display = "none";
                document.querySelector(".error").style.display = "block";

                // Hide the error message after 5 seconds
                setTimeout(() => {
                    document.querySelector(".error").style.display = "none";
                }, 5000);
            });
    });
