// Set up variables for tracking attendance
const maxAttendees = 50;
let attendeeCount = 0;
let teamCounts = {
  water: 0,
  zero: 0,
  power: 0,
};

// Get DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCountSpan = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");
const waterCountSpan = document.getElementById("waterCount");
const zeroCountSpan = document.getElementById("zeroCount");
const powerCountSpan = document.getElementById("powerCount");

// Team label mapping for greeting
const teamLabels = {
  water: "Team Water Wise",
  zero: "Team Net Zero",
  power: "Team Renewables",
};

// Listen for form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get attendee name and team
  const name = nameInput.value.trim();
  const team = teamSelect.value;

  // Only proceed if both fields are filled
  if (name && team) {
    // Increment total attendee count
    attendeeCount = attendeeCount + 1;

    // Increment selected team's count
    teamCounts[team] = teamCounts[team] + 1;

    // Calculate progress percentage
    const percent = Math.round((attendeeCount / maxAttendees) * 100);

    // Update attendee count on page
    attendeeCountSpan.textContent = `${attendeeCount}`;

    // Update progress bar width
    progressBar.style.width = `${percent}%`;

    // Update correct team's count
    if (team === "water") {
      waterCountSpan.textContent = `${teamCounts.water}`;
    } else if (team === "zero") {
      zeroCountSpan.textContent = `${teamCounts.zero}`;
    } else if (team === "power") {
      powerCountSpan.textContent = `${teamCounts.power}`;
    }

    // Show personalized greeting
    greeting.textContent = `Welcome, ${name}! You have checked in for ${teamLabels[team]}.`;
    greeting.className = "success-message";
    greeting.style.display = "block";

    // Reset form fields
    form.reset();
    teamSelect.selectedIndex = 0;
    nameInput.focus();
  }
});
