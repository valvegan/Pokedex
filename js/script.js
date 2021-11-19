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

//for loop to show pokemon list names and heights
for (let i = 0; i < pokemonList.length; i++){
document.write(pokemonList[i].name + " (height " + pokemonList[i].height + ") ")
//adding conditional to check if the pokemon height is above 1.2
if (pokemonList[i].height > 1.2)
{
    document.write("Wow, that's a big pokemon!")
}}
