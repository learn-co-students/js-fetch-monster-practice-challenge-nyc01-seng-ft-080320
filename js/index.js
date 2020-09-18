

const baseurl = 'http://localhost:3000/monsters'
const _limit = "?_limit="
const _page = "&_page="
const _num = 50
let _pageNum = 1

document.addEventListener("DOMContentLoaded",()=>{
    const monsterContainer = document.querySelector("#monster-container")
    
    //used to delete all current monster cards on page
    const removeAllChildNodes = (parent) => {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    // renders a card for monsters in the data base
    const renderMonster = (monsterObj) =>{
        const newMonster = document.createElement("div")
        newMonster.dataset.monsterId = monsterObj.id
        newMonster.classList.add("monster")
        newMonster.id = monsterObj.name
        
        newMonster.innerHTML = `
            <h1>${monsterObj.name}</h1>
            <a>${monsterObj.age}</a>
            <a>${monsterObj.description}</a>
        `
        monsterContainer.append(newMonster)
    }

    //click handler
    const clickHandler = () =>{
        const body = document.querySelector("body")
        body.addEventListener("click", ()=>{
            const buttonClickedId = event.target.id
            
            switch (buttonClickedId) {
                case "back":
                    pageNumber('back')
                    removeAllChildNodes(monsterContainer)
                    getMonsterData()
                    break;
                case "forward":
                    pageNumber('forward')
                    removeAllChildNodes(monsterContainer)
                    getMonsterData()
                    break
                case "create-monster":
                    event.preventDefault()
                    // update database
                    
                    postMonsterData(newMonsterInfo())
                    
                    break
            }
        })
    }

    // function for changing page number in fetch request
    const pageNumber = (clickedButton = '')=>{
        if(_pageNum <= 0){
                _pageNum = 1 
        }else{
            if(clickedButton == 'forward'){
                _pageNum += 1
            }
            if(clickedButton == 'back'){
                _pageNum -= 1
                if(_pageNum < 1)_pageNum = 1
            }
        }
    }

    //fetch data and render into DOM
    const getMonsterData = () => {
        return fetch(baseurl + _limit + _num  + _page + _pageNum)
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                renderMonster(element) 
            }
        })
    }

    // update database
    const postMonsterData = (data) => {
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
        }
        
        return fetch(baseurl, options)
        .then(response => response.json())
        .then((data) => console.log("success"))
    }

    // create add monster form
    const monsterAddForm = () => {
        const newMonsterForm = document.createElement('form')
        newMonsterForm.innerHTML = `
            <label for="name">Name:</label><br>
            <input type="text" id="name" name="name" value=""><br>
            <label for="age">Age:</label><br>
            <input type="number" id="age" name="age" value=""><br>
            <label for="description">Description:</label><br>
            <input type="text" id="description" name="description" value=""><br>
            <br>
            <input type="submit" id="create-monster" value="Create A Monster">
            `
        document.getElementById('create-monster').appendChild(newMonsterForm)
    }

    //capture new monster info
    const newMonsterInfo = () => {
        let monster = {
            name: document.getElementById("name").value,
            age: document.getElementById("age").value,
            description: document.getElementById("description").value,
        }
        console.log(monster)
        return monster
    }
    
    monsterAddForm()
    getMonsterData()
    clickHandler()
})