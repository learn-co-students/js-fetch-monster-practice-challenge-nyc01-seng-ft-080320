document.addEventListener("DOMContentLoaded", e => {
    let monstersUrl = "http://localhost:3000/monsters/?_limit=50&_page="
    let pageNumber = 1

    const getMonsters = () => {
        fetch(monstersUrl+pageNumber)
        .then(response => response.json())
        .then(monsters => {
            renderMonsters(monsters)
        })

    }

    //render all monsters 

    const renderMonsters = monsters => {
        for(const monster of monsters){
            renderMonster(monster)
        }
    }

    // render a single monster

    const renderMonster = (monster) => {
        const monstersContainer = document.querySelector("#monster-container")
        const monsterDiv = document.createElement('div')
        monsterDiv.dataset.monsterId = monster.id
        monsterDiv.innerHTML = `
            <p>
                <h3>Name: ${monster.name}</h3>
                <h3>Age: ${monster.age}</h3>
                <h3>Description: ${monster.description}</h3>
            </p>
        `
        monstersContainer.append(monsterDiv)
    }

    // create and append form

    const createAndAppendForm = () => {
        const formDiv = document.querySelector('#create-monster')
        const monstersForm = document.createElement('form')
        monstersForm.id = 'new-monster-form'
        monstersForm.innerHTML = `
            <label for="name">Monster Name</label><br>
            <input type="text" name="name"><br>
            <label for="age">Monster Age</label><br>
            <input type="number" name='age'><br>
            <label for="description">Monster Description</label><br>
            <input type="text" name='description'><br>
            <input type="submit" value = "Create Monster" id="submit-new-monster">
        `
        formDiv.append(monstersForm)
    }

    // submit handler

    const submitHandler = () => {
        document.addEventListener('submit', e => {
            e.preventDefault()
            if(e.target.matches('#new-monster-form')){
                const monsterObj = createMonsterObj(e.target)
                const options = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(monsterObj)
                };
                fetch('http://localhost:3000/monsters', options)
                .then(response => response.json())
                .then(monster => {
                    renderMonster(monster)
                })
            }

        })
    }
    
    // create monster object from data submitted in form 

    const createMonsterObj = target => {
        const monsterObj = {
            name: target.name.value,
            age: target.age.value,
            description: target.description.value
        }
        target.reset()
        return monsterObj
    }

    // click handler for back and forward buttons
    
    const clickHandler = () => {
        document.addEventListener('click', e => {
            if(e.target.matches("#back")){
                if(pageNumber > 0){
                    pageNumber -= 1
                    fetchNewPage(monstersUrl, pageNumber)
                } else {
                    pageNumber = 1
                }
            } else if(e.target.matches("#forward")){
                    pageNumber += 1
                    fetchNewPage(monstersUrl, pageNumber)
            }
        })
    }
    
    // resets page data and re renders
    const reRenderPage = monsters => {
        const monstersDiv = document.querySelector('#monster-container')
        monstersDiv.innerHTML = ""
        renderMonsters(monsters)
    }

    // gets a new page based on page number

    const fetchNewPage = (url, pageNumber) => {
        fetch(url + pageNumber)
        .then(response => response.json())
        .then(monsters => {
            reRenderPage(monsters)
        })
    }

clickHandler()
submitHandler()
createAndAppendForm()
getMonsters()
})

//get monsters on page
//need to send a fetch request to the api for the first 50 monsters, need to keep track of how many we've already shown
//need to increment the page number after every request


//Above list of monsters, there should be a form to creat a new monseter
    //fields for NAME, AGE, DESCRIPTION and button for 'CREATE MONSTER
    //upon clicking the monster should be saved to the api and appended to the list
//after all the mosters there should be a button to make a new call to the api for the next 50 monsters