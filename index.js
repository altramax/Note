"use strict";
const addBtn = document.getElementById("add");
let title = document.getElementById("title");
let body = document.getElementById("body");
const deleteBtn = document.getElementById("deletebtn");
const notes = document.getElementById("noteArea");
const noteBody = document.getElementById("note-body");
const noteTitle = document.getElementById("noteTitle");

let dropDown = true;
// window.localStorage.clear();

function callDisplay(num, intake) {
  let storageData;
  if (num !== "" && intake !== "") {
    window.localStorage.setItem(`${num}`, `${intake}`);
    storageData = window.localStorage.getItem(`${num}`);
  }

  const storage = { ...localStorage };
  let value = Object.values(storage);
  let z;
  for (let i of value) {
    if (i.length < 400) {
      console.log("lower than 300");
    } else {
      z = i;
      console.log("higher than 300");
    }

    if (

      i.length > 400 && storageData ===
      value[value.indexOf(i)] &&
      num !== "" &&
      intake !== ""
    ) {
      console.log("checking condition");
      notes.insertAdjacentHTML("afterbegin", `${z}`);
    } else if (
      i.length > 400 &&
      num === "" &&
      intake === "" &&
      z !== undefined
    ) {
      // console.log(z);
      notes.insertAdjacentHTML("afterbegin", `${z}`);
      console.log(z);
      console.log(value);
    }
  }
}

callDisplay("", "");

// Create increment in memory
let t = { ...localStorage };
// console.log(t);
if (Object.keys(t).includes("increase")) {
} else {
  window.localStorage.setItem("increase", "0");
}

// ADD NEW NOTE
addBtn.addEventListener("click", function (e) {
  // e.preventDefault();
  let alt = title.value.slice(0, 100).trim();

  if (!title.value) {
    let newTitle = body.value;
    alt = newTitle.split(" ").slice(0, 5).join(" ").trim();
  }

  // to add counter
  let k = window.localStorage.getItem(`increase`);
  `${++k}`;
  window.localStorage.setItem("increase", `${k}`);
  let count = window.localStorage.getItem(`increase`);
  console.log(count);

  let input = `
<div id="notes${count}"  data="true" class="notes">
 <div id="forChange${count}">
    <div class="title-group"><p id="noteTitle${count}" class="note-title num${count}" onclick ="displayNote(${count})">${alt}</p><img id="arrow-direction${count}" class="arrow" src="./images/arrow.svg" alt="arrow"></div>
    <p id="notebody${count}" class="note-body">${body.value}</p>
    <div>
    <span id="Edit${count}" class="edit" onclick="editNote(${count})">EDIT NOTE</span>
    <span id="updateNote${count}" class="updatenote hidden" onclick="updateNote(${count})">UPDATE NOTE</span>
    </div>
    <span id="Delete${count}" class="delete" onclick ="deleteNote(${count})">DELETE NOTE</span>
  </div>
</div>
`;

  if (alt || body.value) {
    callDisplay(count, input);
  }

  body.value = title.value = "";
});

// OPEN AND CLOSE NOTE
function displayNote(e) {
  if (dropDown) {
    document.getElementById("notebody" + e).classList.toggle("display");
    document.getElementById("Edit" + e).classList.toggle("display");
    document.getElementById("Delete" + e).classList.toggle("display");
    document.getElementById("arrow-direction" + e).classList.toggle("rotate");
  }
}

//  DELETE NOTE
function deleteNote(e) {
  dropDown = true;
  document.getElementById("forChange" + e).parentNode.style.display="none";
  window.localStorage.removeItem(`${e}`)
}

// EDIT NOTE
function editNote(e) {
  // stop dropdown display
  dropDown = false;

  // toggle button
  document.getElementById("Edit" + e).classList.toggle("hidden");
  document.getElementById("updateNote" + e).classList.toggle("hidden");
  document.getElementById("arrow-direction" + e).classList.add("hidden");

  // change text area
  let currentBodyText = document.getElementById("notebody" + e).innerHTML;
  let currentHeadText = document.querySelector(".num" + e).innerHTML;

  let noteTitle = document.querySelector(".num" + e);
  let noteBody = document.getElementById("notebody" + e);

  noteTitle.innerHTML = `<textarea id="titleEdit${e}" name="title" class="titleEdit" cols="35" rows="1">${currentHeadText}
  </textarea>`;
  noteBody.innerHTML = `<textarea id="bodyEdit${e}" name="body" class="bodyEdit" cols="35" rows="3">${currentBodyText}
  </textarea>`;
}

// Update edited note
function callDisplayEdited(num, intake) {
  // window.localStorage.clear();
  let storageData;
  // if (num !== "" && intake !== "") {
  //   // console.log(num, intake);
  window.localStorage.setItem(`${num}`, `${intake}`);
  storageData = window.localStorage.getItem(`${num}`);
  // }
  document.getElementById("notes" + `${num}`).innerHTML = intake;

  // const storage = { ...localStorage };
  // let value = Object.values(storage);
  // console.log(value);

  // for (let i of value) {
  //   if (value[value.indexOf(i)] === storageData) {
  //   // } else if (num === "" && intake === "") {
  //   //   notes.insertAdjacentHTML("afterbegin", `${i}`);
  //   // }
  // }}
}

function updateNote(e) {
  // let newNote = document.getElementById("notes" + e);
  let editedTitle = document.getElementById("titleEdit" + e).value;
  let editedBody = document.getElementById("bodyEdit" + e).value;
  let alt = editedTitle.slice(0, 100).trim();

  if (!editedTitle) {
    let newTitle = editedBody.value;
    alt = newTitle.split(" ").slice(0, 5).join(" ").trim();
  }

  let input = `
  <div id="notes${e}"  data="true" class="notes">
   <div id="forChange${e}">
   <div class="title-group"><p id="noteTitle${e}" class="note-title num${e}" onclick ="displayNote(${e})">${alt}</p><img id="arrow-direction${e}" class="arrow" src="./images/arrow.svg" alt="arrow"></div>
      <p id="notebody${e}" class="note-body">${editedBody}</p>
      <div>
      <span id="Edit${e}" class="edit" onclick="editNote(${e})">EDIT NOTE</span>
      <span id="updateNote${e}" class="updatenote hidden" onclick="updateNote(${e})">UPDATE NOTE</span>
      </div>
      <span id="Delete${e}" class="delete" onclick ="deleteNote(${e})">DELETE NOTE</span>
    <div>
  </div>
    `;
  dropDown = true;
  callDisplayEdited(`${e}`, input);
  // return (newNote.innerHTML = input);
}
