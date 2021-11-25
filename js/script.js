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
},
];

//forEach() loop insteaf of the for loop
pokemonList.forEach(function(pokemon){
    document.write(pokemon.name + " (height " + pokemon.height + ") " + "<br>")

//adding conditional to check if the pokemon height is above 1.2

if (pokemon.height > 1.2)
{
    
    document.write("Wow, that's a big pokemon!" + "<br>");
    
}
}
);

