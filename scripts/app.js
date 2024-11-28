let form = document.getElementById("form");
let nom = document.getElementById("nom");
let ingredient = document.getElementById("ingredient");
let listCocktail = document.getElementById("cocktailList");
let search = document.getElementById("search");
let searchBtn = document.getElementById("btn");
let articleC = document.getElementById("modal");

//On ajoute un événement sur le formulaire et on le bloque pour éviter que la page se réactualise automatiquement
form.addEventListener("submit", (event) => {
    event.preventDefault();
})


//On déclare notre Api de base ; la fin de l'Api dépendra de la case séléctionnée (Ingrédient ou Cocktail name)
const API_BASE = "https://www.thecocktaildb.com/api/json/v1/1/";
searchBtn.addEventListener('click', () => {
    //query est une constante qui stocke la valeur de l’input de recherche après avoir supprimé les espaces superflus avec trim()
    const query = search.value.trim();
    console.log(query);

    //si aucune valeur n'a été saisie affiche moi ça 
    if (!query) return alert("Veuillez entrer un terme de recherche.");
    //on fait un fetch qui vérifie si 'nom' est coché et lui donne le premier endpoint sinon le second 
    // const searchType = nom.checked ? 'nom' : 'ingredient';
    // const endpoint =
    //     searchType === 'nom'
    //         ? `${API_BASE}search.php?s=${query}`
    //         : `${API_BASE}filter.php?i=${query}`;
    // console.log(endpoint);

    // fetch(endpoint)
    //     .then((response) => response.json())
    //     .then((data) => { //showCocktail(data.drinks))
    //         console.log(data);
    //         if (Array.isArray(data.drinks)) {
    //             showCocktail(data.drinks);
    //         } else {
    //             listCocktail.innerText = "'" + query + "' n'est pas trouvé";
    //             console.error("La réponse de l'API n'est pas un tableau de cocktails.");
    //         }
    //     })
    //     .catch(console.error);


    //On peut aussi 
    if (nom.checked == true && query != "") {
        let endpoint
        endpoint = `${API_BASE}search.php?s=${query}`
        console.log(endpoint);
        console.log("cocktailByName");


        fetch(endpoint)
            .then((response) => response.json())
            .then((data) => { //showCocktail(data.drinks))
                console.log(data);
                if (Array.isArray(data.drinks)) {
                    showCocktail(data.drinks);
                } else {
                    listCocktail.innerText = "'" + query + "' n'est pas trouvé dans la liste des cocktails";
                    console.error("La réponse de l'API n'est pas un tableau de cocktails.");
                }
            })
            .catch(console.error);
    } else if (nom.checked == false && query != "") {
        let endpoint
        endpoint = `${API_BASE}filter.php?i=${query}`
        console.log(endpoint);
        console.log("cocktailByIngredient");

        fetch(endpoint)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (Array.isArray(data.drinks)) {
                    showCocktail(data.drinks);
                } else {
                    listCocktail.innerHTML = "'" + query + "' n'est pas dans la liste des ingrédients";
                    console.error("La réponse de l'APi n'est pas dans le tablau");
                }
            })
            .catch(console.error);

    }

});



//Créons une fonction qui affichera les cocktail

function showCocktail(cocktails) {
    listCocktail.innerHTML = "";



    if (!Array.isArray(cocktails)) {
        console.error("Les cocktails ne sont pas un tableau.");
        return;
    }


    cocktails.forEach(cocktail => {
        let cardCocktail = document.createElement("div");
        cardCocktail.setAttribute("class", "card");

        let img = cocktail.strDrinkThumb;

        let drink = cocktail.strDrink;
        let id = cocktail.idDrink;

        cardCocktail.innerHTML = "<img src= '" + img + "'/>" +
            "<h5>" + drink + "</h5>" +
            "<button data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='base(" + id + ")'> Voir plus</button>";

        listCocktail.appendChild(cardCocktail);
    });
}



function base(id) {

    fetch(`${API_BASE}lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data.drinks[0]);
            showDetail(data.drinks);

        })
        .catch((console.error));


}


function showDetail(_cocktail) {

    for (let cocktail of _cocktail) {

        
        let detail = document.querySelector(".modal-body");
        
        let img = cocktail.strDrinkThumb;
        let drink = cocktail.strDrink;
        let category = cocktail.strCategory;
        let ingredient = cocktail.strIngredient1;
        
        
        detail.innerHTML =  "<h1>" + drink + "</h1>" +
        "<img src='" + img + "'/>" + 
        "<p>" + category + "</p>" +
        "<p>" + ingredient + "</p>";
        
        
        // articleC.appendChild(detail);
    }
}




