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
});

//On déclare notre Api de base ; la fin de l'Api dépendra de la case séléctionnée (Ingrédient ou Cocktail name)
const API_BASE = "https://www.thecocktaildb.com/api/json/v1/1/";
searchBtn.addEventListener("click", () => {
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

  //On peut aussi décortiquer notre fetch de la manière suivante en posant une condition (if...else)
  //Une première condition ou l'utilisateur souhaite rechercher en fonction du nom de cocktail
  if (nom.checked == true && query != "") {
    //On déclare une variable pour récupérer la fin de l'API
    let endpoint;
    endpoint = `${API_BASE}search.php?s=${query}`;
    console.log(endpoint);
    console.log("cocktailByName");

    //On convertit notre API en json
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        //On affiche notre data
        console.log(data);
        //On vérifie si le mot saisie est dans notre liste
        if (Array.isArray(data.drinks)) {
          showCocktail(data.drinks);
        } else {
          listCocktail.innerText =
            "'" + query + "' n'est pas trouvé dans la liste des cocktails";
          console.error(
            "La réponse de l'API n'est pas un tableau de cocktails."
          );
        }
      })
      .catch(console.error);
    //Une deusième condition ou l'utilisateur souhaite rechercher en fonction de l'ingrédient et on fait la même chose : en déclarant la fin de notre API, et en vérifiant si l'ingrédient est dans la liste
  } else if (nom.checked == false && query != "") {
    let endpoint;
    endpoint = `${API_BASE}filter.php?i=${query}`;
    console.log(endpoint);
    console.log("cocktailByIngredient");

    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (Array.isArray(data.drinks)) {
          showCocktail(data.drinks);
        } else {
          listCocktail.innerHTML =
            "'" + query + "' n'est pas dans la liste des ingrédients";
          console.error("La réponse de l'APi n'est pas dans le tablau");
        }
      })
      .catch(console.error);
  }
});

//Créons une fonction qui affichera les cocktail

function showCocktail(cocktails) {
  //On initialise notre HTML à vide
  listCocktail.innerHTML = "";

  //   if (!Array.isArray(cocktails)) {
  //     console.error("Les cocktails ne sont pas un tableau.");
  //     return;
  //   }

  //On crée un élément html (div) pour chaque cocktail qui devra s'afficher
  cocktails.forEach((cocktail) => {
    let cardCocktail = document.createElement("div");
    cardCocktail.setAttribute("class", "card");

    //On crée des variable pour récupérer les éléments qu'on voudrait afficher
    let img = cocktail.strDrinkThumb;
    let drink = cocktail.strDrink;
    let id = cocktail.idDrink;

    //On ajoute les variable récupérer dans notre éléments html
    cardCocktail.innerHTML =
      "<img src= '" +
      img +
      "'/>" +
      "<h5>" +
      drink +
      "</h5>" +
      //On ajoute notre fonction base() dans le bouton et un écouteur d'événéments sur le click du bouton pour afficher une modal
      "<button data-bs-toggle='modal' data-bs-target='#exampleModal' onclick='base(" +
      id +
      ")'> Voir plus</button>";

    //On ajoute notre div dans le html
    listCocktail.appendChild(cardCocktail);
  });
}

//On crée une fonction qui récupère l'Api pour afficher les détails d'un cocktail et on la convertit en json
function base(id) {
  fetch(`${API_BASE}lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.drinks[0]);
      //On ajoute notre fonction qui affiche les détails
      showDetail(data.drinks);
    })
    .catch(console.error);
}

//On crée notre fonction pour afficher les détails d'un cocktail
function showDetail(_cocktail) {
  //on utilise une boucle for...of pour itérer sur chaque objet cocktail dans la liste _cocktail.
  for (let cocktail of _cocktail) {
    //À chaque itération, la fonction sélectionne un élément du DOM avec la classe .modal-body et le stocke dans la variable detail.
    let title = document.querySelector(".modal-title");
    let modalImage = document.querySelector("#modalImage");

    //On extrait les propriétés strDrinkThumb, strDrink, strCategory, strGlass, strAlcoholic et strInstructions de l'objet cocktail actuel et les stocke dans les variables img, drink, category, glass, alcohol et instruction respectivement.
    let img = cocktail.strDrinkThumb;
    let drink = cocktail.strDrink;
    let category = cocktail.strCategory;
    let glass = cocktail.strGlass;
    let alcohol = cocktail.strAlcoholic;
    let instructions = cocktail.strInstructions;
    //On crée des variable pour les éléments html grâce aux ids
    let ingredient = document.getElementById("Ingredients");
    let instuction = document.getElementById("instruction");
    
    //On met à jour le contenu HTML de l'élément detail en utilisant innerHTML.
    title.innerHTML =
      "<h1>" +
      drink +
      "</h1>" +
      `<div class= "container-fluid">
        <div class= "row"> 
            <div class="col-md-4"> 
              <p><strong>Category : </strong> ${category}</p>
            </div>
            <div class="col-md-4">
              <p><strong>Glass To use : </strong> ${glass}</p>
            </div>
            <div class="col-md-4">
              <p><strong>Type: </strong> ${alcohol}</p>
            </div>
        </div>
      </div>`;
  
      modalImage.src = img;
    
      //On réinitialise le contenue html pour qu'il soit vide
      ingredient.innerHTML = "";

      //On récupere les clés de l'objet cocktail
      Object.keys(cocktail)
      //On filtre pour avoir que les clés qui commencent par strIngredients et qui ont une valeur définie (non nulle)
      .filter((key) => key.startsWith('strIngredient') && cocktail[key])
      //On boucle dessus  
      .forEach((key, index) => {
        //Pour chaque clé on récupère la valeur de l'ingrédient correspondant à la clé actuelle
        const ingre = cocktail[key];
        //On construit une clé de mesure correspondante en utilisant l'index de l'ingrédient
        const measureKey = `strMeasure${index + 1}`;
        //On récupère la valeur de la mesure correspondante ou affiche le texte si la mesure n'est pas défini
        const measure= cocktail[measureKey] || "Not specified quantity";
        //On ajoute le tout dans notre HTML sous forme de liste
        ingredient.innerHTML += `<li>${ingre} - ${measure}</li>`;

        //On ajoute les instructions dans le HTML
        instuction.innerHTML = instructions;
      })
  }
}
