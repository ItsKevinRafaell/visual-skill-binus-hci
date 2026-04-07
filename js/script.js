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
const closeBtn = document.querySelector(".close-btn");
const agreeBtn = document.getElementById("btnAgree");
const triggers = document.querySelectorAll(".tnc-trigger");

const successModal = document.getElementById("successModal");
const goToHomeBtn = document.getElementById("goToHomeBtn");

function showError(fieldId, message) {
    const errorEl = document.getElementById(fieldId + "Error");
    const fieldEl = document.getElementById(fieldId);

    if (errorEl) {
        errorEl.textContent = message;
    }

    if (fieldEl) {
        fieldEl.setAttribute("aria-invalid", "true");
    }
}

function clearError(fieldId) {
    const errorEl = document.getElementById(fieldId + "Error");
    const fieldEl = document.getElementById(fieldId);

    if (errorEl) {
        errorEl.textContent = "";
    }

    if (fieldEl) {
        fieldEl.removeAttribute("aria-invalid");
    }
}

function hasNumber(value) {
    for (let i = 0; i < value.length; i++) {
        if (value[i] >= "0" && value[i] <= "9") {
            return true;
        }
    }
    return false;
}

function hasLetter(value) {
    for (let i = 0; i < value.length; i++) {
        const char = value[i].toLowerCase();
        if (char >= "a" && char <= "z") {
            return true;
        }
    }
    return false;
}

function hasUppercase(value) {
    for (let i = 0; i < value.length; i++) {
        if (value[i] >= "A" && value[i] <= "Z") {
            return true;
        }
    }
    return false;
}

function validateFullName() {
    const value = fullName.value.trim();

    if (value === "") {
        showError("fullName", "Nama lengkap wajib diisi.");
        return false;
    }

    if (value.length < 3) {
        showError("fullName", "Nama lengkap minimal 3 karakter.");
        return false;
    }

    clearError("fullName");
    return true;
}

function validateEmail() {
    const value = email.value.trim();

    if (value === "") {
        showError("email", "Email wajib diisi.");
        return false;
    }

    if (value.includes(" ")) {
        showError("email", "Email tidak boleh mengandung spasi.");
        return false;
    }

    const atIndex = value.indexOf("@");
    const lastAtIndex = value.lastIndexOf("@");

    if (atIndex <= 0 || atIndex !== lastAtIndex) {
        showError("email", "Format email tidak valid.");
        return false;
    }

    const dotIndex = value.indexOf(".", atIndex);

    if (dotIndex === -1 || dotIndex === atIndex + 1 || dotIndex === value.length - 1) {
        showError("email", "Format email tidak valid.");
        return false;
    }

    clearError("email");
    return true;
}

function validateUsername() {
    const value = username.value.trim();

    if (value === "") {
        showError("username", "Username wajib diisi.");
        return false;
    }

    if (value.length < 3) {
        showError("username", "Username minimal 3 karakter.");
        return false;
    }

    if (value.includes(" ")) {
        showError("username", "Username tidak boleh mengandung spasi.");
        return false;
    }

    clearError("username");
    return true;
}

function validateBirthDate() {
    const value = birthDate.value;

    if (value === "") {
        showError("birthDate", "Tanggal lahir wajib diisi.");
        return false;
    }

    const selectedDate = new Date(value + "T00:00:00");
    const today = new Date();

    if (Number.isNaN(selectedDate.getTime())) {
        showError("birthDate", "Tanggal lahir tidak valid.");
        return false;
    }

    if (selectedDate >= today) {
        showError("birthDate", "Tanggal lahir harus sebelum hari ini.");
        return false;
    }

    let age = today.getFullYear() - selectedDate.getFullYear();
    const monthDiff = today.getMonth() - selectedDate.getMonth();
    const dayDiff = today.getDate() - selectedDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    if (age < 17) {
        showError("birthDate", "Usia minimal 17 tahun.");
        return false;
    }

    clearError("birthDate");
    return true;
}

function validateGender() {
    if (gender.value === "") {
        showError("gender", "Silakan pilih jenis kelamin.");
        return false;
    }

    clearError("gender");
    return true;
}

function validatePassword() {
    const value = password.value;

    if (value === "") {
        showError("password", "Password wajib diisi.");
        return false;
    }

    if (value.length < 8) {
        showError("password", "Password minimal 8 karakter.");
        return false;
    }

    if (!hasLetter(value)) {
        showError("password", "Password harus mengandung huruf.");
        return false;
    }

    if (!hasNumber(value)) {
        showError("password", "Password harus mengandung angka.");
        return false;
    }

    if (!hasUppercase(value)) {
        showError("password", "Password harus mengandung minimal 1 huruf besar.");
        return false;
    }

    clearError("password");
    return true;
}

function validateConfirmPassword() {
    const value = confirmPassword.value;

    if (value === "") {
        showError("confirmPassword", "Konfirmasi password wajib diisi.");
        return false;
    }

    if (value !== password.value) {
        showError("confirmPassword", "Konfirmasi password tidak sama.");
        return false;
    }

    clearError("confirmPassword");
    return true;
}

function validateTerms() {
    if (!terms.checked) {
        showError("terms", "Anda harus menyetujui syarat & ketentuan.");
        return false;
    }

    clearError("terms");
    return true;
}

function clearAllErrors() {
    clearError("fullName");
    clearError("email");
    clearError("username");
    clearError("birthDate");
    clearError("gender");
    clearError("password");
    clearError("confirmPassword");
    clearError("terms");
}

fullName.addEventListener("input", validateFullName);
email.addEventListener("input", validateEmail);
username.addEventListener("input", validateUsername);
birthDate.addEventListener("change", validateBirthDate);
gender.addEventListener("change", validateGender);

birthDate.addEventListener("click", function () {
    if (typeof birthDate.showPicker === "function") {
        birthDate.showPicker();
    }
});

birthDate.addEventListener("focus", function () {
    if (typeof birthDate.showPicker === "function") {
        birthDate.showPicker();
    }
});

password.addEventListener("input", function () {
    validatePassword();
    if (confirmPassword.value !== "") {
        validateConfirmPassword();
    }
});

confirmPassword.addEventListener("input", validateConfirmPassword);
terms.addEventListener("change", validateTerms);

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const isFormValid =
        validateFullName() &&
        validateEmail() &&
        validateUsername() &&
        validateBirthDate() &&
        validateGender() &&
        validatePassword() &&
        validateConfirmPassword() &&
        validateTerms();

    if (isFormValid) {
        successModal.style.display = "block";
    }
});

triggers.forEach(function (trigger) {
    trigger.addEventListener("click", function (event) {
        event.preventDefault();
        modal.style.display = "block";
    });
});

closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
});

agreeBtn.addEventListener("click", function () {
    terms.checked = true;
    validateTerms();
    modal.style.display = "none";
});

goToHomeBtn.addEventListener("click", function () {
    window.location.href = "index.html";
});

window.addEventListener("click", function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});