document.addEventListener('DOMContentLoaded', () => {
  const formDiv = document.querySelector('#create-monster')
  const monsterContainer = document.querySelector('#monster-container')
  monsterContainer.dataset.page = 1

  const getMonsters = pageNum => {
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageNum}`)
    .then(resp => resp.json())
    .then(data => monsterList(data))
  }

  const monsterList = monsterObjArr => {
    for (const monsterObj of monsterObjArr) {addMonster(monsterObj)}
  }

  const addMonster = monsterObj => {
    const newDiv = document.createElement('div')
    newDiv.innerHTML = `
      <h2>${monsterObj.name}</h2>
      <h4>Age: ${monsterObj.age}</h4>
      <p>Bio: ${monsterObj.description}</p>
      `
    monsterContainer.append(newDiv)
  }

  document.addEventListener('click', e => {
    if(e.target.id == 'forward') {
      movePageForward()
    }else if(e.target.id == 'back') {
      movePageBackward()
    }else if(e.target.id == 'submit') {
      e.preventDefault()
      submitNewMonster(e.target.parentNode)
    }
  })

  const submitNewMonster = (form) => {
    let options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: form.name.value, 
        age: form.age.value, 
        description: form.description.value
      })}
    fetch('http://localhost:3000/monsters', options)
      .then(resp => resp.json())
      .then(data => addMonster(data))
    formDiv.firstChild.reset()
  }

  const movePageForward = () => {
    monsterContainer.innerText = ''
    monsterContainer.dataset.page = parseInt(monsterContainer.dataset.page) + 1
    getMonsters(monsterContainer.dataset.page)
  }

  const movePageBackward = () => {
    if(monsterContainer.dataset.page === '1') {
      return alert('Cant go to page 0')
    }
    monsterContainer.innerText = ''
    monsterContainer.dataset.page = parseInt(monsterContainer.dataset.page) - 1
    getMonsters(monsterContainer.dataset.page)
  }

  const addForm = () => {
    const newForm = document.createElement('form')
    newForm.innerHTML = `
      <input name="name" placeholder="name...">
      <input name="age" placeholder="age...">
      <input name="description" placeholder="description...">
      <button id="submit">Create</button>
      `
    formDiv.append(newForm)
  }

  addForm()
  getMonsters(monsterContainer.dataset.page)
})