let pokemonRepository = (function(){

    let pokemonList = [];

let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //Other functions remain here

  //fetching the api
    function loadList(pokemon) {
      //loading message
    showLoadingMessage();
      //fetch data
    return fetch(apiUrl)
      .then(function (response) {
    return response.json();
    })
      .then(function (json) {
        //hide loading message
    hideLoadingMessage();
    json.results.forEach(function (item) {
      //convert pokemon names to uppercase
        let pokeName = item.name; 
        pokeName = pokeName.charAt(0).toUpperCase() + pokeName.slice(1);
        let pokemon = {
        name: pokeName,
        detailsUrl: item.url
        };
    add(pokemon);
    
      });
    })
    .catch(function (e) {
        //hide loading message
    hideLoadingMessage();
    console.error(e);
    })
  };

  //load pokemon detail 
    function loadDetails(pokemon){
    //show loading message
      showLoadingMessage();
      let url = pokemon.detailsUrl;
      return fetch(url).then(function(response){
      return response.json();
    })
        .then(function(details){
        //hide loading message
      hideLoadingMessage();
        //now we add the details to the item
        pokemon.imageUrl = details.sprites.front_shiny;
        pokemon.height = details.height;
        pokemon.types = details.types;
        pokemon.weight = details.weight;
      
    }).catch(function(e){
        //hide loading message
        hideLoadingMessage();
        console.error(e);
    });
};


function getAll() {
      return pokemonList;
    };

//message on load 
let loadingMessage = document.querySelector(".loading-message");

function showLoadingMessage(){
loadingMessage.innerText = "Loading pokemons...please wait"
};

function hideLoadingMessage(){
loadingMessage.style.display = "none"
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

//modal container(background)
  let pokemonListDOM = document.querySelector(".pokemon-list");
  //search bar
  let searchBtn = document.querySelector(".search-button");
  let searchInput = document.querySelector(".search-input");

  //press enter to fill in the input (doesnt work)
  searchInput.focus()
  searchInput.addEventListener('keyup', findPoke);
  //event listener for search button, to show searched pokemon
  searchBtn.addEventListener("click", search);

    
//function to make the modal of the searched pokemon pop up
function search(){
  let searched = searchInput.value.toLowerCase();
  //find index of the searched pokemon
  let indexOfSearched = pokemonList.map(function(e){
  return e.name.toLowerCase()
  }).indexOf(searched);
  showDetails(pokemonList[indexOfSearched]); 
}

//press enter key to have pokemon modal pop up
window.addEventListener("keydown", (e)=>{
      if (e.key === "Enter"){
      search();
    }})

  //function to filter through pokemons and delete the unwanted ones from the list
function findPoke(){
    let li = document.querySelectorAll(".pokemon-list li")
    let searched = searchInput.value.toLowerCase();
    //for loop to get a pokemon "button" from the input search characters
      for (let i = 0; i < li.length; i++){
    //variable for the letters of the pokemon names (from the list)
      let names = li[i];
      names = names.innerText || names.textContent
      if (names.toLowerCase().indexOf(searched) > -1) {
        li[i].style.display = ""
        li[i].classList.add("first");
        }
      else  {
        li[i].style.display = "none"
      };
  }};
    
    //function to show the pokemon modal on click 
    function showModal(pokemon){
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');
        //clear existing content from modal
          modalTitle.empty();
          modalBody.empty();
    //create element for name in modal content
    let modalName = $('<h1 class="text-capitalize">' + pokemon.name + '</h1>');

    //create img in modal content
    let modalImg = $('<img class="modal-img">');
    modalImg.attr('src', pokemon.imageUrl);
    
    //create element for height in modal content
    let modalInfo = $('<p>' + 'Height: ' + pokemon.height + '</p>' + '<p>' + 'Weight: ' + pokemon.weight + 'kg </p>' + "<p>" + "Types : ");
     modalTitle.append(modalName);
    modalBody.append(modalImg);
    modalBody.append(modalInfo);
    
    //modal content types
    //foreach loop on types
    pokemon.types.forEach(item => {
        let pokeTypes = document.createElement('span');
        pokeTypes.innerText = item.type.name + " | ";
        modalBody.append(pokeTypes);
    });

    $('#modal-container').modal();
  
    //swipe left button
        let swipeButtonLeft = $(".btn-left")
    //swipe right
         let swipeButtonRight = $(".btn-right")
        //event listener for buttons
        swipeButtonRight.on("click", next);
        swipeButtonLeft.on("click", previous)
      //get previous and next pokemon by index
    let index = pokemonList.indexOf(pokemon) + 1;
      //next pokemon function
    function next() {
      nextPokemon = pokemonList[index + 1];
      showDetails(nextPokemon)}
      //previous pokemon function
    function previous() {
      if(index <= 1) return
      prevPokemon = pokemonList[index - 2]
      showDetails(prevPokemon)
    };
    //event listeners for left and right arrow keys (doesn't work)
    document.addEventListener("keyup", (e)=>{
      if (e.key === "ArrowRight"){
      next();
    }})
    document.addEventListener("keyup", (e)=>{
      if (e.key === "ArrowLeft"){
      previous();
    }})
    
    }; //showModal function finished

    

//showdetails of pokemons 
function showDetails(pokemon){
    pokemonRepository.loadDetails(pokemon).then(function () {
showModal(pokemon)
        })
      };


//function for click event 
function clickyEvent(button, pokemon){
button.addEventListener("click", function(){
    showDetails(pokemon)
})
};


function addListItem(pokemon){
    let pokemonItem = document.createElement("li"); 
    //pokemonItem.classList.add("group-list-item")
    pokemonListDOM.appendChild(pokemonItem);
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add("btn", "btn-primary");
    pokemonItem.appendChild(button);
    //invoking clickevent function on the button
    clickyEvent(button, pokemon); 
    
};

return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
    showModal: showModal,
};
})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  //forEach() loop insteaf of the for loop
  pokemonRepository.getAll()
  
  .forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);;

  })
  
});


