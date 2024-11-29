const door0 = document.getElementById("door-0");
const door1 = document.getElementById("door-1");
const door2 = document.getElementById("door-2");
const doors = [door0, door1, door2];
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");

let carDoor = Math.floor(Math.random() * 3); // Randomly assign the car to a door
let selectedDoor = null;
let gameState = "select"; // States: 'select', 'reveal', 'switch-or-stay'

// Add click event listeners to each door
door0.addEventListener("click", function () {
  handleDoorClick(0);
});
door1.addEventListener("click", function () {
  handleDoorClick(1);
});
door2.addEventListener("click", function () {
  handleDoorClick(2);
});

// Handle door click
function handleDoorClick(doorIndex) {
  if (gameState === "select") {
    selectedDoor = doorIndex;
    revealGoat(doorIndex);
  } else if (gameState === "switch-or-stay") {
    finalizeChoice(doorIndex);
  }
}

// Reveal a goat door (not the car or the selected door)
function revealGoat(selectedIndex) {
  let goatDoor;
  for (let i = 0; i < doors.length; i++) {
    if (i !== selectedIndex && i !== carDoor) {
      goatDoor = i;
      break;
    }
  }
  doors[goatDoor].classList.add("goat");
  doors[goatDoor].textContent = "Goat";
  message.textContent = "Would you like to switch or stay? Click a door.";
  gameState = "switch-or-stay";
}

// Finalize the choice and reveal the results
function finalizeChoice(finalChoice) {
  for (let i = 0; i < doors.length; i++) {
    if (i === carDoor) {
      doors[i].classList.add("open");
      doors[i].textContent = "Car ";
    } else {
      doors[i].classList.add("goat");
      doors[i].textContent = "Goat ";
    }
  }

  if (finalChoice === carDoor) {
    message.textContent = "Congratulations! You won the car! ";
  } else {
    message.textContent = "Oops! You got a goat. 🐐 Better luck next time.";
  }

  resetButton.style.display = "inline-block";
}

// Reset the game
resetButton.addEventListener("click", () => {
  carDoor = Math.floor(Math.random() * 3);
  selectedDoor = null;
  gameState = "select";
  message.textContent = "";
  for (let i = 0; i < doors.length; i++) {
    doors[i].className = "door";
    doors[i].textContent = `Door ${i + 1}`;
  }
  resetButton.style.display = "none";
});
