let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const collectionDiv = document.querySelector("#toy-collection")
const newToyForm = document.querySelector("body > div.container > form")

fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toyArr => {
      toyArr.forEach(toyObj => dispOneCard(toyObj));
  })

  function dispOneCard(toyObj){
      const detCard = document.createElement('div')
        detCard.classList.add('card')
        detCard.dataset.id = toyObj.id
      
      const detH2 = document.createElement('h2')
        detH2.dataset.id = toyObj.id
        detH2.textContent = toyObj.name

      const detImg = document.createElement('img')
        detImg.classList.add('toy-avatar')
        detImg.src = toyObj.image
  
      const detPTag = document.createElement('p')
        detPTag.textContent = toyObj.likes
        detPTag.dataset.id = toyObj.id

      const detBttn = document.createElement('button')
        detBttn.classList.add('like-btn')
        detBttn.dataset.id = toyObj.id

        detCard.append(detH2, detImg, detPTag, detBttn);
        collectionDiv.append(detCard);
  }

newToyForm.addEventListener('submit', evt => {
    evt.preventDefault();

    const name = evt.target.name.value
    const image = evt.target.image.value
    const likes = 0 
    const newToyObj = {name, image, likes}

    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(newToyObj)
    })
    .then(res => res.json())
    .then(toyObj => dispOneCard(toyObj))
})

collectionDiv.addEventListener('click', evt => {
    if(evt.target.matches('button.like-btn')){
      let pTagDisplay = (evt.target.previousElementSibling)
      let pTagNum = parseInt(pTagDisplay.textContent)
      
      fetch(`http://localhost:3000/toys/${evt.target.dataset.id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify({likes: pTagNum + 1})
      })
      .then(res => res.json())
      .then(toyObj => {
        pTagDisplay.textContent = `${toyObj.likes} Likes`
      })
    
    }
})