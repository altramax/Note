const addBtn = document.getElementById('add');
const title = document.getElementById('title');
const body = document.getElementById('body');
const deleteBtn = document.getElementById('deletebtn');
const notes = document.getElementById('noteArea');
const noteBody = document.getElementById('note-body');
const noteTitle = document.getElementById('noteTitle');

let count = 0;
// add new note 
addBtn.addEventListener('click', function(){
    let alt = title.value.slice(0,50)
    
     if(!title.value){
       let newTitle = body.value;
       alt = newTitle.slice(0,40) + "..."
     }

    let input = `
    <div class="notes">
       <p id="noteTitle" class="note-title" onclick ="noteDisplay(${++count})">${alt}</p> 
       <p id="note-body${count}" class="note-body">${body.value}
       <span class="delete"onclick ="noteDelete(${count})">DELETE NOTE</span>
      </p>
    </div>
    `
    if(body.value){
        notes.insertAdjacentHTML("afterbegin", input) 
    }
  body.value = title.value = ""
})

// open and close note 
function noteDisplay(e){ 
    document.getElementById('note-body' + e).classList.toggle('display')
}

//  Delete note
function noteDelete(e){
    document.getElementById('note-body' + e).parentNode.style.display="none"
}
