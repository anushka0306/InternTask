document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const successMessage = document.getElementById('successMessage');

    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    function validateUsername() {
        const username = usernameInput.value.trim();
        if (username.length < 3 || username.length > 15) {
            usernameError.textContent = 'Username must be between 3 and 15 characters.';
            usernameInput.classList.add('error');
            return false;
        }
        usernameError.textContent = '';
        usernameInput.classList.remove('error');
        return true;
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            emailError.textContent = 'Invalid email format.';
            emailInput.classList.add('error');
            return false;
        }
        emailError.textContent = '';
        emailInput.classList.remove('error');
        return true;
    }

    function validatePassword() {
        const password = passwordInput.value.trim();
        if (password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters.';
            passwordInput.classList.add('error');
            return false;
        }
        passwordError.textContent = '';
        passwordInput.classList.remove('error');
        return true;
    }

    function validateConfirmPassword() {
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        if (password !== confirmPassword) {
            confirmPasswordError.textContent = 'Passwords do not match.';
            confirmPasswordInput.classList.add('error');
            return false;
        }
        confirmPasswordError.textContent = '';
        confirmPasswordInput.classList.remove('error');
        return true;
    }

    function validateForm() {
        return validateUsername() && validateEmail() && validatePassword() && validateConfirmPassword();
    }

    form.addEventListener('input', (e) => {
        switch (e.target.id) {
            case 'username':
                validateUsername();
                break;
            case 'email':
                validateEmail();
                break;
            case 'password':
                validatePassword();
                break;
            case 'confirmPassword':
                validateConfirmPassword();
                break;
        }
    });

    form.addEventListener('submit', (e) => {
        if (!validateForm()) {
            e.preventDefault(); // Prevent form submission if validation fails
        } else {
            e.preventDefault(); // Prevent form submission for demo

            // Display success message
            successMessage.textContent = 'Registration successful!';

            // Clear the form fields
            form.reset();

            // Remove success message after a few seconds
            setTimeout(() => {
                successMessage.textContent = '';
            }, 5000);
        }
    });
});