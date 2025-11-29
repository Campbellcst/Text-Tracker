/*---Fair warning, confused tf out of myself writing the darkmode---
---so css and js for that part will make no sense and half is probably wrong... but it works---*/

const charCount = document.getElementById("charCount");
const wordCount = document.getElementById("wordCount");
const sentenceCount = document.getElementById("sentenceCount");
const textArea = document.getElementById("textArea");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const enterBtn = document.getElementById("enter");
const letterDensity = document.getElementById("letters");
const numberDensity = document.getElementById("numbers");
const barContainer = document.querySelector(".bar__container");
const statsClass = document.querySelectorAll(".stats");
const header = document.getElementById("header");


const excludeSpacesBtn = document.getElementById("excludeSpacesBtn");
const charLimitBtn = document.getElementById("charLimitBtn");
const charLimit = document.getElementById("charLimit");

textArea.addEventListener("input", update);

textArea.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    countLetters();
  }
});

themeToggle.addEventListener("click", () => {
    let dark = "true";
    
    if (dark) {
        themeIcon.innerHTML = moonIcon;
    }
    else { 
        themeIcon.innerHTML = sunIcon;
    }
    dark = !dark

    document.body.classList.toggle("dark");
    document.button.classList.toggle("dark");
    charLimit.classList.toggle("dark");
    textArea.classList.toggle("dark");
    statsClass.classList.toggle("dark");
    header.classList.toggle("dark");
    document.div.classList.toggle("dark");
});

excludeSpacesBtn.addEventListener("click", update);

charLimitBtn.addEventListener("click", () => {
  charLimit.classList.toggle("hidden");
  textArea.maxLength = 10000;
});

charLimit.addEventListener("input", update);

function update() {
  let text = textArea.value;
  let characters = text.length;
  let words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0 && /\w/.test(word)).length;
  let sentences = text
    .split(/[.!?]/)
    .filter((str) => str.trim().length > 0).length;
  let charLimitValue = charLimit.value;

  if (excludeSpacesBtn.checked) {
    characters = text.trim().replaceAll(" ", "").length;
  }

  if (characters == charLimitValue && charLimitValue != 0 && charLimitBtn.checked) {
    textArea.maxLength = charLimitValue;
    alert("You have reached your character limit!");
  }

 
  charCount.textContent = characters;
  wordCount.textContent = words;
  sentenceCount.textContent = sentences;
}

enterBtn.addEventListener("click", countLetters);

function countLetters() {
  letterDensity.innerHTML = "";
  numberDensity.innerHTML = "";
  barContainer.innerHTML = "";
  
  let text = textArea.value;
  let textNoSpaces = text.toLowerCase().trim().replaceAll(" ", "");
  let letters = [];
  let sortedLetters = [];
  let letterCount = [];

  //logic for sorting letters
  for (let i = 0; i < textNoSpaces.length; i++) {
    letters[i] = textNoSpaces[i];
  }
  sortedLetters = letters.sort();
  
  //logic for occurences
  let i = 0;
  while (i < sortedLetters.length) {
    let count = 1;
    let j = i;

    while (sortedLetters[j] === sortedLetters[j + 1]) {
      count++;
      j++;
    }
    
    letterCount.push(count);
    i = j + 1;
  }

  //logic to assign each letter with occurence
  const uniqueLetters = [...new Set(sortedLetters)];
  const numOfuniqueLetters = uniqueLetters.length;

  //gets pairs together in array
  let combinedArray = [];  
  for (let i = 0; i < uniqueLetters.length + letterCount.length; i++) {
    combinedArray.push(uniqueLetters[i]);
    combinedArray.push(letterCount[i]);
  }

  //sorts pairs largest to smallest
  const pairs = [];
  for (let i = 0; i < combinedArray.length; i += 2) {
  pairs.push([combinedArray[i], combinedArray[i + 1]]);
  }
  pairs.sort((a, b) => b[1] - a[1]);
  const flatPairs = pairs.flat();

  const totalLetters = textNoSpaces.length;
  //prints to page
  for (let i = 0; i < flatPairs.length / 2; i += 2) {
    const letter = document.createElement("p");
    letter.textContent = flatPairs[i];

    const bar = document.createElement("div");
    bar.classList.add("bar");

    const progress = document.createElement("div");
    progress.classList.add("progressBar");
    let percent = (flatPairs[i + 1] / totalLetters) * 100 + "%";
    progress.style.width = percent;

    const occurences = document.createElement("p");
  
    occurences.textContent = `${flatPairs[i + 1]}  (${percent})`;

    const percentVal = document.createElement("p");
    percentVal.textContent = percent;

    letterDensity.appendChild(letter);
    barContainer.appendChild(bar);
    bar.appendChild(progress);
    numberDensity.appendChild(occurences);
  }

}

const sunIcon = 
  `<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="size-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
    />
  </svg>`
;

const moonIcon = 
  `<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="size-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
    />
  </svg>`
;