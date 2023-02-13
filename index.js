"use strict"
const addBtn = document.getElementById('add');
let title = document.getElementById('title');
let body = document.getElementById('body');
const deleteBtn = document.getElementById('deletebtn');
const notes = document.getElementById('noteArea');
const noteBody = document.getElementById('note-body');
const noteTitle = document.getElementById('noteTitle');

let count = 0;
let dropDown = true;


function output(titleEdit = 0,bodyEdit = 0){

    if(titleEdit === 0  && bodyEdit === 0){
      title = titleEdit;
      body = bodyEdit;

    }else{
      title = title;
      body = body;
    }

  }






  
// add new note 
addBtn.addEventListener('click', function(){
    if(body.value){
        notes.insertAdjacentHTML("afterbegin", output()) 
    }
  body.value = title.value = ""
})


// open and close note 
function displayNote(e){ 
  if(dropDown){
    document.getElementById('notebody' + e).classList.toggle('display')
    document.getElementById('Edit' + e).classList.toggle('display')
    document.getElementById('Delete' + e).classList.toggle('display')}
}


//  Delete note
function deleteNote(e){
    document.getElementById('notebody' + e).parentNode.style.display="none"
}


// Edit note
function EditNote(e){
  // stop dropdown display 
  dropDown = false;

// toggle button 
  document.getElementById('Edit' + e).classList.toggle('hidden')
  document.getElementById('updateNote' + e).classList.toggle('hidden')

  // change text area 
  let currentBodyText = document.getElementById('notebody' + e).innerHTML;
  let currentHeadText = document.querySelector('.num' + e).innerHTML
 
  let noteTitle = document.querySelector('.num' + e)
  let noteBody = document.getElementById('notebody' + e)
  
  noteTitle.innerHTML = `<textarea id="titleEdit${e}" name="title" class="titleEdit" cols="20" rows="1">${currentHeadText}
  </textarea>`
  noteBody.innerHTML = `<textarea id="bodyEdit${e}" name="body" class="bodyEdit" cols="35" rows="5">${currentBodyText}
  </textarea>`
 let newNoteTitle = noteTitle.textContent;
 let newNoteBody = noteBody.textContent;

}


// Update edited note 
function updateNote(e){
   let newTitle = document.getElementById('noteTitle' + e);
   let newBody = document.getElementById('notebody' + e);
   let newNote = document.getElementById('notes' + e)
   let editedTitle = document.getElementById('titleEdit' + e).value;
   let editedBody = document.getElementById('bodyEdit' + e).value;

  // console.log(editedTitle, editedBody);
  newNote.innerHTML = output(editedTitle, editedBody)

   
  //  console.log(e);
}