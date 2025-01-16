document.addEventListener("DOMContentLoaded", () => {
  const defaultSettings = {
    baseFontSize: "16",
    headerBgColor: "#FFFFFF",
  };

  // Load saved settings or use defaults
  let currentSettings = loadSettings();

  // Initialize form with current settings
  initializeForm(currentSettings);

  // Set up event listeners
  setupEventListeners();

  // Apply current settings to preview
  applySettings(currentSettings);
});

function loadSettings() {
  const savedSettings = localStorage.getItem("siteSettings");
  const defaultSettings = {
    baseFontSize: "16",
    headerBgColor: "#FFFFFF",
  };

  return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
}

function initializeForm(settings) {
  const fontSizeInput = document.getElementById("baseFontSize");
  const headerBgColorInput = document.getElementById("headerBgColor");
  const fontSizeValue = document.getElementById("fontSizeValue");

  fontSizeInput.value = settings.baseFontSize;
  headerBgColorInput.value = settings.headerBgColor;
  fontSizeValue.textContent = `${settings.baseFontSize}px`;
}

function setupEventListeners() {
  const fontSizeInput = document.getElementById("baseFontSize");
  const headerBgColorInput = document.getElementById("headerBgColor");
  const saveButton = document.getElementById("saveSettings");
  const resetButton = document.getElementById("resetSettings");

  // Update preview as user changes values
  fontSizeInput.addEventListener("input", (e) => {
    document.getElementById(
      "fontSizeValue"
    ).textContent = `${e.target.value}px`;
    updatePreview();
  });

  headerBgColorInput.addEventListener("input", updatePreview);

  // Save settings
  saveButton.addEventListener("click", saveSettings);

  // Reset settings
  resetButton.addEventListener("click", resetToDefaults);
}

function updatePreview() {
  const fontSize = document.getElementById("baseFontSize").value;
  const headerColor = document.getElementById("headerBgColor").value;

  document.querySelector(".preview-text").style.fontSize = `${fontSize}px`;
  document.querySelector(".preview-header").style.backgroundColor = headerColor;
}

function saveSettings() {
  const baseFontSize = document.getElementById("baseFontSize").value;
  const headerBgColor = document.getElementById("headerBgColor").value;

  // Save settings to localStorage
  const settings = {
    baseFontSize: baseFontSize,
    headerBgColor: headerBgColor,
  };
  localStorage.setItem("siteSettings", JSON.stringify(settings));

  // Apply settings immediately
  applySiteSettings();
}

function resetToDefaults() {
  const defaultSettings = {
    baseFontSize: "16",
    headerBgColor: "#FFFFFF",
  };

  // Update localStorage
  localStorage.setItem("siteSettings", JSON.stringify(defaultSettings));

  // Update form values
  document.getElementById("baseFontSize").value = defaultSettings.baseFontSize;
  document.getElementById("headerBgColor").value =
    defaultSettings.headerBgColor;
  document.getElementById(
    "fontSizeValue"
  ).textContent = `${defaultSettings.baseFontSize}px`;

  // Apply settings
  applySiteSettings();

  // Show reset message
  alert("Settings reset to defaults!");
}

function applySettings(settings) {
  // Apply to preview
  document.querySelector(
    ".preview-text"
  ).style.fontSize = `${settings.baseFontSize}px`;
  document.querySelector(".preview-header").style.backgroundColor =
    settings.headerBgColor;
}
