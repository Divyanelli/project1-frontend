const body = document.querySelector("body");
const cardContainer = document.querySelector(".card-container");

const token = localStorage.getItem("jwt");

const logout = document.querySelector(".logout");
const createNoteButton = document.querySelector(".new-note");

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
          <div class="edit-note">
            <img class="img" src="../../assests/edit-note.svg" alt=""></div>
        </a>
        <div class="delete-note">
          <img class="img" src="../../assests/remove.svg" alt="" />
        </div>
      </div>
      <div class="card-content">${content}</div>`;

    card.innerHTML = insideHtml;

    const deleteButton = card.querySelector(".delete-note");

    deleteButton.addEventListener("click", () => {
      fetch(`${url}/note/delete/${id}`, {
        method: "DELETE",
        headers: {
          authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.message);
          location.href = "/pages/dashboard/dashboard.html";
        })
        .catch((err) => {
          alert("Error in deleting note in..Retry!!!");
          console.log(err);
        });
    });

    cardContainer.appendChild(card);
  });
};

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
        createNotes(cardData);
      })
      .catch((err) => {
        alert("Error!!!");
        console.log(err);
      });
  } else {
    location.href = "/";
  }
});
