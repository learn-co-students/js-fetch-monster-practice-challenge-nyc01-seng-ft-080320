let pageNum = 1

document.addEventListener("DOMContentLoaded", e =>{
    getMonsters(1);
    monsterForm();
    clickHandler();
    submitHandler();
});

function getMonsters(page){
    
    return fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}` )
    .then(response => response.json())
    .then(monsters => {
        const monsterContainer = document.getElementById("monster-container")
        monsterContainer.innerHTML = "";
        if (monsters.length > 0){
        for(monster of monsters){
            renderMonster(monster)}
        }else if (pageNum > 1 && monsters.length === 0){
            pageChange(-1)
        }
    }
        )
    .catch("whoops")}
        
const renderMonster = (monster) => {
    const monsterContainer = document.getElementById("monster-container")
    const monsterCard = document.createElement("div")
    monsterCard.innerHTML = `<h2>${monster.name}</h2>
    <h4>Age: ${monster.age}</h4>
    <p>Bio: ${monster.description}</p>`
    monsterContainer.append(monsterCard);
}

const clickHandler = () => {
    document.addEventListener('click', e => {
        if (e.target.matches("#forward")){
            pageChange(1);
        }else if (e.target.matches("#back")){
            pageChange(-1)
        } 
    }
    )
}

const submitHandler = () => {
    document.addEventListener('submit', e => {
        e.preventDefault();
        const form =(e.target)
        const newMonster = {
            name: form.name.value,
            age: form.age.value,
            description: form.bio.value
    }
    newMonsterDb(newMonster);
    form.reset()

})
    }


const newMonsterDb = (monster) => {
    
    const createObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json" },
        body: JSON.stringify(monster)
    }
    
    fetch("http://localhost:3000/monsters", createObj)
    .then(response => response.json())
    .then(console.log)
    .then(f => renderMonster(monster))

}
const pageChange = (num) =>{
    
    pageNum += num;
    
    getMonsters(pageNum);
}

const monsterForm = () => {
    const formContainer = document.getElementById("create-monster")
    form = `<form>
    <input type="text" name="name" placeholder="Name"></input>
    <input type="text" name="age" placeholder="Age"></input>
    <input type="text" name="bio" placeholder="Description"></input>
    <input type="submit" value="Create Monster" class="more_monster">
    </form>`
    formContainer.innerHTML = form
    
}