const gameContainer = document.getElementById("game");
let cardOne = null;
let cardTwo = null;
let noClicking = false;
let cardsFlipped = 0;


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}




let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}



// TODO: Implement this function!
function handleCardClick(event) {

  // only returns if the statement on the inside is true
  // This piece of code doesn't excecute until it is called within an if statement.
  // At the start of the program clicked is set to be false
  if(noClicking) return;

  // if the div that is clicked on by the user contains the class flipped, whiuch is what its assigned to when it is clicked then return. 
  // Remeber this if only returns if true. 
  if(event.target.classList.contains("flipped")) return;

  // This sets the variable currentCard to the div that is clicked 
  let currentCard = event.target
   // Sets the Background Color of the card thats is clicked to its class name
   const cardColor = event.target.getAttribute("class");
   currentCard.style.backgroundColor = cardColor;
 
   // This is saying as long as cardOne and cardTwo dont have values run the code inside
   // This code cannot run if cardOne and cardTwo is full. This means any other click can't go through and be assigned the value flipped because the conditional can't be met.
   if(cardOne === null || cardTwo === null){
    // assigns the class flipped to the card that is selected
    currentCard.classList.add("flipped");
    // This is assigning the variable cardOne to currentCard. Remeber at the start of the function cardOne is assigned to null. In JavaScript you can change the primitive type.
    cardOne = cardOne || currentCard;
    // If there is a cardTwo click then it now it assigns that card click to card two
    cardTwo = currentCard === cardOne ? null: currentCard;
    
   }

   // If cardOne has a value and cardTwo has a value then execute the code in the inside of the if statement
   if(cardOne && cardTwo){
    // Because noClicking is true the if statement is returned which means that clicking on other divs will not change the background color.
    noClicking = true;

    // This is assigning the cardOne and cardTwo values to another variable that can be checked against eachother
    checkOne = cardOne.className;
    checkTwo = cardTwo.className;

      // if the two cards are the same color / have the same backgroundColor
      if(checkOne === checkTwo){
        // going to add to flipped cards. There shouldn't be more than 10
        cardsFlipped += 2
        //This is going to take the click event off the two cards selected but it leaves the background Color of the divs so it can show that they are stll flipped. 
        cardOne.removeEventListener("click", handleCardClick);
        cardTwo.removeEventListener("click", handleCardClick);
        // This sets cardOne and cardTwo back to null so that they can accept more values in the starting if statement. Now there can be a new cardOne and cardTwo with the already selected cards still turned over.
        cardOne = null;
        cardTwo = null;
        // This returning false will exit this piece of code and skip to whatever is next. 
        noClicking = false;
      }
      // This else statement executes if checkOne and checkTwo aren't the same color
      else{
        // the setTimeout function that flipps the cards back over after a second if they aren't a match
        setTimeout(function(){
          // This section of code flipps the cars back over by resetting the backgeound color
          cardOne.style.backgroundColor = "";
          cardTwo.style.backgroundColor = "";
          // This takes the class flipped off of the selected cards so that they have the oppurtunity to be flipped again. 
          // Also the if statement in the beginning of the code isn't valid and won't return. 
          cardOne.classList.remove("flipped");
          cardTwo.classList.remove("flipped");
          // Cards are reset to null so that they may be flipped again and hold new click events
          cardOne = null;
          cardTwo = null;
          // noClicking being false breaks this code and allows for the divs to be clicked on again
          noClicking = false;

        }, 1000)

      }

   }

   if (cardsFlipped === COLORS.length) alert("game over!");
}

// when the DOM loads
createDivsForColors(shuffledColors);
