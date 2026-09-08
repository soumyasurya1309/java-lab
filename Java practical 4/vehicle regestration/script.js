document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('registrationInput');
    const validateBtn = document.getElementById('validateBtn');
    const resultDiv = document.getElementById('result');

    // Primary validation on button click
    validateBtn.addEventListener('click', () => {
        validateRegistration();
    });

    // Allow 'Enter' key to trigger validation
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            validateRegistration();
        }
    });

    function validateRegistration() {
        const rawInput = inputField.value;
        
        // Reset previous state
        resultDiv.className = 'result-box';
        resultDiv.innerHTML = '';

        try {
            if (!rawInput || rawInput.trim() === '') {
                throw new Error('Registration number cannot be empty. Please enter a valid number.');
            }

            const registrationNumber = rawInput.trim().toUpperCase();

            // Basic length check (XX DD SS NNNN = 10 chars)
            if (registrationNumber.length !== 10) {
                throw new Error(`Length must be exactly 10 characters. Current length: ${registrationNumber.length}`);
            }

            // Extract parts
            const stateCode = registrationNumber.substring(0, 2);
            const districtCode = registrationNumber.substring(2, 4);
            const series = registrationNumber.substring(4, 6);
            const vehicleNumber = registrationNumber.substring(6, 10);

            // Validation Rules
            if (!/^[A-Z]{2}$/.test(stateCode)) {
                throw new Error('First 2 characters must be uppercase alphabets (e.g., MH, DL).');
            }

            if (!/^[0-9]{2}$/.test(districtCode)) {
                throw new Error('Next 2 characters must be digits (District Code).');
            }

            if (!/^[A-Z]{2}$/.test(series)) {
                throw new Error('Next 2 characters must be uppercase alphabets (Series Code).');
            }

            if (!/^[0-9]{4}$/.test(vehicleNumber)) {
                throw new Error('Last 4 characters must be digits (Vehicle Number).');
            }

            // Success
            resultDiv.classList.add('valid');
            resultDiv.innerHTML = `
                <strong>✓ Valid Registration Number</strong><br>
                <span style="font-weight: normal; font-size: 1.1rem;">${registrationNumber}</span>
            `;

        } catch (error) {
            // Error
            resultDiv.classList.add('invalid');
            resultDiv.innerHTML = `
                <strong>✗ Invalid Format</strong><br>
                <span style="font-weight: normal;">${error.message}</span>
            `;
        }
    }
});