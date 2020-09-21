document.addEventListener('DOMContentLoaded', () => {
    loadMonsterForm()
    getMonsters(page)
    addNavListeners()
})

const UrlPrefix = 'http://localhost:3000/monsters/'

let page = 1

const getMonsters = (page) => {
    
        fetch(UrlPrefix+`?_limit=50&_page=${page}`)
        .then(resp => resp.json())
        .then(MonsterCollection => {
            MonsterCollection.forEach( monster => {
                renderMonster(monster)
            })
        })
}

const renderMonster = (monsterEl) => {
    const monstCard = createMonsterCard(monsterEl)
    const monstContainer = document.querySelector('#monster-container')
    monstContainer.append(monstCard)
}

const createMonsterCard = (monsterEl) => {
    const monstCard = document.createElement('div')
    monstCard.innerHTML = `
        <h1>${monsterEl.name}</h1>
        <h3>Age: ${monsterEl.age}</h3>
        <p>Bio: ${monsterEl.description}</p>
    `
    return monstCard
}

const loadMonsterForm = () => {
    const form = document.createElement('form')
    form.id = "monster-form"
    form.innerHTML = `
        <input name="name" placeholder="Name"></input>
        <input name="age" placeholder="Age"></input>
        <input name="description" placeholder="Description"></input>
        <button id="form-button">Create</button>
    `
    const formDiv = document.querySelector('#create-monster')
    formDiv.append(form)
    addSubmitHandler()
}

const addNavListeners = () => {
    document.addEventListener('click', e => {
        if (e.target.matches("#back")){
            page > 1 ? (page--, getMonsters(page)) : alert('No more Monsters')
        } else if (e.target.matches("#forward")) {
            page++
            getMonsters(page)
        }
    })
}

const addSubmitHandler = () => {
    const form = document.querySelector("form")
    form.addEventListener('submit', e => {
        e.preventDefault()
        const submittedMonster = parseForm(e.target)

        const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify(submittedMonster)
        }
        const newMonster = fetch(UrlPrefix, options)
            .then(resp => resp.json())
            .then(data => renderMonster(data))

        e.target.reset()
    })
}

const parseForm = (formObj) => {
    const monster = {}
    monster.name = formObj.name.value,
    monster.age = formObj.age.value,
    monster.description = formObj.description.value
    return monster
}
