document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("gymForm");
    const nameInput = document.getElementById("name");
    
    // Example of onblur event for real-time validation feedback
    nameInput.addEventListener("blur", function() {
        if (this.value.trim() === "") {
            this.style.backgroundColor = "#ffcccc"; // Light red if empty
        } else {
            this.style.backgroundColor = "white"; // Reset to white
        }
    });

    // Handle form submission event for validation
    form.addEventListener("submit", function(event) {
        let isValid = true;
        let errorMessage = "";
        
        const name = nameInput.value.trim();
        const ability = document.getElementById("ability").value.trim();
        
        // Validation check for Name
        if (name === "") {
            errorMessage += "Name field cannot be empty.\n";
            isValid = false;
        }
        
        // Validation check for Athletic Ability
        if (ability === "") {
            errorMessage += "Please describe your athletic ability.\n";
            isValid = false;
        }
        
        // If not valid, show error and prevent submission
        if (!isValid) {
            alert(errorMessage);
            event.preventDefault(); // Stop form submission
        } else {
            // Form is valid
            alert("Registration successful!\nWelcome to the Gym, " + name + "!");
            event.preventDefault(); // Stop actual page reload for demonstration
            form.reset(); // Reset form fields
            nameInput.style.backgroundColor = "white"; // Reset custom style
        }
    });
});
