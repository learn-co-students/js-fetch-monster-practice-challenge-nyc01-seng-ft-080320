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
    
    
}

const submitForm = () => {
    const form = document.querySelector('form')
    
    form.addEventListener('submit', e => {
        e.preventDefault()
        const name = e.target.name.value
        const age = e.target.age.value
        const description = e.target.bio.value
        
        const monsterInfo = {
            name: name,
            age: age,
            description: description
        }
        
        addMonster(monsterInfo)

    })
}

const addMonster = info => {
let baseUrl = `http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`  
    
    options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(info)
    }
    
    fetch(baseUrl, options)
    .then(response => response.json())
    .then(data => { createSingleMonster(data)

    })
}

const createSingleMonster = monster => {
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

fetchUrl(pageNumber)
clickHandler()
formHandler()
submitForm()
})