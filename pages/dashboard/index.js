const cardContainer = document.querySelector(".card-container");


const cardData = [
    {heading:"heading1", content:"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error deserunt asperiores iusto sapiente. Dolorum suscipit ullam aliquam officia enim. Totam quos doloremque provident reiciendis illum officiis in molestiae voluptas doloribus, accusantium delectus consectetur voluptate excepturi iure vitae ipsam veniam earum.", id:1},
    {heading:"heading1", content:"gsajcjsgdcm", id:2},
    {heading:"heading1", content:"gsajcjsgdcm", id:3},
    {heading:"heading1", content:"gsajcjsgdcm", id:4},
    {heading:"heading1", content:"gsajcjsgdcm", id:5},
    {heading:"heading1", content:"gsajcjsgdcm", id:6},
    {heading:"heading1", content:"gsajcjsgdcm", id:7}
];

const createNotes = (array)=>{
    array.forEach(cardobj => {
        const {heading,content,id }= cardobj;

        const card = document.createElement("div");
        card.classList.add("card")
        card.id = id;

        const insideHtml = `<div class="card-header">
        <div class="card-heading">${heading}</div>
        <div class="edit-note"><img src="../../assests/edit-note.svg" alt=""></div></div>
        <div class="card-content">${content}</div>`

        card.innerHTML=insideHtml;

        cardContainer.appendChild(card);
    });
};
createNotes(cardData);

const body = document.querySelector('body')
window.addEventListener('load',()=>{
    body.classList.add("visible")
})