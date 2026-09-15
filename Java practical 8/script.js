document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('gymForm');
    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');
    const emailInput = document.getElementById('email');
    const mobileInput = document.getElementById('mobile');
    const planSelect = document.getElementById('plan');

    const nameError = document.getElementById('nameError');
    const ageError = document.getElementById('ageError');
    const emailError = document.getElementById('emailError');
    const mobileError = document.getElementById('mobileError');
    const planError = document.getElementById('planError');
    const result = document.getElementById('result');
    const submitBtn = document.getElementById('submitBtn');
    const spinner = document.getElementById('spinner');


    nameInput.addEventListener('input', function () {
        const name = this.value.trim();

        if (name === '') {
            nameError.textContent = 'Name is required';
            this.style.borderColor = '#e53e3e';
        } else if (!/^[A-Za-z\s]+$/.test(name)) {
            nameError.textContent = 'Only letters and spaces allowed';
            this.style.borderColor = '#e53e3e';
        } else {
            nameError.textContent = '';
            this.style.borderColor = '#e2e8f0';
        }
    });


    ageInput.addEventListener('blur', function () {
        const age = parseInt(this.value);

        if (isNaN(age) || age === '') {
            ageError.textContent = 'Please enter a valid age';
            this.style.borderColor = '#e53e3e';
        } else if (age < 1 || age > 150) {
            ageError.textContent = 'Age must be between 1 and 150';
            this.style.borderColor = '#e53e3e';
        } else if (age < 16 || age > 60) {
            ageError.textContent = 'Age must be between 16 and 60';
            this.style.borderColor = '#e53e3e';
        } else {
            ageError.textContent = '';
            this.style.borderColor = '#e2e8f0';
        }
    });


    ageInput.addEventListener('input', function () {
        const age = parseInt(this.value);
        if (!isNaN(age) && age >= 16 && age <= 60) {
            ageError.textContent = '';
            this.style.borderColor = '#48bb78';
        } else if (this.value !== '') {
            this.style.borderColor = '#e53e3e';
        }
    });


    emailInput.addEventListener('input', function () {
        const email = this.value.trim();
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === '') {
            emailError.textContent = 'Email is required';
            this.style.borderColor = '#e53e3e';
        } else if (!pattern.test(email)) {
            emailError.textContent = 'Please enter a valid email';
            this.style.borderColor = '#e53e3e';
        } else {
            emailError.textContent = '';
            this.style.borderColor = '#e2e8f0';
        }
    });


    mobileInput.addEventListener('input', function () {
        const mobile = this.value.trim();

        // Remove any non-digit characters for validation
        const digitsOnly = mobile.replace(/\D/g, '');

        if (mobile === '') {
            mobileError.textContent = 'Mobile number is required';
            this.style.borderColor = '#e53e3e';
        } else if (digitsOnly.length < 10) {
            mobileError.textContent = 'Enter at least 10 digits';
            this.style.borderColor = '#e53e3e';
        } else if (digitsOnly.length > 10) {
            mobileError.textContent = 'Mobile number must be exactly 10 digits';
            this.style.borderColor = '#e53e3e';

            this.value = digitsOnly.slice(0, 10);
        } else {
            mobileError.textContent = '';
            this.style.borderColor = '#48bb78';
        }
    });


    planSelect.addEventListener('change', function () {
        if (this.value === '') {
            planError.textContent = 'Please select a membership plan';
        } else {
            planError.textContent = '';
        }
    });


    form.addEventListener('submit', function (e) {
        e.preventDefault();


        const hasErrors = nameError.textContent !== '' ||
            ageError.textContent !== '' ||
            emailError.textContent !== '' ||
            mobileError.textContent !== '' ||
            planError.textContent !== '';

        if (hasErrors) {

            const firstError = form.querySelector('.error:not(:empty)');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }


        submitBtn.classList.add('loading');
        submitBtn.disabled = true;


        setTimeout(function () {
            result.style.display = 'block';
            result.textContent = '✅ Gym Admission Successful! Welcome aboard!';


            form.reset();
            nameError.textContent = '';
            ageError.textContent = '';
            emailError.textContent = '';
            mobileError.textContent = '';
            planError.textContent = '';


            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;


            setTimeout(function () {
                result.style.display = 'none';
            }, 5000);
        }, 1500);
    });
});