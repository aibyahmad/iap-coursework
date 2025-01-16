document.addEventListener("DOMContentLoaded", () => {
  loadEvents();
  setupFilters();
});

const EVENTS_PER_PAGE = 6;
let currentPage = 1;

async function loadEvents() {
  try {
    const response = await fetch("events.json");
    const events = await response.json();
    const eventsGrid = document.querySelector(".events-grid");

    // Clear existing events
    eventsGrid.innerHTML = "";

    // Calculate pagination
    const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
    const endIndex = startIndex + EVENTS_PER_PAGE;
    const paginatedEvents = events.slice(startIndex, endIndex);

    paginatedEvents.forEach((event) => {
      const eventCard = createEventCard(event);
      eventsGrid.appendChild(eventCard);
    });

    // Create pagination controls
    createPagination(events.length);

    // Populate location filter options
    populateLocationFilter(events);
  } catch (error) {
    console.error("Error loading events:", error);
  }
}

function createPagination(totalEvents) {
  const totalPages = Math.ceil(totalEvents / EVENTS_PER_PAGE);
  const pagination = document.querySelector(".pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.className = `page-btn ${i === currentPage ? "active" : ""}`;
    pageButton.textContent = i;
    pageButton.addEventListener("click", () => {
      currentPage = i;
      loadEvents();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    pagination.appendChild(pageButton);
  }
}

function createEventCard(event) {
  const card = document.createElement("div");
  card.className = "event-card";

  // Add click handler to the card
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
                <p class="location">📍 ${event.location}</p>
                <p class="date">📅 ${formatDate(event.date)}</p>
            </div>
        </div>
    `;

  return card;
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

function populateLocationFilter(events) {
  const locationSelect = document.getElementById("location");
  const locations = [...new Set(events.map((event) => event.location))];

  locations.forEach((location) => {
    const option = document.createElement("option");
    option.value = location;
    option.textContent = location;
    locationSelect.appendChild(option);
  });
}

function setupFilters() {
  const applyFiltersBtn = document.getElementById("applyFilters");
  const clearFiltersBtn = document.getElementById("clearFilters");

  applyFiltersBtn.addEventListener("click", filterEvents);
  clearFiltersBtn.addEventListener("click", clearFilters);
}

async function filterEvents() {
  const location = document.getElementById("location").value;
  const dateFrom = document.getElementById("dateFrom").value;
  const dateTo = document.getElementById("dateTo").value;

  try {
    const response = await fetch("events.json");
    let events = await response.json();

    // Apply filters
    events = events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        (!location || event.location === location) &&
        (!dateFrom || eventDate >= new Date(dateFrom)) &&
        (!dateTo || eventDate <= new Date(dateTo))
      );
    });

    // Reset to first page when filtering
    currentPage = 1;

    // Display filtered events
    const eventsGrid = document.querySelector(".events-grid");
    eventsGrid.innerHTML = "";

    // Paginate filtered results
    const startIndex = 0;
    const endIndex = EVENTS_PER_PAGE;
    const paginatedEvents = events.slice(startIndex, endIndex);

    paginatedEvents.forEach((event) => {
      const eventCard = createEventCard(event);
      eventsGrid.appendChild(eventCard);
    });

    // Update pagination for filtered results
    createPagination(events.length);
  } catch (error) {
    console.error("Error filtering events:", error);
  }
}

function clearFilters() {
  document.getElementById("location").value = "";
  document.getElementById("dateFrom").value = "";
  document.getElementById("dateTo").value = "";
  currentPage = 1;
  loadEvents();
}
