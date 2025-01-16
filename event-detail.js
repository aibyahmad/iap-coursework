document.addEventListener("DOMContentLoaded", () => {
  loadEventDetails();
});

async function loadEventDetails() {
  try {
    // Get event title from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const eventTitle = urlParams.get("event");

    if (!eventTitle) {
      console.error("No event specified");
      return;
    }

    // Fetch events data
    const response = await fetch("events.json");
    const events = await response.json();

    // Find the specific event
    const event = events.find((e) => e.eventTitle === eventTitle);

    if (!event) {
      console.error("Event not found");
      return;
    }

    // Update the page with event details
    document.getElementById("eventImage").src = event.displayImageUrl;
    document.getElementById("eventImage").alt = formatEventTitle(
      event.eventTitle
    );
    document.getElementById("eventTitle").textContent = formatEventTitle(
      event.eventTitle
    );
    document.getElementById("eventLocation").textContent = event.location;
    document.getElementById("eventDate").textContent = formatDate(event.date);
    document.getElementById("eventDescription").textContent = event.description;

    // Update page title
    document.title = `${formatEventTitle(event.eventTitle)} - EventName`;
  } catch (error) {
    console.error("Error loading event details:", error);
  }
}

function formatEventTitle(title) {
  return title
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
