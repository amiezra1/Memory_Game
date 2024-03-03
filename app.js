/*Function*/

//Asynchronous
async function apiCountry() {
  /* Returns an array with the names and flags of all countries (Two-dimensional array)*/
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();
  return arrayNameCa(data);
}
async function functionLengthArray() {
  /* Returns the length of an array in the function apiCountry()*/
  const lengthArray = await apiCountry();
  return lengthArray.length;
}
async function arrayOfRandomStates() {
  /* */
  const arrayMemory = [];
  const randomArrayForName = randomArray();
  const randomArrayForFlag = randomArray();
  const arryapiCountry = await apiCountry();

  for (let index = 0; index < 9; index++) {
    const randomIndex = Math.floor(Math.random() * arryapiCountry.length);
    arrayMemory.push([
      arryapiCountry[randomIndex][0], // שם המדינה
      arryapiCountry[randomIndex][1], // דגם הדגל
      randomArrayForName[index], // שם אקראי
      randomArrayForFlag[index], // דגל אקראי
    ]);
  }
  return arrayMemory;
}
async function jsonArrayOfRandomStates() {
  /* */
  const arrayForJson = await arrayOfRandomStates();
  localStorage.setItem("arrayForJson", JSON.stringify(arrayForJson));
}

// Normal Functions
function arrayNameCa(countries) {
  /*The function receives an array containing a name object and a flag.
  and returns a 2D array containing the name of the country and the address of its flag */
  const nameCa = [];
  countries.forEach((eCountry) => {
    nameCa.push([eCountry.name.common, eCountry.flags.png]);
  });
  return nameCa;
}
function randomArray() {
  /*The function returns an array with the numbers one to eight in random order */
  const numCountry = [];
  for (let index = 0; numCountry.length < 9; index++) {
    const placeRandomArray = Math.floor(Math.random() * 9);
    if (!numCountry.includes(placeRandomArray)) {
      numCountry.push(placeRandomArray);
    }
  }
  return numCountry;
}
function activeTabFunction(object = {}) {
  /* */
  if (object.activeTab[0] === 1 && object.activeTab[1] === 1) {
    // const sdf = object.player === 0 ? 1 : 0;
    // object.player = sdf;
    object.activeTab = [0, 0];
  }
}
function RightOrFalseFunction(object = {}, apiArrays = []) {
  /* */
  let tORf;
  // object === monitoring
  // apiArray === apiArray
  if (object.RightOrFalse[0] !== 10 || object.RightOrFalse[1] !== 10) {
    for (let index = 0; index < 9; index++) {
      console.log(apiArrays[2], apiArrays[3]);
      console.log(object.RightOrFalse[0], object.RightOrFalse[1]);
      if (
        apiArrays[index][2] === object.RightOrFalse[0] &&
        apiArrays[index][3] === object.RightOrFalse[1]
      ) {
        tORf = true;
        break;
      } else {
        tORf = false;
      }
    }
    return tORf;
  }
}

function RightColor() {
  const body = document.body;
  // Change background color to blue for 2 seconds
  body.style.backgroundColor = "green";

  // Set a timeout to return the background color to the previous color after 2 seconds
  setTimeout(function () {
    body.style.backgroundColor = ""; // Set to empty string to revert to the previous color
  }, 500);
}
function FalseColor() {
  const body = document.body;
  // Change background color to blue for 2 seconds
  body.style.backgroundColor = "red";

  // Set a timeout to return the background color to the previous color after 2 seconds
  setTimeout(function () {
    body.style.backgroundColor = ""; // Set to empty string to revert to the previous color
  }, 1000);
}

function falsrAnswer(btnCountryFlag, btnCountryName, clickBtn0, clickBtn1) {
  /* */
  setTimeout(function () {
    btnCountryFlag[clickBtn1].textContent = "Flag";
    btnCountryName[clickBtn0].textContent = "Name";
  }, 1000);
}

/* main */
jsonArrayOfRandomStates();
const monitoring = {
  player: 0,
  score: [0, 0],
  activeTab: [0, 0],
  RightOrFalse: [10, 10],
};

/* Create buttons */
let btnCountryName = [];
for (let index = 0; index < 9; index++) {
  btnCountryName[index] = document.querySelector(".btn-" + index);
  btnCountryName[index].addEventListener("click", selectName);
}
let btnCountryFlag = [];
for (let index = 0; index < 9; index++) {
  btnCountryFlag[index] = document.querySelector(".btn-F" + index);
  btnCountryFlag[index].addEventListener("click", selectFlag);
}

function selectName(event) {
  const clickBtn = Number(event.srcElement.className[4]);
  const apiArray = JSON.parse(localStorage.getItem("arrayForJson"));
  if (monitoring.activeTab[0] === 0) {
    monitoring.activeTab[0] = 1;
    for (let index = 0; index < 9; index++) {
      const apiArrayIndex = apiArray[index];
      if (apiArrayIndex[2] === clickBtn) {
        btnCountryName[clickBtn].textContent = apiArrayIndex[0];
      }
    }
    monitoring.RightOrFalse[0] = clickBtn;
  }
  const clickBtn1 = monitoring.RightOrFalse[1];
  const clickBtn0 = monitoring.RightOrFalse[0];

  if (clickBtn1 !== 10) {
    if (RightOrFalseFunction(monitoring, apiArray)) {
      RightColor();
      monitoring.RightOrFalse = [10, 10];
    } else {
      FalseColor();
      falsrAnswer(btnCountryFlag, btnCountryName, clickBtn0, clickBtn1);
      monitoring.RightOrFalse = [10, 10];
    }
  }
  activeTabFunction(monitoring);
}
function selectFlag(event) {
  const clickBtn = Number(event.srcElement.className[5]);
  const apiArray = JSON.parse(localStorage.getItem("arrayForJson"));
  if (monitoring.activeTab[1] === 0) {
    monitoring.activeTab[1] = 1;
    for (let index = 0; index < 9; index++) {
      const apiArrayIndex = apiArray[index];
      if (apiArrayIndex[3] === clickBtn) {
        btnCountryFlag[clickBtn].textContent = "";
        const createImg = btnCountryFlag[clickBtn].appendChild(
          document.createElement("img")
        );
        createImg.src = apiArrayIndex[1];
      }
    }
    monitoring.RightOrFalse[1] = clickBtn;
  }
  const clickBtn0 = monitoring.RightOrFalse[0];
  const clickBtn1 = monitoring.RightOrFalse[1];
  if (clickBtn0 !== 10) {
    if (RightOrFalseFunction(monitoring, apiArray)) {
      RightColor();
      btnCountryName[clickBtn0].backgroundColor = "green";
      btnCountryName[clickBtn1].backgroundColor = "green";
      monitoring.RightOrFalse = [10, 10];
    } else {
      FalseColor();
      falsrAnswer(btnCountryFlag, btnCountryName, clickBtn0, clickBtn1);
      monitoring.RightOrFalse = [10, 10];
    }
  }
  activeTabFunction(monitoring);
}
