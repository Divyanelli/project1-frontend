const createNoteInput = document.querySelector(".create-note-input");

createNoteInput.addEventListener("input",(eve)=>{
    console.log(eve.target.value);
});

