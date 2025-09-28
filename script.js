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

// Load saved data from localStorage
function loadProgress() {
  const savedCount = localStorage.getItem("attendeeCount");
  const savedTeams = localStorage.getItem("teamCounts");
  const savedList = localStorage.getItem("attendeeList");
  if (savedCount !== null) {
    attendeeCount = parseInt(savedCount, 10);
  }
  if (savedTeams !== null) {
    teamCounts = JSON.parse(savedTeams);
  }
  if (savedList !== null) {
    attendeeList = JSON.parse(savedList);
  }
}

// Save data to localStorage
function saveProgress() {
  localStorage.setItem("attendeeCount", attendeeCount);
  localStorage.setItem("teamCounts", JSON.stringify(teamCounts));
  localStorage.setItem("attendeeList", JSON.stringify(attendeeList));
}

// Attendee list
let attendeeList = [];

// Get attendee list DOM element
const attendeeListDiv = document.getElementById("attendeeList");

// Function to update attendee list display
function updateAttendeeList() {
  attendeeListDiv.innerHTML = "";
  for (let i = 0; i < attendeeList.length; i++) {
    const attendee = attendeeList[i];
    const item = document.createElement("div");
    item.className = "attendee-item";
    item.textContent = `${attendee.name} • ${teamLabels[attendee.team]}`;
    attendeeListDiv.appendChild(item);
  }
}

// Function to show celebration message
function showCelebration() {
  // Find winning team
  let winningTeam = "";
  let maxCount = 0;
  for (const key in teamCounts) {
    if (teamCounts[key] > maxCount) {
      maxCount = teamCounts[key];
      winningTeam = key;
    }
  }
  greeting.textContent = `🎉 Goal reached! ${teamLabels[winningTeam]} has the most attendees! 🎉`;
  greeting.className = "success-message";
  greeting.style.display = "block";
}

// Initial load
loadProgress();

// Update UI with loaded data
attendeeCountSpan.textContent = `${attendeeCount}`;
const percent = Math.round((attendeeCount / maxAttendees) * 100);
progressBar.style.width = `${percent}%`;
waterCountSpan.textContent = `${teamCounts.water}`;
zeroCountSpan.textContent = `${teamCounts.zero}`;
powerCountSpan.textContent = `${teamCounts.power}`;
updateAttendeeList();

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

    // Add attendee to list
    attendeeList.push({ name: name, team: team });

    // Save progress
    saveProgress();

    // Calculate progress percentage
    const percent = Math.round((attendeeCount / maxAttendees) * 100);

    // Update attendee count on page
    attendeeCountSpan.textContent = `${attendeeCount}`;

    // Update progress bar width
    progressBar.style.width = `${percent}%`;

    // Update correct team's count
    waterCountSpan.textContent = `${teamCounts.water}`;
    zeroCountSpan.textContent = `${teamCounts.zero}`;
    powerCountSpan.textContent = `${teamCounts.power}`;

    // Update attendee list display
    updateAttendeeList();

    // Show personalized greeting or celebration
    if (attendeeCount >= maxAttendees) {
      showCelebration();
    } else {
      greeting.textContent = `Welcome, ${name}! You have checked in for ${teamLabels[team]}.`;
      greeting.className = "success-message";
      greeting.style.display = "block";
    }

    // Reset form fields
    form.reset();
    teamSelect.selectedIndex = 0;
    nameInput.focus();
  }
});

// Function to reset progress
function resetProgress() {
  localStorage.removeItem("attendeeCount");
  localStorage.removeItem("teamCounts");
  localStorage.removeItem("attendeeList");
  // Optionally reload the page to update the UI
  location.reload();
}
