document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('loginSection');
    const registerSection = document.getElementById('registerSection');

    const showRegisterBtn = document.getElementById('showRegisterBtn');
    const showLoginBtn = document.getElementById('showLoginBtn');

    
    const loginForm = document.getElementById('loginForm');
    const registrationForm = document.getElementById('registrationForm');

    
    const loginGlobalError = document.getElementById('loginGlobalError');
    const registerGlobalError = document.getElementById('registerGlobalError');

    
    const loginEmailInput = document.getElementById('loginEmail');
    const loginPasswordInput = document.getElementById('loginPassword');
    const loginEmailError = document.getElementById('loginEmailError');
    const loginPasswordError = document.getElementById('loginPasswordError');

    // Registration Inputs
    const nameInput = document.getElementById('name');
    const dobInput = document.getElementById('dob');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordCheckInput = document.getElementById('passwordCheck');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const passwordCheckError = document.getElementById('passwordCheckError');

    // Toggle forms
    showRegisterBtn.addEventListener('click', () => {
        loginSection.style.display = 'none';
        registerSection.style.display = 'block';
        resetErrors();
    });

    showLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        registerSection.style.display = 'none';
        loginSection.style.display = 'block';
        resetErrors();
    });

    function resetErrors() {
        loginEmailInput.classList.remove('input-error');
        loginPasswordInput.classList.remove('input-error');
        emailInput.classList.remove('input-error');
        passwordInput.classList.remove('input-error');
        passwordCheckInput.classList.remove('input-error');

        loginEmailError.style.display = 'none';
        loginPasswordError.style.display = 'none';
        emailError.style.display = 'none';
        passwordError.style.display = 'none';
        passwordCheckError.style.display = 'none';

        loginGlobalError.style.display = 'none';
        registerGlobalError.style.display = 'none';
    }


    function validateEmail(email) {
        return email.includes('@');
    }


    function validatePassword(password) {
        const hasLength = password.length >= 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return hasLength && hasUpper && hasSpecial;
    }


    function getUsers() {
        const usersStr = localStorage.getItem('amazon_users');
        if (usersStr) {
            return JSON.parse(usersStr);
        }
        return [];
    }


    function saveUser(user) {
        const users = getUsers();
        users.push(user);
        localStorage.setItem('amazon_users', JSON.stringify(users));
    }


    function findUserByEmail(email) {
        const users = getUsers();
        return users.find(u => u.email === email);
    }


    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        resetErrors();
        let isValid = true;

        const emailVal = loginEmailInput.value.trim();
        const passwordVal = loginPasswordInput.value;

        if (!validateEmail(emailVal)) {
            loginEmailInput.classList.add('input-error');
            loginEmailError.style.display = 'block';
            isValid = false;
        }

        if (isValid) {
            const user = findUserByEmail(emailVal);
            if (!user) {
                loginGlobalError.textContent = 'Account not found. Please create an account first.';
                loginGlobalError.style.display = 'block';
            } else if (user.password !== passwordVal) {
                loginPasswordInput.classList.add('input-error');
                loginGlobalError.textContent = 'Incorrect password. Please try again.';
                loginGlobalError.style.display = 'block';
            } else {
                alert(`Login successful!\nWelcome back, ${user.name}\nDOB: ${user.dob}`);
                loginForm.reset();
            }
        }
    });


    registrationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        resetErrors();
        let isValid = true;

        const nameVal = nameInput.value.trim();
        const dobVal = dobInput.value;
        const emailVal = emailInput.value.trim();
        const passwordVal = passwordInput.value;
        const passwordCheckVal = passwordCheckInput.value;

        if (!validateEmail(emailVal)) {
            emailInput.classList.add('input-error');
            emailError.style.display = 'block';
            isValid = false;
        }

        if (!validatePassword(passwordVal)) {
            passwordInput.classList.add('input-error');
            passwordError.style.display = 'block';
            isValid = false;
        }

        if (passwordVal !== passwordCheckVal) {
            passwordCheckInput.classList.add('input-error');
            passwordCheckError.style.display = 'block';
            isValid = false;
        }

        if (isValid) {
            // Check if user already exists
            const existingUser = findUserByEmail(emailVal);
            if (existingUser) {
                registerGlobalError.textContent = 'Email is already registered. Please sign in.';
                registerGlobalError.style.display = 'block';
            } else {
                // Save user
                saveUser({
                    name: nameVal,
                    dob: dobVal,
                    email: emailVal,
                    password: passwordVal
                });
                alert('Registration Successful! You can now sign in with these exact credentials.');
                registrationForm.reset();

                // Switch to login page
                registerSection.style.display = 'none';
                loginSection.style.display = 'block';
            }
        }
    });
});