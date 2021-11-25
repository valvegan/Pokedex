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
      pokemonList.push(item);
    },
    
  };

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

