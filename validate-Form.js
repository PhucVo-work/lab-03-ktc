// ===== Biểu thức kiểm tra hợp lệ =====
const nameOnlyLetters = /^[A-Za-z\s]+$/; // Chỉ chữ và khoảng trắng
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email cơ bản
const numberOnly = /^\d+$/; // Chỉ số

// ===== Hàm kiểm tra tên (First Name, Last Name) =====
function checkName(idInput, idError, label) {
  const input = document.getElementById(idInput);
  const error = document.getElementById(idError);
  const value = input.value.trim();

  input.classList.remove("error");
  error.textContent = "";

  if (value === "") {
    error.textContent = `${label} is required`;
    input.classList.add("error");
    return false;
  }

  if (!nameOnlyLetters.test(value)) {
    error.textContent = `${label} must contain only letters`;
    input.classList.add("error");
    return false;
  }

  return true;
}

// ===== Hàm kiểm tra email =====
function checkEmail() {
  const input = document.getElementById("email");
  const error = document.getElementById("emailError");
  const value = input.value.trim();

  input.classList.remove("error");
  error.textContent = "";

  if (!emailPattern.test(value)) {
    error.textContent = "Invalid email address";
    input.classList.add("error");
    return false;
  }

  return true;
}

// ===== Hàm kiểm tra số điện thoại =====
function checkPhone() {
  const input = document.getElementById("phone");
  const error = document.getElementById("phoneError");
  const value = input.value.trim();

  input.classList.remove("error");
  error.textContent = "";

  if (!numberOnly.test(value)) {
    error.textContent = "Phone must contain only numbers";
    input.classList.add("error");
    return false;
  }

  return true;
}

// ===== Hàm kiểm tra checkbox (phải chọn ít nhất 1) =====
function checkCheckboxes() {
  const boxes = document.querySelectorAll(".info-checkbox");
  const error = document.getElementById("checkboxError");
  const anyChecked = Array.from(boxes).some((box) => box.checked);

  error.textContent = "";
  if (!anyChecked) {
    error.textContent = "Please select at least one option";
    return false;
  }

  return true;
}

// ===== Gắn sự kiện kiểm tra khi rời khỏi ô input =====
document.getElementById("firstName").addEventListener("blur", () => {
  checkName("firstName", "firstNameError", "First name");
});

document.getElementById("lastName").addEventListener("blur", () => {
  checkName("lastName", "lastNameError", "Last name");
});

document.getElementById("email").addEventListener("blur", checkEmail);
document.getElementById("phone").addEventListener("blur", checkPhone);

// ===== Gắn sự kiện khi người dùng bấm nút "Submit" =====
document
  .querySelector(".form-container")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Chặn gửi form mặc định

    // Kiểm tra tất cả
    const validFirst = checkName("firstName", "firstNameError", "First name");
    const validLast = checkName("lastName", "lastNameError", "Last name");
    const validEmail = checkEmail();
    const validPhone = checkPhone();
    const validCheckbox = checkCheckboxes();

    // Nếu tất cả đúng thì gửi form
    if (validFirst && validLast && validEmail && validPhone && validCheckbox) {
      alert("Form submitted successfully!");
      this.submit();
    }
  });

// ===== Gắn sự kiện khi người dùng bấm "Reset Form" =====
document
  .querySelector(".form-container")
  .addEventListener("reset", function () {
    // Xóa lỗi
    document
      .querySelectorAll(".error")
      .forEach((el) => el.classList.remove("error"));
    document
      .querySelectorAll(".error-message")
      .forEach((el) => (el.textContent = ""));
  });
