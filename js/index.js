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
        if(monster.likes){
            monster.likes
        } else {
            monster.likes = 0
        }
        monsterDiv.innerHTML = `
            <p>
                <h3>Name: ${monster.name}</h3>
                <h3>Age: ${monster.age}</h3>
                <h3>Description: ${monster.description}</h3>
                <h4 class="likes">${monster.likes}</h4>
                <span>
                    <button class = "like-button" type="button">Like!</button>
                    <button class = "delete-button" type="button">Delete!</button>
                </span>
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
            } else if(e.target.matches('.like-button')){
                    updateLikes(e.target)
            } else if(e.target.matches(".delete-button")){
                    deleteMonster(e.target)

            }
        })
    }

      // delete monster from DB and then DOM 

    const deleteMonster = (target) => {
        const monsterDiv = target.closest('div')
        const monsterId = monsterDiv.dataset.monsterId
        const options = {
            method: "DELETE"
        }
        fetch(`http://localhost:3000/monsters/${monsterId}`, options)
        .then(response => response.json())
        .then(() => {
            monsterDiv.remove()
        })
        .catch(error => {
            alert(error)
        })
    }

    // update likes in DB then on DOM

    const updateLikes = (target) => {
        const monsterDiv = target.closest('div')
        const likeEl = monsterDiv.querySelector('h4')
        const likes = parseInt(likeEl.textContent)
        const monsterId = monsterDiv.dataset.monsterId
        const likesObj = {
            likes: likes + 1
        }
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(likesObj)
        };
        fetch(`http://localhost:3000/monsters/${monsterId}`, options)
        .then(response => response.json())
        .then(monster => {
            likeEl.textContent = `${monster.likes} likes`
        })
    }
    // create monster object from data submitted in form 

    const createMonsterObj = form => {
        const monsterObj = {
            name: form.name.value,
            age: form.age.value,
            description: form.description.value,
            likes: 0
        }
        form.reset()
        return monsterObj
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