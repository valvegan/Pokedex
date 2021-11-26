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

return {
    getAll: function() {
      return pokemonList;
    },
    add: function(item) {
    //adding typeof() to only allow addition of objects to the pokemonList  
    
          if(typeof(item) === "object") {

            //&& adding second conditional (nested) to force the new items to have the same keys as the first object in pokemonList
              if (JSON.stringify(Object.keys(pokemonList[0])) === JSON.stringify(Object.keys(item)))
           
          {
        pokemonList.push(item)
          } else{
              document.write("<p>Error adding item, item needs to be an object and have the required 3 properties</p>")
          }}
  }};


})();


pokemonRepository.add({ 

    name: 'Pikachu', 
    height: 0.4,
    types: "electric"

});

//returning the array into the console
console.log(pokemonRepository.getAll());


//forEach() loop insteaf of the for loop

pokemonRepository.getAll().forEach(function(item){
    document.write(item.name + " (height " + item.height + ") " + "<br>")

//adding conditional to check if the pokemon height is above 1.2

if (item.height > 1.2)
{
    
    document.write("Wow, that's a big pokemon!" + "<br>");
    
}
}
);

//creating a variable for the filter() by name function
var filterByName =  pokemonRepository.getAll().filter(function(pokeName) {
  return pokeName.name == "Pikachu";
});
//showing the filtered name on the console
console.log(filterByName);

//different route - showing only the pokemon name insteaf of the pokemon object
//converting the names in the pokemonList into an array (pokeNames)
let pokeNames = [];

for (let i = 0; i < pokemonRepository.getAll().length; i++){
    pokeNames.push(pokemonRepository.getAll()[i].name);
};

var filterByName2 = pokeNames.filter(function(name)
{
    return name == "Pikachu";
})
console.log(filterByName2)


