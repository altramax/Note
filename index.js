"use strict";
const addBtn = document.getElementById("add");
let title = document.getElementById("title");
let body = document.getElementById("body");
const deleteBtn = document.getElementById("deletebtn");
const notes = document.getElementById("noteArea");
const noteBody = document.getElementById("note-body");
const noteTitle = document.getElementById("noteTitle");

let count = 0;
let dropDown = true;

// ADD NEW NOTE
addBtn.addEventListener("click", function () {
  let alt = title.value.slice(0, 100);

  if (!title.value) {
    let newTitle = body.value;
    alt = newTitle.split(" ").slice(0, 5).join(" ");
  }

  `${++count}`;

  let input = `

<div id="notes${count}"  data="true" class="notes">
 <div id="forChange${count}">
    <p id="noteTitle${count}" class="note-title num${count}" onclick ="displayNote(${count})">${alt}</p> 
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
    notes.insertAdjacentHTML("afterbegin", input);
  }

  return (body.value = title.value = "");
});

// OPEN AND CLOSE NOTE
function displayNote(e) {
  if (dropDown) {
    document.getElementById("notebody" + e).classList.toggle("display");
    document.getElementById("Edit" + e).classList.toggle("display");
    document.getElementById("Delete" + e).classList.toggle("display");
  }
}

//  DELETE NOTE
function deleteNote(e) {
  dropDown = true;
  document.getElementById("forChange" + e).parentNode.style.display = "none";
}

// EDIT NOTE
function editNote(e) {
  // stop dropdown display
  dropDown = false;

  // toggle button
  document.getElementById("Edit" + e).classList.toggle("hidden");
  document.getElementById("updateNote" + e).classList.toggle("hidden");

  // change text area
  let currentBodyText = document.getElementById("notebody" + e).innerHTML;
  let currentHeadText = document.querySelector(".num" + e).innerHTML;

  let noteTitle = document.querySelector(".num" + e);
  let noteBody = document.getElementById("notebody" + e);

  noteTitle.innerHTML = `<textarea id="titleEdit${e}" name="title" class="titleEdit" cols="35" rows="2">${currentHeadText}
  </textarea>`;
  noteBody.innerHTML = `<textarea id="bodyEdit${e}" name="body" class="bodyEdit" cols="35" rows="6">${currentBodyText}
  </textarea>`;
}

// Update edited note
function updateNote(e) {
  let newNote = document.getElementById("notes" + e);
  let editedTitle = document.getElementById("titleEdit" + e).value;
  let editedBody = document.getElementById("bodyEdit" + e).value;
  let alt = editedTitle.slice(0, 100);

  if (!editedTitle) {
    let newTitle = editedBody.value;
    alt = newTitle.split(" ").slice(0, 5).join(" ");
  }

  let input = `
   <div id="forChange${e}">
      <p id="noteTitle${e}" class="note-title num${e}" onclick ="displayNote(${e})">${alt}</p> 
      <p id="notebody${e}" class="note-body">${editedBody}</p>
      <div>
      <span id="Edit${e}" class="edit" onclick="editNote(${e})">EDIT NOTE</span>
      <span id="updateNote${e}" class="updatenote hidden" onclick="updateNote(${e})">UPDATE NOTE</span>
      </div>
      <span id="Delete${e}" class="delete" onclick ="deleteNote(${e})">DELETE NOTE</span>
    <div>
    `;
  dropDown = true;
  return (newNote.innerHTML = input);
}
