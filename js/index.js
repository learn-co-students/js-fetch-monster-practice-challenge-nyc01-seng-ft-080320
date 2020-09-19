document.addEventListener('DOMContentLoaded',function(e){
    console.log('DOM Loaded, Ready for JS magic!!', e.target);
    /** Defining my const and variables */
    const url = 'http://localhost:3000/monsters/'
    const body = e.target.querySelector('body');
    const btnFwd = body.querySelector('button#forward');
    const btnBck = body.querySelector('button#back');
    let page = 1;
    let limit = 10;
    
    /** Setting up my DOM */
    const form = buildForm(body.querySelector('div#create-monster'));
    queryMonsters(body.querySelector('div#monster-container'), url, limit, page, renderMonsters);
    btnBck.disabled = true;

    /** Setting up my listeners */
    btnFwd.addEventListener('click', e => {
        queryMonsters(body.querySelector('div#monster-container'), url, limit, ++page, renderMonsters);
        btnBck.disabled = false;
    });
    
    btnBck.addEventListener('click', e => {
        queryMonsters(body.querySelector('div#monster-container'), url, limit, --page, renderMonsters);
        if(page === 1){
            btnBck.disabled = true;
        }
    });

    form.addEventListener('submit', e => {
        e.preventDefault();
        monsterHTMLObj = submitForm(e.target);
        console.log(monsterHTMLObj);
        if (monsterHTMLObj){
            e.target.querySelector('#error').style.display='none';
            let options = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify(monsterHTMLObj)
            };
            console.log(options);
            createDBMonster(url, options);
            e.target.reset();
        }else{
            e.target.querySelector('#error').style.display='inline';
        }
    })
});

function buildForm(container){
    const newMonsterForm = document.createElement('form');
    newMonsterForm.id = 'new-monster-form';
    newMonsterForm.innerHTML = `
        <input id="name" name="name" placeholder="name...">
        <input id="age" name="age" placeholder="age...">
        <input id="description" name="description" placeholder="description...">
        <input type="submit" value="Create"><br>
        <lablel id="error" style="color:red; display:none;" >Error, please fill out the form before submitting.</label>
    `;
    container.appendChild(newMonsterForm);
    return newMonsterForm;
};

function queryMonsters(container, url, limit=50, page=1, func, queryOptions=null){
    if (!queryOptions){
        fetch(url + `?_limit=${limit}&_page=${page}`)
        .then(resp => resp.json())
        .then(monsters => func(container, monsters));
    }
};

function renderMonsters(container, monsters){
    container.innerHTML="";
    for(let monster of monsters){
        container.appendChild(renderMonster(monster));
    }
};

function renderMonster(monster){
    const monsterCard = document.createElement('div');
    monsterCard.id = monster.id;
    monsterCard.classList.add('card');
    monsterCard.innerHTML = `
        <h2>${monster.name}</h2>
        <h4>${monster.age}</h4>
        <p>${monster.description}</p>
    `
    return monsterCard;
};

function submitForm(form){
    if (form.name.value!="" && form.age.value != "" && form.description.value!=""){
        let monster = {
            name: form.name.value,
            age: form.age.value,
            description: form.description.value,
        }
        return monster;
    }else{
        return null;
    }
};

function createDBMonster(url, options){
    fetch(url, options)
    .then(resp => resp.json())
    .then(savedMonster => console.log('Saved monster', savedMonster));
}