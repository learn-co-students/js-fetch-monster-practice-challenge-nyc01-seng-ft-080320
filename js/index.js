document.addEventListener('DOMContentLoaded', event => {
let pageNumber = 1
    // create a eevntlistener on foward / backword button 
//create if or logic for increasing or decreasing number
//make into function and call in the clickhandler
const fetchUrl = number => {
    let baseUrl = `http://localhost:3000/monsters/?_limit=50&_page=${number}`
    fetch(baseUrl)
    .then(response => response.json())
    .then(data => monsterDiv(data))   
}
//get mon & create function to parse json response 

const monsterDiv = (monsterArray) => {
    for (monster of monsterArray) {
        let monDiv = document.createElement("div")
        monDiv.dataset.id = monster.id
        monDiv.innerHTML = `
        <h1>${monster.name}</h1>
        <p>${monster.age}</p>
        ${monster.description}
    `
        const monsterContainer = document.querySelector("#monster-container")
        monsterContainer.appendChild(monDiv)
    }
}; 

    const removeChildren = () => {
        const monsterContainer = document.querySelector("#monster-container")
        const monsterArray = monsterContainer.querySelectorAll("div")
        monsterArray.forEach(el => el.remove());
    }


const clickHandler = () => {
    document.addEventListener('click', event => { 
        if (event.target.matches("#forward")) {
            removeChildren();
            pageNumber = parseInt(pageNumber) + 1;
            fetchUrl(pageNumber);  
        } else if (event.target.matches( "#back")) {
            removeChildren()
            pageNumber = parseInt(pageNumber) - 1;
            fetchUrl(pageNumber); 
        }
    })
}

const formHandler = () => {
    const form = document.createElement('form')
    form.innerHTML = `
        <input type='text' name='name' id='name-input' placeholder='name'>
        <input type='number' name='age' id='age-input' placeholder='age'>
        <input type='text' name='bio' id='bio-input' placeholder='bio'>
        <input type='submit' value='Submit'>
    `

    const monsterDiv = document.querySelector("#create-monster")
    monsterDiv.appendChild(form)
    
    console.log("monsterDiv:", monsterDiv)
}



fetchUrl(pageNumber)
clickHandler()
formHandler()
})