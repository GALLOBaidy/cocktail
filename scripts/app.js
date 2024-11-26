let form = document.getElementById("form");
let nom = document.getElementById("nom");
let ingredient = document.getElementById("ingredient");
let listCocktail = document.getElementById("cocktailList");
let search = document.getElementById("search");
let searchBtn = document.getElementById("text");

form.addEventListener("submit", (event) => {
    event.preventDefault;
})


function research (){

    const API_BASE = "https://www.thecocktaildb.com/api/json/v1/1/";
    searchBtn.addEventListener('click', () => {
        const query = search.value.trim();
        console.log(query);
        
        const searchType = nom.checked ? 'nom' : 'ingredient';
        if (!query) return alert("Veuillez entrer un terme de recherche.");
        const endpoint =
            searchType === 'nom'
                ? `${API_BASE}search.php?s=${query}`
                : `${API_BASE}filter.php?i=${query}`;
        fetch(endpoint)
            .then((response) => response.json())
            .then((data) => displayResults(data.drinks))
            .catch(console.error);
    });
}

research();