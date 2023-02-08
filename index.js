const addBtn = document.getElementById('add');
const title = document.getElementById('title');
const body = document.getElementById('body');
const deleteBtn = document.getElementById('deletebtn');
const notes = document.getElementById('noteArea');
const noteBody = document.getElementById('note-body');
const noteTitle = document.getElementById('noteTitle');

let g = 0;

addBtn.addEventListener('click', function(){

    let input = `
    <div class="notes">
       <p id="noteTitle" class="note-title" onclick ="noteDisplay(${++g})">${title.value}</p>
       <p id="note-body${g}" class=" hidden">${body.value}</p>
       <p class="deletebtn" onclick ="noteDelete(${g})">❌</p>
       <p class="delete"> DELETE </p>
    </div>
    `
    notes.insertAdjacentHTML("afterbegin", input) 
})

function noteDisplay(e){ 
    document.getElementById('note-body' + e).classList.toggle('hidden')
}

function noteDelete(e){
    document.getElementById('note-body' + e).parentNode.style.display="none"
}