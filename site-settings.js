// Function to apply settings across all pages
function applySiteSettings() {
  // Get stored settings or use defaults
  const storedSettings = JSON.parse(localStorage.getItem("siteSettings")) || {
    baseFontSize: "16",
    headerBgColor: "#FFFFFF",
  };

  // Make sure we have valid values
  const fontSize = storedSettings.baseFontSize || "16";
  const headerColor = storedSettings.headerBgColor || "#FFFFFF";

  // Apply font size to root element
  document.documentElement.style.setProperty(
    "--base-font-size",
    `${fontSize}px`
  );

  // Apply header background color
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    navbar.style.backgroundColor = headerColor;
  }
}

// Apply settings when the DOM is loaded
document.addEventListener("DOMContentLoaded", applySiteSettings);
