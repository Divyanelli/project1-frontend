const body = document.querySelector("body");

const urlParams = new URLSearchParams(window.location.search);
const noteId = urlParams.get("noteId");

const url = "http://localhost:8000";

const token = localStorage.getItem("jwt");

function display(heading, content) {
  const card = document.querySelector(".createNotesContainer");
  const insidehtml = `<div class="heading">Update Note
  <input
  value = ${heading}
    type="text"
    placeholder="heading"
    class="create-note-heading"
    maxlength="20"
  />
  </div>
  <input
  value = ${content}
    type="text"
    placeholder="Create Your Note"
    class="create-note-input"
    maxlength="100"
  />
  <div class="create-note-button">Update Note Note</div>`;
  card.innerHTML = insidehtml;

  const updateNoteButton = document.querySelector(".create-note-button");
  updateNoteButton.addEventListener("click", () => {
    const heading = card.querySelector(".create-note-heading").value;
    const content = card.querySelector(".create-note-input").value;

    if (token) {
      fetch(`${url}/note/update/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({ heading, content }),
      })
        .then((res) => res.json())
        .then((data) => {
          location.href = "/pages/dashboard/dashboard.html";
        })
        .catch((err) => {
          alert("Error in creating note in..Retry!!!");
          console.log(err);
        });
    }
  });
}

window.addEventListener("load", () => {
  body.classList.add("visible");
  fetch(`${url}/note/update/${noteId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      display(data.data[0].heading, data.data[0].content);
    })
    .catch((err) => {
      alert("Error in updating note in..Retry!!!");
      console.log(err);
    });
});
