let addToy = false;

/*
  <div class="card">
    <h2>Woody</h2>
    <img src="[toy_image_url]" class="toy-avatar" />
    <p>4 Likes </p>
    <button class="like-btn" id="[toy_id]">Like <3</button>
  </div>

*/
function newNode(type) {
  return document.createElement(type);
}

function addLike() {
  let newLikes = parseInt(this.previousSibling.innerText) + 1;
  fetch(`http://localhost:3000/toys/${this.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      likes: newLikes,
    }),
  });
}

// Render a card that is structured like this:

/*
  <div class="card">
    <h2>Woody</h2>
    <img src="[toy_image_url]" class="toy-avatar" />
    <p>4 Likes </p>
    <button class="like-btn" id="[toy_id]">Like <3</button>
  </div>

*/
function renderCard(toy) {
  let toyBox = document.querySelector("#toy-collection");
  let card = newNode("div");
  card.classList.add("card");
  let h2 = newNode("h2");
  h2.innerText = toy.name;
  let img = newNode("img");
  img.src = toy.image;
  img.classList.add("toy-avatar");
  let p = newNode("p");
  p.innerText = `${toy.likes} ${toy.likes === 1 ? "like" : "likes"}`;
  let button = newNode("button");
  button.classList.add("like-btn");
  button.id = toy.id;
  button.innerText = "Like ❤️";
  button.addEventListener("click", addLike);
  card.append(h2);
  card.append(img);
  card.append(p);
  card.append(button);
  toyBox.append(card);
}

function renderAll(toys) {
  toys.forEach((toy) => renderCard(toy));
}

function getToys() {
  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((data) => renderAll(data))
    .catch((err) => alert(err));
}

function submitNewToy(event) {
  event.preventDefault();
  let name = event.target.name.value;
  let imageUrl = event.target.image.value;
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: name,
      image: imageUrl,
      likes: 0,
    }),
  })
    .then((response) => response.json())
    .then((toy) => rrenderCard(toy));
}

document.addEventListener("DOMContentLoaded", () => {
  getToys();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener("submit", submitNewToy);
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
