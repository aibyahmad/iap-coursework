document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const inputs = form.querySelectorAll("input, select, textarea");

  // Validation patterns
  const patterns = {
    name: /^[A-Za-z\s]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[0-9\s\(\)\+\-]+$/,
  };

  // Error messages
  const errorMessages = {
    name: "Name should only contain letters and spaces",
    email: "Please enter a valid email address",
    phone: "Please enter a valid phone number",
    subject: "Please select a subject",
    message: "Please enter your message",
  };

  // Real-time validation
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      validateField(this);
    });

    input.addEventListener("blur", function () {
      validateField(this);
    });
  });

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    // Validate all fields
    inputs.forEach((input) => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      // Show success message
      alert("Thank you for your message! We will get back to you soon.");
      form.reset();
      // Clear all error messages
      document.querySelectorAll(".error-message").forEach((error) => {
        error.textContent = "";
        error.classList.remove("visible");
      });
    }
  });

  function validateField(field) {
    const errorElement = document.getElementById(`${field.id}Error`);
    let isValid = true;

    // Reset error state
    field.classList.remove("error");
    errorElement.textContent = "";
    errorElement.classList.remove("visible");

    // Required field validation
    if (field.required && !field.value.trim()) {
      showError(field, errorElement, "This field is required");
      isValid = false;
    }
    // Pattern validation for specific fields
    else if (field.value.trim() && patterns[field.id]) {
      if (!patterns[field.id].test(field.value)) {
        showError(field, errorElement, errorMessages[field.id]);
        isValid = false;
      }
    }

    return isValid;
  }

  function showError(field, errorElement, message) {
    field.classList.add("error");
    errorElement.textContent = message;
    errorElement.classList.add("visible");
  }
});
