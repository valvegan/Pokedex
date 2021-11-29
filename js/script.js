let pokemonRepository = (function(){

    let pokemonList = [];

let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Other functions remain here

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        //console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

function loadDetails(pokemon){
    let url = pokemon.detailsUrl;
    return fetch(url).then(function(response){
        return response.json();
    }).then(function(details){
        //now we add the details to the item
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.types = details.types;
    }).catch(function(e){
        console.error(e);
    });
}


function getAll() {

      return pokemonList;

    };

function add(pokemon) {

    //adding typeof() to only allow addition of objects to the pokemonList  
    //let itemAttributes = Object.keys(pokemon)
    //const safeAttributes = ["name", "height", "types"]
          if(
              typeof(pokemon) === "object" &&
                "name" in pokemon &&
                "detailsUrl" in pokemon)  
            
            //safeAttributes.every(function(attr){
                //return attr in pokemon}))
              
          {
        pokemonList.push(pokemon)
          } else{
              document.write("<p>Error adding item, item needs to be an object and have the required 3 properties</p>")
          }
    };

//filter function to filter pokemon objects by name 
/*function filter(searchName){

return pokemonList.filter((pokemon) => pokemon.name === searchName)

};*/

function showDetails(pokemon){
  pokemonRepository.loadDetails(pokemon).then(function () {
    console.log(pokemon);
  })};

//function for click event 
function clickyEvent(button, pokemon){
button.addEventListener("click", function(){
    showDetails(pokemon)
})
}

function addListItem(pokemon){

    let pokemonListDOM = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add("button");
    listPokemon.appendChild(button);
    pokemonListDOM.appendChild(listPokemon);
    //invoking clickevent function on the button
    clickyEvent(button, pokemon);

};

return {
    getAll: getAll,
    add: add,
    //filter: filter,
    addListItem: addListItem,
    showDetails: showDetails,
    clickyEvent: clickyEvent,
    loadList: loadList,
    loadDetails: loadDetails,
};

}
)();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  //forEach() loop insteaf of the for loop
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});


//make the pokemon object selected by name appear on the console 
//console.log(pokemonRepository.filter("bulbasaur"))

