const form = document.getElementById("registerForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const username = document.getElementById("username");
const birthDate = document.getElementById("birthDate");
const gender = document.getElementById("gender");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");

const modal = document.getElementById("tncModal");
const successModal = document.getElementById("successModal");

function setError(fieldId, message) {
    const errorEl = document.getElementById(fieldId + "Error");
    const fieldEl = document.getElementById(fieldId);

    if (message !== "") {
        if (errorEl) errorEl.textContent = message;
        if (fieldEl) fieldEl.setAttribute("aria-invalid", "true");
        return false;
    } else {
        if (errorEl) errorEl.textContent = "";
        if (fieldEl) fieldEl.removeAttribute("aria-invalid");
        return true;
    }
}

function validateFullName() {
    const value = fullName.value.trim();
    if (value === "") return setError("fullName", "Nama lengkap wajib diisi.");
    if (value.length < 3) return setError("fullName", "Nama lengkap minimal 3 karakter.");
    return setError("fullName", "");
}

function validateEmail() {
    const value = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === "") return setError("email", "Email wajib diisi.");
    if (value.includes(" ")) return setError("email", "Email tidak boleh mengandung spasi.");
    if (!emailRegex.test(value)) return setError("email", "Format email tidak valid.");
    
    return setError("email", "");
}

function validateUsername() {
    const value = username.value.trim();
    if (value === "") return setError("username", "Username wajib diisi.");
    if (value.length < 3) return setError("username", "Username minimal 3 karakter.");
    if (value.includes(" ")) return setError("username", "Username tidak boleh mengandung spasi.");
    return setError("username", "");
}

function validateBirthDate() {
    const value = birthDate.value;
    if (value === "") return setError("birthDate", "Tanggal lahir wajib diisi.");

    const selectedDate = new Date(value);
    const today = new Date();
    
    if (selectedDate >= today) return setError("birthDate", "Tanggal lahir harus sebelum hari ini.");

    let age = today.getFullYear() - selectedDate.getFullYear();
    const isBirthdayPassed = (today.getMonth() > selectedDate.getMonth()) || 
                             (today.getMonth() === selectedDate.getMonth() && today.getDate() >= selectedDate.getDate());
    
    if (!isBirthdayPassed) age--;

    if (age < 17) return setError("birthDate", "Usia minimal 17 tahun.");
    return setError("birthDate", "");
}

function validateGender() {
    if (gender.value === "") return setError("gender", "Silakan pilih jenis kelamin.");
    return setError("gender", "");
}

function validatePassword() {
    const value = password.value;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumbers = /\d/.test(value);

    if (value === "") return setError("password", "Password wajib diisi.");
    if (value.length < 8) return setError("password", "Password minimal 8 karakter.");
    if (!hasLowerCase || !hasUpperCase || !hasNumbers) {
        return setError("password", "Password harus mengandung huruf besar, huruf kecil, dan angka.");
    }
    return setError("password", "");
}

function validateConfirmPassword() {
    const value = confirmPassword.value;
    if (value === "") return setError("confirmPassword", "Konfirmasi password wajib diisi.");
    if (value !== password.value) return setError("confirmPassword", "Konfirmasi password tidak sama.");
    return setError("confirmPassword", "");
}

function validateTerms() {
    if (!terms.checked) return setError("terms", "Anda harus menyetujui syarat & ketentuan.");
    return setError("terms", "");
}

fullName.addEventListener("input", validateFullName);
email.addEventListener("input", validateEmail);
username.addEventListener("input", validateUsername);
birthDate.addEventListener("change", validateBirthDate);
gender.addEventListener("change", validateGender);
confirmPassword.addEventListener("input", validateConfirmPassword);
terms.addEventListener("change", validateTerms);

password.addEventListener("input", function() {
    validatePassword();
    if (confirmPassword.value !== "") validateConfirmPassword();
});

birthDate.addEventListener("click", () => birthDate.showPicker && birthDate.showPicker());

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const isNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isUserValid = validateUsername();
    const isDateValid = validateBirthDate();
    const isGenderValid = validateGender();
    const isPassValid = validatePassword();
    const isConfPassValid = validateConfirmPassword();
    const isTermsValid = validateTerms();

    if (isNameValid && isEmailValid && isUserValid && isDateValid && isGenderValid && isPassValid && isConfPassValid && isTermsValid) {
        successModal.style.display = "block";
    }
});

document.querySelectorAll(".tnc-trigger").forEach(trigger => {
    trigger.addEventListener("click", (e) => {
        e.preventDefault();
        modal.style.display = "block";
    });
});

document.querySelector(".close-btn").addEventListener("click", () => modal.style.display = "none");

document.getElementById("btnAgree").addEventListener("click", () => {
    terms.checked = true;
    validateTerms();
    modal.style.display = "none";
});

document.getElementById("goToHomeBtn").addEventListener("click", () => window.location.href = "index.html");

window.addEventListener("click", (event) => {
    if (event.target === modal) modal.style.display = "none";
});