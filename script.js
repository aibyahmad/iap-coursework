async function loadEvents() {
  try {
    const response = await fetch("events.json");
    const events = await response.json();
    const slider = document.querySelector(".events-slider");

    events.forEach((event) => {
      const card = document.createElement("div");
      card.className = "event-card";

      // Add click handler to navigate to event details
      card.addEventListener("click", () => {
        window.location.href = `event-detail.html?event=${encodeURIComponent(
          event.eventTitle
        )}`;
      });

      card.innerHTML = `
                <img src="${event.displayImageUrl}" alt="${event.eventTitle}">
                <div class="event-info">
                    <h3>${formatEventTitle(event.eventTitle)}</h3>
                    <div class="event-details">
                        <p>📍 ${event.location}</p>
                        <p>📅 ${formatDate(event.date)}</p>
                    </div>
                </div>
            `;

      slider.appendChild(card);
    });

    // Initialize scroll buttons
    initializeScrollButtons();
  } catch (error) {
    console.error("Error loading events:", error);
  }
}

function formatEventTitle(title) {
  return title
    .replace(/([A-Z])/g, " $1") // Add space before capital letters
    .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
    .trim();
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function initializeScrollButtons() {
  const slider = document.querySelector(".events-slider");
  const leftBtn = document.querySelector(".scroll-btn.left");
  const rightBtn = document.querySelector(".scroll-btn.right");

  // Calculate the scroll amount based on card width plus gap
  const scrollAmount = 332; // 300px card width + 32px gap

  // Function to handle scroll
  const handleScroll = (direction) => {
    const currentScroll = slider.scrollLeft;
    const newScroll =
      direction === "left"
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;

    slider.scrollTo({
      left: newScroll,
      behavior: "smooth",
    });
  };

  // Add click event listeners
  leftBtn.addEventListener("click", () => handleScroll("left"));
  rightBtn.addEventListener("click", () => handleScroll("right"));

  // Update button visibility based on scroll position
  const updateButtonVisibility = () => {
    leftBtn.style.opacity = slider.scrollLeft <= 0 ? "0.5" : "1";
    rightBtn.style.opacity =
      slider.scrollLeft >= slider.scrollWidth - slider.clientWidth - 10
        ? "0.5"
        : "1";
  };

  // Add scroll event listener to update button visibility
  slider.addEventListener("scroll", updateButtonVisibility);

  // Initial button visibility check
  updateButtonVisibility();
}

document.addEventListener("DOMContentLoaded", loadEvents);
