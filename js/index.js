document.addEventListener('DOMContentLoaded', () => {
  let offset = 1;

  const renderMonsters = (monsters) => {
    const container = document.getElementById('monster-container');
    
    for (monster of monsters) {
      const newMonster = document.createElement('div');
  
      newName = document.createElement('h3');
      newName.textContent = `${monster.id}. ${monster.name}`;
      newMonster.append(newName);
  
      newAge = document.createElement('h6');
      newAge.textContent = `Age: ${monster.age}`;
      newMonster.append(newAge);
  
      newDesc = document.createElement('p');
      newDesc.textContent = monster.description;
      newMonster.append(newDesc);
  
      container.append(newMonster);
    }
  }
  
  const getNext50Monsters = (offset) => {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${offset}`)
      .then(resp => resp.json())
      .then(json => renderMonsters(json));
  }
  
  const createMonsterForm = () => {
    const formContainer = document.getElementById('create-monster');
    
    const form = document.createElement('form');
    form.id = 'new-monster-form'
    form.innerHTML = `<h1>New Monster</h1>
                      <label>Name:</label>
                      <input type="text" id="name" name="name"><br>
                      <label>Age:</label>
                      <input type="number" id="age" name="age"><br>
                      <label>Description</label><br>
                      <textarea id="description" name="description" cols="40" rows="5"></textarea><br>
                      <input type="Submit" value="Create Monster">
                      `;
    formContainer.append(form);
  }

  const addMonster = (form) => {
    const formData = {
      "name": form.name.value,
      "age": form.age.value,
      "description": form.description.value
    }

    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(formData)
    }

    fetch('http://localhost:3000/monsters', configObj)
      .then(resp => resp.json())
      .then(json => {
        form.name.value = '';
        form.age.value = '';
        form.description.value = '';
      })
  };

  const clickHandler = () => {
    document.addEventListener('submit', e => {
      e.preventDefault();
      const form = e.target;
      addMonster(form);
    });

    document.addEventListener('click', e => {
      if (e.target.matches('#forward')) {
        offset ++;
        document.getElementById('monster-container').innerHTML = '';
        getNext50Monsters(offset);
      } else if (e.target.matches('#back')) {
        if (offset > 1) {
         offset --;
        }
        document.getElementById('monster-container').innerHTML = '';
        getNext50Monsters(offset);
      }
    });
  };

  getNext50Monsters(offset);
  createMonsterForm();
  clickHandler();

});



