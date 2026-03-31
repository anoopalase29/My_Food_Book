function displayRecipes(recipes){
    let container = document.getElementById("recipes");

    let output = "";
    recipes.forEach(x => {
        output += `
        <div class="card">
            <img src="${x.image}">
            <h3>${x.name}</h3>
        </div>
        `
        
    });
    container.innerHTML = output;

}



async function getRecipes(){

        let res = await fetch("https://dummyjson.com/recipes");
        let data = await res.json();

        displayRecipes(data.recipes)

}
getRecipes()