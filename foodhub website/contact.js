const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let isValid = true;

  // Clear previous error messages
  document.querySelectorAll(".error-message").forEach((el) => {
    el.style.display = "none";
  });

  // Validate Name
  if (nameInput.value.trim() === "") {
    showError(nameInput, "Name is required");
    isValid = false;
  }

  // Validate Email
  if (!isValidEmail(emailInput.value)) {
    showError(emailInput, "Enter a valid email");
    isValid = false;
  }

  // Validate Phone Number
  if (!isValidPhone(phoneInput.value)) {
    showError(phoneInput, "Enter a valid phone number");
    isValid = false;
  }

  // Validate Message
  if (messageInput.value.trim() === "") {
    showError(messageInput, "Message cannot be empty");
    isValid = false;
  }

  if (isValid) {
    alert("Message sent successfully!");
    form.reset();
  }
});

// Helper Functions
function showError(input, message) {
  const errorElement = input.nextElementSibling;
  errorElement.textContent = message;
  errorElement.style.display = "block";
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function isValidPhone(phone) {
  const regex = /^[6-9]\d{9}$/; // Indian phone number pattern
  return regex.test(phone);
}
