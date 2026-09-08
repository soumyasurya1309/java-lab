document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('signupForm');
    const firstnameInput = document.getElementById('firstname');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const repasswordInput = document.getElementById('repassword');
    const termsCheckbox = document.getElementById('terms');
    
    populateDates();

    const allInputs = form.querySelectorAll('input, select');
    allInputs.forEach(input => {
        input.addEventListener('focus', function() {
            const formGroup = this.closest('.form-group');
            if (formGroup) {
                formGroup.classList.add('focused');
            }
        });
        
        input.addEventListener('blur', function() {
            const formGroup = this.closest('.form-group');
            if (formGroup) {
                formGroup.classList.remove('focused');
            }
            
            if(this.value.trim() !== '' && this.type !== 'email') {
                clearError(this);
            }
        });
    });

    emailInput.addEventListener('change', function() {
        if (this.value && !isValidEmail(this.value)) {
            showError(this, 'Please enter a valid email address.');
        } else {
            clearError(this);
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        
        let isValid = true;

        if (firstnameInput.value.trim() === '') {
            showError(firstnameInput, 'Firstname is required');
            isValid = false;
        } else {
            clearError(firstnameInput);
        }

        if (usernameInput.value.trim() === '') {
            showError(usernameInput, 'Username is required');
            isValid = false;
        } else {
            clearError(usernameInput);
        }

        if (passwordInput.value.trim() === '') {
            showError(passwordInput, 'Password is required');
            isValid = false;
        } else {
            clearError(passwordInput);
        }

        if (repasswordInput.value.trim() === '') {
            showError(repasswordInput, 'Please confirm your password');
            isValid = false;
        } else if (passwordInput.value !== repasswordInput.value) {
            showError(repasswordInput, 'Passwords do not match');
            isValid = false;
        } else {
            clearError(repasswordInput);
        }

        if (!termsCheckbox.checked) {
            showError(termsCheckbox, 'You must agree to the terms');
            isValid = false;
        } else {
            clearError(termsCheckbox);
        }

        if (emailInput.value && !isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }

        if (isValid) {
            alert('Form submitted successfully!');
            form.reset();
        }
    });

    function showError(inputElement, message) {
        const formGroup = inputElement.closest('.form-group');
        if (formGroup) {
            formGroup.classList.add('error');
            const errorElement = formGroup.querySelector('.error-message');
            if(errorElement) {
                errorElement.innerText = message;
            }
        }
    }

    function clearError(inputElement) {
        const formGroup = inputElement.closest('.form-group');
        if (formGroup) {
            formGroup.classList.remove('error');
        }
    }

    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function populateDates() {
        const daySelect = document.getElementById('day');
        const monthSelect = document.getElementById('month');
        const yearSelect = document.getElementById('year');

        for (let i = 1; i <= 31; i++) {
            let option = document.createElement('option');
            option.value = i;
            option.text = i;
            daySelect.appendChild(option);
        }

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        months.forEach((month, index) => {
            let option = document.createElement('option');
            option.value = index + 1;
            option.text = month;
            monthSelect.appendChild(option);
        });

        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i >= 1900; i--) {
            let option = document.createElement('option');
            option.value = i;
            option.text = i;
            yearSelect.appendChild(option);
        }
    }
});
