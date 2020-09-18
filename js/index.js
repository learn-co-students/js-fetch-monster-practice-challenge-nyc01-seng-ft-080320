document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "http://localhost:3000/monsters/"
    let page = 1;
    const fetchData = a => {
        fetch(baseUrl + `?_limit=50&_page=${a}`)
        .then(res => res.json())
        .then(monstersData => renderMonsters(monstersData));
    };

    const createForm = () => {
        const formDiv = document.querySelector('#create-monster')
        const monsterForm = document.createElement('form')
        
        monsterForm.innerHTML = `
        <input type="text" name="name" placeholder="Monster Name">
        <input type="text" name="age" placeholder="Monster's age">
        <input type="text" name="description" placeholder="Monster Description">
        <input type="submit" value="Add Monster">
        `
        
        formDiv.append(monsterForm)
    }

    const createMonster = monsterForm => {
        const monster = {
            name: monsterForm.name.value,
            age: monsterForm.age.value,
            description: monsterForm.description.value,
            }
            const options = {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  "accept": "application/json"
                },
                body: JSON.stringify(monster)
            }

            fetch(baseUrl, options)
            .then(res => res.json())
            .then(monster => renderMonster(monster))
        

        console.log(monster)     
    }


    const renderMonster = monsterObj => {
        const monstersContainer = document.querySelector('#monster-container')
        const monsterDiv = document.createElement('div')
        monsterDiv.classList.add('monster')
        monsterDiv.innerHTML = `
        <h3> Name: ${monsterObj.name}</h3>
        <h4> Age: ${monsterObj.age}</h4>
        <p> Description: ${monsterObj.description}</p>
        <span class="hidden"> ${monsterObj.id} </span>
        `
        monstersContainer.appendChild(monsterDiv)
    };

    const renderMonsters = monstersArr => {
        monstersArr.forEach(monsterObj => {
            renderMonster(monsterObj)
        });
    };

    const changePage = n => {
            page = parseInt(page) + n 
            document.querySelector('#monster-container').innerHTML = ''
            fetchData(page)
    }

    document.addEventListener('submit', e => {
        e.preventDefault()
        const monsterForm = e.target
        createMonster(monsterForm)

    })
    console.log(page)
    fetchData(page)
    document.addEventListener('click', e => {
        if (e.target.matches('#forward')) {
            changePage(1)
        } else if (e.target.matches('#back')) {
            changePage(-1)

        }
    })
    
    createForm()

});





// You should have fields for name, age, and description, and a 'Create Monster