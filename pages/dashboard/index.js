const cardContainer = document.querySelector(".card-container");

const logout = document.querySelector(".logout");
const createNoteButton = document.querySelector(".new-note");

const token = localStorage.getItem("jwt");

const url = "http://localhost:8000";

logout.addEventListener("click", () => {
  localStorage.removeItem("jwt");
  location.href = "/";
});

let cardData = [];

createNoteButton.addEventListener("click", () => {
  location.href = "/pages/createNotes/createNotes.html";
});

const createNotes = (array) => {
  cardContainer.innerHTML = "";

  array.forEach((cardobj) => {
    const { heading, content } = cardobj;
    const id = cardobj.noteId;

    const card = document.createElement("div");
    card.classList.add("card");
    card.id = id;

    const insideHtml = `<div class="card-header">
        <div class="card-heading">${heading}</div>
        <a href="../updatenotes/updatenotes.html?noteId=${id}">
        <div class="edit-note"><img src="../../assests/edit-note.svg" alt=""></div></a></div>
        <div class="card-content">${content}</div>`;

    card.innerHTML = insideHtml;

    cardContainer.appendChild(card);
  });
};

const body = document.querySelector("body");

window.addEventListener("load", () => {
  body.classList.add("visible");

  if (token) {
    fetch(`${url}/note/getallnotes`, {
      method: "GET",
      headers: {
        authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        cardData = data.data;
        createNotes(data.data);
      })
      .catch((err) => {
        alert("Error!!!");
        console.log(err);
      });
  }
});
