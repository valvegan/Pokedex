let pokemonRepository = (function(){

    let pokemonList = [
    {
    name: "Bulbasaur", 
    height: 0.7, 
    types:["grass", "poison"]
},
    {
    name: "Charmander", 
    height: 0.6, 
    types: "fire"
},
    {
    name: "Charmelon", 
    height: 1.1, 
    types: "fire"
},
    {
    name: "Charizard", 
    height: 1.7, 
    types:["fire", "flying"]
}
];

function getAll() {

      return pokemonList;

    };

function add(pokemon) {

    //adding typeof() to only allow addition of objects to the pokemonList  
    let itemAttributes = Object.keys(pokemon)
    const safeAttributes = ["name", "height", "types"]
          if(typeof(pokemon) === "object" &&

            //&& adding second conditional to force the new items to have the same keys as the first object in pokemonList
            safeAttributes.every(function(attr){
                return attr in pokemon}))
                
            //JSON.stringify(Object.keys(pokemonList[0])) === JSON.stringify(Object.keys(item)))
          {
        pokemonList.push(pokemon)
          } else{
              document.write("<p>Error adding item, item needs to be an object and have the required 3 properties</p>")
          }
    };

//filter function to filter pokemon objects by name 
function filter(searchName){

return pokemonList.filter((pokemon) => pokemon.name == searchName)

};

function addListItem(pokemon){

    let pokemonListDOM = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add("button");
    listItem.appendChild(button);
    pokemonListDOM.appendChild(listItem);

}

return {
    getAll: getAll,
    add: add,
    filter: filter,
    addListItem: addListItem,

};

}
)();

pokemonRepository.add({ 

    name: 'Pikachu', 
    height: 0.4,
    types: "electric"

});

//returning the array into the console
console.log(pokemonRepository.getAll());

//forEach() loop insteaf of the for loop
pokemonRepository.getAll().forEach(function(pokemon){

    pokemonRepository.addListItem(pokemon)   
}
);

//make the pokemon object selected by name appear on the console 
console.log(pokemonRepository.filter("Pikachu"))
