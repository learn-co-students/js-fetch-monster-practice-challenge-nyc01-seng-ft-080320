document.addEventListener("DOMContentLoaded", () => {
    
    const MONSTERS_URL = "http://localhost:3000/monsters/"
    let page = 1
    const limit = 50

    const getMonsters = () => {

        fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
        .then(response => response.json())
        .then(monsters => renderMonsters(monsters))
    }

    const renderMonsters = (monsters) => {
        monsters.map(renderMonster)
    }

    const renderMonster = (monster) => {
        let monsterContainer = document.querySelector("#monster-container")
        let monsterDiv = document.createElement("div")
        monsterDiv.innerHTML = monsterDivContent(monster)
        monsterContainer.append(monsterDiv)
    }

    const monsterDivContent = (monster) => {
        let divContent = `
        <h2>${monster.name}<h2>
        <h4>Age: ${monster.age}</h4>
        <p>${monster.description}</p>`
        return divContent
    }

    const createMonsterForm = () => {
        let formContainer = document.querySelector("#create-monster")
        let form = document.createElement("form")
        form.id = "monster-form"

        let nameInput = document.createElement("input")
        nameInput.id = "name"
        let nameLabel = document.createElement("label")
        nameLabel.htmlFor = "name"
        nameLabel.innerHTML = "Name: "

        let ageInput = document.createElement("input")
        ageInput.id = "age"
        let ageLabel = document.createElement("label")
        ageLabel.htmlFor = "age"
        ageLabel.innerHTML = "Age: "


        let descInput = document.createElement("input")
        descInput.id = "description"
        let descLabel = document.createElement("label")
        descLabel.htmlFor = "description"
        descLabel.innerHTML = "Description: "

        let formSubmit = document.createElement("button")
        formSubmit.innerText = "Create Monster"
        formSubmit.id = "submit-monster"

        form.append(nameLabel, 
                    nameInput, 
                    ageLabel, 
                    ageInput, 
                    descLabel, 
                    descInput, 
                    formSubmit)

        formContainer.append(form)

    }

    document.addEventListener("submit", (e) => {
        e.preventDefault();
        if (e.target.matches("#monster-form")) {
            let form = e.target

            let fetchBody = {
                name: form["name"].value,
                age: form["age"].value,
                description: form["description"].value
            }

            let fetchOptions = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify(fetchBody)
            }

            fetch(MONSTERS_URL, fetchOptions)
            .then(response => response.json())
            .then(monster => form.reset())

        }
    })

    document.addEventListener("click", (e) => {
        if (e.target.matches("#forward")) {
            page++;
            getMonsters();
        } else if (e.target.matches("#back")) {
            if (page > 1) {
                page--;
                getMonsters();
            }
        }
    })

    createMonsterForm();
    getMonsters();
})